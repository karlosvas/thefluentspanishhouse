import { useNavigate } from 'react-router-dom';
import { isLogged } from '@/services/oauth2-0';
import SettingsSVG from '@/assets/svg/settings.svg';
import toast from 'react-hot-toast';

const Settings = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();

  function goToAccount(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isLogged()) navigate('/account');
    else toast.error('You need to log in first');
    event.preventDefault();
  }

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
