import { useState } from "react";
import Auth from "./Auth";
import Languajes from "./Languajes";
import Theme from "./Theme";

function Hamburger() {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
      setShowModal(!showModal);
    };
    
    document.documentElement.classList.add('light');

    return (
      <>
        <svg onClick={toggleModal}
            xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2" stroke="currentColor" className="svgIcon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        {showModal && 
            <>
                <div className="menuLeft">
                  <div className="svgIcon">
                    <Theme />
                    <Languajes/><br />
                  </div>
                  <div className="auth">
                    <Auth />
                  </div>
                </div>
                <div className="modalBackdrop" onClick={() => toggleModal()}></div>
            </>
        }
      </>
    );
  }
  
export default Hamburger;