import React, { useState } from 'react';
import { sounds } from '../utils/audio';
import { Sparkles, User, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentWelcomeModalProps {
  initialName: string;
  onSaveName: (name: string) => void;
}

export const StudentWelcomeModal: React.FC<StudentWelcomeModalProps> = ({
  initialName,
  onSaveName
}) => {
  const [name, setName] = useState(initialName || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('¡Por favor ingresa tu nombre de explorador / estudiante!');
      return;
    }
    sounds.playCorrect();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onSaveName(name.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-4 border-emerald-400 relative overflow-hidden text-center">
        {/* Decorative corner glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-200 rounded-full blur-2xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-200 rounded-full blur-2xl opacity-60 pointer-events-none" />

        {/* Mascot / Icon */}
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-4xl shadow-lg transform -rotate-3 border-2 border-white">
          👣
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>¡Bienvenido a Footprints!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-['Fredoka',sans-serif] font-bold text-slate-800 mb-2">
          ¿Cómo te llamas?
        </h2>

        <p className="text-sm text-slate-600 font-medium mb-6">
          Ingresa tu nombre para registrar tus puntos (XP), competir en la <strong>Tabla de Líderes (Leaderboard)</strong> y sincronizar tu progreso en la base de datos de Google Sheets.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative text-left">
            <label className="block text-xs font-bold text-slate-600 mb-1">
              Nombre del Participante / Estudiante
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ej: Sofia Morales, Lucas Paz..."
                maxLength={40}
                autoFocus
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-2 border-slate-300 focus:border-emerald-500 focus:bg-white rounded-2xl font-bold text-slate-800 text-base placeholder-slate-400 focus:outline-none transition-all shadow-inner"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-500 font-bold mt-1.5 animate-bounce">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer border-b-4 border-emerald-700"
          >
            <span>¡Empezar Aventura!</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 font-semibold mt-4">
          Colegio Footprints • Historia de EE.UU. & Guerra Civil
        </p>
      </div>
    </div>
  );
};
