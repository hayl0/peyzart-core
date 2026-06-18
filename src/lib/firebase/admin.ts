import type { Auth } from 'firebase-admin/auth';

let adminAuthInstance: Auth | null = null;

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
    const { initializeApp, cert, getApps, getApp } = await import('firebase-admin/app');
    const { getAuth } = await import('firebase-admin/auth');
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
