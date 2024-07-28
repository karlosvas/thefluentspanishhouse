import { useState } from "react";
import Button from "../../reusable/Buuton";
import { type Translations } from "../../../../types/types";
import FormSuscribe from "../../render-data/FormSuscribe";
import { handleChangeModal } from "../../../scripts/modal";

const Prices: React.FC<Translations> = ({ translation }) => {
  const prices = translation("pricing", { returnObjects: true });
  const inscription: string[] = translation("inscriction", {
    returnObjects: true,
  });

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
            <h3>{prices[0].type}</h3>
            <div className="price">
              <h1>{prices[0].price}</h1>
              <small>{prices[0].duration}</small>
            </div>
            <ul>
              {(() => {
                const listItems = [];
                for (let i = 0; i < prices[0].features.length; i++) {
                  listItems.push(
                    <li key={i} className={i >= 3 ? "notPrivileges" : ""}>
                      {prices[0].features[i]}
                    </li>
                  );
                }
                return listItems;
              })()}
              <Button event={() => handleSusribeChange("FreeClass")}>
                {inscription[0]}
              </Button>
            </ul>
          </div>
          <div className="cardPracing">
            <h3>{prices[1].type}</h3>
            <div className="price">
              <h1>{prices[1].price}</h1>
              <small>{prices[1].duration}</small>
            </div>
            <ul>
              {(() => {
                const listItems = [];
                for (let i = 0; i < prices[1].features.length; i++) {
                  listItems.push(
                    <li key={i} className={i >= 4 ? "notPrivileges" : ""}>
                      {prices[1].features[i]}
                    </li>
                  );
                }
                return listItems;
              })()}
              <Button event={() => handleSusribeChange("GroupClass")}>
                {inscription[1]}
              </Button>
            </ul>
          </div>
          <div className="cardPracing">
            <h3>{prices[2].type}</h3>
            <div className="price">
              <h1>{prices[2].price}</h1>
              <small>{prices[2].duration}</small>
            </div>
            <ul>
              {(() => {
                const listItems = [];
                for (let i = 0; i < prices[2].features.length; i++) {
                  listItems.push(<li key={i}>{prices[2].features[i]}</li>);
                }
                return listItems;
              })()}
              <Button event={() => handleSusribeChange("PrivatedClass")}>
                {inscription[2]}
              </Button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prices;
