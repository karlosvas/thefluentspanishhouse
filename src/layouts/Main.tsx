import Coments from '../components/Comments';
import CardBlog from '../components/CardBlog'
import Footer from '../layouts/Footer'
import ContactForm from '../components/ContactForm'
import { useTranslation } from 'react-i18next';


function Main() {
  const [t ] = useTranslation("global");

    return (
      <>
        <main>
          <img className='banner' src="/img/banner.png" alt="Banner with inspiring images" />
          <div id='mainTitle'>
            <h1 id='title'>{t("title")}</h1>
            <p>
              {t("descriptionTitle")}
            </p>
          </div>

          <h2 id="hBlog">Blog</h2>
          <div className="blog">
              <CardBlog/>
          </div>
          
          <h2 id="hReviews">Reviews</h2>
          <div className="review">
              <Coments/>
          </div>

          <ContactForm/>
        </ main>
        <footer>
          <Footer/>
        </footer>
      </>
    )
  }
  
  export default Main