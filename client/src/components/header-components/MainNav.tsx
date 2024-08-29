import { Link, useNavigate } from "react-router-dom";
import Theme from "@/components/svg-component/Theme";
import Account from "@/components/svg-component/Account";
import { type ThemeProps } from "types/types";
import { handleClickNavigate } from "@/scripts/navigate";

const MainNav: React.FC<ThemeProps> = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" onClick={handleClickNavigate("/", navigate)}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/blog" onClick={handleClickNavigate("/blog", navigate)}>
            Blog
          </Link>
        </li>
        <li>
          <Link
            to="/aboutme"
            onClick={handleClickNavigate("/aboutme", navigate)}
          >
            About me
          </Link>
        </li>
        <li>
          <Link
            to="/newsetler"
            onClick={handleClickNavigate("/newsetler", navigate)}
          >
            Newsletter
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            onClick={handleClickNavigate("/contact", navigate)}
          >
            Contact
          </Link>
        </li>
        {window.innerWidth <= 766 && (
          <>
            <li>
              <Account>Account</Account>
            </li>
            <li>
              <Theme theme={theme} setTheme={setTheme}>
                Theme
              </Theme>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default MainNav;
