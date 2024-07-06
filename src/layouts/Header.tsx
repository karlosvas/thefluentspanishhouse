import Hamburger from '../components/Hamburger';
import Auth from '../components/Auth';
import Languajes from '../components/Languajes';
import Theme from '../components/Theme'

function Header() {
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
                        <li><a href="#hBlog">Blog</a></li>
                        <li><a href="#hReviews">Reviews</a></li>
                        <li><a href="#hForm">Contact</a></li>
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

