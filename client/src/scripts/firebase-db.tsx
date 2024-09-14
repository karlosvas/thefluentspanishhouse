import { get, ref, set, update } from "firebase/database"; // Asegúrate de importar las funciones necesarias
import { dbFirebase } from "./firebase-config";

// Función para guardar un usuario
export function saveUser(userId: string, userClass: string) {
  // Crea una referencia a la ruta donde guardarás los datos del usuario
  const userRef = ref(dbFirebase, "usuarios/" + userId);

  // Verifica si el usuario ya existe en la base de datos
  get(userRef)
    .then((snapshot) => {
      if (!snapshot.exists()) {
        // El usuario no existe, así que lo guardamos
        const userData = {
          id: userId,
          class: [userClass],
        };

        // Guardamos los datos del usuario
        set(userRef, userData)
          .then(() => {
            console.log("Usuario guardado correctamente");
          })
          .catch((error) => {
            console.error("Error al guardar el usuario:", error);
          });
      } else {
        // El usuario ya existe asique agregamos la nueva class
        const lastTag = userClass;
        addClass(userId, lastTag);
      }
    })
    .catch((error) => {
      console.error("Error al verificar si el usuario existe:", error);
    });
}

// Función para agregar una clase a un usuario existente
function addClass(userId: string, newClass: string) {
  // Referencia al usuario en la base de datos
  const userRef = ref(dbFirebase, "usuarios/" + userId);

  // Primero obtenemos el arreglo de clases actual
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const currentClasses = userData.class || [];

        // Verificamos que la clase no esté duplicada
        if (!currentClasses.includes(newClass)) {
          currentClasses.push(newClass); // Agregamos la nueva clase al array

          // Actualizamos la base de datos con el nuevo array de clases
          update(userRef, {
            class: currentClasses,
          })
            .then(() => {
              console.log("Clase agregada correctamente");
            })
            .catch((error) => {
              console.error("Error al actualizar las clases:", error);
            });
        } else {
          console.log("La clase ya está en el listado");
        }
      } else {
        console.log("El usuario no existe en la base de datos");
      }
    })
    .catch((error) => {
      console.error("Error al obtener los datos del usuario:", error);
    });
}
