import React from 'react';
import { Unit, World, UserProgress } from '../types';
import { UNITS, WORLDS } from '../data/historyData';
import { sounds } from '../utils/audio';
import { Mascot } from './Mascot';
import { Star, Lock, Check, Gift, Sparkles, BookOpen, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TopPlayersCard } from './TopPlayersCard';
import { LeaderboardEntry } from '../services/googleSheetsService';

interface PathViewProps {
  progress: UserProgress;
  leaderboardEntries: LeaderboardEntry[];
  sheetUrl: string | null;
  onSelectUnit: (unit: Unit, mode: 'learn' | 'quiz' | 'interactive') => void;
  onOpenChest: (worldId: number) => void;
  onOpenMarathon: () => void;
  onOpenLeaderboard: () => void;
  onOpenDiploma: () => void;
}

export const PathView: React.FC<PathViewProps> = ({
  progress,
  leaderboardEntries,
  sheetUrl,
  onSelectUnit,
  onOpenChest,
  onOpenMarathon,
  onOpenLeaderboard,
  onOpenDiploma
}) => {
  // Zigzag offsets for the nodes (Duolingo style serpentine layout)
  const getOffsetClass = (index: number) => {
    const cycle = index % 4;
    switch (cycle) {
      case 0:
        return 'translate-x-0';
      case 1:
        return 'translate-x-8 sm:translate-x-14';
      case 2:
        return 'translate-x-0';
      case 3:
        return '-translate-x-8 sm:-translate-x-14';
      default:
        return 'translate-x-0';
    }
  };

  const handleChestClick = (worldId: number) => {
    if (progress.openedChests.includes(worldId)) {
      sounds.playClick();
      return;
    }
    sounds.playChest();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#fbbf24', '#a855f7', '#4ade80']
    });
    onOpenChest(worldId);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-12">
      {/* Welcome Explorer Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 p-5 sm:p-6 text-white shadow-lg border-4 border-emerald-400">
        <div className="absolute -right-6 -bottom-6 opacity-20 text-9xl select-none">
          👣
        </div>
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>American History Adventure</span>
            </div>
            <h1 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold leading-tight">
              Civil War & Reconstruction
            </h1>
            <p className="text-white/90 text-xs sm:text-sm font-semibold max-w-md">
              Learn with visual graphics, listen to native English audio for every question, and conquer all 24 units to earn every star.
            </p>
          </div>
          <div className="hidden sm:block shrink-0">
            <Mascot mood="happy" size="md" avatarId={progress.currentAvatar} />
          </div>
        </div>
      </div>

      {/* Top Players / Leaderboard Card View integrated in Main Dashboard */}
      <TopPlayersCard
        entries={leaderboardEntries}
        currentStudentName={progress.studentName || ''}
        onOpenLeaderboard={onOpenLeaderboard}
        sheetUrl={sheetUrl}
      />

      {/* Worlds Map */}
      <div className="space-y-14">
        {WORLDS.map((world, worldIdx) => {
          const worldUnits = UNITS.filter(u => world.unitIds.includes(u.id));
          const isChestOpened = progress.openedChests.includes(world.id);

          return (
            <div key={world.id} className="space-y-6">
              {/* World Header Card */}
              <div className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${world.bgGradient} text-white shadow-md flex items-center justify-between gap-4 border-2 border-white/20`}>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/80 block">
                    World {world.id} of 6
                  </span>
                  <h2 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold">
                    {world.title}
                  </h2>
                  <p className="text-xs text-white/90 font-medium">
                    {world.subtitle}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold border border-white/30 shrink-0">
                  {worldIdx === 0 ? '🌱' : worldIdx === 1 ? '⚡' : worldIdx === 2 ? '⚔️' : worldIdx === 3 ? '🦅' : worldIdx === 4 ? '🏆' : '🏛️'}
                </div>
              </div>

              {/* Units Nodes Column */}
              <div className="flex flex-col items-center gap-7 sm:gap-9 py-2">
                {worldUnits.map((unit, unitIdx) => {
                  const isUnlocked = unit.id <= progress.unlockedUnitId;
                  const isCurrent = unit.id === progress.unlockedUnitId;
                  const stars = progress.unitStars[unit.id] || 0;
                  const isCompleted = stars > 0;
                  const offsetClass = getOffsetClass(unitIdx);

                  return (
                    <div
                      key={unit.id}
                      className={`relative flex flex-col items-center transition-all ${offsetClass}`}
                    >
                      {/* Mascot indicator on the current active unit */}
                      {isCurrent && (
                        <div className="absolute -top-14 z-20 animate-bounce">
                          <Mascot mood="cheering" size="sm" avatarId={progress.currentAvatar} />
                          <div className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black text-[10px] uppercase shadow-xs -mt-1 text-center">
                            Start Here!
                          </div>
                        </div>
                      )}

                      {/* Main Node Button */}
                      <div className="relative group">
                        <button
                          disabled={!isUnlocked}
                          onClick={() => {
                            sounds.playClick();
                            onSelectUnit(unit, 'quiz');
                          }}
                          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center transition-all duration-200 select-none shadow-lg relative cursor-pointer active:translate-y-1 ${
                            isCompleted
                              ? 'bg-amber-400 hover:bg-amber-300 border-b-6 border-amber-600 active:border-b-0'
                              : isCurrent
                              ? 'bg-emerald-500 hover:bg-emerald-400 border-b-6 border-emerald-700 active:border-b-0 ring-4 ring-emerald-300 ring-offset-2'
                              : isUnlocked
                              ? 'bg-blue-500 hover:bg-blue-400 border-b-6 border-blue-700 active:border-b-0'
                              : 'bg-slate-200 border-b-6 border-slate-300 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {/* Inner Unit Emoji */}
                          <span className={`text-2xl sm:text-3xl ${!isUnlocked ? 'grayscale opacity-50' : ''}`}>
                            {unit.emoji}
                          </span>

                          {/* Unit Number Badge */}
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.2 rounded-full mt-0.5 ${
                              isCompleted
                                ? 'bg-amber-600 text-white'
                                : isCurrent
                                ? 'bg-emerald-700 text-white'
                                : isUnlocked
                                ? 'bg-blue-700 text-white'
                                : 'bg-slate-400 text-white'
                            }`}
                          >
                            #{unit.number}
                          </span>

                          {/* Lock icon if locked */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 rounded-full bg-slate-400/20 backdrop-blur-2xs flex items-center justify-center">
                              <Lock className="w-6 h-6 text-slate-500" />
                            </div>
                          )}
                        </button>

                        {/* Stars Pill if completed */}
                        {isCompleted && (
                          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-white border border-amber-300 shadow-xs z-10">
                            {[1, 2, 3].map(s => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${s <= stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Unit Title & Quick Action buttons */}
                      <div className="mt-3 text-center max-w-[180px]">
                        <div className="font-['Fredoka',sans-serif] text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
                          {unit.title}
                        </div>

                        {/* Direct Learn vs Play quick triggers for unlocked units */}
                        {isUnlocked && (
                          <div className="flex items-center justify-center gap-1.5 mt-1.5">
                            <button
                              onClick={() => {
                                sounds.playClick();
                                onSelectUnit(unit, 'interactive');
                              }}
                              title="Learn interactive graphic lesson"
                              className="px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-[10px] font-black border border-pink-200 flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                            >
                              <span className="text-xs">💡</span>
                              <span>Lesson</span>
                            </button>
                            <button
                              onClick={() => {
                                sounds.playClick();
                                onSelectUnit(unit, 'quiz');
                              }}
                              title="Play 4-option quiz"
                              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                            >
                              <Play className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                              <span>Quiz</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* World Bonus Chest */}
                <div className="pt-2 flex flex-col items-center">
                  <button
                    onClick={() => handleChestClick(world.id)}
                    className={`relative p-3.5 sm:p-4 rounded-3xl border-3 flex flex-col items-center gap-1 transition-all cursor-pointer active:scale-95 ${
                      isChestOpened
                        ? 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-500 shadow-md hover:scale-105 animate-pulse text-amber-950'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl">
                      {isChestOpened ? '📦' : '🎁'}
                    </span>
                    <span className="font-['Fredoka',sans-serif] text-xs font-bold flex items-center gap-1">
                      {isChestOpened ? (
                        'Chest Claimed!'
                      ) : (
                        <>
                          <span>Reward Chest (+50</span>
                          <span>🍬)</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final 75-Questions Marathon Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-6 text-white text-center space-y-4 shadow-xl border-4 border-indigo-400">
        <div className="text-4xl">🏆</div>
        <div>
          <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold">
            Grand 75-Question Marathon
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 font-semibold max-w-md mx-auto mt-1">
            Ready to prove you're the ultimate historian? Test all Civil War & Reconstruction questions in a single challenge.
          </p>
        </div>
        <button
          onClick={() => {
            sounds.playClick();
            onOpenMarathon();
          }}
          className="py-3 px-8 rounded-2xl bg-amber-400 hover:bg-amber-300 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 text-amber-950 font-['Fredoka',sans-serif] font-bold text-base shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Start Mega Challenge</span>
          <span>⚡</span>
        </button>
      </div>

      {/* Grand Official Graduation Diploma Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 p-6 text-amber-950 text-center space-y-4 shadow-2xl border-4 border-amber-600 relative overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="absolute top-2 left-3 text-3xl opacity-30 select-none">🏛️</div>
        <div className="absolute top-2 right-3 text-3xl opacity-30 select-none">🦅</div>
        <div className="text-5xl animate-bounce">🎓</div>
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-amber-900/10 text-amber-900 text-xs font-black uppercase tracking-wider mb-1">
            Reconocimiento Académico Oficial • Footprints
          </div>
          <h3 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-extrabold text-amber-950">
            ¡Tu Diploma de Honor y Graduación!
          </h3>
          <p className="text-xs sm:text-sm text-amber-900 font-medium max-w-lg mx-auto mt-1">
            Obtén tu diploma oficial con sello dorado, estadísticas históricas, firma del director y listo para imprimir o guardar en PDF.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-amber-900">
          <span className="px-2.5 py-1 rounded-xl bg-white/70 border border-amber-400">📜 Con Sellos Oficiales</span>
          <span className="px-2.5 py-1 rounded-xl bg-white/70 border border-amber-400">🎨 A Todo Color</span>
          <span className="px-2.5 py-1 rounded-xl bg-white/70 border border-amber-400">🖨️ Imprimible en PDF</span>
        </div>

        <div>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDiploma();
            }}
            className="py-3.5 px-8 rounded-2xl bg-amber-900 hover:bg-amber-950 text-amber-100 border-b-4 border-black active:border-b-0 active:translate-y-1 font-['Fredoka',sans-serif] font-bold text-base shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5"
          >
            <span className="text-xl">📜</span>
            <span>Ver y Descargar Mi Diploma Oficial</span>
            <span className="text-xl">✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
