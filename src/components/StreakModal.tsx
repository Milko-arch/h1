import React from 'react';
import { UserProgress } from '../types';
import { sounds } from '../utils/audio';
import { X, Flame, Shield, Sparkles, Gift, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StreakModalProps {
  progress: UserProgress;
  onClose: () => void;
  onClaimReward: (confites: number) => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  progress,
  onClose,
  onClaimReward
}) => {
  const daysOfWeek = [
    { label: 'Mon', index: 0 },
    { label: 'Tue', index: 1 },
    { label: 'Wed', index: 2 },
    { label: 'Thu', index: 3 },
    { label: 'Fri', index: 4 },
    { label: 'Sat', index: 5 },
    { label: 'Sun', index: 6 }
  ];

  const milestones = [
    { days: 3, reward: 30, label: '3 Days of Fire', emoji: '🥉' },
    { days: 7, reward: 100, label: '7 Days Unstoppable', emoji: '🥈' },
    { days: 14, reward: 250, label: '14 Days Legendary Master', emoji: '🥇' }
  ];

  const handleClaim = (amount: number) => {
    sounds.playChest();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f97316', '#eab308', '#ef4444', '#ec4899']
    });
    onClaimReward(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-4 border-orange-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Big Flame with Pulse */}
          <div className="relative inline-block my-2">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto border-4 border-white/30 shadow-inner animate-pulse">
              <Flame className="w-16 h-16 text-yellow-200 fill-yellow-300" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-yellow-300 text-orange-950 font-black text-xs uppercase shadow-md whitespace-nowrap">
              Active Streak!
            </div>
          </div>

          <h2 className="font-['Fredoka',sans-serif] text-3xl font-bold mt-2">
            {progress.streak} {progress.streak === 1 ? 'Day Streak' : 'Day Streak'}
          </h2>
          <p className="text-orange-100 text-xs sm:text-sm font-semibold max-w-xs mx-auto mt-1">
            Practice every day on Footprints to keep your flame blazing and earn extra candies!
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Weekly calendar tracker */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Your Learning Week</span>
              </h3>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                Monday - Sunday
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              {daysOfWeek.map((day) => {
                const isActive = progress.streakHistory[day.index];

                return (
                  <div
                    key={day.label}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-t from-orange-500 to-amber-400 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase">
                      {day.label}
                    </span>
                    <div className="my-1 text-base sm:text-lg">
                      {isActive ? '🔥' : '⚪'}
                    </div>
                    {isActive ? (
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <span className="text-[9px] font-bold opacity-60">Ready</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Motivational Advice for 9-year-olds */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-['Fredoka',sans-serif] font-bold text-xs uppercase tracking-wide text-amber-900">
                Explorer Footy's Tip:
              </div>
              <p className="text-xs font-semibold text-amber-950 mt-0.5">
                Completing just 1 lesson or answering questions each day keeps your streak alive and unlocks reward chests!
              </p>
            </div>
          </div>

          {/* Streak Milestones */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-rose-500" />
              <span>Consistency Rewards</span>
            </h3>

            <div className="space-y-2">
              {milestones.map((m) => {
                const reached = progress.streak >= m.days;

                return (
                  <div
                    key={m.days}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 ${
                      reached
                        ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-300'
                        : 'bg-slate-50 border-slate-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{m.emoji}</span>
                      <div>
                        <div className="font-['Fredoka',sans-serif] text-sm font-bold text-slate-800">
                          {m.label}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold">
                          Goal: {m.days} consecutive days
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pink-100 text-pink-700 font-black text-xs border border-pink-200">
                        <span>🍬</span>
                        <span>+{m.reward}</span>
                      </div>
                      {reached && (
                        <button
                          onClick={() => handleClaim(m.reward)}
                          className="px-2.5 py-1 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
                        >
                          Claim
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Freeze Badge */}
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-sky-600" />
              <div>
                <div className="text-xs font-bold text-sky-900">
                  Streak Freeze (Shield)
                </div>
                <div className="text-[11px] text-sky-700 font-medium">
                  {progress.streakFreeze > 0
                    ? `You have ${progress.streakFreeze} active shield(s)`
                    : 'No active shields'}
                </div>
              </div>
            </div>
            <span className="text-xl">🧊</span>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 text-white font-['Fredoka',sans-serif] font-bold text-base shadow-md cursor-pointer transition-all"
          >
            Got It, Keep Learning!
          </button>
        </div>
      </div>
    </div>
  );
};
