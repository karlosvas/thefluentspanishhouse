import { Dispatch, SetStateAction } from "react";

export function toggleModal(
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
) {
  setShowModal(!showModal);
}

export const toggleFormType = (
  type: string,
  setFormType: Dispatch<SetStateAction<string>>,
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>
) => {
  setFormType(type);
  toggleModal(showModal, setShowModal);
};

export const handleScroll = (showModal: boolean) => {
  showModal
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");
};

export const handleChangeModal = (
  showModal: boolean,
  setClosing: (value: boolean) => void,
  setShowModal: (value: boolean) => void
) => {
  if (showModal) {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
      handleScroll(false);
    }, 500);
  } else {
    setShowModal(true);
    handleScroll(true);
  }
};
