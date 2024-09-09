import { type PublicationCardType, type Comment } from "types/types";

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
      [name]: checked,
    }));
  } else {
    setterReact((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

// Función de tipo guardia para verificar si un objeto es de tipo PublicationCardType
export function isPublicationCardType(obj: unknown): obj is PublicationCardType {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as PublicationCardType)._id === "string" &&
    typeof (obj as PublicationCardType).title === "string" &&
    typeof (obj as PublicationCardType).subtitle === "string" &&
    typeof (obj as PublicationCardType).content === "string" &&
    typeof (obj as PublicationCardType).base64_img === "string" &&
    typeof (obj as PublicationCardType).currentPage === "number"
  );
}

// Función de tipo guardia para verificar si un objeto es un array de Comment
export function isCommentArray(obj: unknown): obj is Comment[] {
  return (
    Array.isArray(obj) &&
    obj.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item._id === "string" &&
        typeof item.pattern_id === "string" &&
        typeof item.owner === "object" &&
        item.owner !== null &&
        typeof item.owner.uid === "string" &&
        typeof item.owner.displayName === "string" &&
        typeof item.owner.email === "string" &&
        typeof item.owner.photoURL === "string" &&
        typeof item.data === "string" &&
        typeof item.likes === "number" &&
        Array.isArray(item.likedBy) &&
        Array.isArray(item.answers)
    )
  );
}
