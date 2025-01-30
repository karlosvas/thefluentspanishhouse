import dotenv from 'dotenv';
dotenv.config();
////////////////////////////////////
import admin from 'firebase-admin';
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
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};
// Verifica si la aplicación ya ha sido inicializada
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DB,
        });
        console.log('Firebase Admin initialized successfully');
        // Verifica si se puede conectar a Firebase Auth
        admin
            .auth()
            .listUsers(1)
            .then(() => {
            console.log('Successfully connected to Firebase Auth');
        })
            .catch((error) => {
            console.error('Error connecting to Firebase Auth:', error);
        });
    }
    catch (error) {
        console.error('Error initializing Firebase Admin:', error);
    }
}
export default admin;
