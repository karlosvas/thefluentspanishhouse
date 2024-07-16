import { Dispatch, SetStateAction } from "react";

export function toggleModal(
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
) {
  setShowModal(!showModal);
}

export const toogleFormType = (type: string,  setFormType:Dispatch<SetStateAction<string>> ,showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>) => {
  setFormType(type);
  toggleModal(showModal, setShowModal);
};
