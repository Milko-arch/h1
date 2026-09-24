import React, { useState } from 'react';
import { UserProgress } from '../types';
import { SHOP_AVATARS, SHOP_THEMES, UNITS } from '../data/historyData';
import { sounds } from '../utils/audio';
import { X, Check, Sparkles, Palette, User, Zap, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ShopModalProps {
  progress: UserProgress;
  onClose: () => void;
  onBuyAvatar: (avatarId: string, price: number) => void;
  onSelectAvatar: (avatarId: string) => void;
  onBuyTheme: (themeId: string, price: number) => void;
  onSelectTheme: (themeId: string) => void;
  onUnlockNextUnitWithConfites: (price: number) => void;
  onRefillHearts: () => void;
  onBuyStreakFreeze: () => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  progress,
  onClose,
  onBuyAvatar,
  onSelectAvatar,
  onBuyTheme,
  onSelectTheme,
  onUnlockNextUnitWithConfites,
  onRefillHearts,
  onBuyStreakFreeze
}) => {
  const [activeTab, setActiveTab] = useState<'avatars' | 'themes' | 'powers'>('avatars');

  const handleBuy = (action: () => void, price: number) => {
    if (progress.confites < price) {
      sounds.playWrong();
      return;
    }
    sounds.playChest();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#38bdf8', '#fbbf24', '#4ade80']
    });
    action();
  };

  const nextLockedUnit = UNITS.find(u => u.id === progress.unlockedUnitId + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border-4 border-pink-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30">
              🍬
            </div>
            <div>
              <h2 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold">
                Candy Shop
              </h2>
              <p className="text-xs text-pink-100 font-semibold">
                Redeem candies for avatars, themes, and power-up unlocks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Confites counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/25 text-white font-black text-sm border border-white/30 shadow-xs">
              <span className="text-base">🍬</span>
              <span>{progress.confites}</span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1.5 gap-1.5 text-xs font-bold">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('avatars');
            }}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'avatars'
                ? 'bg-white text-pink-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Avatars ({SHOP_AVATARS.length})</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('themes');
            }}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'themes'
                ? 'bg-white text-pink-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Themes ({SHOP_THEMES.length})</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('powers');
            }}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'powers'
                ? 'bg-white text-pink-700 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Unlocks & Powers</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: AVATARS */}
          {activeTab === 'avatars' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHOP_AVATARS.map((avatar) => {
                const isOwned = progress.unlockedAvatars.includes(avatar.id);
                const isCurrent = progress.currentAvatar === avatar.id;

                return (
                  <div
                    key={avatar.id}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-400 shadow-xs ring-2 ring-emerald-300'
                        : isOwned
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-3xl shrink-0">
                        {avatar.emoji}
                      </div>
                      <div>
                        <h4 className="font-['Fredoka',sans-serif] font-bold text-sm text-slate-800">
                          {avatar.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">
                          {avatar.desc}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isCurrent ? (
                        <div className="px-3 py-1.5 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Equipped</span>
                        </div>
                      ) : isOwned ? (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onSelectAvatar(avatar.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Use
                        </button>
                      ) : (
                        <button
                          disabled={progress.confites < avatar.price}
                          onClick={() => handleBuy(() => onBuyAvatar(avatar.id, avatar.price), avatar.price)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                            progress.confites < avatar.price
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-pink-500 hover:bg-pink-400 text-white shadow-xs cursor-pointer active:scale-95'
                          }`}
                        >
                          <span>🍬</span>
                          <span>{avatar.price}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: THEMES */}
          {activeTab === 'themes' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SHOP_THEMES.map((theme) => {
                const isOwned = progress.unlockedThemes.includes(theme.id);
                const isCurrent = progress.currentTheme === theme.id;

                return (
                  <div
                    key={theme.id}
                    className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-3 transition-all ${
                      isCurrent
                        ? 'bg-indigo-50 border-indigo-400 shadow-xs ring-2 ring-indigo-300'
                        : isOwned
                        ? 'bg-white border-slate-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${theme.previewColor} text-white flex items-center justify-center text-2xl shadow-sm shrink-0 border border-white/40`}>
                        {theme.emoji}
                      </div>
                      <div>
                        <h4 className="font-['Fredoka',sans-serif] font-bold text-sm text-slate-800">
                          {theme.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium leading-tight">
                          {theme.desc}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isCurrent ? (
                        <div className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center gap-1 shadow-2xs">
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </div>
                      ) : isOwned ? (
                        <button
                          onClick={() => {
                            sounds.playClick();
                            onSelectTheme(theme.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      ) : (
                        <button
                          disabled={progress.confites < theme.price}
                          onClick={() => handleBuy(() => onBuyTheme(theme.id, theme.price), theme.price)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
                            progress.confites < theme.price
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-pink-500 hover:bg-pink-400 text-white shadow-xs cursor-pointer active:scale-95'
                          }`}
                        >
                          <span>🍬</span>
                          <span>{theme.price}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: POWERS & TOPIC UNLOCKS */}
          {activeTab === 'powers' && (
            <div className="space-y-3">
              {/* Unlock Next Unit/Topic with Confites */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shrink-0">
                    🔓
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-['Fredoka',sans-serif] font-bold text-sm text-slate-800">
                        Unlock Next Topic
                      </h4>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                        New
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {nextLockedUnit
                        ? `Instantly unlocks Unit #${nextLockedUnit.number}: "${nextLockedUnit.title}"`
                        : 'All 24 topics already unlocked!'}
                    </p>
                  </div>
                </div>

                <button
                  disabled={!nextLockedUnit || progress.confites < 150}
                  onClick={() => handleBuy(() => onUnlockNextUnitWithConfites(150), 150)}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    !nextLockedUnit || progress.confites < 150
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-amber-950 font-black shadow-xs cursor-pointer active:scale-95'
                  }`}
                >
                  <span>🍬</span>
                  <span>150</span>
                </button>
              </div>

              {/* Refill Hearts */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl shrink-0">
                    ❤️
                  </div>
                  <div>
                    <h4 className="font-['Fredoka',sans-serif] font-bold text-sm text-slate-800">
                      Refill Hearts to Max
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Restores all 5 hearts so you can keep answering without limits
                    </p>
                  </div>
                </div>

                <button
                  disabled={progress.hearts >= 5 || progress.confites < 50}
                  onClick={() => handleBuy(onRefillHearts, 50)}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    progress.hearts >= 5 || progress.confites < 50
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-rose-500 hover:bg-rose-400 text-white shadow-xs cursor-pointer active:scale-95'
                  }`}
                >
                  <span>🍬</span>
                  <span>50</span>
                </button>
              </div>

              {/* Streak Freeze */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-2xl shrink-0">
                    🧊
                  </div>
                  <div>
                    <h4 className="font-['Fredoka',sans-serif] font-bold text-sm text-slate-800">
                      Streak Freeze (Shield)
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Protects your streak if you miss a day of practice
                    </p>
                  </div>
                </div>

                <button
                  disabled={progress.confites < 100}
                  onClick={() => handleBuy(onBuyStreakFreeze, 100)}
                  className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    progress.confites < 100
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-sky-500 hover:bg-sky-400 text-white shadow-xs cursor-pointer active:scale-95'
                  }`}
                >
                  <span>🍬</span>
                  <span>100</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
