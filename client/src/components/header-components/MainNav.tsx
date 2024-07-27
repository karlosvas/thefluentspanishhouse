import { useLocation, useNavigate } from "react-router-dom";
import Theme from "../svg-component/Theme";
import Account from "../svg-component/Account";
import { type NavType, type ThemeProps } from "../../../types/types";

const MainNav: React.FC<NavType & ThemeProps> = ({
  navInfo,
  hamburger,
  theme,
  setTheme,
}) => {
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
            {navInfo[0]}
          </a>
        </li>
        <li>
          <a href="/blog" onClick={handleClick("/blog")}>
            {navInfo[1]}
          </a>
        </li>
        <li>
          <a href="/aboutme" onClick={handleClick("/aboutme")}>
            {navInfo[2]}
          </a>
        </li>
        <li>
          <a href="/newsetler" onClick={handleClick("/newsetler")}>
            {navInfo[3]}
          </a>
        </li>
        <li>
          <a href="/contact" onClick={handleClick("/contact")}>
            {navInfo[4]}
          </a>
        </li>
        {window.innerWidth <= 766 && (
          <>
            <li>
              <Theme theme={theme} setTheme={setTheme}>
                {hamburger[0]}
              </Theme>
            </li>
            <li>
              <Account>{hamburger[2]}</Account>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
