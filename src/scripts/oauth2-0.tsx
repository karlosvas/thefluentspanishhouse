import { initializeApp } from "firebase/app";
import {
  updateProfile,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { toast } from "react-hot-toast";

// Configuración firebase, como es una página estática no puedo utilizar .env :)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_APP_ID,
  measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Verificar si actualmente está logeado
export const isLogged = () => {
  return auth.currentUser != null;
};

export const getUser = () => {
  return auth.currentUser;
};

// Proveedor de Google
const providerGoogle = new GoogleAuthProvider();

// Iniciar sesión con Google
export async function signInWithGoogle(toggleModal: (type: string) => void) {
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    // Este callback se ejecuta cuando el usuario se autentica correctamente
    const user = result.user.displayName;
    toast.success(
      <span>
        Welcome back <b>{user}</b>!
      </span>
    );
    toggleModal("");
  } catch (error) {
    toast.error(`Authentication failed`);
    console.error(error);
  }
}

// Iniciar sesión en local
export const localSingin = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuario autenticado correctamente
      const user = userCredential.user.displayName;
      toast.success(
        <span>
          Welcome back <b>{user}</b>!
        </span>
      );
    })
    .catch((error) => {
      // Ocurrió un error durante la autenticación
      if (error.code === "auth/invalid-credential")
        toast.error(`You are not registered`);
      else toast.error(`Authentication failed`);
      console.error(error);
    });
};

// Registrarse con google
export const registerWithGoogle = async () => {
  // Si te logeas te inpide registrarte
  if (isLogged()) {
    toast.error("You are already logged in");
    return;
  }

  try {
    // Lanza el flujo de autenticación con Google
    const userCredential = await signInWithPopup(auth, providerGoogle);

    // Verificar si el usuario ya estaba registrado previamente
    const email = userCredential.user.email;

    if (email) {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods && signInMethods.length > 0)
        toast.error(`The user has already been registered previously ❌`);
      else
        toast.success(
          <span>
            Welcome <b>{userCredential.user.displayName}</b>!
          </span>
        );
    } else toast.error("The user does not have an email");
  } catch (error) {
    toast.error("Error registering with Google");
    console.error(error);
  }
};

// Registrarse en local
export const localRegister = async (
  email: string,
  password: string,
  username: string
) => {
  if (isLogged()) {
    toast.error("You are already logged in");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return updateProfile(user, { displayName: username })
        .then(() => {
          toast.success(
            <span>
              Welcome <b>{user.displayName}</b>!
            </span>
          );
        })
        .catch((error) => {
          toast.error("Error updating profile");
          console.error(error.code, error.message);
        });
    })
    .then(() => {
      signInWithEmailAndPassword(auth, email, password);
    })
    .catch((error) => {
      console.error(error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email address is already in use ❌");
      } else {
        toast.error(`Error during registration`);
      }
    });
};

// Deslogearse
export function signOutUser(
  buttonRef: React.RefObject<HTMLButtonElement> | null
) {
  return new Promise<void>((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // El usuario se ha desconectado exitosamente
        toast.success("User successfully disconnected");
        if (buttonRef && buttonRef.current) {
          buttonRef.current.textContent = "Sign in";
        }
        resolve(); // Resuelve la promesa cuando se completa el signOut
      })
      .catch((error) => {
        // Manejar errores de desconexión
        toast.error("Error disconnecting user");
        console.error(error);
        reject(error); // Rechaza la promesa si hay un error
      });
  });
}
