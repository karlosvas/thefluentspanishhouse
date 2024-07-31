import { Link, useLocation, useNavigate } from "react-router-dom";
import Theme from "../svg-component/Theme";
import Account from "../svg-component/Account";
import { type ThemeProps } from "../../../types/types";

const MainNav: React.FC<ThemeProps> = ({ theme, setTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick =
    (path: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      location.pathname === path ? event.preventDefault() : navigate(path);
    };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={handleClick("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/blog" onClick={handleClick("/blog")}>
            Blog
          </Link>
        </li>
        <li>
          <Link to="/aboutme" onClick={handleClick("/aboutme")}>
            About me
          </Link>
        </li>
        <li>
          <Link to="/newsetler" onClick={handleClick("/newsetler")}>
            Newsetler
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={handleClick("/contact")}>
            Contact
          </Link>
        </li>
        {window.innerWidth <= 766 && (
          <>
            <li>
              <Theme theme={theme} setTheme={setTheme}>
                Theme
              </Theme>
            </li>
            <li>
              <Account>Account</Account>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
