import { Link, useNavigate } from 'react-router-dom';
import { handleClickNavigate } from '@/scripts/navigate';
import Settings from '../svg-component/Settings';
import Theme from './Theme';

const MainNav = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={handleClickNavigate('/', navigate)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/blog/1" onClick={handleClickNavigate('/blog', navigate)}>
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/aboutme"
            onClick={handleClickNavigate('/aboutme', navigate)}
          >
            About me
          </Link>
        </li>
        <li>
          <Link
            to="/newsletter"
            onClick={handleClickNavigate('/newsletter', navigate)}
          >
            Newsletter
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            onClick={handleClickNavigate('/contact', navigate)}
          >
            Contact
          </Link>
        </li>
        {window.innerWidth <= 766 && (
          <>
            <li>
              <Settings>Account</Settings>
            </li>
            <li>
              <Theme>Theme</Theme>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
