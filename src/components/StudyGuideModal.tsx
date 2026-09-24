import React, { useState } from 'react';
import { Unit } from '../types';
import { UNITS, ALL_QUESTIONS } from '../data/historyData';
import { sounds, speakEnglish } from '../utils/audio';
import { X, Search, BookOpen, Volume2, Play, Sparkles } from 'lucide-react';

interface StudyGuideModalProps {
  onClose: () => void;
  onSelectUnit: (unit: Unit, mode: 'learn' | 'quiz' | 'interactive') => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({
  onClose,
  onSelectUnit
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUnits = UNITS.filter(u =>
    u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border-4 border-slate-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              📖
            </div>
            <div>
              <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold">
                Complete Study Guide
              </h2>
              <p className="text-xs text-amber-100 font-semibold">
                All 24 units with visual charts, native English voice, and key takeaways
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topic (e.g. Lincoln, Gettysburg, Tubman, Vicksburg)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-amber-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Units Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUnits.map((unit) => {
            const questionCount = unit.questionIds.length;

            return (
              <div
                key={unit.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-4 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{unit.emoji}</span>
                      <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Unit #{unit.number}
                      </span>
                    </div>
                    <button
                      onClick={() => speakEnglish(`${unit.title}. ${unit.description}`)}
                      className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors cursor-pointer"
                      title="Listen in English"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-['Fredoka',sans-serif] text-base font-bold text-slate-800 leading-tight">
                    {unit.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {unit.description}
                  </p>

                  {/* Graphic hint */}
                  <div className="mt-2 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>{unit.graphic.title}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-400">
                    {questionCount} questions
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectUnit(unit, 'interactive');
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold border border-pink-200 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>💡</span>
                      <span>Lesson</span>
                    </button>
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectUnit(unit, 'quiz');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Quiz</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
