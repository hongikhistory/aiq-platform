/* eslint-env node */
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Firebase Admin
// In production, use serviceAccountKey from environment variables
// For now, we will mock or use a placeholder if credentials aren't set
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin Initialized");
  } else {
    console.log("Firebase Admin: No credentials provided (Mock Mode)");
  }
} catch (error) {
  console.error("Firebase Init Error:", error);
}

export const db = admin.firestore ? admin.firestore() : null;
export const auth = admin.auth ? admin.auth() : null;
export default admin;
