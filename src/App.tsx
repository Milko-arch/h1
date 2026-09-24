import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { UserProgress, Unit } from './types';
import { UNITS, ALL_QUESTIONS, INITIAL_USER_PROGRESS } from './data/historyData';
import { sounds } from './utils/audio';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PathView } from './components/PathView';
import { LearnModal } from './components/LearnModal';
import { InteractiveLessonModal } from './components/InteractiveLessonModal';
import { QuizModal } from './components/QuizModal';
import { MarathonQuizModal } from './components/MarathonQuizModal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { ShopModal } from './components/ShopModal';
import { BadgeListModal } from './components/BadgeListModal';
import { StreakModal } from './components/StreakModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { StudentWelcomeModal } from './components/StudentWelcomeModal';
import { DiplomaModal } from './components/DiplomaModal';
import { GoogleSheetsService, LeaderboardEntry } from './services/googleSheetsService';
import { initAuth, signInWithGoogle, signOutGoogle, getCachedAccessToken } from './services/authService';
import { User } from 'firebase/auth';

const LOCAL_STORAGE_KEY = 'footprints_history_progress_v2';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_USER_PROGRESS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Could not load progress from localStorage', e);
    }
    return INITIAL_USER_PROGRESS;
  });

  const [soundEnabled, setSoundEnabled] = useState(true);

  // Leaderboard state
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>(() => {
    return GoogleSheetsService.getLocalLeaderboard();
  });
  const [sheetUrl, setSheetUrl] = useState<string | null>(() => {
    const id = GoogleSheetsService.getStoredSheetId();
    return id ? `https://docs.google.com/spreadsheets/d/${id}/edit` : null;
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Welcome prompt if student hasn't entered their name yet
  const [showWelcomeNameModal, setShowWelcomeNameModal] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return !parsed.studentName || parsed.studentName.trim() === '';
      }
    } catch {
      // ignore
    }
    return true;
  });

  // Active Modals state
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [activeModal, setActiveModal] = useState<
    'learn' | 'interactive' | 'quiz' | 'marathon' | 'studyGuide' | 'shop' | 'badges' | 'streak' | 'leaderboard' | null
  >(null);

  const [googleUser, setGoogleUser] = useState<User | null>(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        if (token) {
          const targetSheetId = GoogleSheetsService.getStoredSheetId() || undefined;
          GoogleSheetsService.syncWithGoogleSheet(token, targetSheetId, {
            studentName: progress.studentName || 'Estudiante Footprints',
            xp: progress.xp,
            confites: progress.confites,
            streak: progress.streak,
            unitsCompleted: Object.keys(progress.unitStars).length,
            avatar: progress.currentAvatar,
            lastUpdated: new Date().toISOString().split('T')[0]
          }).then((res) => {
            if (res.success && res.url) {
              setSheetUrl(res.url);
              setLeaderboardEntries(res.entries);
            }
          }).catch(() => {});
        }
      },
      () => setGoogleUser(null)
    );
    return () => unsubscribe();
  }, []);

  const handleSignInGoogle = async () => {
    try {
      const { user, token } = await signInWithGoogle();
      setGoogleUser(user);
      if (token) {
        const studentEntry: LeaderboardEntry = {
          studentName: progress.studentName || 'Estudiante Footprints',
          xp: progress.xp,
          confites: progress.confites,
          streak: progress.streak,
          unitsCompleted: Object.keys(progress.unitStars).length,
          avatar: progress.currentAvatar,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        const targetSheetId = GoogleSheetsService.getStoredSheetId() || undefined;
        const res = await GoogleSheetsService.syncWithGoogleSheet(token, targetSheetId, studentEntry);
        if (res.success && res.url) {
          setSheetUrl(res.url);
          setLeaderboardEntries(res.entries);
        }
      }
    } catch (err) {
      console.warn("Google sign-in cancelled or error:", err);
      throw err;
    }
  };

  const handleSignOutGoogle = async () => {
    try {
      await signOutGoogle();
      setGoogleUser(null);
    } catch (err) {
      console.warn("Sign-out error:", err);
    }
  };

  // Core sync function to write student data to Google Sheets & local cache
  const syncStudentRecord = useCallback(
    async (
      overrideProgress?: UserProgress,
      customSheetId?: string,
      silent: boolean = false
    ): Promise<{ success: boolean; message: string }> => {
      const activeProgress = overrideProgress || progress;
      const activeStudentName =
        (activeProgress.studentName && activeProgress.studentName.trim()) || 'Estudiante Footprints';
      const completedCount = Object.keys(activeProgress.unitStars).length;

      const studentEntry: LeaderboardEntry = {
        studentName: activeStudentName,
        xp: activeProgress.xp,
        confites: activeProgress.confites,
        streak: activeProgress.streak,
        unitsCompleted: completedCount,
        avatar: activeProgress.currentAvatar,
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      // 1. In browser preview, update the local spreadsheet model and records
      const updatedEntries = GoogleSheetsService.recordStudentProgress(
        studentEntry.studentName,
        studentEntry.xp,
        studentEntry.confites,
        studentEntry.streak,
        studentEntry.unitsCompleted,
        studentEntry.avatar
      );
      setLeaderboardEntries(updatedEntries);

      // 2. Check for OAuth token (persisted across sessions)
      const token = getCachedAccessToken();
      const targetSheetId = customSheetId || GoogleSheetsService.getStoredSheetId() || undefined;

      if (token) {
        const syncResult = await GoogleSheetsService.syncWithGoogleSheet(token, targetSheetId, studentEntry);
        if (syncResult.success) {
          setSheetUrl(syncResult.url);
          setLeaderboardEntries(syncResult.entries);
          return { success: true, message: '¡Datos y estudiantes guardados en Google Sheets con éxito!' };
        } else if (!silent) {
          return { success: false, message: syncResult.error || 'No se pudo escribir en la hoja.' };
        }
      }

      // 3. Check if Apps Script Webhook URL is configured
      const webhookUrl = GoogleSheetsService.getStoredWebhookUrl();
      if (webhookUrl) {
        await GoogleSheetsService.sendToWebhook(webhookUrl, studentEntry);
        return { success: true, message: '¡Puntuaciones enviadas al Webhook de Google Sheets!' };
      }

      if (targetSheetId) {
        setSheetUrl(`https://docs.google.com/spreadsheets/d/${targetSheetId}/edit`);
      }

      return {
        success: false,
        message: 'Para actualizar tu Google Sheet en la nube, pulsa "Conectar Google" o usa el botón "Script Apps".'
      };
    },
    [progress]
  );

  // Sync current user into local leaderboard cache and automatically update Google Sheets as student plays
  useEffect(() => {
    // Debounced automatic background sync to Google Sheets (without waiting to press Sync)
    const autoSyncTimer = setTimeout(() => {
      syncStudentRecord(progress, undefined, true).catch(() => {});
    }, 800);

    return () => clearTimeout(autoSyncTimer);
  }, [
    progress.studentName,
    progress.xp,
    progress.confites,
    progress.streak,
    progress.unitStars,
    progress.completedLessons,
    progress.currentAvatar,
    syncStudentRecord
  ]);

  // Handle Google Sheets sync manually triggered from UI
  const handleSyncGoogleSheet = useCallback(
    async (customSheetId?: string): Promise<{ success: boolean; message: string }> => {
      setIsSyncing(true);
      try {
        return await syncStudentRecord(undefined, customSheetId, false);
      } catch (e: any) {
        console.error('Error syncing Google Sheet', e);
        return { success: false, message: e.message || 'Error al sincronizar con Google Sheets' };
      } finally {
        setIsSyncing(false);
      }
    },
    [syncStudentRecord]
  );

  const handleSaveStudentName = (name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name
    }));
    setShowWelcomeNameModal(false);
  };

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }, [progress]);

  const handleToggleSound = () => {
    const newState = sounds.toggleSound();
    setSoundEnabled(newState);
  };

  const handleSelectUnit = (unit: Unit, mode: 'learn' | 'quiz' | 'interactive') => {
    setSelectedUnit(unit);
    setActiveModal(mode);
  };

  const handleQuizComplete = (
    unitId: number,
    stars: number,
    xpGained: number,
    confitesGained: number,
    correctQIds: number[]
  ) => {
    setProgress((prev) => {
      const currentBestStars = prev.unitStars[unitId] || 0;
      const newStars = Math.max(currentBestStars, stars);
      const nextUnlocked =
        unitId === prev.unlockedUnitId && prev.unlockedUnitId < 24
          ? prev.unlockedUnitId + 1
          : prev.unlockedUnitId;

      const uniqueCompleted = Array.from(new Set([...prev.completedQuestions, ...correctQIds]));

      // Update streak history for today
      const todayIndex = (new Date().getDay() + 6) % 7; // Monday = 0, Sunday = 6
      const newStreakHistory = [...prev.streakHistory];
      newStreakHistory[todayIndex] = true;

      return {
        ...prev,
        xp: prev.xp + xpGained,
        confites: prev.confites + confitesGained,
        streak: prev.streak + 1,
        streakHistory: newStreakHistory,
        unlockedUnitId: nextUnlocked,
        unitStars: {
          ...prev.unitStars,
          [unitId]: newStars
        },
        completedQuestions: uniqueCompleted
      };
    });
  };

  const handleFinishInteractiveLesson = (unitId: number, confitesEarned: number) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(unitId);
      const newLessons = alreadyCompleted ? prev.completedLessons : [...prev.completedLessons, unitId];

      const todayIndex = (new Date().getDay() + 6) % 7;
      const newStreakHistory = [...prev.streakHistory];
      newStreakHistory[todayIndex] = true;

      return {
        ...prev,
        confites: prev.confites + confitesEarned,
        xp: prev.xp + 20,
        completedLessons: newLessons,
        streakHistory: newStreakHistory
      };
    });
  };

  const handleUnlockNextUnitWithConfites = (price: number) => {
    setProgress((prev) => {
      if (prev.confites < price || prev.unlockedUnitId >= 24) return prev;
      return {
        ...prev,
        confites: prev.confites - price,
        unlockedUnitId: prev.unlockedUnitId + 1
      };
    });
  };

  const handleDeductHeart = () => {
    setProgress((prev) => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  const handleRefillHearts = () => {
    setProgress((prev) => ({
      ...prev,
      hearts: prev.maxHearts,
      confites: Math.max(0, prev.confites - 50)
    }));
  };

  const handleOpenChest = (worldId: number) => {
    setProgress((prev) => {
      if (prev.openedChests.includes(worldId)) return prev;
      return {
        ...prev,
        confites: prev.confites + 50,
        xp: prev.xp + 50,
        openedChests: [...prev.openedChests, worldId]
      };
    });
  };

  const handleBuyAvatar = (avatarId: string, price: number) => {
    setProgress((prev) => {
      if (prev.confites < price || prev.unlockedAvatars.includes(avatarId)) return prev;
      return {
        ...prev,
        confites: prev.confites - price,
        unlockedAvatars: [...prev.unlockedAvatars, avatarId],
        currentAvatar: avatarId
      };
    });
  };

  const handleSelectAvatar = (avatarId: string) => {
    setProgress((prev) => ({
      ...prev,
      currentAvatar: avatarId
    }));
  };

  const handleBuyTheme = (themeId: string, price: number) => {
    setProgress((prev) => {
      if (prev.confites < price || prev.unlockedThemes.includes(themeId)) return prev;
      return {
        ...prev,
        confites: prev.confites - price,
        unlockedThemes: [...prev.unlockedThemes, themeId],
        currentTheme: themeId
      };
    });
  };

  const handleSelectTheme = (themeId: string) => {
    setProgress((prev) => ({
      ...prev,
      currentTheme: themeId
    }));
  };

  const handleBuyStreakFreeze = () => {
    setProgress((prev) => {
      if (prev.confites < 100) return prev;
      return {
        ...prev,
        confites: prev.confites - 100,
        streakFreeze: prev.streakFreeze + 1
      };
    });
  };

  const handleClaimStreakReward = (rewardAmount: number) => {
    setProgress((prev) => ({
      ...prev,
      confites: prev.confites + rewardAmount
    }));
  };

  const handleMarathonReward = (xpGained: number, confitesGained: number) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpGained,
      confites: prev.confites + confitesGained
    }));
  };

  // Get active questions for current unit with fallback
  const currentUnitQuestions = useMemo(() => {
    if (!selectedUnit) return [];
    const questions = ALL_QUESTIONS.filter((q) => selectedUnit.questionIds?.includes(q.id));
    if (questions.length > 0) return questions;
    const byCategory = ALL_QUESTIONS.filter((q) =>
      q.category?.toLowerCase() === selectedUnit.title?.toLowerCase()
    );
    return byCategory.length > 0 ? byCategory.slice(0, 3) : ALL_QUESTIONS.slice(0, 3);
  }, [selectedUnit]);

  // Theme styling backgrounds
  const getThemeBgClass = () => {
    switch (progress.currentTheme) {
      case 'theme-cosmic':
        return 'bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-slate-100';
      case 'theme-sunset':
        return 'bg-gradient-to-b from-amber-50 via-orange-50/40 to-yellow-50/60 text-slate-800';
      case 'theme-candy':
        return 'bg-gradient-to-b from-pink-50 via-purple-50/40 to-rose-50/60 text-slate-800';
      default:
        return 'bg-[#f7f9fa] text-slate-800';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-['Nunito',sans-serif] transition-colors duration-500 ${getThemeBgClass()}`}>
      {/* Top Duolingo-style navigation bar with Confites & Streaks */}
      <Navbar
        progress={progress}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenShop={() => setActiveModal('shop')}
        onOpenBadges={() => setActiveModal('badges')}
        onOpenMarathon={() => setActiveModal('marathon')}
        onOpenStudyGuide={() => setActiveModal('studyGuide')}
        onOpenStreak={() => setActiveModal('streak')}
        onOpenLeaderboard={() => setActiveModal('leaderboard')}
        onChangeName={() => setShowWelcomeNameModal(true)}
      />

      {/* Main Roadmap Path */}
      <main className="flex-1">
        <PathView
          progress={progress}
          leaderboardEntries={leaderboardEntries}
          sheetUrl={sheetUrl}
          onSelectUnit={handleSelectUnit}
          onOpenChest={handleOpenChest}
          onOpenMarathon={() => setActiveModal('marathon')}
          onOpenLeaderboard={() => setActiveModal('leaderboard')}
        />
      </main>

      {/* Footer with strictly required By: Ing. Milko Gonzales C. */}
      <Footer />

      {/* Prompt Participant Name at startup */}
      {showWelcomeNameModal && (
        <StudentWelcomeModal
          initialName={progress.studentName || ''}
          onSaveName={handleSaveStudentName}
        />
      )}

      {/* Leaderboard Top 10 Ranked by XP Modal */}
      {activeModal === 'leaderboard' && (
        <LeaderboardModal
          entries={leaderboardEntries}
          currentStudentName={progress.studentName || ''}
          onClose={() => setActiveModal(null)}
          onSyncGoogleSheet={handleSyncGoogleSheet}
          isSyncing={isSyncing}
          sheetUrl={sheetUrl}
          googleUser={googleUser}
          onSignInGoogle={handleSignInGoogle}
          onSignOutGoogle={handleSignOutGoogle}
          onSetCustomSheetId={(id: string) => {
            GoogleSheetsService.setStoredSheetId(id);
            setSheetUrl(`https://docs.google.com/spreadsheets/d/${id}/edit`);
          }}
        />
      )}

      {/* Step-by-Step Interactive Illustrated Lesson */}
      {activeModal === 'interactive' && selectedUnit && (
        <InteractiveLessonModal
          unit={selectedUnit}
          currentAvatar={progress.currentAvatar}
          onClose={() => setActiveModal(null)}
          onStartQuiz={() => setActiveModal('quiz')}
          onFinishLesson={handleFinishInteractiveLesson}
        />
      )}

      {/* Standard Learn Modal with Graphic Diagrams & Voice */}
      {activeModal === 'learn' && selectedUnit && (
        <LearnModal
          unit={selectedUnit}
          onClose={() => setActiveModal(null)}
          onStartQuiz={() => setActiveModal('quiz')}
          currentAvatar={progress.currentAvatar}
        />
      )}

      {/* 4-Option Quiz Modal with Confites & Audio */}
      {activeModal === 'quiz' && selectedUnit && (
        <QuizModal
          unit={selectedUnit}
          questions={currentUnitQuestions}
          progress={progress}
          onClose={() => setActiveModal(null)}
          onComplete={handleQuizComplete}
          onDeductHeart={handleDeductHeart}
          onRefillHearts={handleRefillHearts}
        />
      )}

      {/* 75-Questions Mega Marathon Modal */}
      {activeModal === 'marathon' && (
        <MarathonQuizModal
          onClose={() => setActiveModal(null)}
          currentAvatar={progress.currentAvatar}
          onReward={handleMarathonReward}
        />
      )}

      {/* Illustrated Study Guide Directory */}
      {activeModal === 'studyGuide' && (
        <StudyGuideModal
          onClose={() => setActiveModal(null)}
          onSelectUnit={handleSelectUnit}
        />
      )}

      {/* Confites Shop (Avatars, Themes, Topic Unlocks, Heart Refills) */}
      {activeModal === 'shop' && (
        <ShopModal
          progress={progress}
          onClose={() => setActiveModal(null)}
          onBuyAvatar={handleBuyAvatar}
          onSelectAvatar={handleSelectAvatar}
          onBuyTheme={handleBuyTheme}
          onSelectTheme={handleSelectTheme}
          onUnlockNextUnitWithConfites={handleUnlockNextUnitWithConfites}
          onRefillHearts={handleRefillHearts}
          onBuyStreakFreeze={handleBuyStreakFreeze}
        />
      )}

      {/* Streak Calendar & Milestones Modal */}
      {activeModal === 'streak' && (
        <StreakModal
          progress={progress}
          onClose={() => setActiveModal(null)}
          onClaimReward={handleClaimStreakReward}
        />
      )}

      {/* Badges & Trophies Gallery */}
      {activeModal === 'badges' && (
        <BadgeListModal
          progress={progress}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
