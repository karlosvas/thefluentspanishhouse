import { type BackdropProps } from "../../../types/types";
import "../../styles/reusables/backdrop.css";

const Button: React.FC<BackdropProps> = ({ handleSusribeChange, closing }) => {
  return (
    <div
      className={`modalBackdropLog ${closing ? "closing" : ""}`}
      onClick={handleSusribeChange}
    ></div>
  );
};

export default Button;