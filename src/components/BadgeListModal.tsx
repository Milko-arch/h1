import React from 'react';
import { UserProgress } from '../types';
import { BADGES } from '../data/historyData';
import { X, Trophy, Lock, CheckCircle, Sparkles } from 'lucide-react';

interface BadgeListModalProps {
  progress: UserProgress;
  onClose: () => void;
}

export const BadgeListModal: React.FC<BadgeListModalProps> = ({
  progress,
  onClose
}) => {
  const totalQuestions = 75;
  const answeredCount = progress.completedQuestions.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
              🏆
            </div>
            <div>
              <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold">
                Your Badges & Achievements
              </h2>
              <p className="text-xs text-purple-200 font-semibold">
                Showcase your American history mastery!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Progress summary */}
        <div className="p-4 bg-purple-50/70 border-b border-purple-100 flex items-center justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-purple-900">
              <span>Mastered Questions Progress</span>
              <span>{answeredCount} / {totalQuestions}</span>
            </div>
            <div className="w-full bg-purple-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-extrabold text-purple-700 font-['Fredoka',sans-serif]">
              {Math.round((answeredCount / totalQuestions) * 100)}%
            </div>
            <div className="text-[10px] font-bold text-purple-500 uppercase">
              Completed
            </div>
          </div>
        </div>

        {/* Badges List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BADGES.map((badge) => {
              const unlocked = badge.check(progress);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                    unlocked
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-2xs border-2 ${
                      unlocked
                        ? 'bg-gradient-to-tr from-amber-300 to-yellow-200 border-amber-400'
                        : 'bg-slate-200 border-slate-300 text-slate-400 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-['Fredoka',sans-serif] font-bold text-sm text-slate-800">
                        {badge.title}
                      </h4>
                      {unlocked ? (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                      {badge.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
