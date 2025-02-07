import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updateProfile,
  User,
  verifyBeforeUpdateEmail,
} from 'firebase/auth';
import toast from 'react-hot-toast';
import { NavigateFunction } from 'react-router-dom';
import { auth, showMessageErrorFirebase } from './firebase-config';
import { isValidEmail } from '@/utils/validations';

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
      } catch (error) {
        showMessageErrorFirebase(error);
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
  } catch (error) {
    showMessageErrorFirebase(error);
  }
}
