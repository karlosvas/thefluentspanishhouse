import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginModal from './ModalAuth';

function Auth() {
    const [ t, i18n ] = useTranslation("global");
    const [ showModal, setShowModal ] = useState(false);

    function toggleModal(){
        setShowModal(!showModal);
    }

    return (
      <>
        <LoginModal />
      </>
    )
}

export default Auth;