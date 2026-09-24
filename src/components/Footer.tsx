import React, { useState } from 'react';
import { Heart, Sparkles, Download, CheckCircle, Loader2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    try {
      const response = await fetch('/footprints.html', { cache: 'no-cache' });
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const text = await response.text();
      if (!text || text.length < 1000) {
        throw new Error('El archivo está vacío o incompleto');
      }

      const blob = new Blob([text], { type: 'text/html;charset=utf-8' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', 'footprints.html');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 30000);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err: any) {
      console.warn('Direct blob download failed, falling back to direct anchor:', err);
      // Fallback: direct anchor download
      const fallbackLink = document.createElement('a');
      fallbackLink.href = '/footprints.html';
      fallbackLink.setAttribute('download', 'footprints.html');
      fallbackLink.target = '_blank';
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <footer className="mt-16 bg-white border-t-2 border-slate-200 py-8 px-4 text-center select-none">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Footprints Brand Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 shadow-xs">
          <span className="text-xl">👣</span>
          <span className="font-['Fredoka',sans-serif] font-bold text-lg text-emerald-800 tracking-wide">
            Footprints
          </span>
          <span className="text-xs font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
            Interactive Learning
          </span>
        </div>

        {/* Motivational message for 9-year-olds */}
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-lg mx-auto flex items-center justify-center gap-1.5 flex-wrap">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 inline" />
          <span>Learning history has never been so fun! Listen in English, conquer levels, and unlock badges.</span>
        </p>

        {/* Standalone HTML Download Button */}
        <div className="flex flex-col items-center justify-center gap-2 pt-1">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-['Fredoka',sans-serif] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer border-b-2 border-indigo-800 disabled:opacity-70"
          >
            {downloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : downloadSuccess ? (
              <CheckCircle className="w-4 h-4 text-emerald-300" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>
              {downloading
                ? 'Descargando footprints.html...'
                : downloadSuccess
                ? '¡Descargado footprints.html (930 KB)!'
                : 'Descargar Programa Completo (footprints.html)'}
            </span>
          </button>
          
          {downloadSuccess && (
            <span className="text-xs font-bold text-emerald-600 animate-in fade-in duration-300">
              ✓ Archivo completo descargado. Ábrelo con doble clic en cualquier navegador.
            </span>
          )}
          {downloadError && (
            <span className="text-xs font-bold text-rose-500">
              {downloadError}
            </span>
          )}
        </div>

        {/* Required author attribution */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-slate-600">
          <span className="font-semibold text-slate-400">Footprints History Quest</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 shadow-2xs">
            <span>By: Ing. Milko Gonzales C.</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};

