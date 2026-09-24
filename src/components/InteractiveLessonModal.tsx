import React, { useState, useEffect } from 'react';
import { Unit } from '../types';
import { INITIAL_LESSON_SLIDES } from '../data/lessonSlidesData';
import { sounds, speakEnglish, stopEnglishSpeech } from '../utils/audio';
import { Mascot } from './Mascot';
import {
  Volume2,
  VolumeX,
  X,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Play,
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveLessonModalProps {
  unit: Unit;
  currentAvatar: string;
  onClose: () => void;
  onStartQuiz: () => void;
  onFinishLesson: (unitId: number, confitesEarned: number) => void;
}

export const InteractiveLessonModal: React.FC<InteractiveLessonModalProps> = ({
  unit,
  currentAvatar,
  onClose,
  onStartQuiz,
  onFinishLesson
}) => {
  const slides = INITIAL_LESSON_SLIDES[unit.id] || [
    {
      id: `default-${unit.id}-1`,
      title: unit.title,
      conceptEn: unit.description,
      imageEmoji: unit.emoji,
      graphicType: 'compare' as const,
      details: {
        highlight: unit.graphic.title,
        points: unit.keyPoints,
        chartItems: unit.graphic.visualData?.map(v => ({
          label: v.label,
          value: String(v.value),
          color: v.color || 'bg-emerald-500',
          icon: v.icon || '📌'
        }))
      }
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedMiniOption, setSelectedMiniOption] = useState<number | null>(null);
  const [miniFeedback, setMiniFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentSlide = slides[currentSlideIndex];
  const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;
  const hasInteractiveTask = Boolean(currentSlide.details.interactiveTask);
  const isTaskSolved = hasInteractiveTask ? miniFeedback?.isCorrect === true : true;

  // Speak slide when slide changes
  useEffect(() => {
    setSelectedMiniOption(null);
    setMiniFeedback(null);
    speakSlide();

    return () => {
      stopEnglishSpeech();
    };
  }, [currentSlideIndex]);

  const speakSlide = () => {
    setIsSpeaking(true);
    const textToSpeak = `${currentSlide.title}. ${currentSlide.conceptEn}`;
    speakEnglish(textToSpeak, () => {
      setIsSpeaking(false);
    });
  };

  const handleToggleAudio = () => {
    if (isSpeaking) {
      stopEnglishSpeech();
      setIsSpeaking(false);
    } else {
      speakSlide();
    }
  };

  const handleSelectMiniOption = (optIndex: number) => {
    if (!currentSlide.details.interactiveTask) return;
    const opt = currentSlide.details.interactiveTask.options[optIndex];
    setSelectedMiniOption(optIndex);

    if (opt.isCorrect) {
      sounds.playCorrect();
      setMiniFeedback({ isCorrect: true, text: opt.feedback });
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        colors: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899']
      });
    } else {
      sounds.playWrong();
      setMiniFeedback({ isCorrect: false, text: opt.feedback });
    }
  };

  const handleNextSlide = () => {
    stopEnglishSpeech();
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      // Completed all slides
      setIsCompleted(true);
      sounds.playFanfare();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#f43f5e', '#fbbf24', '#10b981', '#38bdf8']
      });
      onFinishLesson(unit.id, 20); // Award +20 Confites!
    }
  };

  const handlePrevSlide = () => {
    stopEnglishSpeech();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleClose = () => {
    stopEnglishSpeech();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-emerald-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 max-w-xs bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio speaker toggle */}
            <button
              onClick={handleToggleAudio}
              className={`p-2 rounded-xl transition-all ${
                isSpeaking
                  ? 'bg-amber-400 text-amber-950 animate-pulse shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Listen in English"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        {/* Lesson Body */}
        {!isCompleted ? (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
            {/* Slide Header */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center text-3xl shadow-md border-2 border-white shrink-0">
                {currentSlide.imageEmoji}
              </div>
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider mb-1">
                  <span>Step {currentSlideIndex + 1} of {slides.length}</span>
                  <span>•</span>
                  <span>Unit {unit.number}</span>
                </div>
                <h3 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                  {currentSlide.title}
                </h3>
              </div>
            </div>

            {/* Concept Explanation Card */}
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-900 uppercase">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Key Concept in English</span>
              </div>
              <p className="text-sm sm:text-base font-bold text-amber-950 leading-relaxed">
                "{currentSlide.conceptEn}"
              </p>
            </div>

            {/* Illustrated Visual Elements */}
            {currentSlide.details.chartItems && currentSlide.details.chartItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {currentSlide.details.chartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xl">{item.icon}</span>
                      <span className={`text-[10px] font-black text-white px-2 py-0.5 rounded-full ${item.color}`}>
                        {item.label}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-800 mt-1">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bullet points */}
            {currentSlide.details.points && (
              <div className="space-y-1.5">
                {currentSlide.details.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Mini-Task (Toca para comprobar) */}
            {hasInteractiveTask && currentSlide.details.interactiveTask && (
              <div className="p-4 rounded-2xl bg-indigo-50 border-2 border-indigo-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-indigo-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>{currentSlide.details.interactiveTask.instruction}</span>
                </div>

                <div className="space-y-2">
                  {currentSlide.details.interactiveTask.options.map((opt, optIdx) => {
                    const isSelected = selectedMiniOption === optIdx;

                    let btnStyle = 'bg-white border-slate-200 hover:border-indigo-400 text-slate-700';
                    if (isSelected) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-300';
                      } else {
                        btnStyle = 'bg-rose-50 border-rose-400 text-rose-800 ring-2 ring-rose-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectMiniOption(optIdx)}
                        className={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-2 shadow-2xs ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && (
                          opt.isCorrect ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )
                        )}
                      </button>
                    );
                  })}
                </div>

                {miniFeedback && (
                  <div
                    className={`p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      miniFeedback.isCorrect
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-rose-100 text-rose-900'
                    }`}
                  >
                    <span>{miniFeedback.isCorrect ? '🎉' : '🤔'}</span>
                    <span>{miniFeedback.text}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Finished Slide Celebration */
          <div className="p-6 sm:p-8 text-center space-y-6 flex-1 overflow-y-auto">
            <div className="flex justify-center">
              <Mascot mood="cheering" size="lg" avatarId={currentAvatar} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-black uppercase tracking-wider mb-2">
                <span>🍬</span>
                <span>Lesson Completed Successfully!</span>
              </div>
              <h3 className="font-['Fredoka',sans-serif] text-2xl sm:text-3xl font-bold text-slate-800">
                You Learned {unit.title}!
              </h3>
              <p className="text-sm font-semibold text-slate-500 max-w-md mx-auto mt-1">
                You completed all interactive learning steps. Now you are fully prepared to conquer the 4-question quiz!
              </p>
            </div>

            {/* Candies earned reward banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border-2 border-pink-200 max-w-sm mx-auto shadow-sm">
              <div className="text-xs font-extrabold text-pink-700 uppercase">
                Reward Earned
              </div>
              <div className="text-3xl font-black text-pink-600 font-['Fredoka',sans-serif] my-1 flex items-center justify-center gap-1.5">
                <span>🍬</span>
                <span>+20 Sweet Candies</span>
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Use them in the shop to customize your avatar and themes!
              </div>
            </div>

            {/* Next Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
              >
                Back to Map
              </button>
              <button
                onClick={() => {
                  stopEnglishSpeech();
                  onStartQuiz();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 text-white font-['Fredoka',sans-serif] font-bold text-base shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Start Quiz Now!</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        {!isCompleted && (
          <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              disabled={currentSlideIndex === 0}
              onClick={handlePrevSlide}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1 transition-colors ${
                currentSlideIndex === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              disabled={!isTaskSolved}
              onClick={handleNextSlide}
              className={`px-6 py-2.5 rounded-xl font-['Fredoka',sans-serif] font-bold text-sm text-white border-b-3 transition-all flex items-center gap-1.5 ${
                !isTaskSolved
                  ? 'bg-slate-300 border-slate-400 cursor-not-allowed text-slate-500'
                  : 'bg-emerald-500 hover:bg-emerald-400 border-emerald-700 active:border-b-0 active:translate-y-1 shadow-sm cursor-pointer'
              }`}
            >
              <span>{currentSlideIndex === slides.length - 1 ? 'Finish Lesson!' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
