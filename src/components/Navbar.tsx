import React from 'react';
import { UserProgress } from '../types';
import { sounds } from '../utils/audio';
import { Flame, Heart, Volume2, VolumeX, Trophy, ShoppingBag, BookOpen, Download, Award } from 'lucide-react';

interface NavbarProps {
  progress: UserProgress;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenShop: () => void;
  onOpenBadges: () => void;
  onOpenMarathon: () => void;
  onOpenStudyGuide: () => void;
  onOpenStreak: () => void;
  onOpenLeaderboard: () => void;
  onOpenDiploma: () => void;
  onChangeName: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  progress,
  soundEnabled,
  onToggleSound,
  onOpenShop,
  onOpenBadges,
  onOpenMarathon,
  onOpenStudyGuide,
  onOpenStreak,
  onOpenLeaderboard,
  onOpenDiploma,
  onChangeName
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-xs px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* App Title & Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-green-400 p-0.5 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-xl sm:text-2xl">
              👣
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Footprints
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 text-[11px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                Learning Adventure
              </span>
            </div>
            {progress.studentName ? (
              <button
                onClick={onChangeName}
                title="Cambiar nombre de estudiante"
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 -mt-1 cursor-pointer transition-colors"
              >
                <span>👤 {progress.studentName}</span>
                <span className="text-[10px] text-slate-400 hover:underline">(editar)</span>
              </button>
            ) : (
              <p className="text-[11px] text-slate-500 font-semibold hidden sm:block -mt-1">
                American History for Kids
              </p>
            )}
          </div>
        </div>

        {/* Center Quick Action buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDiploma();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-amber-950 font-black text-xs border border-amber-500 transition-all shadow-xs cursor-pointer active:scale-95 animate-pulse"
          >
            <span className="text-sm">🎓</span>
            <span>Diploma de Honor</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-xs border border-amber-300 transition-colors shadow-2xs cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Top Players</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStudyGuide();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs border border-teal-300 transition-colors shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-teal-600" />
            <span>Study Guide</span>
          </button>
          <button
            onClick={() => {
              sounds.playClick();
              onOpenMarathon();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs border border-indigo-300 transition-colors shadow-2xs cursor-pointer"
          >
            <span className="text-sm">⚡</span>
            <span>Mega Quiz (75 Qs)</span>
          </button>
          <a
            href="/footprints.html"
            download="footprints_history.html"
            title="Download full standalone application as a single .html file that runs offline in any browser"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>.HTML</span>
          </a>
        </div>

        {/* Stats bar (Duolingo style with Candy & Streaks) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Diploma button on mobile */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenDiploma();
            }}
            title="Ver Diploma Oficial de Graduación"
            className="lg:hidden p-1.5 rounded-xl bg-amber-400 border border-amber-500 text-amber-950 font-extrabold text-xs cursor-pointer hover:bg-amber-300 transition-all shadow-xs active:scale-95 flex items-center gap-1"
          >
            <span className="text-sm">🎓</span>
          </button>

          {/* Top Players button on mobile */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenLeaderboard();
            }}
            title="Tabla de Líderes (Top Players)"
            className="lg:hidden p-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 font-extrabold text-xs cursor-pointer hover:bg-amber-100 transition-all shadow-2xs active:scale-95 flex items-center gap-1"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
          </button>
          {/* Streak Button (Click to view Streak Calendar) */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenStreak();
            }}
            title="View your streak calendar and rewards"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 font-extrabold text-xs sm:text-sm cursor-pointer hover:bg-orange-100 transition-all shadow-2xs active:scale-95"
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{progress.streak}</span>
          </button>

          {/* Candy 🍬 Virtual Coin */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenShop();
            }}
            title="Your sweet candies to spend in the shop"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-pink-50 border border-pink-200 text-pink-600 font-extrabold text-xs sm:text-sm hover:bg-pink-100 transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            <span className="text-sm animate-bounce">🍬</span>
            <span>{progress.confites}</span>
          </button>

          {/* Hearts / Lives */}
          <div
            title="Hearts remaining for quizzes"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-xs sm:text-sm shadow-2xs"
          >
            <Heart className={`w-4 h-4 text-rose-500 fill-rose-500 ${progress.hearts <= 1 ? 'animate-bounce' : ''}`} />
            <span>{progress.hearts}</span>
          </div>

          {/* Badges / Trophies */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenBadges();
            }}
            title="Achievements and trophies earned"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 font-extrabold text-xs sm:text-sm hover:bg-purple-100 transition-colors active:scale-95 shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Badges</span>
          </button>

          {/* Shop */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenShop();
            }}
            title="Candy shop"
            className="p-1.5 sm:px-2 sm:py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors active:scale-95 shadow-2xs flex items-center gap-1 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline font-bold text-xs">Shop</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Sound enabled" : "Sound muted"}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors active:scale-95 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-slate-700" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
          </button>
        </div>
      </div>
    </header>
  );
};
