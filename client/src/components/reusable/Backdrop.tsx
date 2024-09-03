import { type BackdropProps } from "types/types";
import "@/styles/reusables/backdrop.css";

const Button: React.FC<BackdropProps> = ({ handleSusribeChange, closing }) => {
  console.log("Backdrop");
  return (
    <div
      className={`modal-backdropLog ${closing ? "closing" : ""}`}
      onClick={handleSusribeChange}
    ></div>
  );
};

export default Button;
