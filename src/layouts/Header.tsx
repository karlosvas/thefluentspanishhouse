import Hamburger from '../components/Hamburger';
import Auth from '../components/Auth';
import Languajes from '../components/Languajes';
import Theme from '../components/Theme'
import { useTranslation } from 'react-i18next';
import '../styles/header.css'

function Header() {
    const [t] = useTranslation("global");
  const navInfo: string[] = t('navInfo', { returnObjects: true });

    return (
      <>
        <header>
            <div className="header">
                <div id='logoOrHamburger'>
                    {window.innerWidth > 766 ? (
                        <a href="#mainTitle">
                            <img src="/img/logo.png" alt="fluent spanish house logo" id='logo'/>
                        </a>
                    ) : (
                        <Hamburger />
                    )}
                </div>
                <nav>
                    <ul>
                        <li><a href="#hBlog">{navInfo[0]}</a></li>
                        <li><a href="#hReviews">{navInfo[1]}</a></li>
                        <li><a href="#hForm">{navInfo[2]}</a></li>
                    </ul>
                </nav>
                {window.innerWidth > 766 && (
                    <div className="navIcons">
                    <Languajes />
                    <Theme />
                    <div className="auth">
                        <Auth />
                    </div>
                </div>
                )}
            </div>
        </header>
      </>
    )
}

export default Header

