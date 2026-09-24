/**
 * GOOGLE APPS SCRIPT PARA REGISTRO AUTOMÁTICO DE ESTUDIANTES - FOOTPRINTS
 * Colegio Footprints • American History & Civil War Adventure
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Crea una Hoja de Cálculo nueva en Google Sheets (o escribe https://sheets.new)
 * 2. En el menú superior de tu Google Sheet, ve a: "Extensiones" > "Apps Script"
 * 3. Borra todo el código que aparezca y pega este código completo.
 * 4. Haz clic en "Implementar" (botón azul arriba a la derecha) > "Nueva implementación".
 * 5. En tipo de implementación (icono de engranaje ⚙️), selecciona: "Aplicación web".
 * 6. Configura:
 *    - Descripción: "Footprints Leaderboard Webhook"
 *    - Ejecutar como: "Yo" (tu cuenta)
 *    - Quién tiene acceso: "Cualquier persona" (Anyone)
 * 7. Haz clic en "Implementar", autoriza los permisos y copia la URL de la aplicación web
 *    (termina en /exec) o copia el enlace de tu Google Sheet para pegarlo en la app.
 */

function doGet(e) {
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  var result = [];

  // Omitir cabecera (fila 0)
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

  // Ordenar por XP descendente
  result.sort(function(a, b) {
    return b.xp - a.xp;
  });

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    totalStudents: result.length,
    leaderboard: result
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var params = {};
    if (e.postData && e.postData.contents) {
      params = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      params = e.parameter;
    }

    var studentName = (params.studentName || '').trim();
    if (!studentName) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'studentName es requerido'
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var xp = Number(params.xp) || 0;
    var confites = Number(params.confites) || 0;
    var streak = Number(params.streak) || 0;
    var unitsCompleted = Number(params.unitsCompleted) || 0;
    var avatar = params.avatar || 'owl-explorer';
    var lastUpdated = new Date().toISOString().split('T')[0];

    var sheet = getOrCreateSheet();
    var data = sheet.getDataRange().getValues();
    var foundRow = -1;

    // Buscar si el estudiante ya existe (columna B / índice 1)
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][1]).trim().toLowerCase() === studentName.toLowerCase()) {
        foundRow = i + 1; // Fila 1-indexada
        // Conservar el puntaje más alto
        xp = Math.max(xp, Number(data[i][2]) || 0);
        confites = Math.max(confites, Number(data[i][3]) || 0);
        streak = Math.max(streak, Number(data[i][4]) || 0);
        unitsCompleted = Math.max(unitsCompleted, Number(data[i][5]) || 0);
        break;
      }
    }

    if (foundRow > 0) {
      // Actualizar fila existente
      sheet.getRange(foundRow, 2, 1, 7).setValues([[
        studentName,
        xp,
        confites,
        streak,
        unitsCompleted,
        avatar,
        lastUpdated
      ]]);
    } else {
      // Agregar nuevo estudiante al final
      var newRank = data.length;
      sheet.appendRow([
        newRank,
        studentName,
        xp,
        confites,
        streak,
        unitsCompleted,
        avatar,
        lastUpdated
      ]);
    }

    // Reordenar la tabla por columna C (XP) de mayor a menor
    reorderLeaderboard(sheet);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Progreso guardado exitosamente en Google Sheets',
      studentName: studentName,
      xp: xp
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Top_Students');

  if (!sheet) {
    sheet = ss.insertSheet('Top_Students');
    // Dar formato profesional a la hoja
    var header = [
      ['Rango (Rank)', 'Nombre del Estudiante', 'Puntos XP ⭐', 'Confites 🍬', 'Racha de Días 🔥', 'Unidades Completadas 📚', 'Avatar', 'Última Actualización']
    ];
    var range = sheet.getRange('A1:H1');
    range.setValues(header);
    range.setFontWeight('bold');
    range.setBackground('#059669'); // Color esmeralda distintivo de Footprints
    range.setFontColor('#FFFFFF');
    range.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 110);
    sheet.setColumnWidth(2, 220);
    sheet.setColumnWidth(3, 130);
    sheet.setColumnWidth(4, 120);
    sheet.setColumnWidth(5, 140);
    sheet.setColumnWidth(6, 190);
    sheet.setColumnWidth(7, 140);
    sheet.setColumnWidth(8, 160);
  }

  return sheet;
}

function reorderLeaderboard(sheet) {
  var range = sheet.getDataRange();
  if (range.getNumRows() <= 2) return;

  // Ordenar desde fila 2 hasta el final por columna 3 (XP) descendente
  var dataRange = sheet.getRange(2, 1, range.getNumRows() - 1, range.getNumColumns());
  dataRange.sort({ column: 3, ascending: false });

  // Actualizar los números de rango en la columna A (1, 2, 3...)
  var numRows = range.getNumRows() - 1;
  var ranks = [];
  for (var i = 1; i <= numRows; i++) {
    ranks.push([i]);
  }
  sheet.getRange(2, 1, numRows, 1).setValues(ranks);
}
