import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Question, Unit, UserProgress } from '../types';
import { sounds, speakEnglish, stopEnglishSpeech } from '../utils/audio';
import { Mascot } from './Mascot';
import {
  Volume2,
  Heart,
  X,
  Check,
  AlertCircle,
  Sparkles,
  Flame,
  Star,
  Languages,
  ArrowRight
} from 'lucide-react';

interface QuizModalProps {
  unit: Unit;
  questions: Question[];
  progress: UserProgress;
  onClose: () => void;
  onComplete: (unitId: number, stars: number, xpGained: number, confitesGained: number, correctQIds: number[]) => void;
  onDeductHeart: () => void;
  onRefillHearts: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  unit,
  questions,
  progress,
  onClose,
  onComplete,
  onDeductHeart,
  onRefillHearts
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [correctQuestionIds, setCorrectQuestionIds] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [heartShake, setHeartShake] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAdvancedThisQuestionRef = useRef<boolean>(false);
  const scoreRef = useRef<number>(0);
  const correctIdsRef = useRef<number[]>([]);

  const currentQ = questions && questions.length > 0 ? questions[currentIndex] : undefined;
  const progressPercent = questions && questions.length > 0 ? (currentIndex / questions.length) * 100 : 0;
  const isLastQuestion = questions && questions.length > 0 ? currentIndex >= questions.length - 1 : true;

  // Auto-speak question in English on new question
  useEffect(() => {
    hasAdvancedThisQuestionRef.current = false;
    if (currentQ && !isFinished) {
      setSelectedOption(null);
      setIsChecked(false);

      sounds.playClick();
      handleSpeakQuestion(currentQ.question);
    }
    return () => {
      stopEnglishSpeech();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, isFinished, currentQ]);

  const handleSpeakQuestion = (text: string, callback?: () => void) => {
    setIsSpeaking(true);
    speakEnglish(text, () => {
      setIsSpeaking(false);
      if (callback) callback();
    });
  };

  const handleSpeakOption = (e: React.MouseEvent, optionText: string) => {
    e.stopPropagation();
    handleSpeakQuestion(optionText);
  };

  const finishQuiz = () => {
    setIsFinished(true);
    sounds.playFanfare();

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#58cc02', '#ff9600', '#1cb0f6', '#ff4b4b', '#ffd900']
    });

    const finalCorrect = scoreRef.current;
    const ratio = questions && questions.length > 0 ? finalCorrect / questions.length : 1;
    const stars = ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : 1;
    const xpGained = finalCorrect * 15;
    const confitesGained = 25;

    onComplete(unit.id, stars, xpGained, confitesGained, correctIdsRef.current);
  };

  const executeAdvance = () => {
    if (hasAdvancedThisQuestionRef.current) return;
    hasAdvancedThisQuestionRef.current = true;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    stopEnglishSpeech();
    setIsSpeaking(false);

    if (currentIndex >= questions.length - 1) {
      finishQuiz();
    } else {
      setCurrentIndex(prev => {
        const next = prev + 1;
        if (next >= questions.length) {
          finishQuiz();
          return prev;
        }
        return next;
      });
    }
  };

  // Instant answer evaluation upon option tap
  const handleSelectOption = (idx: number) => {
    if (!currentQ || isChecked || hasAdvancedThisQuestionRef.current) return;

    setSelectedOption(idx);
    setIsChecked(true);

    const correct = idx === currentQ.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      scoreRef.current += 1;
      setCorrectCount(scoreRef.current);
      if (!correctIdsRef.current.includes(currentQ.id)) {
        correctIdsRef.current.push(currentQ.id);
        setCorrectQuestionIds([...correctIdsRef.current]);
      }

      // Cheerful confetti burst
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899']
      });

      // Direct speech feedback in English, then auto-advance
      setIsSpeaking(true);
      speakEnglish("Correct! Great job!", () => {
        setIsSpeaking(false);
        timerRef.current = setTimeout(() => {
          executeAdvance();
        }, 500);
      });

      // Safety fallback timer if speech doesn't fire callback
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        executeAdvance();
      }, 3000);
    } else {
      sounds.playWrong();
      onDeductHeart();
      setHeartShake(true);
      setTimeout(() => setHeartShake(false), 600);

      const correctText = currentQ.options?.[currentQ.correctIndex] || '';
      const explanation = currentQ.explanation || '';
      const spokenFeedback = `Incorrect. The correct answer is: ${correctText}. ${explanation}`;

      setIsSpeaking(true);
      // Speak the correct answer and full explanation, and only advance once finished
      speakEnglish(spokenFeedback, () => {
        setIsSpeaking(false);
        // Comfortable pause after finished explaining before passing to the next question
        timerRef.current = setTimeout(() => {
          executeAdvance();
        }, 800);
      });

      // Safety fallback timer ONLY in case speech is unavailable or frozen
      const wordCount = spokenFeedback.split(/\s+/).length;
      const safetyTimeoutMs = Math.max(16000, wordCount * 650 + 5000);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        executeAdvance();
      }, safetyTimeoutMs);
    }
  };

  const handleManualNext = () => {
    executeAdvance();
  };

  const handleQuit = () => {
    stopEnglishSpeech();
    if (timerRef.current) clearTimeout(timerRef.current);
    onClose();
  };

  // Out of hearts state
  if (progress.hearts <= 0 && !isFinished) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl border-4 border-rose-200 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-4xl animate-bounce">
            💔
          </div>
          <div>
            <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-slate-800">
              You ran out of hearts!
            </h3>
            <p className="text-sm text-slate-500 font-semibold mt-1">
              Don't worry, great historians learn from every attempt!
            </p>
          </div>
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                onRefillHearts();
                sounds.playCorrect();
              }}
              className="py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-700 text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Refill Hearts (+5 ❤️)</span>
            </button>
            <button
              onClick={handleQuit}
              className="py-2.5 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              Back to Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Finished Celebration Screen
  if (isFinished) {
    const finalScore = scoreRef.current;
    const ratio = questions.length > 0 ? finalScore / questions.length : 1;
    const stars = ratio >= 0.75 ? 3 : ratio >= 0.5 ? 2 : 1;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border-4 border-emerald-100 animate-in zoom-in-95 duration-300">
          {/* Animated Mascot celebrating */}
          <div className="flex justify-center">
            <Mascot mood="cheering" size="lg" avatarId={progress.currentAvatar} />
          </div>

          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
              Unit Completed!
            </div>
            <h2 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-slate-800">
              {unit.title}
            </h2>
            <p className="text-slate-500 font-semibold text-sm mt-1">
              You answered {finalScore} of {questions.length} questions correctly.
            </p>
          </div>

          {/* Stars display */}
          <div className="flex justify-center items-center gap-3">
            {[1, 2, 3].map((starIdx) => (
              <div
                key={starIdx}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border-2 transform transition-all duration-300 ${
                  starIdx <= stars
                    ? 'bg-amber-400 border-amber-500 text-white scale-110 rotate-3'
                    : 'bg-slate-100 border-slate-200 text-slate-300'
                }`}
              >
                <Star className={`w-8 h-8 ${starIdx <= stars ? 'fill-white' : ''}`} />
              </div>
            ))}
          </div>

          {/* Rewards gained stats banner */}
          <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-400">XP Earned</div>
              <div className="text-lg font-extrabold text-indigo-600 flex items-center justify-center gap-1">
                <span>⭐</span>
                <span>+{finalScore * 15}</span>
              </div>
            </div>
            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-400">Candies</div>
              <div className="text-lg font-extrabold text-pink-600 flex items-center justify-center gap-1">
                <span>🍬</span>
                <span>+25</span>
              </div>
            </div>
            <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-400">Streak</div>
              <div className="text-lg font-extrabold text-orange-500 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 fill-orange-500 inline" />
                <span>+1</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleQuit}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-700 text-white font-['Fredoka',sans-serif] font-bold text-lg shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2"
          >
            <span>Continue to Map</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Guard against missing or out-of-range questions
  if (!questions || questions.length === 0 || (!currentQ && !isFinished)) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border-4 border-slate-100">
          <p className="text-base font-bold text-slate-800">Unit Quiz</p>
          <p className="text-xs text-slate-500">No questions available or quiz completed.</p>
          <button
            onClick={handleQuit}
            className="py-2.5 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-sm cursor-pointer hover:bg-indigo-500"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden select-none">
      {/* Top Header & Duolingo Progress Bar */}
      <div className="px-4 py-3 sm:py-4 border-b border-slate-200 max-w-4xl w-full mx-auto flex items-center gap-3 sm:gap-4 shrink-0">
        <button
          onClick={handleQuit}
          className="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          title="Exit Quiz"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress Track */}
        <div className="flex-1 bg-slate-200 h-4 rounded-full overflow-hidden p-0.5 shadow-inner">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-400 relative"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          >
            <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/40 rounded-full" />
          </div>
        </div>

        {/* Hearts indicator */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-sm ${
            heartShake ? 'animate-bounce text-rose-700 scale-110' : ''
          }`}
        >
          <Heart className="w-4 h-4 fill-rose-500" />
          <span>{progress.hearts}</span>
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl w-full mx-auto flex flex-col justify-center">
        <div className="space-y-6">
          {/* Question Tag & Unit */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {currentQ?.category || unit.title || 'History'} • Question {currentIndex + 1} of {questions.length}
            </span>
          </div>

          {/* Question Text with Friendly Voice Button */}
          <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50 border-2 border-slate-200">
            {/* Audio Button */}
            <button
              onClick={() => currentQ && handleSpeakQuestion(currentQ.question)}
              className={`p-3 rounded-2xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0 ${
                isSpeaking
                  ? 'bg-amber-400 text-amber-950 ring-4 ring-amber-200 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
              title="Listen in English"
            >
              <Volume2 className="w-6 h-6" />
            </button>

            <div className="flex-1 space-y-1">
              <h3 className="font-['Fredoka',sans-serif] text-lg sm:text-2xl font-bold text-slate-800 leading-snug">
                {currentQ?.question}
              </h3>
            </div>

            <div className="hidden sm:block shrink-0">
              <Mascot
                mood={isChecked ? (isCorrect ? 'happy' : 'thinking') : (isSpeaking ? 'talking' : 'cheering')}
                size="sm"
                avatarId={progress.currentAvatar}
              />
            </div>
          </div>

          {/* 4 Answers Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(currentQ?.options || []).map((option, idx) => {
              const isSelected = selectedOption === idx;
              const letter = ['A', 'B', 'C', 'D'][idx];

              // Duolingo dynamic styles
              let buttonStyles = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50';

              if (isChecked) {
                if (idx === currentQ?.correctIndex) {
                  buttonStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  buttonStyles = 'bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300';
                } else {
                  buttonStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isChecked}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-3.5 sm:p-4 rounded-2xl border-2 sm:border-3 text-left font-['Nunito',sans-serif] font-bold text-sm sm:text-base transition-all duration-150 relative flex items-center justify-between gap-3 group active:translate-y-0.5 cursor-pointer shadow-xs ${buttonStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 border ${
                        isChecked && idx === currentQ?.correctIndex
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : isSelected && !isCorrect
                          ? 'bg-rose-500 text-white border-rose-600'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {/* Individual option speech icon */}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => handleSpeakOption(e, option)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSpeakOption(e as unknown as React.MouseEvent, option);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 shrink-0 transition-colors opacity-70 group-hover:opacity-100 cursor-pointer"
                    title="Pronounce option"
                  >
                    <Volume2 className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Drawer (Duolingo Iconic Feedback Bar) */}
      <div
        className={`p-4 sm:p-6 border-t-2 transition-all duration-200 ${
          isChecked
            ? isCorrect
              ? 'bg-[#d7ffb8] border-[#8ee000]'
              : 'bg-[#ffdfe0] border-[#ff7070]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {isChecked ? (
            <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {isCorrect ? (
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <AlertCircle className="w-7 h-7 stroke-[3]" />
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold ${
                      isCorrect ? 'text-emerald-900' : 'text-rose-900'
                    }`}
                  >
                    {isCorrect ? 'Correct! Great job! 🎉' : 'Almost! Keep going 💪'}
                  </h4>
                  {isCorrect && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-black">
                      +15 XP
                    </span>
                  )}
                </div>

                {!isCorrect ? (
                  <div className="space-y-1.5 mt-1">
                    <p className="text-xs sm:text-sm font-bold text-rose-950">
                      The correct answer is: <span className="underline font-black text-rose-900 bg-rose-200/60 px-1.5 py-0.5 rounded-md">{currentQ?.options?.[currentQ?.correctIndex ?? 0] || ''}</span>
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-rose-900 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-rose-200 shadow-2xs">
                      💡 {currentQ?.explanation || ''}
                    </p>
                    {isSpeaking && (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 animate-pulse pt-0.5">
                        <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                        <span>Explaining answer in English...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-0.5">
                    {currentQ?.funFact || currentQ?.explanation || ''}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tap any answer above — instant voice feedback will guide you!</span>
            </div>
          )}

          {/* Action Button */}
          <div className="w-full sm:w-auto">
            {isChecked && (
              <button
                onClick={handleManualNext}
                className={`w-full sm:w-48 py-3.5 px-6 rounded-2xl font-['Fredoka',sans-serif] font-bold text-base text-white border-b-4 active:border-b-0 active:translate-y-1 shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 ${
                  isCorrect
                    ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-800'
                    : 'bg-rose-500 hover:bg-rose-400 border-rose-700'
                }`}
              >
                <span>{isLastQuestion ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
