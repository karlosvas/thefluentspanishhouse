import { ButtonCloseProps } from "../../../types/types";

const ButtonClose: React.FC<ButtonCloseProps> = ({ handleSusribeChange }) => {
  return (
    <span className="closeAuth" onClick={() => handleSusribeChange()}>
      &times;
    </span>
  );
};

export default ButtonClose;
