import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let serviceAccount: Record<string, unknown> | undefined;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  }
} catch {
  console.warn('FIREBASE_SERVICE_ACCOUNT_KEY parse failed — Firebase Admin disabled');
}

function getAdminApp() {
  if (!serviceAccount) return null;
  try {
    return getApps().length > 0 ? getApp() : initializeApp({ credential: cert(serviceAccount) });
  } catch {
    return null;
  }
}

const adminApp = getAdminApp();
export const adminAuth = adminApp ? getAuth(adminApp) : null;
