import { type ButtonProps } from "../../../types/types";

export default function Button({ children, event, id, type }: ButtonProps) {
  return (
    <button style={{ borderRadius: "5px" }} type={type} onClick={event} id={id}>
      {children}
    </button>
  );
}
