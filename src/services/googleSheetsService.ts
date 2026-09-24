// Google Sheets & Leaderboard Integration for Footprints History Adventure
// Supports:
// 1. Direct Google Sheets REST API (via OAuth token from Firebase / Google Workspace)
// 2. Google Apps Script Web App Webhook (no OAuth required, background sync)
// 3. Instant CSV Export & Clipboard Table for 1-click paste into Google Sheets

export interface LeaderboardEntry {
  studentName: string;
  xp: number;
  confites: number;
  streak: number;
  unitsCompleted: number;
  avatar: string;
  lastUpdated: string;
}

export const DEFAULT_SAMPLE_PLAYERS: LeaderboardEntry[] = [
  {
    studentName: "Valeria Mendoza",
    xp: 680,
    confites: 340,
    streak: 6,
    unitsCompleted: 14,
    avatar: "royal-scholar",
    lastUpdated: "2026-09-24"
  },
  {
    studentName: "Mateo Siles",
    xp: 590,
    confites: 290,
    streak: 5,
    unitsCompleted: 12,
    avatar: "eagle-liberty",
    lastUpdated: "2026-09-24"
  },
  {
    studentName: "Camila Fernandez",
    xp: 510,
    confites: 240,
    streak: 4,
    unitsCompleted: 10,
    avatar: "lincoln-hat",
    lastUpdated: "2026-09-23"
  },
  {
    studentName: "Lucas Morales",
    xp: 450,
    confites: 210,
    streak: 4,
    unitsCompleted: 9,
    avatar: "clara-angel",
    lastUpdated: "2026-09-23"
  },
  {
    studentName: "Sofia Rojas",
    xp: 380,
    confites: 180,
    streak: 3,
    unitsCompleted: 7,
    avatar: "tubman-lantern",
    lastUpdated: "2026-09-22"
  },
  {
    studentName: "Santiago Vargas",
    xp: 320,
    confites: 150,
    streak: 2,
    unitsCompleted: 6,
    avatar: "general-grant",
    lastUpdated: "2026-09-22"
  },
  {
    studentName: "Luciana Torrez",
    xp: 280,
    confites: 120,
    streak: 2,
    unitsCompleted: 5,
    avatar: "master-detective",
    lastUpdated: "2026-09-21"
  },
  {
    studentName: "Alejandro Castro",
    xp: 240,
    confites: 110,
    streak: 1,
    unitsCompleted: 4,
    avatar: "owl-explorer",
    lastUpdated: "2026-09-20"
  },
  {
    studentName: "Isabella Ortiz",
    xp: 190,
    confites: 95,
    streak: 1,
    unitsCompleted: 3,
    avatar: "owl-explorer",
    lastUpdated: "2026-09-19"
  }
];

const LOCAL_STORAGE_PLAYERS_KEY = 'footprints_leaderboard_cache_v2';
const SHEET_ID_KEY = 'footprints_google_sheet_id';
const WEBHOOK_URL_KEY = 'footprints_google_webhook_url';

export class GoogleSheetsService {
  private static cachedSheetId: string | null = null;
  private static cachedWebhookUrl: string | null = null;

  static getStoredSheetId(): string | null {
    if (this.cachedSheetId) return this.cachedSheetId;
    try {
      const stored = localStorage.getItem(SHEET_ID_KEY);
      if (stored && stored.trim() !== '' && stored !== '1FootprintsHistory-CivilWarLeaderboard2026') {
        return stored.trim();
      }
    } catch {
      // ignore
    }
    return null;
  }

  static setStoredSheetId(id: string) {
    let cleanId = id.trim();
    const urlMatch = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (urlMatch && urlMatch[1]) {
      cleanId = urlMatch[1];
    }
    this.cachedSheetId = cleanId;
    try {
      localStorage.setItem(SHEET_ID_KEY, cleanId);
    } catch {
      // ignore
    }
  }

  static getStoredSheetUrl(): string | null {
    const id = this.getStoredSheetId();
    if (id) {
      return `https://docs.google.com/spreadsheets/d/${id}/edit`;
    }
    return null;
  }

  static getStoredWebhookUrl(): string | null {
    if (this.cachedWebhookUrl) return this.cachedWebhookUrl;
    try {
      return localStorage.getItem(WEBHOOK_URL_KEY);
    } catch {
      return null;
    }
  }

  static setStoredWebhookUrl(url: string) {
    this.cachedWebhookUrl = url;
    try {
      localStorage.setItem(WEBHOOK_URL_KEY, url);
    } catch {
      // ignore
    }
  }

  // Generate CSV text representation of the current leaderboard
  static exportToCSV(): string {
    const list = this.getLocalLeaderboard();
    const headers = ['Rango', 'Estudiante', 'Puntos XP ⭐', 'Confites 🍬', 'Racha de Dias 🔥', 'Unidades Completadas 📚', 'Avatar', 'Ultima Actualizacion'];
    const rows = list.map((p, idx) => [
      idx + 1,
      `"${p.studentName.replace(/"/g, '""')}"`,
      p.xp,
      p.confites,
      p.streak,
      p.unitsCompleted,
      `"${p.avatar}"`,
      `"${p.lastUpdated}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // Trigger downloading a .csv file that opens directly into Google Sheets / Excel
  static downloadCSVFile() {
    const csvContent = this.exportToCSV();
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Footprints_Leaderboard_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Generate copyable table formatted for pasting directly into Google Sheets (Tab-separated)
  static getClipboardData(): string {
    const list = this.getLocalLeaderboard();
    const headers = 'Rango\tNombre del Estudiante\tPuntos XP ⭐\tConfites 🍬\tRacha de Días 🔥\tUnidades Completadas 📚\tAvatar\tÚltima Actualización';
    const rows = list.map((p, idx) => 
      `${idx + 1}\t${p.studentName}\t${p.xp}\t${p.confites}\t${p.streak}\t${p.unitsCompleted}\t${p.avatar}\t${p.lastUpdated}`
    );
    return [headers, ...rows].join('\n');
  }

  static getLocalLeaderboard(): LeaderboardEntry[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PLAYERS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read cached leaderboard", e);
    }
    return [...DEFAULT_SAMPLE_PLAYERS];
  }

  static saveLocalLeaderboard(entries: LeaderboardEntry[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_PLAYERS_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("Could not write cached leaderboard", e);
    }
  }

  // Update or insert student into leaderboard
  static recordStudentProgress(
    name: string,
    xp: number,
    confites: number,
    streak: number,
    unitsCompleted: number,
    avatar: string
  ): LeaderboardEntry[] {
    if (!name || name.trim() === '') return this.getLocalLeaderboard();

    const list = this.getLocalLeaderboard();
    const existingIndex = list.findIndex(
      (p) => p.studentName.trim().toLowerCase() === name.trim().toLowerCase()
    );

    const updatedEntry: LeaderboardEntry = {
      studentName: name.trim(),
      xp,
      confites,
      streak,
      unitsCompleted,
      avatar,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...list[existingIndex],
        xp: Math.max(list[existingIndex].xp, xp),
        confites: Math.max(list[existingIndex].confites, confites),
        streak: Math.max(list[existingIndex].streak, streak),
        unitsCompleted: Math.max(list[existingIndex].unitsCompleted, unitsCompleted),
        avatar: avatar || list[existingIndex].avatar,
        lastUpdated: updatedEntry.lastUpdated
      };
    } else {
      list.push(updatedEntry);
    }

    list.sort((a, b) => b.xp - a.xp);
    this.saveLocalLeaderboard(list);

    // If a webhook URL is configured, push in background
    const webhook = this.getStoredWebhookUrl();
    if (webhook) {
      this.sendToWebhook(webhook, updatedEntry).catch(() => {});
    }

    return list;
  }

  // Send update to Google Apps Script Web App
  static async sendToWebhook(webhookUrl: string, entry: LeaderboardEntry): Promise<boolean> {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Apps Script web apps accept no-cors
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(entry)
      });
      return true;
    } catch (e) {
      console.warn("Webhook post warning:", e);
      return false;
    }
  }

  /**
   * Sync with Google Sheets using Google Sheets REST API v4 & OAuth token
   */
  static async syncWithGoogleSheet(
    accessToken: string,
    sheetId?: string,
    currentStudent?: LeaderboardEntry
  ): Promise<{ success: boolean; sheetId: string; url: string; entries: LeaderboardEntry[]; error?: string }> {
    let targetSheetId = sheetId || this.getStoredSheetId();

    try {
      let targetSheetTabName = 'Top_Students';

      // 1. If no sheet exists, create one via Google Sheets API
      if (!targetSheetId) {
        const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            properties: {
              title: 'Footprints - Civil War & History Leaderboard 🏆'
            },
            sheets: [
              {
                properties: {
                  title: 'Top_Students',
                  gridProperties: {
                    rowCount: 100,
                    columnCount: 8,
                    frozenRowCount: 1
                  }
                }
              }
            ]
          })
        });

        if (!createRes.ok) {
          const errData = await createRes.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Error al crear hoja en Google Drive: ${createRes.statusText}`);
        }

        const createData = await createRes.json();
        targetSheetId = createData.spreadsheetId;
        this.setStoredSheetId(targetSheetId!);
      } else {
        // Inspect the existing spreadsheet to find available sheets / tabs
        const metaRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${targetSheetId}?fields=sheets.properties`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (metaRes.ok) {
          const metaData = await metaRes.json();
          const sheetList: Array<{ properties: { title: string; sheetId: number } }> = metaData.sheets || [];
          const hasTopStudents = sheetList.some(s => s.properties?.title === 'Top_Students');

          if (hasTopStudents) {
            targetSheetTabName = 'Top_Students';
          } else if (sheetList.length > 0 && sheetList[0].properties?.title) {
            // Use the first sheet (e.g. "Hoja 1" or "Sheet1")
            targetSheetTabName = sheetList[0].properties.title;
          }
        } else if (metaRes.status === 401) {
          throw new Error('401: Sesión de Google expirada. Vuelve a iniciar sesión.');
        } else if (metaRes.status === 403) {
          throw new Error('403: Tu cuenta de Google no tiene permiso para editar este Google Sheet. Comparte la hoja como Editor.');
        } else if (metaRes.status === 404) {
          throw new Error('404: No se encontró la hoja con el enlace o ID indicado. Verifica el enlace en "Vincular Hoja".');
        }
      }

      // Merge current student if given
      if (currentStudent && currentStudent.studentName) {
        this.recordStudentProgress(
          currentStudent.studentName,
          currentStudent.xp,
          currentStudent.confites,
          currentStudent.streak,
          currentStudent.unitsCompleted,
          currentStudent.avatar
        );
      }

      const allSorted = this.getLocalLeaderboard();

      // Build rows: Header + Data
      const headerRow = [
        'Rango',
        'Nombre del Estudiante',
        'Puntos XP ⭐',
        'Confites 🍬',
        'Racha de Días 🔥',
        'Unidades Completadas 📚',
        'Avatar',
        'Última Actualización'
      ];

      const dataRows = allSorted.map((p, idx) => [
        idx + 1,
        p.studentName,
        p.xp,
        p.confites,
        p.streak,
        p.unitsCompleted,
        p.avatar,
        p.lastUpdated
      ]);

      const writeRows = [headerRow, ...dataRows];

      // Write values into the Google Sheet
      const cleanTab = targetSheetTabName.replace(/^'+|'+$/g, '');
      const needsQuotes = /[\s\-\+\*\/\(\)\[\]\{\}\<\>\=\:\,\;\.\?\!\@\#\$\%\^\&]/.test(cleanTab) || /^\d/.test(cleanTab);
      const safeTab = needsQuotes ? `'${cleanTab.replace(/'/g, "\\'")}'` : cleanTab;
      const updateRange = `${safeTab}!A1:H${writeRows.length}`;

      const updateRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${targetSheetId}/values/${encodeURIComponent(updateRange)}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            range: updateRange,
            majorDimension: 'ROWS',
            values: writeRows
          })
        }
      );

      if (!updateRes.ok) {
        const errJson = await updateRes.json().catch(() => ({}));
        if (updateRes.status === 401) {
          throw new Error('401: Sesión de Google expirada. Vuelve a iniciar sesión.');
        } else if (updateRes.status === 403) {
          throw new Error('403: No tienes permisos para modificar esta hoja. Revisa los permisos en Google Drive.');
        }
        throw new Error(errJson.error?.message || `Error al guardar filas (${updateRes.status}): ${updateRes.statusText}`);
      }

      const sheetUrl = `https://docs.google.com/spreadsheets/d/${targetSheetId}/edit`;
      return {
        success: true,
        sheetId: targetSheetId!,
        url: sheetUrl,
        entries: allSorted
      };
    } catch (err: any) {
      console.error("Google Sheets sync error:", err);
      const isAuthErr = err.message && (
        err.message.includes('401') ||
        err.message.toLowerCase().includes('credential') ||
        err.message.toLowerCase().includes('unauthenticated') ||
        err.message.toLowerCase().includes('token')
      );
      if (isAuthErr) {
        try {
          localStorage.removeItem('footprints_google_access_token_v2');
          localStorage.removeItem('footprints_google_token_expiry_v2');
        } catch {
          // ignore
        }
      }
      const url = targetSheetId ? `https://docs.google.com/spreadsheets/d/${targetSheetId}/edit` : 'https://sheets.new';
      return {
        success: false,
        sheetId: targetSheetId || '',
        url,
        entries: this.getLocalLeaderboard(),
        error: err.message || 'No se pudo sincronizar directamente con Google Sheets'
      };
    }
  }
}
