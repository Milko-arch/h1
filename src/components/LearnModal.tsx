import React, { useState } from 'react';
import { Unit } from '../types';
import { ALL_QUESTIONS } from '../data/historyData';
import { sounds, speakEnglish, stopEnglishSpeech } from '../utils/audio';
import { Volume2, VolumeX, X, Play, BookOpen, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Mascot } from './Mascot';

interface LearnModalProps {
  unit: Unit;
  onClose: () => void;
  onStartQuiz: () => void;
  currentAvatar: string;
}

export const LearnModal: React.FC<LearnModalProps> = ({
  unit,
  onClose,
  onStartQuiz,
  currentAvatar
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'questions'>('visual');

  const unitQuestions = ALL_QUESTIONS.filter(q => unit.questionIds.includes(q.id));

  const handleSpeakLesson = () => {
    if (isSpeaking) {
      stopEnglishSpeech();
      setIsSpeaking(false);
      return;
    }

    sounds.playClick();
    setIsSpeaking(true);

    const speechScript = `Unit ${unit.number}: ${unit.title}. ${unit.description}. Key facts: ${unit.keyPoints.join('. ')}`;
    speakEnglish(speechScript, () => {
      setIsSpeaking(false);
    });
  };

  const handleClose = () => {
    stopEnglishSpeech();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header with vibrant unit gradient */}
        <div className={`p-4 sm:p-6 bg-gradient-to-r ${unit.color} text-white relative`}>
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 sm:gap-4 pr-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-white/30 shrink-0">
              {unit.emoji}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/25 text-xs font-black uppercase tracking-wider text-white mb-1">
                <span>Unit {unit.number}</span>
                <span>•</span>
                <span>{unitQuestions.length} Questions</span>
              </div>
              <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold leading-tight">
                {unit.title}
              </h2>
            </div>
          </div>

          {/* Quick Voice Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/20">
            <button
              onClick={handleSpeakLesson}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-amber-950 animate-pulse'
                  : 'bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-900" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>Listen in English</span>
                </>
              )}
            </button>

            {/* Tab switch */}
            <div className="flex items-center gap-1 bg-black/20 p-0.5 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'visual' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Visual & Highlights
              </button>
              <button
                onClick={() => setActiveTab('questions')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'questions' ? 'bg-white text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Questions ({unitQuestions.length})
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'visual' ? (
            <>
              {/* Mascot Bubble Explanation */}
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200">
                <Mascot mood={isSpeaking ? 'talking' : 'happy'} size="sm" avatarId={currentAvatar} className="shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    Hello Young Historian!
                  </div>
                  <p className="text-sm font-semibold text-amber-950 mt-0.5 leading-snug">
                    {unit.description}
                  </p>
                </div>
              </div>

              {/* Graphical Visual Diagram Component */}
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="font-['Fredoka',sans-serif] text-base font-bold text-slate-800">
                    {unit.graphic.title}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium ml-auto">
                    {unit.graphic.description}
                  </span>
                </div>

                {/* Visual Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {unit.graphic.visualData?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{item.icon || '📌'}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white ${item.color || 'bg-slate-700'}`}>
                          {item.label}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-800 leading-tight">
                          {item.value}
                        </div>
                        {item.sublabel && (
                          <div className="text-xs font-medium text-slate-500 mt-0.5">
                            {item.sublabel}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Teaching Points */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Key Points for Today:</span>
                </h4>
                <div className="space-y-2">
                  {unit.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-xs sm:text-sm font-semibold"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Questions preview tab */
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-600" />
                <span>Questions you will face in the Quiz:</span>
              </div>
              <div className="space-y-3">
                {unitQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                        Question #{q.questionNumber}
                      </span>
                      <button
                        onClick={() => speakEnglish(q.question)}
                        className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Listen in English"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      {q.question}
                    </p>
                    <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 inline-block">
                      ✓ {q.options[q.correctIndex]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Big Duolingo-style action button */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t-2 border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2.5 rounded-2xl border-2 border-slate-300 font-bold text-xs sm:text-sm text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Back to Map
          </button>

          <button
            onClick={() => {
              stopEnglishSpeech();
              onStartQuiz();
            }}
            className="flex-1 max-w-sm flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-['Fredoka',sans-serif] font-bold text-base sm:text-lg text-white bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 border-b-4 border-emerald-700 active:border-b-0 shadow-md transition-all cursor-pointer"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Play Quiz Now!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
