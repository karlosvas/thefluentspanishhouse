import { getProvider } from "@/scripts/firebase-config";
import { resetPassword } from "@/scripts/firebase-options-users";
import { User } from "firebase/auth";
import toast from "react-hot-toast";
import { type NavigateFunction } from "react-router";

// Función para manejar el cambio de un input
export const handleInputChange = <T extends Record<string, unknown>>(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  setterReact: React.Dispatch<React.SetStateAction<T>>
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
