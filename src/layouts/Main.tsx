// import Coments from '../components/Comments';
// import CardBlog from '../components/CardBlog'
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

        {/* <h2>Blog</h2>
        <div className="blog">
            <CardBlog />
            <CardBlog />
            <CardBlog />
            <CardBlog />
            <CardBlog />
            <CardBlog />
        </div>
        
        <div className="review">
            <h2>Review</h2>
            <Coments />
        </div>
        
        <div className="contact">
            <h2>Contact</h2>
        </div> */}
      </ main>
      {/* <footer>
        <h2>Footer</h2>
      </footer> */}
      </>
    )
  }
  
  export default Main