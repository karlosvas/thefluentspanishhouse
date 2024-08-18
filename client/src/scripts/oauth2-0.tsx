import {
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  type User,
  FacebookAuthProvider,
} from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase-config";
import { FirebaseError } from "firebase/app";

// Verificar si actualmente está logeado
export const isLogged = () => {
  return auth.currentUser != null;
};

export const getUser = (): User | null => {
  return auth.currentUser;
};

// Proveedor de Google
const providerGoogle = new GoogleAuthProvider();

// Iniciar sesión con Google
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, providerGoogle);
    // Este callback se ejecuta cuando el usuario se autentica correctamente
    const user = result.user.displayName;
    toast.success(
      <span>
        Welcome back <b>{user}</b>!
      </span>
    );
    return auth.currentUser;
  } catch (error) {
    toast.error(`Authentication failed`);
    console.error(error);
  }
  return null;
}

// Iniciar sesión en local
export async function localSignin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Usuario autenticado correctamente
    const user = userCredential.user;

    if (user.emailVerified) {
      toast.success(
        <span>
          Welcome back <b>{user.displayName}</b>!
        </span>
      );
    } else {
      toast(
        "Doy you need verify your email. Please check your email for the verification link.",
        {
          duration: 10000,
          style: {
            background: "#333",
            color: "#fff",
          },
          icon: "🔔",
        }
      );
    }
  } catch (error) {
    // Ocurrió un error durante la autenticación
    toast.error(`Authentication failed`);
    console.error(error);
  }
}

// Registrarse con google
export async function registerWithGoogle(): Promise<User | null> {
  // Si te logeas te inpide registrarte
  if (isLogged()) {
    toast.error("You are already logged in");
    return null;
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
      else {
        toast.success(
          <span>
            Welcome <b>{userCredential.user.displayName}</b>!
          </span>
        );
      }

      return auth.currentUser;
    } else toast.error("The user does not have an email");
  } catch (error) {
    toast.error("Error registering with Google");
    console.error(error);
  }
  return null;
}

// Registrarse en local
export async function localRegister(
  email: string,
  password: string,
  username: string
) {
  try {
    if (isLogged()) {
      toast.error("You are already logged in");
      return;
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });

    if (user.emailVerified) {
      toast.success(
        <span>
          Welcome again <b>{user.displayName}</b>!
        </span>
      );
    } else {
      toast("Welcome!, Please check your email for the verification link.", {
        duration: 10000,
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "🔔",
      });

      sendEmailVerification(user);
    }
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error(
            "The email address is already in use. Please try logging in. ❌"
          );
          break;
        case "auth/invalid-email":
          toast.error("The email address is not valid.");
          break;
        case "auth/weak-password":
          toast.error(
            "The password is too weak. Please choose a stronger password."
          );
          break;
        case "auth/network-request-failed":
          toast.error(
            "Network error. Please check your connection and try again."
          );
          break;
        default:
          toast.error(`Error during registration: ${error.message}`);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  }
}

// Deslogearse
export async function signOutUser() {
  return new Promise<void>((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // El usuario se ha desconectado exitosamente
        toast.success("User successfully disconnected");
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

const providerFacebook = new FacebookAuthProvider();

export async function signInWithFacebook(): Promise<User | null> {
  // Si te logeas te inpide registrarte
  if (isLogged()) {
    toast.error("You are already logged in");
    return null;
  }
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      toast.success(
        <span>
          Welcome <b>{result.user.displayName}</b>!
        </span>
      );
      return result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
  return null;
}
