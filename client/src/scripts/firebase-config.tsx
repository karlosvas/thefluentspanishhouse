import { FirebaseError, initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence, User } from "firebase/auth";
import { getDatabase } from "firebase/database";
import toast from "react-hot-toast";

// Configuración firebase, como es una página estática no puedo utilizar .env :)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const dbFirebase = getDatabase(firebaseApp);

// Configuración de la persistencia de la autenticación
export const setupAuthPersistence = async () => {
  try {
    return await setPersistence(auth, browserLocalPersistence);
  } catch (error) {
    console.error("Error al configurar la persistencia de la autenticación:", error);
  }
};

// Obtiene el proveedor de autenticación del usuario actual
export function getProvider(user: User) {
  const providerId = user.providerData[0].providerId;
  let providerName = "";
  switch (providerId) {
    case "google.com":
      providerName = "Google";
      break;
    case "facebook.com":
      providerName = "Facebook";
      break;
  }
  return providerName;
}

// Muestra un mensaje de error de Firebase
export const showMessageErrorFirebase = (error: unknown) => {
  if (!(error instanceof FirebaseError)) {
    toast.error(`An unexpected error occurred: ${error}`);
    return;
  }
  switch (error.code) {
    case "auth/email-already-in-use":
      toast.error("The email address is already in use by another account.");
      break;
    case "auth/invalid-email":
      toast.error("The email address is badly formatted.");
      break;
    case "auth/user-not-found":
      toast.error("There is no user record corresponding to this identifier.");
      break;
    case "auth/wrong-password":
      toast.error("The password is invalid or the user does not have a password.");
      break;
    case "auth/weak-password":
      toast.error("The password must be 6 characters long or more.");
      break;
    case "auth/operation-not-allowed":
      toast.error("Operation not allowed. Please enable it in the Firebase console.");
      break;
    case "auth/requires-recent-login":
      toast.error(
        "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
      );
      break;
    case "auth/user-disabled":
      toast.error("The user account has been disabled by an administrator.");
      break;
    case "auth/too-many-requests":
      toast.error("We have blocked all requests from this device due to unusual activity. Try again later.");
      break;
    case "auth/network-request-failed":
      toast.error("A network error (such as timeout, interrupted connection or unreachable host) has occurred.");
      break;
    case "auth/invalid-verification-code":
      toast.error("The SMS verification code used to create the phone auth credential is invalid.");
      break;
    case "auth/invalid-verification-id":
      toast.error("The verification ID used to create the phone auth credential is invalid.");
      break;
    case "auth/app-not-authorized":
      toast.error("This app is not authorized to use Firebase Authentication.");
      break;
    case "auth/argument-error":
      toast.error("An invalid argument was provided to an authentication method.");
      break;
    case "auth/invalid-api-key":
      toast.error("Your API key is invalid. Please check your configuration.");
      break;
    case "auth/invalid-credential":
      toast.error("The supplied auth credential is malformed or has expired.");
      break;
    case "auth/invalid-user-token":
      toast.error("The user's credential is no longer valid. The user must sign in again.");
      break;
    case "auth/user-token-expired":
      toast.error("The user's credential has expired. The user must sign in again.");
      break;
    case "auth/web-storage-unsupported":
      toast.error("This browser is not supported or 3rd party cookies and data may be disabled.");
      break;
    case "auth/timeout":
      toast.error("The operation has timed out. Please try again.");
      break;
    case "auth/quota-exceeded":
      toast.error("The quota for this operation has been exceeded. Please try again later.");
      break;
    case "auth/internal-error":
      toast.error("An internal error has occurred. Please try again.");
      break;
    default:
      toast.error(`An unexpected error occurred: ${error.message}`);
      break;
  }
};
