import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file'
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));

const TOKEN_STORAGE_KEY = 'footprints_google_access_token_v2';
const TOKEN_EXPIRY_KEY = 'footprints_google_token_expiry_v2';

let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const setCachedAccessToken = (token: string | null) => {
  cachedAccessToken = token;
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      // Valid for 50 minutes (Google tokens last 60 minutes)
      localStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + 50 * 60 * 1000));
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    }
  } catch {
    // ignore
  }
};

export const getCachedAccessToken = (): string | null => {
  if (cachedAccessToken) return cachedAccessToken;
  try {
    const saved = localStorage.getItem(TOKEN_STORAGE_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (saved && expiry && Date.now() < Number(expiry)) {
      cachedAccessToken = saved;
      return saved;
    } else if (saved) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    }
  } catch {
    // ignore
  }
  return null;
};

export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onSignedOut?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      const token = getCachedAccessToken();
      if (onAuthSuccess) {
        onAuthSuccess(user, token);
      }
    } else {
      setCachedAccessToken(null);
      if (onSignedOut) onSignedOut();
    }
  });
};

export const signInWithGoogle = async (): Promise<{ user: User; token: string }> => {
  isSigningIn = true;
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    if (!token) {
      throw new Error('No se pudo obtener el token de acceso de Google Sheets.');
    }

    setCachedAccessToken(token);
    return { user: result.user, token };
  } finally {
    isSigningIn = false;
  }
};

export const signOutGoogle = async (): Promise<void> => {
  setCachedAccessToken(null);
  await firebaseSignOut(auth);
};
