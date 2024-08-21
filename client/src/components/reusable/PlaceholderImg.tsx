import { PlaceholderProps } from "react-bootstrap/esm/Placeholder";

const PlaceholderImg: React.FC<PlaceholderProps> = ({ id, className }) => {
  return <div className={`card-img-placeholder ${className}`} id={id}></div>;
};

export default PlaceholderImg;
