import { useState } from 'react';
import DefaultUser from '@/assets/svg/default-user.svg';

function ImgUser({ photoURL }: { photoURL: string | null }) {
  const [imgError, setImgError] = useState(false);

  return (
    <>
      {photoURL && !imgError ? (
        <img
          src={photoURL}
          alt="Photo profile user"
          onError={() => setImgError(true)}
          className="img-user"
        />
      ) : (
        <DefaultUser />
      )}
    </>
  );
}

export default ImgUser;
