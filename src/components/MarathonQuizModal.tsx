import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ALL_QUESTIONS } from '../data/historyData';
import { Question } from '../types';
import { sounds, speakEnglish, stopEnglishSpeech } from '../utils/audio';
import { Mascot } from './Mascot';
import { Volume2, X, Check, AlertCircle, Trophy, Sparkles, RefreshCw, Languages, ArrowRight } from 'lucide-react';

interface MarathonQuizModalProps {
  onClose: () => void;
  currentAvatar: string;
  onReward: (xp: number, confites: number) => void;
  onOpenDiploma?: () => void;
}

export const MarathonQuizModal: React.FC<MarathonQuizModalProps> = ({
  onClose,
  currentAvatar,
  onReward,
  onOpenDiploma
}) => {
  const [, setQuestionCount] = useState<number>(15);
  const [isStarted, setIsStarted] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasAdvancedThisQuestionRef = useRef<boolean>(false);
  const scoreRef = useRef<number>(0);

  const startQuiz = (count: number) => {
    sounds.playClick();
    setQuestionCount(count);

    // Shuffle and slice questions
    const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    const selected = count >= 75 ? shuffled : shuffled.slice(0, count);

    setActiveQuestions(selected);
    setCurrentIndex(0);
    scoreRef.current = 0;
    setScore(0);
    setIsFinished(false);
    setIsChecked(false);
    setSelectedOption(null);
    hasAdvancedThisQuestionRef.current = false;
    setIsStarted(true);
  };

  const currentQ = activeQuestions && activeQuestions.length > 0 ? activeQuestions[currentIndex] : undefined;

  useEffect(() => {
    hasAdvancedThisQuestionRef.current = false;
    if (isStarted && currentQ && !isFinished) {
      setSelectedOption(null);
      setIsChecked(false);
      setIsSpeaking(true);
      speakEnglish(currentQ.question, () => setIsSpeaking(false));
    }
    return () => {
      stopEnglishSpeech();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, isStarted, isFinished, currentQ]);

  const executeAdvance = () => {
    if (hasAdvancedThisQuestionRef.current) return;
    hasAdvancedThisQuestionRef.current = true;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    stopEnglishSpeech();
    setIsSpeaking(false);

    if (currentIndex >= activeQuestions.length - 1) {
      // Completed marathon
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onReward(scoreRef.current * 10, 30);
    } else {
      setCurrentIndex(prev => {
        const next = prev + 1;
        if (next >= activeQuestions.length) {
          setIsFinished(true);
          sounds.playFanfare();
          onReward(scoreRef.current * 10, 30);
          return prev;
        }
        return next;
      });
    }
  };

  // Instant evaluation when user taps an answer option
  const handleSelectOption = (idx: number) => {
    if (!currentQ || isChecked || hasAdvancedThisQuestionRef.current) return;

    setSelectedOption(idx);
    setIsChecked(true);

    const correct = idx === currentQ.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      scoreRef.current += 1;
      setScore(scoreRef.current);
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 }
      });

      // Direct spoken confirmation, then advance
      setIsSpeaking(true);
      speakEnglish("Correct! Great job!", () => {
        setIsSpeaking(false);
        timerRef.current = setTimeout(() => {
          executeAdvance();
        }, 500);
      });

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        executeAdvance();
      }, 3000);
    } else {
      sounds.playWrong();
      const correctText = currentQ.options?.[currentQ.correctIndex] || '';
      const explanation = currentQ.explanation || '';
      const spokenFeedback = `Incorrect. The correct answer is: ${correctText}. ${explanation}`;

      setIsSpeaking(true);
      // Spoken correct answer and full explanation, advancing only when finished
      speakEnglish(spokenFeedback, () => {
        setIsSpeaking(false);
        timerRef.current = setTimeout(() => {
          executeAdvance();
        }, 800);
      });

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

  const handleClose = () => {
    stopEnglishSpeech();
    if (timerRef.current) clearTimeout(timerRef.current);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⚡</span>
            <div>
              <h2 className="font-['Fredoka',sans-serif] text-xl font-bold">
                Mega History Challenge (75 Qs)
              </h2>
              <p className="text-xs text-purple-200 font-semibold">
                Civil War & Reconstruction Quiz
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isStarted ? (
          <div className="p-6 sm:p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="flex justify-center">
              <Mascot mood="cheering" size="lg" avatarId={currentAvatar} />
            </div>
            <div>
              <h3 className="font-['Fredoka',sans-serif] text-2xl font-bold text-slate-800">
                Choose how many questions you want to solve!
              </h3>
              <p className="text-sm text-slate-500 font-semibold max-w-md mx-auto mt-1">
                Every question features native English audio, instant evaluation, and clear explanations.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
              {[
                { count: 10, label: '10 Questions', tag: 'Quick', color: 'bg-emerald-500' },
                { count: 25, label: '25 Questions', tag: 'Standard', color: 'bg-blue-500' },
                { count: 50, label: '50 Questions', tag: 'Expert', color: 'bg-indigo-500' },
                { count: 75, label: 'All (75)', tag: 'Grand Marathon', color: 'bg-amber-500' }
              ].map(opt => (
                <button
                  key={opt.count}
                  onClick={() => startQuiz(opt.count)}
                  className="p-4 rounded-2xl border-2 border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-purple-50 text-slate-800 transition-all cursor-pointer flex flex-col items-center gap-1 active:scale-95 shadow-xs"
                >
                  <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full ${opt.color}`}>
                    {opt.tag}
                  </span>
                  <span className="font-['Fredoka',sans-serif] text-lg font-bold">
                    {opt.count}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    Questions
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : isFinished ? (
          <div className="p-6 sm:p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-4xl shadow-md">
              <Trophy className="w-10 h-10 text-amber-600" />
            </div>
            <div>
              <h3 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-slate-800">
                Great Job!
              </h3>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                You completed the {activeQuestions.length}-Question Challenge.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-sm mx-auto">
              <div className="text-sm font-bold text-slate-500">Final Score</div>
              <div className="text-4xl font-extrabold text-emerald-600 font-['Fredoka',sans-serif] my-1">
                {score} / {activeQuestions.length}
              </div>
              <div className="text-xs font-bold text-slate-400">
                ({Math.round((score / activeQuestions.length) * 100)}% accuracy)
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenDiploma && (
                <button
                  onClick={() => {
                    handleClose();
                    onOpenDiploma();
                  }}
                  className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 text-amber-950 font-['Fredoka',sans-serif] font-bold text-base shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="text-xl">🎓</span>
                  <span>Ver Mi Diploma de Honor</span>
                </button>
              )}
              <button
                onClick={() => setIsStarted(false)}
                className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Choose Another Count</span>
              </button>
              <button
                onClick={handleClose}
                className="py-3 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white font-['Fredoka',sans-serif] font-bold text-base shadow-md transition-all cursor-pointer"
              >
                Back to Map
              </button>
            </div>
          </div>
        ) : !currentQ ? (
          <div className="p-6 text-center space-y-4 flex-1 flex flex-col justify-center items-center">
            <p className="font-bold text-slate-700">Quiz questions loading or challenge completed.</p>
            <button
              onClick={handleClose}
              className="py-2.5 px-6 rounded-2xl bg-indigo-600 text-white font-bold text-sm cursor-pointer hover:bg-indigo-500"
            >
              Back to Map
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Progress Bar & Counter */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                <span className="text-emerald-600">Correct: {score}</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / (activeQuestions.length || 1)) * 100}%` }}
                />
              </div>

              {/* Question Text & Audio */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => currentQ && speakEnglish(currentQ.question)}
                    className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 shadow-xs active:scale-95 cursor-pointer"
                    title="Listen in English"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                      #{currentQ?.questionNumber ?? (currentIndex + 1)} • {currentQ?.category || 'History'}
                    </span>
                    <h3 className="font-['Fredoka',sans-serif] text-base sm:text-lg font-bold text-slate-800 mt-1">
                      {currentQ?.question}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(currentQ?.options || []).map((opt, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = selectedOption === idx;

                  let style = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';
                  if (isChecked) {
                    if (idx === currentQ?.correctIndex) {
                      style = 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-300';
                    } else if (isSelected) {
                      style = 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-200';
                    } else {
                      style = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    style = 'bg-indigo-50 border-indigo-400 text-indigo-900';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isChecked}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-3 rounded-xl border-2 text-left font-bold text-xs sm:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-600">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </div>
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          speakEnglish(opt);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            speakEnglish(opt);
                          }
                        }}
                        className="text-slate-400 hover:text-indigo-600 p-1 cursor-pointer rounded-md hover:bg-indigo-50"
                        title="Pronounce option"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              {isChecked ? (
                <div className="flex-1 w-full text-xs font-bold">
                  {isCorrect ? (
                    <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Correct! Great job! 🎉</span>
                    </span>
                  ) : (
                    <div className="space-y-1.5 w-full">
                      <div className="text-rose-900 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>The correct answer is: <strong className="underline bg-rose-100 px-1 py-0.5 rounded">{currentQ?.options?.[currentQ?.correctIndex ?? 0] || ''}</strong></span>
                      </div>
                      <p className="text-xs font-medium text-rose-950 bg-rose-50 border border-rose-200 p-2 rounded-xl leading-relaxed">
                        💡 {currentQ?.explanation || ''}
                      </p>
                      {isSpeaking && (
                        <div className="flex items-center gap-1 text-[11px] font-bold text-rose-700 animate-pulse">
                          <Volume2 className="w-3 h-3 text-rose-600" />
                          <span>Explaining answer in English...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Tap any answer for instant voice evaluation</span>
                </div>
              )}

              {isChecked && (
                <button
                  onClick={handleManualNext}
                  className="py-2.5 px-5 rounded-xl font-['Fredoka',sans-serif] font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 border-b-3 border-indigo-800 shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>{currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Finish Marathon'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
