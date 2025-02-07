import { resetPassword } from '@/services/firebase-options-users';
import { User } from 'firebase/auth';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';
import { type NavigateFunction } from 'react-router';
import { type ErrorResponseHelper, type OptionsChampTag } from 'types/types';
import { isPasswordProvider } from './validations';

// Función para manejar el cambio en los formularios
// Tipo objeto string: desconocido, donde el desconocido puede ser cualquier tipo de valor, el evento puede ser input o textarea, y el setter de react puede ser cualquier tipo de dato.
export const handleInputChange = <T extends Record<string, unknown>>(
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setterReact: Dispatch<SetStateAction<T>>
) => {
  const { name, value, type } = event.target;
  if (type === 'checkbox') {
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

// Envio de correo para restablecer la contraseña
export const forgotPasword = (
  user: User | null,
  navigate: NavigateFunction
) => {
  if (user && user.email) {
    if (isPasswordProvider(user)) resetPassword(user.email, navigate);
    else {
      toast.error(
        `Can not reset password for accounts authenticated with ${getProvider(user)}.`,
        {
          duration: 10000,
        }
      );
    }
  } else {
    navigate('/verify', { state: { reset: true } });
  }
};

// Función para obtener el tipo de tag de mailchip
export const getTag = (name: string): OptionsChampTag => {
  return name === 'Group classes' ? 'GROUP_CLASS' : 'PRIVATE_CLASS';
};

// Función para manejar los errores de mailchimp
export function errorMailchimp(error: ErrorResponseHelper) {
  const titleMessage = error.message?.title;
  const messageError = error.message?.detail;
  const status = error.status;

  if (messageError?.includes('permanently deleted')) {
    toast.error(
      'This user is permanently deleted from Mailchimp, please contact with the support team.'
    );
  } else if (titleMessage == 'Member Exists') {
    toast(
      'This user already exists in Mailchimp, We will try to offer better service ',
      {
        icon: '🙈',
        duration: 10000,
      }
    );
  }

  return { messageError, status };
}

// Recisar si estaba enteriormente en localstorage
export function getTheme() {
  const darkorligth = localStorage.getItem('theme');
  return darkorligth || 'light';
}

export const toggleThemeSVG = (
  theme: string,
  setTheme: Dispatch<SetStateAction<string>>
) => {
  setTheme(theme === 'light' ? 'dark' : 'light');
};

export function getAdmin(user: User | null) {
  return import.meta.env.VITE_ADMINS.split(',').includes(
    user?.email?.split('@')[0]
  );
}

// Obtiene el proveedor de autenticación del usuario actual
export function getProvider(user: User) {
  const providerId = user.providerData[0].providerId;
  let providerName = '';
  switch (providerId) {
    case 'google.com':
      providerName = 'Google';
      break;
    case 'facebook.com':
      providerName = 'Facebook';
      break;
    default:
      providerName = providerId;
      break;
  }
  return providerName;
}
