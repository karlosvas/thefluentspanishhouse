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
import { auth } from "./firebase-config";

export const changeOptionsUser = async (
  commentText: string,
  navigate: NavigateFunction,
  user: User | null
) => {
  if (user) {
    if (!user.emailVerified) {
      toast.error("Do you need verify your email after change options");
      console.error("Do you need verify your email after change options");
      return;
    }
    if (
      user.providerData.some((provider) => provider.providerId === "password")
    ) {
      const RAGEXEMAIL = /^[^@]+@gmail\.com$/;
      if (RAGEXEMAIL.test(commentText)) {
        toast.loading("Sending");
        // newEmail
        const newEmail: string = commentText;
        navigate("/verify", { state: { email: newEmail } });
        // } else if (!isNaN(Number(commentText))) {
      } else {
        const newUserName = commentText;
        toast.loading("Sending");
        try {
          await updateProfile(user, { displayName: newUserName });
          toast.dismiss();
          toast.success("User updated successfully");
        } catch {
          toast.dismiss();
          toast.error("An error occurred while updating the user");
        }
      }
    }
  }
};

// "/verify"
async function reutenticateFirebase(user: User | null, password: string) {
  try {
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
    } else {
      console.error("User not available or email missing");
      toast.error("User not available or email missing");
      return null;
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while re-authenticating the user");
    return null;
  }
}
export const changeOptionsEmail = async (
  password: string,
  navigate: NavigateFunction,
  newEmail: string,
  user: User | null
) => {
  const response = await reutenticateFirebase(user, password);
  if (response === null) return;

  if (newEmail && user) await verifyBeforeUpdateEmail(user, newEmail);

  toast.dismiss();
  toast(
    "Doy you need verify your new email. Please check your email for the verification link.",
    {
      duration: 10000,
      style: {
        background: "#333",
        color: "#fff",
      },
      icon: "🔔",
    }
  );

  setTimeout(() => {
    navigate("/");
  }, 10000);
};

export function resetPassword(email: string) {
  toast.loading("Sending");
  sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.dismiss();
      toast("Check your email for the password reset link. 📧", {
        duration: 10000,
        style: {
          background: "#333",
          color: "#fff",
        },
        icon: "🔔",
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
}

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

export async function delateUserFirebase(user: User | null, password: string) {
  if (!user) return;

  try {
    const response = await reutenticateFirebase(user, password);
    if (response === null) throw new Error("An unexpected error occurred");
    await deleteUser(user)
      .then(() => {
        toast.success(
          "User deleted successfully, We hope to see you back soon",
          {
            duration: 10000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}
