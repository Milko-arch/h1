import React, { useState } from 'react';
import { LeaderboardEntry, GoogleSheetsService } from '../services/googleSheetsService';
import {
  Trophy,
  Flame,
  Star,
  Sparkles,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  Database,
  Download,
  Copy,
  Settings,
  Check,
  Code2,
  LogIn,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { ScriptModal } from './ScriptModal';
import { User } from 'firebase/auth';
import { getCachedAccessToken, setCachedAccessToken } from '../services/authService';

interface LeaderboardModalProps {
  entries: LeaderboardEntry[];
  currentStudentName: string;
  onClose: () => void;
  onSyncGoogleSheet: (customSheetId?: string) => Promise<{ success: boolean; message: string }>;
  isSyncing: boolean;
  sheetUrl: string | null;
  onSetCustomSheetId: (id: string) => void;
  googleUser?: User | null;
  onSignInGoogle?: () => Promise<void>;
  onSignOutGoogle?: () => Promise<void>;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  currentStudentName,
  onClose,
  onSyncGoogleSheet,
  isSyncing,
  sheetUrl,
  onSetCustomSheetId,
  googleUser,
  onSignInGoogle,
  onSignOutGoogle
}) => {
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [customInput, setCustomInput] = useState(GoogleSheetsService.getStoredSheetId() || '');
  const [webhookInput, setWebhookInput] = useState(GoogleSheetsService.getStoredWebhookUrl() || '');
  const [copied, setCopied] = useState(false);

  // Top 10 users ranked by XP
  const top10 = entries.slice(0, 10);

  // Find user's rank if not in top 10
  const userRankIndex = entries.findIndex(
    (e) => e.studentName.trim().toLowerCase() === currentStudentName.trim().toLowerCase()
  );

  const handleSyncClick = async () => {
    sounds.playClick();
    setSyncError(null);

    const hasWebhook = !!GoogleSheetsService.getStoredWebhookUrl();
    let token = getCachedAccessToken();

    // If we have neither an active OAuth token nor a webhook, we need Google authentication
    if (!token && !hasWebhook && onSignInGoogle) {
      setSyncStatus('Conectando con Google...');
      try {
        await onSignInGoogle();
        token = getCachedAccessToken();
      } catch (err: any) {
        setSyncStatus(null);
        setSyncError(
          'Para guardar directamente en tu Google Sheet, autoriza el acceso con Google o vincula el Webhook en "Script Apps".'
        );
        setTimeout(() => setSyncError(null), 6000);
        return;
      }
    }

    setSyncStatus('Sincronizando datos con Google Sheets...');
    try {
      let res = await onSyncGoogleSheet();

      // If token expired (401 or credential error) and we have onSignInGoogle, re-authenticate and retry once
      const isAuthError =
        !res.success &&
        res.message &&
        (res.message.includes('401') ||
          res.message.toLowerCase().includes('credential') ||
          res.message.toLowerCase().includes('token') ||
          res.message.toLowerCase().includes('unauthenticated'));

      if (isAuthError && onSignInGoogle) {
        setCachedAccessToken(null);
        setSyncStatus('Renovando acceso a Google Sheets...');
        try {
          await onSignInGoogle();
          res = await onSyncGoogleSheet();
        } catch {
          // fallback to reporting error
        }
      }

      if (res.success) {
        setSyncStatus(res.message || '¡Tabla de Google Sheets actualizada con éxito!');
        setTimeout(() => setSyncStatus(null), 4500);
      } else {
        setSyncError(res.message);
        setSyncStatus(null);
        setTimeout(() => setSyncError(null), 6000);
      }
    } catch (e: any) {
      setSyncError(e.message || 'Error al conectar con Google Sheets.');
      setSyncStatus(null);
      setTimeout(() => setSyncError(null), 5000);
    }
  };

  const handleConnectGoogle = async () => {
    sounds.playClick();
    if (onSignInGoogle) {
      try {
        setSyncStatus('Conectando cuenta de Google...');
        await onSignInGoogle();
        const res = await onSyncGoogleSheet();
        if (res.success) {
          setSyncStatus(res.message || '¡Conectado y sincronizado con Google Sheets!');
        } else {
          setSyncStatus('¡Cuenta conectada! Haz clic en "Guardar / Sincronizar"');
        }
        setTimeout(() => setSyncStatus(null), 4500);
      } catch (err: any) {
        setSyncError(err.message || 'No se pudo conectar con Google.');
        setTimeout(() => setSyncError(null), 5000);
      }
    }
  };

  const handleSaveConfig = async () => {
    let cleanId = customInput.trim();
    // If full URL was pasted, extract spreadsheet ID
    const urlMatch = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      cleanId = urlMatch[1];
    }
    if (cleanId) {
      onSetCustomSheetId(cleanId);
    }

    const cleanWebhook = webhookInput.trim();
    if (cleanWebhook) {
      GoogleSheetsService.setStoredWebhookUrl(cleanWebhook);
    }

    setShowConfig(false);
    setSyncStatus('Configuración guardada. Sincronizando con tu hoja...');
    try {
      const res = await onSyncGoogleSheet(cleanId || undefined);
      if (res.success) {
        setSyncStatus(res.message || '¡Hoja vinculada y actualizada con éxito!');
      } else {
        setSyncStatus('¡Hoja vinculada! Pulsa "Guardar / Sincronizar" para actualizar.');
      }
    } catch {
      setSyncStatus('¡Configuración guardada!');
    }
    setTimeout(() => setSyncStatus(null), 4000);
  };

  const handleOpenGoogleSheets = () => {
    sounds.playClick();
    const storedId = GoogleSheetsService.getStoredSheetId();
    if (storedId) {
      window.open(`https://docs.google.com/spreadsheets/d/${storedId}/edit`, '_blank', 'noopener,noreferrer');
    } else if (sheetUrl && !sheetUrl.includes('sheets.new')) {
      window.open(sheetUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowConfig(true);
      setSyncStatus('👉 Pega abajo el enlace de tu Google Sheet para que siempre se abra y actualice el tuyo.');
      setTimeout(() => setSyncStatus(null), 5000);
    }
  };

  const handleCopyClipboard = () => {
    sounds.playClick();
    const tableData = GoogleSheetsService.getClipboardData();
    navigator.clipboard.writeText(tableData).then(() => {
      setCopied(true);
      setSyncStatus('¡Datos copiados! Ve a tu Google Sheet y presiona Ctrl + V en la casilla A1.');
      setTimeout(() => {
        setCopied(false);
        setSyncStatus(null);
      }, 4500);
    });
  };

  const handleDownloadCSV = () => {
    sounds.playClick();
    GoogleSheetsService.downloadCSVFile();
    setSyncStatus('¡Archivo CSV descargado! Puedes abrirlo de inmediato en Google Sheets o Excel.');
    setTimeout(() => setSyncStatus(null), 4000);
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-md border-2 border-amber-200 text-sm">
            🥇 1
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black flex items-center justify-center shadow-md border-2 border-white text-sm">
            🥈 2
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-700/80 text-amber-100 font-black flex items-center justify-center shadow-md border-2 border-amber-500 text-sm">
            🥉 3
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center border border-slate-200 text-xs">
            #{rank}
          </div>
        );
    }
  };

  const getAvatarEmoji = (avatarId: string) => {
    switch (avatarId) {
      case 'lincoln-hat':
        return '🎩';
      case 'tubman-lantern':
        return '🏮';
      case 'general-grant':
        return '⭐';
      case 'clara-angel':
        return '🩺';
      case 'eagle-liberty':
        return '🦅';
      case 'master-detective':
        return '🕵️';
      case 'drummer-boy':
        return '🥁';
      case 'royal-scholar':
        return '👑';
      default:
        return '🦉';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white relative">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-black text-lg transition-colors cursor-pointer"
          >
            ✕
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/30">
              🏆
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                <span>Competencia Estudiantil</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-['Fredoka',sans-serif] font-bold">
                Tabla de Líderes • Top 10
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Los mejores estudiantes clasificados por puntos de experiencia (XP).
              </p>
            </div>
          </div>

          {/* Google Sheets Live Database Info Bar */}
          <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-white/95 font-semibold">
              <Database className="w-4 h-4 text-amber-200" />
              <span>Base de Datos: <strong>Google Sheets</strong></span>
              {googleUser && (
                <span className="hidden sm:inline text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
                  {googleUser.email}
                </span>
              )}
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/40">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Auto-sincroniza al jugar</span>
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
              {/* Google Sign In / Sync Button */}
              {!googleUser && onSignInGoogle ? (
                <button
                  onClick={handleConnectGoogle}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-slate-800 hover:bg-slate-100 font-bold text-xs shadow-sm transition-all cursor-pointer"
                  title="Conectar con tu cuenta de Google para grabar automáticamente"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Conectar Google</span>
                </button>
              ) : null}

              <button
                onClick={handleOpenGoogleSheets}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors cursor-pointer"
                title="Abrir tu Google Sheet"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir Google Sheets</span>
              </button>

              <button
                onClick={() => setShowConfig(!showConfig)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  GoogleSheetsService.getStoredSheetId()
                    ? 'bg-emerald-500/40 hover:bg-emerald-500/50 text-emerald-100 border border-emerald-400/50'
                    : 'bg-amber-400 hover:bg-amber-300 text-amber-950 font-black'
                }`}
                title="Vincular el enlace de tu Google Sheet"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{GoogleSheetsService.getStoredSheetId() ? 'Hoja Vinculada ✓' : 'Vincular Hoja 🔗'}</span>
              </button>

              <button
                onClick={handleCopyClipboard}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors cursor-pointer"
                title="Copiar tabla para pegar directamente (Ctrl + V) en tu Google Sheet"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Copiar Tabla</span>
              </button>

              <button
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors cursor-pointer"
                title="Descargar archivo .CSV para abrir en Google Sheets o Excel"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Descargar CSV</span>
              </button>

              <button
                onClick={() => setShowScriptModal(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs transition-colors cursor-pointer shadow-sm"
                title="Ver script autollenado para Apps Script"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Script Apps</span>
              </button>

              <button
                onClick={handleSyncClick}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white text-orange-700 hover:bg-orange-50 font-black text-xs shadow-sm transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                title="Sincronizar y actualizar datos"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Guardando...' : 'Guardar / Sincronizar'}</span>
              </button>
            </div>
          </div>

          {/* Configuration drawer */}
          {showConfig && (
            <div className="mt-3 p-3.5 bg-black/35 backdrop-blur-md rounded-2xl border border-white/20 text-xs text-white space-y-2.5 animate-in fade-in duration-150">
              <div className="font-bold flex items-center justify-between text-amber-200">
                <span>Configuración de Google Sheets:</span>
                <button
                  onClick={() => setShowConfig(false)}
                  className="text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="text-white/90 text-[11px] font-semibold block mb-1">
                  1. Enlace o ID de tu Google Sheet:
                </label>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/.../edit"
                  className="w-full px-3 py-1.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 text-xs focus:outline-none focus:border-amber-300 font-mono"
                />
              </div>

              <div>
                <label className="text-white/90 text-[11px] font-semibold block mb-1">
                  2. (Opcional) URL de Aplicación Web de Apps Script:
                </label>
                <input
                  type="text"
                  value={webhookInput}
                  onChange={(e) => setWebhookInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full px-3 py-1.5 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 text-xs focus:outline-none focus:border-amber-300 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-white/70">
                  Guarda para vincular tu archivo automáticamente.
                </span>
                <button
                  onClick={handleSaveConfig}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Guardar Configuración
                </button>
              </div>
            </div>
          )}

          {/* Sync status alert */}
          {syncStatus && (
            <div className="mt-2 text-xs bg-emerald-950/80 text-emerald-200 font-bold px-3 py-2 rounded-xl flex items-center gap-2 border border-emerald-400/40">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{syncStatus}</span>
            </div>
          )}

          {/* Sync error alert */}
          {syncError && (
            <div className="mt-2 text-xs bg-red-950/80 text-red-200 font-bold px-3 py-2 rounded-xl flex items-center gap-2 border border-red-400/40">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{syncError}</span>
            </div>
          )}
        </div>

        {/* Podium Top 3 Visual */}
        {top10.length >= 3 && (
          <div className="bg-amber-50/70 p-4 border-b border-amber-200 flex items-end justify-center gap-2 sm:gap-6 pt-6">
            {/* 2nd place */}
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">{getAvatarEmoji(top10[1].avatar)}</span>
              <div className="w-20 sm:w-24 bg-gradient-to-t from-slate-300 to-slate-200 rounded-t-2xl p-2 text-center shadow-sm border-2 border-slate-300">
                <span className="text-xs font-extrabold text-slate-800 block truncate" title={top10[1].studentName}>
                  {top10[1].studentName.split(' ')[0]}
                </span>
                <span className="text-xs font-black text-slate-600 block">
                  {top10[1].xp} XP
                </span>
                <span className="text-base font-black text-slate-500">🥈 2°</span>
              </div>
            </div>

            {/* 1st place */}
            <div className="flex flex-col items-center">
              <span className="text-3xl mb-1 filter drop-shadow animate-bounce">
                {getAvatarEmoji(top10[0].avatar)}
              </span>
              <div className="w-24 sm:w-28 bg-gradient-to-t from-amber-400 to-yellow-300 rounded-t-2xl p-3 text-center shadow-md border-2 border-amber-400 -mt-2">
                <span className="text-xs sm:text-sm font-black text-amber-950 block truncate" title={top10[0].studentName}>
                  {top10[0].studentName.split(' ')[0]}
                </span>
                <span className="text-xs font-black text-amber-900 block">
                  {top10[0].xp} XP
                </span>
                <span className="text-lg font-black text-amber-950">👑 1°</span>
              </div>
            </div>

            {/* 3rd place */}
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">{getAvatarEmoji(top10[2].avatar)}</span>
              <div className="w-20 sm:w-24 bg-gradient-to-t from-amber-700/40 to-amber-600/30 rounded-t-2xl p-2 text-center shadow-sm border-2 border-amber-600/40">
                <span className="text-xs font-extrabold text-amber-950 block truncate" title={top10[2].studentName}>
                  {top10[2].studentName.split(' ')[0]}
                </span>
                <span className="text-xs font-black text-amber-800 block">
                  {top10[2].xp} XP
                </span>
                <span className="text-base font-black text-amber-700">🥉 3°</span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          {top10.map((student, idx) => {
            const rank = idx + 1;
            const isCurrentUser =
              student.studentName.trim().toLowerCase() === currentStudentName.trim().toLowerCase();

            return (
              <div
                key={`${student.studentName}-${idx}`}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  isCurrentUser
                    ? 'bg-amber-100/90 border-amber-400 shadow-sm scale-[1.01]'
                    : rank <= 3
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-white border-slate-100 hover:bg-slate-50/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getRankBadge(rank)}

                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                    {getAvatarEmoji(student.avatar)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm text-slate-800 truncate">
                        {student.studentName}
                      </span>
                      {isCurrentUser && (
                        <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase shrink-0">
                          Tú
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5 font-semibold">
                      <span className="flex items-center gap-0.5 text-orange-600">
                        <Flame className="w-3.5 h-3.5" />
                        {student.streak}d
                      </span>
                      <span className="text-slate-400">•</span>
                      <span>{student.unitsCompleted} temas</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-900 px-3 py-1 rounded-xl font-black text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{student.xp}</span>
                    <span className="text-[10px] text-amber-700 font-bold">XP</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* If current user is outside top 10, show user's position sticky at bottom */}
          {userRankIndex >= 10 && (
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase text-center mb-1">
                Tu posición actual
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl border-2 border-amber-400 bg-amber-100/90 shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black flex items-center justify-center text-xs shadow-sm">
                    #{userRankIndex + 1}
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white border border-amber-300 flex items-center justify-center text-xl shrink-0">
                    {getAvatarEmoji(entries[userRankIndex].avatar)}
                  </div>
                  <div className="min-w-0">
                    <span className="font-extrabold text-sm text-slate-800 truncate block">
                      {entries[userRankIndex].studentName} (Tú)
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">
                      {entries[userRankIndex].unitsCompleted} temas completados
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-400 text-amber-950 px-3 py-1 rounded-xl font-black text-sm">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-600" />
                  <span>{entries[userRankIndex].xp} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 font-medium">
            💡 Gana más XP completando lecciones interactivas, quizzes y manteniendo tu racha diaria.
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-sm transition-colors cursor-pointer text-center"
          >
            ¡Entendido!
          </button>
        </div>
      </div>

      {/* Script Modal */}
      {showScriptModal && (
        <ScriptModal onClose={() => setShowScriptModal(false)} />
      )}
    </div>
  );
};
