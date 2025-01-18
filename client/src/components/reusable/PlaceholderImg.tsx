import { useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import { PlaceholderProps } from 'types/types';

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
          alt={alt}
          aria-label={areaLabel}
          onLoad={handleLoad}
          onError={handleError}
          style={{ display: imgLoaded ? 'block' : 'none' }}
        />
        <figcaption>{children}</figcaption>
      </figure>
    </>
  );
};

export default PlaceholderImg;
