import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updateProfile,
  User,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { auth, showMessageErrorFirebase } from "./firebase-config";

// Cambiar opciones de usuario
export const changeOptionsUser = async (
  commentText: string,
  navigate: NavigateFunction,
  user: User | null
) => {
  // Verificar si el usuario tiene el email verificado
  if (user && !user.emailVerified) {
    toast.error("Do you need verify your email after change options");
    return;
  }

  // Si el usuario tiene un proveedor de autenticación de email y contraseña
  if (
    user &&
    user.providerData.some((provider) => provider.providerId === "password")
  ) {
    toast.loading("Updating user...");

    const RAGEXEMAIL = /^[^@]+@gmail\.com$/;
    // Verificar si el comentario es un email
    if (RAGEXEMAIL.test(commentText)) {
      const newEmail: string = commentText;
      navigate("/verify", { state: { email: newEmail } });
    } else {
      // Si el comentario no es un email, se actualiza el nombre de usuario
      const newUserName = commentText;
      toast.dismiss();
      try {
        await updateProfile(user, { displayName: newUserName });
        toast.success("User updated successfully");
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
      icon: "🔔",
    }
  );
  // Debolbemos a el usuario a la página de inicio
  setTimeout(() => {
    navigate("/");
  }, 10000);
};

export function resetPassword(email: string) {
  toast.loading("Sending...");
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.dismiss();
      toast("Check your email for the password reset link. 📧", {
        duration: 10000,
        icon: "🔔",
      });
    })
    .catch((error) => {
      showMessageErrorFirebase(error);
    });
}

export async function delateUserFirebase(user: User, password: string) {
  try {
    // Reautenticar usuario para eliminarlo porque firebase lo requiere
    await reutenticateFirebase(user, password);
    // Eliminamos el usuario
    await deleteUser(user);
    toast.success("User deleted successfully, We hope to see you back soon", {
      duration: 10000,
      icon: "❤️‍🩹",
    });
  } catch (error) {
    showMessageErrorFirebase(error);
  }
}
