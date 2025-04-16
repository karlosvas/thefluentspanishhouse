import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updateProfile,
  User,
  verifyBeforeUpdateEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  FacebookAuthProvider,
} from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { isValidEmail } from '@/utils/validations';
import { toast } from 'react-hot-toast';
import { auth, showMessageErrorFirebase } from './firebase-config';
import { FirebaseError } from 'firebase/app';

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
  } catch (error: unknown) {
    if (error instanceof FirebaseError) showMessageErrorFirebase(error);
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
  } catch (error: unknown) {
    if (error instanceof FirebaseError) showMessageErrorFirebase(error);
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
  } catch (error: unknown) {
    if (error instanceof FirebaseError) showMessageErrorFirebase(error);
    toast.dismiss();
    toast.error('Error sending verification email');
  }
};

// Cambiar opciones de usuario
export const changeOptionsUser = async (
  commentText: string,
  navigate: NavigateFunction,
  user: User
) => {
  // Verificar si el usuario tiene el email verificado
  if (!user.emailVerified) {
    toast.error('Do you need verify your email after change options');
    return;
  }

  // Si el usuario tiene un proveedor de autenticación de email y contraseña
  if (
    user.providerData.some((provider) => provider.providerId === 'password')
  ) {
    toast.loading('Updating user...');

    // Verificar si el comentario es un email
    if (isValidEmail(commentText)) {
      const newEmail: string = commentText;
      // Pasamos al usuario a la página de verificación
      navigate('/verify', { state: { email: newEmail } });
    } else {
      // Si el comentario no es un email, se actualiza el nombre de usuario
      const newUserName = commentText;
      toast.dismiss();
      try {
        await updateProfile(user, { displayName: newUserName });
        navigate('/account');
        toast.success('User updated successfully');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) showMessageErrorFirebase(error);
      }
    }
  }
};

// Reautenticar usuario
async function reutenticateFirebase(user: User, password: string) {
  if (!user.email) return;
  try {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    throw new Error();
  }
}

// Cambiar opciones de usuario de email
export const changeOptionsUserEmail = async (
  password: string,
  navigate: NavigateFunction,
  newEmail: string,
  user: User
) => {
  // Reautenticar usuario para cambiar email porque firebase lo requiere
  await reutenticateFirebase(user, password);
  // Verificar si el nuevo email es valido
  await verifyBeforeUpdateEmail(user, newEmail);
  // Frenamos el toast de loading
  toast.dismiss();
  // Mostramos un toast de que se envio el email de verificación
  toast(
    <span>
      Doy you need verify your <strong>new email</strong>. Please check your
      email for the verification link.
    </span>,
    {
      duration: 10000,
      icon: '🔔',
    }
  );
  // Devolbemos a el usuario a la página de inicio
  setTimeout(() => {
    navigate('/');
  }, 10000);
};

export async function resetPassword(email: string, navigate: NavigateFunction) {
  toast.loading('Sending...');
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.dismiss();
      toast('Check your email for the password reset link. 📧', {
        duration: 10000,
        icon: '🔔',
      });
      // Devolbemos a el usuario a la página de inicio
      setTimeout(() => {
        navigate('/');
      }, 10000);
    })
    .catch((error) => {
      toast.dismiss();
      showMessageErrorFirebase(error);
    });
}

export async function delateUserFirebase(
  user: User,
  password: string,
  navigate: NavigateFunction
) {
  try {
    // Reautenticar usuario para eliminarlo porque firebase lo requiere
    await reutenticateFirebase(user, password);
    // Eliminamos el usuario
    await deleteUser(user);
    toast.success('User deleted successfully, We hope to see you back soon', {
      duration: 10000,
      icon: '❤️‍🩹',
    });
    // Devolbemos a el usuario a la página de inicio
    setTimeout(() => {
      navigate('/');
    }, 10000);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) showMessageErrorFirebase(error);
  }
}
