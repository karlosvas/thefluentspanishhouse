import { useState } from "react";
import Button from "../../reusable/Buuton";
import FormSuscribe from "../../render-data/FormSuscribe";
import { handleChangeModal } from "../../../scripts/modal";

const Prices = () => {
  const [showModalSuscribe, setShowModalSuscribe] = useState(false);
  const [closing, setClosing] = useState(false);
  const [buttonName, setButtonName] = useState("");

  const handleSusribeChange = (name: string) => {
    if (name !== "form") setButtonName(name);
    handleChangeModal(showModalSuscribe, setClosing, setShowModalSuscribe);
  };

  return (
    <>
      {showModalSuscribe && (
        <FormSuscribe
          closing={closing}
          handleChange={() => handleSusribeChange("form")}
          buttonName={buttonName}
        />
      )}
      <div className="divPracing">
        <h2>What do our classes offer?</h2>
        <div className="flex-card">
          <div className="cardPracing">
            <h3>Free class for beginners</h3>
            <div className="price">
              <h1>60</h1>
              <small>mins</small>
            </div>
            <ul>
              <li>Access to online resources</li>
              <li>Group classes</li>
              <li>Written assessment report at the end of the class</li>
              <li className="notPrivileges">
                Access to exclusive content and homework assignments
              </li>
              <li className="notPrivileges">
                Tailor-made materials to work in and out of class
              </li>
              <li className="notPrivileges">Access to exclusive content</li>
              <li className="notPrivileges">
                Out-of-class communication with the teacher via WhatsApp,
                Messenger, or email to solve questions whenever necessary
              </li>
            </ul>
            <Button event={() => handleSusribeChange("FreeClass")}>
              GET FREE INITIAL COURSE 🍃
            </Button>
          </div>
          <div className="cardPracing">
            <h3>Group classes</h3>
            <div className="price">
              <h1>15€</h1>
              <small>/ hour</small>
            </div>
            <ul>
              <li>Access to online resources</li>
              <li>
                Personalized classes according to the level of the group to
                which you belong
              </li>
              <li>Tailor-made materials to work in and out of class</li>
              <li>Personalized classes according to your level</li>
              <li className="notPrivileges">Access to exclusive content</li>
              <li className="notPrivileges">
                Out-of-class communication with the teacher via WhatsApp,
                Messenger, or email to solve questions whenever necessary.
              </li>
            </ul>
            <Button event={() => handleSusribeChange("GroupClass")}>
              GET GROUP CLASSES 🥘
            </Button>
          </div>
          <div className="cardPracing">
            <h3>Private classes</h3>
            <div className="price">
              <h1>21€</h1>
              <small>/ hour</small>
            </div>
            <ul>
              <li>Access to exclusive content</li>
              <li>Personalized classes according to your level</li>
              <li>Tailor-made materials to work in and out of class</li>
              <li>Email and chat support</li>
              <li>Access to exclusive content and homework assignments</li>
              <li>
                Out-of-class communication with the teacher via WhatsApp,
                Messenger, or email to solve questions whenever necessary.
              </li>
            </ul>
            <Button event={() => handleSusribeChange("PrivatedClass")}>
              GET PRIVATE CLASSES 💯‼️
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prices;
