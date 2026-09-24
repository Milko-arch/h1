import React, { useState, useEffect, useRef } from 'react';
import { UserProgress } from '../types';
import { sounds, speakEnglish } from '../utils/audio';
import { X, Award, Printer, Sparkles, Volume2, Edit3, Check, Trophy, Star, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiplomaModalProps {
  progress: UserProgress;
  onClose: () => void;
  onUpdateStudentName?: (newName: string) => void;
}

export const DiplomaModal: React.FC<DiplomaModalProps> = ({
  progress,
  onClose,
  onUpdateStudentName
}) => {
  const [studentName, setStudentName] = useState(
    progress.studentName && progress.studentName.trim() !== ''
      ? progress.studentName
      : 'Historiador Footprints'
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [inputName, setInputName] = useState(studentName);
  const [hasLaunchedConfetti, setHasLaunchedConfetti] = useState(false);
  const printableRef = useRef<HTMLDivElement>(null);

  const unitsCount = Object.keys(progress.unitStars).length || Math.min(25, Math.max(1, progress.unlockedUnitId));
  const todayDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const triggerCelebration = () => {
    sounds.playFanfare();
    // Confetti cannon blast
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#f43f5e', '#a855f7']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#38bdf8', '#34d399', '#f59e0b']
      });
    }, 250);
  };

  useEffect(() => {
    if (!hasLaunchedConfetti) {
      triggerCelebration();
      setHasLaunchedConfetti(true);
      // Congratulations voice in English
      setTimeout(() => {
        speakEnglish(
          `Congratulations ${studentName}! You have officially graduated from the Footprints American History Adventure with high honors! You are a master historian!`
        );
      }, 600);
    }
  }, []);

  const handleSaveName = () => {
    const trimmed = inputName.trim();
    if (trimmed) {
      setStudentName(trimmed);
      if (onUpdateStudentName) {
        onUpdateStudentName(trimmed);
      }
    }
    setIsEditingName(false);
  };

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const handlePlayVoice = () => {
    sounds.playClick();
    speakEnglish(
      `Certificate of Excellence awarded to ${studentName} for outstanding mastery of the American Civil War and Reconstruction. Well done, historian!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto select-none print:p-0 print:bg-white print:static">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto border-4 border-amber-300 print:border-0 print:shadow-none print:max-w-none print:w-full">
        {/* Top Control Bar (Hidden when printing) */}
        <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 px-4 py-3 sm:px-6 flex items-center justify-between text-white shadow-xs print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🎓</span>
            <div>
              <h2 className="font-['Fredoka',sans-serif] font-bold text-base sm:text-lg leading-tight">
                Diploma Oficial de Graduación Footprints
              </h2>
              <p className="text-[11px] text-amber-100 font-medium">
                ¡Felicitaciones! Has conquistado la historia de Estados Unidos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={triggerCelebration}
              title="¡Lanzar más confeti!"
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-['Fredoka',sans-serif] font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span className="hidden sm:inline">¡Más Confeti!</span>
            </button>
            <button
              onClick={handlePlayVoice}
              title="Escuchar felicitación en inglés"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-['Fredoka',sans-serif] font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">Voz</span>
            </button>
            <button
              onClick={handlePrint}
              title="Imprimir o guardar en PDF"
              className="px-3 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-100 font-['Fredoka',sans-serif] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div
          ref={printableRef}
          className="p-4 sm:p-8 bg-radial from-amber-50 via-yellow-50/60 to-orange-50/40 relative overflow-hidden text-slate-800 print:p-8 print:m-0"
        >
          {/* Certificate Elaborate Border */}
          <div className="relative border-4 sm:border-8 border-double border-amber-500 rounded-2xl p-4 sm:p-8 bg-white/90 shadow-inner">
            {/* Ornamental Corner Emojis */}
            <div className="absolute top-2 left-2 text-2xl sm:text-3xl select-none">🏛️</div>
            <div className="absolute top-2 right-2 text-2xl sm:text-3xl select-none">🦅</div>
            <div className="absolute bottom-2 left-2 text-2xl sm:text-3xl select-none">📜</div>
            <div className="absolute bottom-2 right-2 text-2xl sm:text-3xl select-none">⭐</div>

            {/* School / Program Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 border border-amber-400 text-amber-950 shadow-2xs">
                <span className="text-lg">👣</span>
                <span className="font-['Fredoka',sans-serif] font-black tracking-widest text-xs uppercase">
                  COLEGIO FOOTPRINTS • ACADEMIA DE HISTORIA
                </span>
                <span className="text-lg">👣</span>
              </div>

              <div className="pt-2">
                <h1 className="font-['Fredoka',sans-serif] font-black text-2xl sm:text-4xl text-amber-800 tracking-tight uppercase drop-shadow-xs">
                  Diploma de Honor y Graduación
                </h1>
                <p className="font-['Fredoka',sans-serif] font-bold text-xs sm:text-sm text-amber-600 tracking-widest uppercase mt-0.5">
                  CERTIFICATE OF HISTORICAL EXCELLENCE
                </p>
              </div>

              {/* Decorative Laurel Ribbon */}
              <div className="flex items-center justify-center gap-3 text-amber-500 my-1">
                <span className="text-xl sm:text-2xl">🌿</span>
                <div className="h-0.5 w-16 sm:w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <span className="text-xl sm:text-2xl">🎖️</span>
                <div className="h-0.5 w-16 sm:w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
                <span className="text-xl sm:text-2xl">🌿</span>
              </div>
            </div>

            {/* Award Recipient Citation */}
            <div className="text-center my-4 sm:my-6 space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Este diploma certifica que el / la brillante estudiante:
              </p>

              {/* Student Name Display with Edit Trigger */}
              <div className="flex items-center justify-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2 bg-amber-50 p-2 rounded-2xl border-2 border-amber-400">
                    <input
                      type="text"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      placeholder="Escribe el nombre del estudiante"
                      autoFocus
                      className="px-3 py-1.5 rounded-xl border border-amber-300 font-['Fredoka',sans-serif] font-bold text-lg sm:text-2xl text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                    />
                    <button
                      onClick={handleSaveName}
                      className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold cursor-pointer"
                      title="Guardar nombre"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 group">
                    <div className="border-b-4 border-amber-400 pb-1 px-4 sm:px-8">
                      <span className="font-['Fredoka',sans-serif] font-extrabold text-2xl sm:text-4xl text-amber-950 tracking-wide">
                        {studentName}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setInputName(studentName);
                        setIsEditingName(true);
                      }}
                      title="Cambiar nombre en el diploma"
                      className="p-1.5 rounded-xl hover:bg-amber-100 text-amber-700 transition-colors print:hidden cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Citation Body */}
              <p className="text-xs sm:text-sm font-medium text-slate-700 max-w-2xl mx-auto leading-relaxed px-2">
                Ha completado exitosamente la expedición histórica{' '}
                <strong className="text-amber-900 font-bold">Footprints: American History Adventure (1861 - 1877)</strong>,
                demostrando excelencia, perseverancia y dominio sobre los{' '}
                <span className="text-emerald-700 font-bold">25 Hitos de la Guerra Civil Americana y la Reconstrucción</span>,
                las 75 preguntas bilingües y los valores de igualdad, libertad y valentía.
              </p>
            </div>

            {/* Historical Hall of Fame Badges & Emojis */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 my-4 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-2xl sm:text-3xl">🎩</span>
                <span className="font-['Fredoka',sans-serif] font-bold text-[11px] text-slate-800 mt-1">A. Lincoln</span>
                <span className="text-[9px] text-slate-500 font-semibold leading-tight">Emancipación 1863</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-2xl sm:text-3xl">🏮</span>
                <span className="font-['Fredoka',sans-serif] font-bold text-[11px] text-slate-800 mt-1">H. Tubman</span>
                <span className="text-[9px] text-slate-500 font-semibold leading-tight">Tren Clandestino</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-2xl sm:text-3xl">🤝</span>
                <span className="font-['Fredoka',sans-serif] font-bold text-[11px] text-slate-800 mt-1">Appomattox</span>
                <span className="text-[9px] text-slate-500 font-semibold leading-tight">Paz y Rendición 1865</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-white border border-amber-200 shadow-2xs">
                <span className="text-2xl sm:text-3xl">📜</span>
                <span className="font-['Fredoka',sans-serif] font-bold text-[11px] text-slate-800 mt-1">Enmiendas 13-15</span>
                <span className="text-[9px] text-slate-500 font-semibold leading-tight">Libertad y Voto</span>
              </div>
              <div className="col-span-2 sm:col-span-1 flex flex-col items-center text-center p-2 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-300 border border-amber-500 text-amber-950 shadow-2xs">
                <span className="text-2xl sm:text-3xl">🏆</span>
                <span className="font-['Fredoka',sans-serif] font-bold text-[11px] mt-1">Gran Maestro</span>
                <span className="text-[9px] font-bold leading-tight">25/25 Unidades</span>
              </div>
            </div>

            {/* Achievement Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-2 border-y border-amber-200/80 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Puntaje XP: <strong className="text-amber-700 font-extrabold">{progress.xp} pts</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🍬</span>
                <span>Confites: <strong className="text-pink-600 font-extrabold">{progress.confites}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🔥</span>
                <span>Racha: <strong className="text-orange-600 font-extrabold">{progress.streak} días</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Unidades: <strong className="text-emerald-700 font-extrabold">{unitsCount} completadas</strong></span>
              </div>
            </div>

            {/* Signatures & Official Gold Seal Section */}
            <div className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              {/* Left Signature */}
              <div className="text-center space-y-1 w-48">
                <div className="font-serif italic text-lg sm:text-xl text-slate-800 tracking-wider border-b-2 border-slate-400 pb-1">
                  Prof. Footprints Academic
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Comité Pedagógico de Historia
                </div>
                <div className="text-[9px] text-slate-400">Colegio Footprints</div>
              </div>

              {/* Center Official Gold Seal */}
              <div className="relative flex flex-col items-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 p-1 shadow-lg flex items-center justify-center border-2 border-amber-300">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-amber-800 flex flex-col items-center justify-center bg-gradient-to-b from-yellow-300 to-amber-400 text-amber-950 text-center p-1">
                    <span className="text-base sm:text-lg">⭐</span>
                    <span className="font-['Fredoka',sans-serif] font-black text-[9px] uppercase leading-none">
                      OFICIAL
                    </span>
                    <span className="text-[8px] font-extrabold tracking-tighter">EXCELLENCE</span>
                    <span className="text-[7px] font-bold opacity-80 mt-0.5">2026</span>
                  </div>
                </div>
                {/* Ribbon tails */}
                <div className="flex gap-1 -mt-2">
                  <div className="w-4 h-6 bg-amber-600 rounded-b-xs shadow-xs transform -rotate-12"></div>
                  <div className="w-4 h-6 bg-amber-600 rounded-b-xs shadow-xs transform rotate-12"></div>
                </div>
              </div>

              {/* Right Signature */}
              <div className="text-center space-y-1 w-48">
                <div className="font-serif italic text-lg sm:text-xl text-indigo-900 tracking-wider border-b-2 border-slate-400 pb-1 flex items-center justify-center gap-1">
                  <span>Milko Gonzales C.</span>
                </div>
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Ing. Milko Gonzales C.
                </div>
                <div className="text-[9px] text-slate-400">Dirección y Desarrollo Educativo</div>
              </div>
            </div>

            {/* Diploma Footer verification & date */}
            <div className="mt-6 pt-3 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>Fecha de Emisión: <strong>{todayDate}</strong></span>
              <span className="font-mono">ID de Certificación: FP-HIST-2026-{progress.streak}-{progress.xp}</span>
              <div className="flex items-center gap-1">
                <span>Colegio Footprints</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (Hidden when printing) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <span className="text-base">💡</span>
            <span>Tip: Puedes hacer clic en el nombre para editarlo antes de imprimir.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 text-amber-950 font-['Fredoka',sans-serif] font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-['Fredoka',sans-serif] font-bold text-sm transition-all cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
