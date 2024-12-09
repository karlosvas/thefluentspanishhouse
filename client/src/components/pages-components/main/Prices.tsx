import { useState } from "react";
import Button from "@/components/reusable/Button";
import FormSuscribe from "@/components/pages-components/main/FormSuscribe";
import { handleChangeModal } from "@/scripts/modal";

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
          handleSusribeChange={() => handleSusribeChange("form")}
          buttonName={buttonName}
        />
      )}
      <div className="div-pracing">
        <h2>What do my classes offer?</h2>
        <div className="flex-cards">
          <div className="card-pracing">
            <h3>Group classes</h3>
            <div className="price-classes">
              <h1>Since 15€</h1>
              <small>/ hour</small>
            </div>
            <ul>
              <li>A sample free 1-hour class for new students</li>
              <li>Private English lessons for two people at the same level</li>
              <li>Enjoy the benefits of individual classes combined with the dynamic interaction of a group class</li>
              <li>Access to exclusive online content</li>
              <li>And out-of-class communication with the teacher.</li>
            </ul>
            <Button event={() => handleSusribeChange("Group classes")}>
              GET A SAMPLE FREE <br />
              1-HOUR CLASS
            </Button>
          </div>
          <div className="card-pracing">
            <h3>One-to-one classes</h3>
            <div className="price-classes ">
              <h1>Since 22€</h1>
              <small>/ hour</small>
            </div>
            <ul>
              <li>A sample free 1-hour class for new students</li>
              <li> Personalized lessons according to the student’s level</li>
              <li>Access to exclusive online content,</li>
              <li>Homework assignments</li>
              <li>And out-of-class communication with the teacher.</li>
            </ul>
            <Button event={() => handleSusribeChange("One-to-one classes")}>
              GET A SAMPLE FREE <br />
              1-HOUR CLASS
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prices;
