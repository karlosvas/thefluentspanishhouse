import { ButtonCloseProps } from "types/types";

const ButtonClose: React.FC<ButtonCloseProps> = ({
  handleSusribeChange,
  className,
}) => {
  const handleClick = () => {
    if (typeof handleSusribeChange === "function") {
      handleSusribeChange();
    }
  };

  return (
    <span
      className={`close-auth ${className ? className : ""}`}
      onClick={handleClick}
    >
      &times;
    </span>
  );
};

export default ButtonClose;
