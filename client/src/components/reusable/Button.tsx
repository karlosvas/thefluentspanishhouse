import { forwardRef } from "react";
import { type ButtonProps } from "types/types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, event, id, type, suscribe, className },
  ref
) {
  let buttonStyle: React.CSSProperties = {
    borderRadius: "5px",
  };

  if (type == "submit" && suscribe !== undefined) {
    buttonStyle = {
      ...buttonStyle,
      backgroundColor: suscribe ? "#000080" : "var(--primary-blue)",
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
      {...(className !== undefined && { className })}
    >
      {children}
    </button>
  );
});

export default Button;
