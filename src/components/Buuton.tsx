import { type ButtonProps } from "../../types/types";

function Button({ children, event, id, type }: ButtonProps) {
  return (
    <button type={type} onClick={event} id={id}>
      {children}
    </button>
  );
}

export default Button;
