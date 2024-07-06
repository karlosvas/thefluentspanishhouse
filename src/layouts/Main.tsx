import Coments from '../components/Comments';
import CardBlog from '../components/CardBlog'
import ContactForm from '../components/ContactForm'
import { useTranslation } from 'react-i18next';
import '../styles/main.css'

function Main() {
  const [t] = useTranslation("global");
  const navInfo: string[] = t('navInfo', { returnObjects: true });
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

          <h2 id="hBlog">{navInfo[0]}</h2>
          <div className="blog">
              <CardBlog/>
          </div>
          
          <h2 id="hReviews">{navInfo[1]}</h2>
          <div className="review">
              <Coments/>
          </div>

          <ContactForm/>
        </ main>
      </>
    )
  }
  
  export default Main