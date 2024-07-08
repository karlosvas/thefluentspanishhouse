export function toggleModal(
  showModal: boolean,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) {
  setShowModal(!showModal);
}
