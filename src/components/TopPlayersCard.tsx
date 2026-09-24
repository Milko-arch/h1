import React from 'react';
import { LeaderboardEntry, GoogleSheetsService } from '../services/googleSheetsService';
import { Trophy, Star, Flame, ChevronRight, Sparkles, Database } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TopPlayersCardProps {
  entries: LeaderboardEntry[];
  currentStudentName: string;
  onOpenLeaderboard: () => void;
  sheetUrl: string | null;
}

export const TopPlayersCard: React.FC<TopPlayersCardProps> = ({
  entries,
  currentStudentName,
  onOpenLeaderboard,
  sheetUrl
}) => {
  // Take top 3 or 4 for dashboard glance
  const previewList = entries.slice(0, 3);

  const getAvatarEmoji = (avatarId: string) => {
    switch (avatarId) {
      case 'lincoln-hat': return '🎩';
      case 'tubman-lantern': return '🏮';
      case 'general-grant': return '⭐';
      case 'clara-angel': return '🩺';
      case 'eagle-liberty': return '🦅';
      case 'master-detective': return '🕵️';
      case 'royal-scholar': return '👑';
      case 'owl-explorer':
      default:
        return '🦉';
    }
  };

  const getMedal = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  };

  return (
    <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg border-4 border-amber-300 relative overflow-hidden">
      {/* Decorative sparkles & footprint */}
      <div className="absolute -right-4 -bottom-6 opacity-15 text-8xl select-none pointer-events-none">
        🏆
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Top Players • Tabla de Líderes</span>
          </div>
          <h3 className="font-['Fredoka',sans-serif] text-xl sm:text-2xl font-bold leading-snug">
            Ranking de Estudiantes (XP)
          </h3>
          <p className="text-white/90 text-xs sm:text-sm font-semibold max-w-md mt-0.5">
            ¡Compite sanamente con tus compañeros! Los puntos se registran y sincronizan en la base de datos de <strong>Google Sheets</strong>.
          </p>
        </div>

        {/* Action Button to view all top 10 */}
        <button
          onClick={() => {
            sounds.playClick();
            onOpenLeaderboard();
          }}
          className="self-start md:self-center px-4 py-2.5 bg-white hover:bg-amber-50 text-orange-700 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Trophy className="w-4 h-4 text-orange-600" />
          <span>Ver Top 10 Completo</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick 3 Player Preview Pill Row */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-5">
        {previewList.map((player, idx) => {
          const isMe = player.studentName.trim().toLowerCase() === currentStudentName.trim().toLowerCase();

          return (
            <div
              key={player.studentName}
              onClick={() => {
                sounds.playClick();
                onOpenLeaderboard();
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                isMe
                  ? 'bg-emerald-800/60 border-emerald-300 ring-2 ring-emerald-200'
                  : 'bg-black/20 hover:bg-black/30 border-white/20'
              } flex items-center justify-between gap-2`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base sm:text-lg shrink-0">{getMedal(idx)}</span>
                <span className="text-xl shrink-0">{getAvatarEmoji(player.avatar)}</span>
                <div className="min-w-0">
                  <div className="font-black text-xs sm:text-sm truncate">
                    {player.studentName}
                    {isMe && <span className="ml-1 text-[10px] text-emerald-300 uppercase">(Tú)</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-white/80 font-bold">
                    <span className="flex items-center gap-0.5 text-orange-200">
                      <Flame className="w-3 h-3 fill-orange-300 text-orange-300" />
                      {player.streak}d
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 px-2 py-1 rounded-xl bg-white/20 text-white font-black text-xs flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                <span>{player.xp}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini Google Sheets badge */}
      <div className="relative z-10 mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between text-[11px] text-white/80">
        <span className="flex items-center gap-1">
          <Database className="w-3.5 h-3.5 text-amber-200" />
          Conectado a Google Sheets del Colegio
        </span>
        <button
          onClick={() => {
            sounds.playClick();
            const storedId = GoogleSheetsService.getStoredSheetId();
            if (storedId) {
              window.open(`https://docs.google.com/spreadsheets/d/${storedId}/edit`, '_blank', 'noopener,noreferrer');
            } else if (sheetUrl) {
              window.open(sheetUrl, '_blank', 'noopener,noreferrer');
            } else {
              onOpenLeaderboard();
            }
          }}
          className="underline hover:text-white font-bold cursor-pointer transition-colors"
        >
          Abrir Hoja de Cálculo ↗
        </button>
      </div>
    </div>
  );
};
