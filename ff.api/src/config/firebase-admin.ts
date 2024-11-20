import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!privateKey) {
    throw new Error('FIREBASE_PRIVATE_KEY is required');
}

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!serviceAccount.projectId || !serviceAccount.clientEmail) {
    throw new Error('Missing Firebase Admin configuration. Check your environment variables.');
}

initializeApp({
    credential: cert(serviceAccount)
});

export const auth = getAuth();