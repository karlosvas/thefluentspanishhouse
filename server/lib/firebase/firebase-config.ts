import dotenv from 'dotenv';
dotenv.config();
////////////////////////////////////
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';

// En modo test no usamos Firebase real: el token por defecto salta la
// verificación en el middleware, así que basta con un stub que permita
// cargar las rutas sin credenciales reales.
const isTestMode = process.env.USE_MEMORY_DB === 'true';

let auth: Auth;

if (isTestMode) {
  console.log('Firebase Admin en modo test: usando stub de Auth');
  auth = {
    verifyIdToken: async () => {
      throw new Error('Firebase Auth deshabilitado en modo test');
    },
  } as unknown as Auth;
} else {
  // Importa el archivo de credenciales de Firebase Admin
  const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:
      process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  };

  // Verifica si la aplicación ya ha sido inicializada
  if (!getApps().length) {
    try {
      initializeApp({
        credential: cert(serviceAccount as Parameters<typeof cert>[0]),
        databaseURL: process.env.FIREBASE_DB,
      });
      console.log('Firebase Admin initialized successfully');
      // Verifica si se puede conectar a Firebase Auth
      getAuth()
        .listUsers(1)
        .then(() => {
          console.log('Successfully connected to Firebase Auth');
        })
        .catch((error: unknown) => {
          console.error('Error connecting to Firebase Auth:', error);
        });
    } catch (error: unknown) {
      console.error('Error initializing Firebase Admin:', error);
    }
  }

  auth = getAuth();
}

export { auth };
