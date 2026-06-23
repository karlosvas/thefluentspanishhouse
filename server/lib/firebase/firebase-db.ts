import { auth } from '../firebase/firebase-config.js';

// Función para obtener UID por correo electrónico
export const getUidByEmail = async (email: string): Promise<string | null> => {
  try {
    const userRecord = await auth.getUserByEmail(email);
    return userRecord.uid;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
