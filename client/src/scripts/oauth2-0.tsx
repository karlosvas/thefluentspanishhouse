import {
  updateProfile,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  FacebookAuthProvider,
  User,
} from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { auth, showMessageErrorFirebase } from './firebase-config';

// Verificar si actualmente está logeado
export const isLogged = () => {
  return auth.currentUser != null;
};

// Proveedor de Google
const providerGoogle = new GoogleAuthProvider();

// Iniciar sesión con Google
export async function signInWithGoogle() {
  // Nos logeamos con el proveedor de Google, y devolbemos el usuario actual
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const currenUser = result.user.displayName;
      toast.success(
        <span>
          Welcome back <b>{currenUser}</b>!
        </span>
      );
    })
    .catch((error) => {
      // Mostramos un mensaje de bienvenida con su nombre
      showMessageErrorFirebase(error);
    });
}

// Iniciar sesión en local
export async function localSignin(email: string, password: string) {
  try {
    // Logearse con email y contraseña
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    // Si no esta verificado se le avisa enviando un correo
    if (user.emailVerified) {
      toast.success(
        <span>
          Welcome back <b>{user.displayName}</b>!
        </span>
      );
    } else {
      await sendEmailVerificationFirebase(user);
    }
  } catch (error) {
    showMessageErrorFirebase(error);
  }
}

// Registrarse en local
export async function localRegister(
  email: string,
  password: string,
  username: string
) {
  try {
    // Si esta logeado no se puede registrar
    if (isLogged()) {
      toast.error('You are already logged in');
      return;
    }
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Actualizamos el perfil con el nombre de usuario
    await updateProfile(user, { displayName: username });
    // Si no esta verificado se le avisa enviando un correo
    if (user.emailVerified) {
      toast.success(
        <span>
          Welcome to The Fluent Spanish House <b>{user.displayName}</b>!
        </span>
      );
    } else {
      await sendEmailVerificationFirebase(user);
    }
  } catch (error) {
    showMessageErrorFirebase(error);
  }
}

// Deslogearse
export async function signOutUser() {
  return new Promise<void>((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // Resuelve la promesa cuando se completa el signOut
        resolve();
        // El usuario se ha desconectado exitosamente
        toast.success('User successfully disconnected');
      })
      .catch((error) => {
        showMessageErrorFirebase(error);
        reject(error); // Rechaza la promesa si hay un error
      });
  });
}

// Proveedor de Facebook
const providerFacebook = new FacebookAuthProvider();

// Iniciar sesión con Facebook
export async function signInWithFacebook() {
  // Si esta logeado no se puede registrar
  if (isLogged()) {
    toast.error('You are already logged in');
    return;
  }
  // Nos logeamos con el proveedor de Facebook
  signInWithPopup(auth, providerFacebook)
    .then((result) => {
      toast.success(
        <span>
          Welcome <b>{result.user.displayName}</b>!
        </span>
      );
    })
    .catch((error) => {
      showMessageErrorFirebase(error);
    });
}

// Verificación del correo electrónico
export const sendEmailVerificationFirebase = async (user: User) => {
  toast.loading('Updating...');
  try {
    await sendEmailVerification(user);
    toast.dismiss();
    toast(
      <span>
        Welcome <b>{user.displayName}</b>!, please verify your email by checking
        the verification link we sent 📧,
      </span>,
      {
        duration: 10000,
        icon: '🔔',
      }
    );
  } catch (error) {
    showMessageErrorFirebase(error);
    toast.dismiss();
    toast.error('Error sending verification email');
  }
};
