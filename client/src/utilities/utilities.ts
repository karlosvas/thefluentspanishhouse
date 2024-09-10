import { getProvider } from "@/scripts/firebase-config";
import { resetPassword } from "@/scripts/firebase-options-users";
import { User } from "firebase/auth";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import { type NavigateFunction } from "react-router";
import { type ErrorResponseHelper, type OptionsChampTag } from "types/types";

// Función para manejar el cambio de un input
export const handleInputChange = <T extends Record<string, unknown>>(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setterReact: Dispatch<SetStateAction<T>>
) => {
  const { name, value, type } = event.target;
  if (type === "checkbox") {
    const { checked } = event.target as HTMLInputElement;
    setterReact((prev) => ({
      ...prev,
      [name]: checked as unknown as T[keyof T],
    }));
  } else {
    setterReact((prev) => ({
      ...prev,
      [name]: value as unknown as T[keyof T],
    }));
  }
};

export const forgotPasword = (user: User | null, navigate: NavigateFunction) => {
  if (user && user.email) {
    const currentProviderId = getProvider(user);
    console.log(currentProviderId);

    if (currentProviderId === "password") resetPassword(user.email, navigate);
    else {
      toast(`Can not reset password for accounts authenticated with ${getProvider(user)}.`, {
        duration: 10000,
        icon: "🔔",
      });
    }
  } else {
    navigate("/verify", { state: { reset: true } });
  }
};

export const getTag = (name: string): OptionsChampTag => {
  return name === "Group classes" ? "GROUP_CLASS" : "PRIVATE_CLASS";
};

export function errorMailchimp(error: ErrorResponseHelper) {
  const messageError = error.message?.detail;
  const status = error.status;
  if (messageError?.includes("permanently deleted")) {
    toast.error("This user is permanently deleted from Mailchimp, please contact with the support team.");
  } else if (messageError?.includes("is already a list member")) {
    toast("This user already exists in Mailchimp, We will try to offer better service ", {
      icon: "🙈",
    });
  }

  return { messageError, status };
}
