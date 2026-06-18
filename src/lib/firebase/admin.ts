import type { Auth } from 'firebase-admin/auth';

let adminAuthInstance: Auth | null | undefined = undefined;

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
    // Use Function constructor to avoid Turbopack's static module analysis
    const getFirebaseAdmin = new Function(
      'return import("firebase-admin").then(m => ({ initializeApp: m.initializeApp, cert: m.cert, getApps: m.getApps, getApp: m.getApp }))'
    ) as () => Promise<{
      initializeApp: Function;
      cert: Function;
      getApps: Function;
      getApp: Function;
    }>;
    const getAuth = new Function(
      'return import("firebase-admin/auth").then(m => m.getAuth)'
    ) as () => Promise<Function>;

    const { initializeApp, cert, getApps, getApp } = await getFirebaseAdmin();
    const authFn = await getAuth();
    const app = getApps().length > 0 ? getApp() : initializeApp({ credential: cert(serviceAccount) });
    adminAuthInstance = authFn(app) as Auth;
    return adminAuthInstance;
  } catch (e) {
    console.warn('Firebase Admin initialization failed:', e);
    adminAuthInstance = null;
    return null;
  }
}

export { getAdminAuth };
export const adminAuth = null;
