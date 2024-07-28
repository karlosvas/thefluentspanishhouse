import { forwardRef } from "react";
import { type ButtonProps } from "../../../types/types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, event, id, type },
  ref
) {
  return (
    <button
      style={{ borderRadius: "5px" }}
      type={type}
      onClick={event}
      id={id}
      ref={ref}
    >
      {children}
    </button>
  );
});

export default Button;
