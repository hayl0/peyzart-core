import type { Auth } from 'firebase-admin/auth';

let adminAuthInstance: Auth | null | undefined = undefined;

function undynamic(mod: string) {
  return Function('return import("' + mod + '")')() as Promise<any>;
}

async function getAdminAuth(): Promise<Auth | null> {
  if (adminAuthInstance !== undefined) return adminAuthInstance;

  let serviceAccount: Record<string, unknown> | undefined;
  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    }
  } catch {
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY parse failed — Firebase Admin disabled');
    adminAuthInstance = null;
    return null;
  }

  if (!serviceAccount) {
    adminAuthInstance = null;
    return null;
  }

  try {
    // Dynamic module names to avoid Turbopack static analysis
    const a = 'firebase-admin';
    const b = 'auth';
    const c = a + '/' + b;

    const adminMod = await undynamic(a);
    const { initializeApp, cert, getApps, getApp } = adminMod;
    const authMod = await undynamic(c);
    const { getAuth } = authMod;
    const app = getApps().length > 0 ? getApp() : initializeApp({ credential: cert(serviceAccount) });
    adminAuthInstance = getAuth(app);
    return adminAuthInstance;
  } catch (e) {
    console.warn('Firebase Admin initialization failed:', e);
    adminAuthInstance = null;
    return null;
  }
}

export { getAdminAuth };
export const adminAuth = null;
