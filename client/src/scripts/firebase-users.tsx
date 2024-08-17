import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import toast from "react-hot-toast";
import { getUser } from "./oauth2-0";
import { NavigateFunction } from "react-router-dom";

export const changeOptionsUser = async (
  commentText: string,
  navigate: NavigateFunction
) => {
  const user = getUser();

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
        const newEmail: string = commentText;
        navigate(`/verify?email=${newEmail}`);
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
export const changeOptionsEmail = async (
  password: string,
  navigate: NavigateFunction,
  newEmail: string
) => {
  const currentUser = getUser();
  if (currentUser && currentUser.email) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    await reauthenticateWithCredential(currentUser, credential);
  } else {
    console.error("User not available or email missing");
    toast.error("User not available or email missing");
    return;
  }

  if (newEmail) await verifyBeforeUpdateEmail(currentUser, newEmail);

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
