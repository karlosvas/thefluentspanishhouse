import { forwardRef } from "react";
import { type ButtonProps } from "types/types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, event, id, type, suscribe },
  ref
) {
  let buttonStyle: React.CSSProperties = {
    borderRadius: "5px",
  };

  if (type === "submit" && suscribe !== undefined) {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: suscribe ? "#000080" : "transparent",
    };
  }
  return (
    <button
      style={buttonStyle}
      type={type}
      onClick={event}
      id={id}
      ref={ref}
      {...(suscribe !== undefined && { disabled: suscribe })}
    >
      {children}
    </button>
  );
});

export default Button;
