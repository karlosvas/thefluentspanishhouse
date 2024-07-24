import { type Translations } from "../../types/types";
import Button from "./reusable/Buuton";
import "../styles/main/inscription.css";

const Inscriptions: React.FC<Translations> = ({ translation }) => {
  const inscription: string[] = translation("inscriction", {
    returnObjects: true,
  });
  return (
    <>
      <div className="incriptions">
        <h2>Inscriptions to newtseler</h2>
        <Button>{inscription[0]}</Button>
        <Button>{inscription[1]}</Button>
        <Button>{inscription[2]}</Button>
        <Button>{inscription[3]}</Button>
      </div>
    </>
  );
};

export default Inscriptions;
