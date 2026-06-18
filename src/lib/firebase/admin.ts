import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

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
