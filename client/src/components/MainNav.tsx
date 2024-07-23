import Theme from "./svg/Theme";
import Languajes from "./svg/Language";
import Account from "./svg/Account";
import { type NavType, type ThemeProps } from "../../types/types";
import { useLocation, useNavigate } from "react-router-dom";

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
                {hamburger[1]}
              </Theme>
            </li>
            <li>
              <Languajes>{hamburger[2]}</Languajes>
            </li>
            <li>
              <Account>{hamburger[3]}</Account>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
