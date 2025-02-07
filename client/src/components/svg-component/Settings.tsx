import { useNavigate } from 'react-router-dom';
import { isLogged } from '@/services/oauth2-0';
import SettingsSVG from '@/assets/svg/settings.svg';
import toast from 'react-hot-toast';

const Settings = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  // Redirige a la configuración cuenta del usuario
  function goToAccount(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isLogged()) navigate('/account');
    else toast.error('You need to log in first');
    event.preventDefault();
  }

  // Puede ser tanto un enlace como un botón svg
  return (
    <>
      <a href="/account" onClick={goToAccount}>
        <div className="menu-section">
          {children ? children : <SettingsSVG />}
        </div>
      </a>
    </>
  );
};

export default Settings;
