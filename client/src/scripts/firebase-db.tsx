import { get, ref, set, update } from 'firebase/database'; // Asegúrate de importar las funciones necesarias
import { dbFirebase } from './firebase-config';
import toast from 'react-hot-toast';
import { OptionsChampTag, SubscriberType } from 'types/types';

// Función para guardar un usuario
export async function saveUser(userId: string, newSubscriber: SubscriberType) {
  // Crea una referencia a la ruta donde guardarás los datos del usuario
  const userRef = ref(dbFirebase, 'usuarios/' + userId);

  // Verifica si el usuario ya existe en la base de datos

  get(userRef)
    .then((snapshot) => {
      // Si el usuario no existe
      if (snapshot.exists()) {
        // El usuario ya existe asique agregamos la nueva classe
        addTag(userId, newSubscriber);
      } else {
        // Creamos un objeto con los datos del usuario
        const userData = {
          id: userId,
          email: newSubscriber.email,
          class: [],
        };

        // Guardamos los datos del usuario
        set(userRef, userData)
          .then(() => {
            // Usuario almacenado correctamente
            addTag(userId, newSubscriber);
          })
          .catch((error) => {
            console.error('Error al guardar el usuario:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error al verificar si el usuario existe:', error);
    });
}

// Función para agregar una clase a un usuario existente
function addTag(userId: string, newSubscriber: SubscriberType) {
  // Referencia al usuario en la base de datos
  const userRef = ref(dbFirebase, 'usuarios/' + userId);

  // Primero obtenemos el arreglo de clases actual
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const currentClasses = userData.class || [];

        console.log('currentClasses:', currentClasses);

        // Verificamos que la clase no esté duplicada
        if (!currentClasses.includes(newSubscriber.class)) {
          // Agregamos la nueva clase al array
          currentClasses.push(newSubscriber.class);

          // Actualizamos la base de datos con el nuevo array de clases
          update(userRef, {
            class: currentClasses,
          })
            .then(() => {
              toast.dismiss();
              toast.success(
                <span>
                  <b>
                    {newSubscriber.name} {newSubscriber.lastname}
                  </b>{' '}
                  you have been successfully subscribed to the course
                </span>,
                {
                  duration: 10000,
                }
              );
            })
            .catch((error) => {
              console.error('Error al actualizar las clases:', error);
            });
        } else {
          toast.dismiss();
          // Verificamos si esta suscrito a esa misma clase
          toast(
            'This user already exists in a class, we will try to offer a better service.',
            {
              icon: '🙈',
              duration: 10000,
            }
          );
        }
      } else {
        console.error('The user does not exist in the database');
      }
    })
    .catch((error) => {
      console.error('Error al obtener los datos del usuario:', error);
    });
}

// Función para obtener un usuario de la DB
export async function getUserDB(userId: string) {
  const userRef = ref(dbFirebase, 'usuarios/' + userId);

  // Si el usuario existe, obtenemos sus datos
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) return snapshot.val();
      else return null;
    })
    .catch((error) => {
      console.error('Error al obtener los datos del usuario:', error);
    });
}

// Función para obtener los tags de usuarios de la DB
export const getUserClass = async (
  userId: string
): Promise<OptionsChampTag[] | null> => {
  const userRef = ref(dbFirebase, `users/${userId}`);

  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return userData.class || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
