import type { Auth } from 'firebase-admin/auth';

let adminAuthInstance: Auth | null = null;
let initialized = false;

function undynamic(mod: string) {
  return Function('return import("' + mod + '")')() as Promise<any>;
}

async function getAdminAuth(): Promise<Auth | null> {
  if (initialized) return adminAuthInstance;

  let serviceAccount: Record<string, unknown> | undefined;
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    }
  } catch {
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY parse failed — Firebase Admin disabled');
    initialized = true;
    return null;
  }

  if (!serviceAccount) {
    initialized = true;
    return null;
  }

  try {
    const a = 'firebase-admin';
    const c = a + '/' + 'auth';

    const adminMod = await undynamic(a);
    const { initializeApp, cert, getApps, getApp } = adminMod;
    const authMod = await undynamic(c);
    const { getAuth } = authMod;
    const app = getApps().length > 0 ? getApp() : initializeApp({ credential: cert(serviceAccount) });
    adminAuthInstance = getAuth(app);
    initialized = true;
    return adminAuthInstance;
  } catch (e) {
    console.warn('Firebase Admin initialization failed:', e);
    initialized = true;
    return null;
  }
}

export { getAdminAuth };
export const adminAuth = null;
