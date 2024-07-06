import { useTranslation } from 'react-i18next';
import '../styles/blog.css'

type CardType = {
  title: string;
  content: string;
};

function CardBlog() {
  const [t] = useTranslation("global");
  const cardsBlog: CardType[] = t('cardsBlog', { returnObjects: true });

      return (
        <>
          {cardsBlog.map((item, index) => (
            <div className="cardBlog" key={index}>
              <img src={`/img/${index}.png`} alt="" />
              <h3>{item.title}</h3>
              <p>{item.content}</p>
            </div>
          ))} 
        </>
      )
    }
    
export default CardBlog