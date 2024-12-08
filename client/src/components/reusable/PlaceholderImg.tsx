import { versionSmall } from "@/constants/global";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";
import { PlaceholderProps } from "types/types";

const PlaceholderImg: React.FC<PlaceholderProps> = ({
  src,
  className,
  alt,
  areaLabel,
  children,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoad = () => {
    setImgLoaded(true);
  };

  const handleError = () => {
    setImgLoaded(false);
  };

  const srcSet: string = versionSmall.includes(src)
  ? `${src}-sm.webp 750w, ${src}.webp 1024w`
  : `${src}.webp 1024w`;

  return (
    <>
      <figure>
        {!imgLoaded && (
          <Placeholder
            as="div"
            animation="glow"
            className={`card-img-placeholder ${className}`}
          ></Placeholder>
        )}
        <img
          className={className}
          src={`${src}.webp`}
          srcSet={srcSet}
          sizes="(max-width: 750px) 750px, 1024px"
          alt={alt}
          aria-label={areaLabel}
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: imgLoaded ? "block" : "none" }}
        />
        <figcaption>{children}</figcaption>
      </figure>
    </>
  );
};

export default PlaceholderImg;
