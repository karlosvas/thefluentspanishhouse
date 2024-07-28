import { useLocation, useNavigate } from "react-router-dom";
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
          <a href="/" onClick={handleClick("/")}>
            Home
          </a>
        </li>
        <li>
          <a href="/blog" onClick={handleClick("/blog")}>
            Blog
          </a>
        </li>
        <li>
          <a href="/aboutme" onClick={handleClick("/aboutme")}>
            About me
          </a>
        </li>
        <li>
          <a href="/newsetler" onClick={handleClick("/newsetler")}>
            Newsetler
          </a>
        </li>
        <li>
          <a href="/contact" onClick={handleClick("/contact")}>
            Contact
          </a>
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
