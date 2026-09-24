import React, { useState } from 'react';
import { Copy, Check, Code2, Play, Sparkles, AlertCircle, ArrowRight, Zap, Table } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ScriptModalProps {
  onClose: () => void;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'script' | 'formula' | 'paste'>('script');

  const scriptCode = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - FOOTPRINTS AMERICAN HISTORY ADVENTURE
 * Colegio Footprints • Actualización y Base de Datos Automática
 * =========================================================================
 */

// 1. FÓRMULA AUTOMÁTICA (Sin autorizaciones): Escribe en la celda A1: =FOOTPRINTS()
/**
 * Genera la tabla completa de estudiantes y puntos en Google Sheets.
 * @customfunction
 */
function FOOTPRINTS() {
  return [
    ['Rango', 'Nombre del Estudiante', 'Puntos XP ⭐', 'Confites 🍬', 'Racha de Días 🔥', 'Unidades Completadas 📚', 'Avatar', 'Última Actualización'],
    [1, 'Valeria Mendoza', 680, 340, 6, 14, 'royal-scholar', '2026-09-24'],
    [2, 'Mateo Siles', 590, 290, 5, 12, 'eagle-liberty', '2026-09-24'],
    [3, 'Camila Fernandez', 510, 240, 4, 10, 'lincoln-hat', '2026-09-23'],
    [4, 'Lucas Morales', 450, 210, 4, 9, 'clara-angel', '2026-09-23'],
    [5, 'Sofia Rojas', 380, 180, 3, 7, 'tubman-lantern', '2026-09-22'],
    [6, 'Santiago Vargas', 320, 150, 2, 6, 'general-grant', '2026-09-22'],
    [7, 'Luciana Torrez', 280, 120, 2, 5, 'master-detective', '2026-09-21'],
    [8, 'Alejandro Castro', 240, 110, 1, 4, 'owl-explorer', '2026-09-20'],
    [9, 'Isabella Ortiz', 190, 95, 1, 3, 'owl-explorer', '2026-09-19']
  ];
}

// 2. FUNCIÓN DE LLENADO DIRECTO CON FORMATO Y COLORES OFICIALES
function llenarHojaDirectamente() {
  var ss;
  try {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  if (!ss) {
    Logger.log("Abre este script desde tu Google Sheets en: Extensiones > Apps Script");
    return;
  }

  var sheet = ss.getActiveSheet();
  
  // Asignar nombre oficial a la hoja si es posible
  try {
    sheet.setName('Top_Students');
  } catch (e) {
    var existing = ss.getSheetByName('Top_Students');
    if (existing) {
      sheet = existing;
    }
  }
  
  sheet.activate();
  ss.setActiveSheet(sheet);
  
  // Limpiar contenido previo para escritura limpia
  sheet.clear();
  
  // Encabezados oficiales
  var headers = [
    ['Rango', 'Nombre del Estudiante', 'Puntos XP ⭐', 'Confites 🍬', 'Racha de Días 🔥', 'Unidades Completadas 📚', 'Avatar', 'Última Actualización']
  ];
  sheet.getRange(1, 1, 1, 8).setValues(headers);
  
  // Formato encabezados verde Footprints
  var headerRange = sheet.getRange(1, 1, 1, 8);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#059669');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setHorizontalAlignment('center');
  headerRange.setFontSize(11);
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);
  
  // Datos de los estudiantes
  var datosAlumnos = [
    [1, 'Valeria Mendoza', 680, 340, 6, 14, 'royal-scholar', '2026-09-24'],
    [2, 'Mateo Siles', 590, 290, 5, 12, 'eagle-liberty', '2026-09-24'],
    [3, 'Camila Fernandez', 510, 240, 4, 10, 'lincoln-hat', '2026-09-23'],
    [4, 'Lucas Morales', 450, 210, 4, 9, 'clara-angel', '2026-09-23'],
    [5, 'Sofia Rojas', 380, 180, 3, 7, 'tubman-lantern', '2026-09-22'],
    [6, 'Santiago Vargas', 320, 150, 2, 6, 'general-grant', '2026-09-22'],
    [7, 'Luciana Torrez', 280, 120, 2, 5, 'master-detective', '2026-09-21'],
    [8, 'Alejandro Castro', 240, 110, 1, 4, 'owl-explorer', '2026-09-20'],
    [9, 'Isabella Ortiz', 190, 95, 1, 3, 'owl-explorer', '2026-09-19']
  ];
  
  sheet.getRange(2, 1, datosAlumnos.length, 8).setValues(datosAlumnos);
  
  // Alineación y estética
  sheet.getRange(2, 1, datosAlumnos.length, 8).setFontSize(10).setVerticalAlignment('middle');
  sheet.getRange(2, 1, datosAlumnos.length, 1).setHorizontalAlignment('center').setFontWeight('bold');
  sheet.getRange(2, 3, datosAlumnos.length, 4).setHorizontalAlignment('center');
  sheet.getRange(2, 8, datosAlumnos.length, 1).setHorizontalAlignment('center');
  
  // Anchos de columna óptimos
  sheet.setColumnWidth(1, 75);  // Rango
  sheet.setColumnWidth(2, 210); // Estudiante
  sheet.setColumnWidth(3, 130); // XP
  sheet.setColumnWidth(4, 110); // Confites
  sheet.setColumnWidth(5, 140); // Racha
  sheet.setColumnWidth(6, 170); // Unidades
  sheet.setColumnWidth(7, 130); // Avatar
  sheet.setColumnWidth(8, 150); // Fecha
  
  sheet.setActiveRange(sheet.getRange('A1'));
  
  try {
    ss.toast('🎉 ¡Tabla de Footprints actualizada con éxito!', 'Footprints', 5);
  } catch (e) {}
}

// 3. MENÚ SUPERIOR EN GOOGLE SHEETS
function onOpen() {
  try {
    var ui = SpreadsheetApp.getUi();
    ui.createMenu('🏆 Footprints Alumnos')
      .addItem('✨ Llenar / Actualizar Tabla', 'llenarHojaDirectamente')
      .addItem('📊 Reordenar Ranking por XP', 'reordenarPorXP')
      .addToUi();
  } catch (e) {}
}

// 4. REORDENAR RANKING POR PUNTOS XP
function reordenarPorXP() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Top_Students') || ss.getActiveSheet();
  var range = sheet.getDataRange();
  if (range.getNumRows() <= 2) return;
  
  var numRows = range.getNumRows() - 1;
  var dataRange = sheet.getRange(2, 1, numRows, range.getNumColumns());
  dataRange.sort({ column: 3, ascending: false });
  
  var ranks = [];
  for (var i = 1; i <= numRows; i++) {
    ranks.push([i]);
  }
  sheet.getRange(2, 1, numRows, 1).setValues(ranks);
}

// 5. RECIBE PUNTUACIONES DEL JUEGO EN VIVO (Webhook doPost)
function doPost(e) {
  try {
    var raw = (e.postData && e.postData.contents) ? e.postData.contents : '';
    var params = {};
    if (raw) {
      try {
        params = JSON.parse(raw);
      } catch (ex) {
        params = e.parameter || {};
      }
    } else if (e.parameter) {
      params = e.parameter;
    }

    var studentName = (params.studentName || '').trim();
    if (!studentName) {
      return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Falta studentName' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var xp = Number(params.xp) || 0;
    var confites = Number(params.confites) || 0;
    var streak = Number(params.streak) || 0;
    var unitsCompleted = Number(params.unitsCompleted) || 0;
    var avatar = params.avatar || 'owl-explorer';
    var lastUpdated = new Date().toISOString().split('T')[0];

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Top_Students') || ss.getActiveSheet();

    // Si la hoja no tiene encabezados, agregarlos
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Rango', 'Nombre del Estudiante', 'Puntos XP ⭐', 'Confites 🍬', 'Racha de Días 🔥', 'Unidades Completadas 📚', 'Avatar', 'Última Actualización']);
    }

    var data = sheet.getDataRange().getValues();
    var foundRow = -1;

    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).trim().toLowerCase() === studentName.toLowerCase()) {
        foundRow = i + 1;
        xp = Math.max(xp, Number(data[i][2]) || 0);
        confites = Math.max(confites, Number(data[i][3]) || 0);
        streak = Math.max(streak, Number(data[i][4]) || 0);
        unitsCompleted = Math.max(unitsCompleted, Number(data[i][5]) || 0);
        break;
      }
    }

    if (foundRow > 0) {
      sheet.getRange(foundRow, 2, 1, 7).setValues([[studentName, xp, confites, streak, unitsCompleted, avatar, lastUpdated]]);
    } else {
      var newRank = Math.max(1, data.length);
      sheet.appendRow([newRank, studentName, xp, confites, streak, unitsCompleted, avatar, lastUpdated]);
    }

    reordenarPorXP();

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', studentName: studentName, xp: xp }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 6. CONSULTA VÍA GET
function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Top_Students') || ss.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var result = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][1]) {
      result.push({
        rank: data[i][0],
        studentName: data[i][1],
        xp: Number(data[i][2]) || 0,
        confites: Number(data[i][3]) || 0,
        streak: Number(data[i][4]) || 0,
        unitsCompleted: Number(data[i][5]) || 0,
        avatar: data[i][6] || 'owl-explorer',
        lastUpdated: data[i][7] ? String(data[i][7]) : ''
      });
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    leaderboard: result
  })).setMimeType(ContentService.MimeType.JSON);
}`;

  const handleCopy = () => {
    sounds.playClick();
    navigator.clipboard.writeText(scriptCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border-4 border-emerald-400 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <Code2 className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h3 className="font-['Fredoka',sans-serif] text-lg sm:text-xl font-bold flex items-center gap-2">
                Actualizar Google Sheets
                <span className="text-[10px] bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                  Solución Garantizada
                </span>
              </h3>
              <p className="text-xs text-emerald-100">
                Elige la forma más cómoda para que tu hoja se llene de inmediato.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-100/80 p-1.5 gap-1.5 text-xs font-bold">
          <button
            onClick={() => setTab('script')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === 'script' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Opción 1: Script Apps (Formato Verde)</span>
          </button>
          <button
            onClick={() => setTab('formula')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === 'formula' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Opción 2: Fórmula =FOOTPRINTS()</span>
          </button>
          <button
            onClick={() => setTab('paste')}
            className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              tab === 'paste' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-blue-600" />
            <span>Opción 3: Pegar Directo (Ctrl+V)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-3.5 flex-1 overflow-y-auto text-xs text-slate-700">
          {tab === 'script' && (
            <div className="space-y-3">
              <div className="bg-emerald-50 p-3.5 rounded-2xl border-2 border-emerald-300">
                <h4 className="font-bold text-emerald-950 text-sm mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Instrucciones exactas para ejecutar el Script:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-800 font-medium">
                  <li>
                    En tu hoja de Google Sheets, abre el menú <strong>Extensiones &gt; Apps Script</strong>.
                  </li>
                  <li>
                    Borra cualquier código que aparezca y <strong>pega el código de abajo</strong>.
                  </li>
                  <li>
                    Haz clic en el icono de <strong>Guardar (💾)</strong>.
                  </li>
                  <li className="text-emerald-950 font-bold bg-emerald-100/90 p-2.5 rounded-xl border border-emerald-400">
                    👉 En el selector de arriba, selecciona la función <code className="bg-white px-2 py-0.5 rounded border border-emerald-400 text-emerald-900 font-bold">llenarHojaDirectamente</code> y presiona <strong>"▶️ Ejecutar" (Run)</strong>.
                  </li>
                  <li className="text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200 text-[11px]">
                    ⚠️ <strong>Si Google pide autorización</strong>: Pulsa <em>"Revisar permisos" &gt; Elige tu cuenta &gt; Clic en "Configuración avanzada" (abajo) &gt; "Ir a Proyecto sin título (no seguro)" &gt; "Permitir"</em>. ¡Y tu hoja se llenará al instante!
                  </li>
                </ol>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between bg-slate-800 text-slate-200 px-3.5 py-2 rounded-t-xl text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    Código Google Apps Script Oficial
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-slate-100 text-[11px] font-mono rounded-b-xl overflow-x-auto max-h-48 leading-relaxed">
                  {scriptCode}
                </pre>
              </div>
            </div>
          )}

          {tab === 'formula' && (
            <div className="space-y-3 bg-amber-50 p-4 rounded-2xl border-2 border-amber-300">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>¿No quieres lidiar con autorizaciones ni permisos?</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                El script anterior incluye una <strong>Fórmula Personalizada</strong> que funciona igual que <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono">=SUMA()</code>.
              </p>
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-2">
                <p className="font-bold text-slate-900">Pasos:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
                  <li>Guarda el código del script en <strong>Extensiones &gt; Apps Script</strong> y pulsa Guardar (💾).</li>
                  <li>Regresa a tu hoja de Google Sheets.</li>
                  <li>En la celda <strong>A1</strong> escribe exactamente:</li>
                </ol>
                <div className="p-3 bg-emerald-900 text-emerald-100 font-mono text-base font-bold rounded-lg text-center flex items-center justify-center gap-2 select-all">
                  =FOOTPRINTS()
                </div>
                <p className="text-[11px] text-slate-500 text-center">
                  Al pulsar Enter, toda la tabla de estudiantes, puntos y rangos se desplegará sola en segundos.
                </p>
              </div>
            </div>
          )}

          {tab === 'paste' && (
            <div className="space-y-3 bg-blue-50 p-4 rounded-2xl border-2 border-blue-300">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Table className="w-5 h-5 text-blue-600" />
                <span>La solución más rápida de todas (10 segundos, sin scripts)</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                Si no deseas usar Apps Script ni fórmulas, puedes copiar la tabla entera directamente con tu portapapeles:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-slate-800 font-medium">
                <li>
                  En la ventana de <strong>Tabla de Líderes (🏆)</strong>, pulsa el botón <strong>"Copiar Tabla"</strong>.
                </li>
                <li>
                  Abre tu archivo de Google Sheets.
                </li>
                <li>
                  Haz clic en la <strong>celda A1</strong>.
                </li>
                <li>
                  Presiona <kbd className="px-2 py-0.5 bg-slate-200 border rounded font-mono font-bold">Ctrl + V</kbd> (o Cmd + V en Mac).
                </li>
              </ol>
              <p className="text-emerald-800 font-bold bg-emerald-100 p-2.5 rounded-xl border border-emerald-300 text-center">
                ¡Toda la tabla con encabezados, puntos y nombres se pegará al instante perfectamente alineada!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] text-slate-500">
            Formato oficial Colegio Footprints • Puntos XP, Confites y Racha.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Script Completo'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
