import Carrousel from "@/components/pages-components/main/Carrousel";
import Prices from "@/components/pages-components/main/Prices";
import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import "@/styles/main.css";
import { Helmet } from "react-helmet-async";

const Main = () => {
  return (
    <>
      <Helmet>
        <title>The Fluent Spanish House</title>
        <meta
          name="description"
          content="Private teacher, The Fluent Spanish House. Discover Spanish with fluency and precision alongside Marta Gutiérrez Fonseca. Our goal is to help you consolidate essential grammatical structures, ensuring you speak with confidence and impeccable pronunciation. From beginner to advanced levels, each class is designed to help you master the language dynamically and effectively"
        ></meta>
      </Helmet>

      <main className="main-index">
        <article className="main-title">
          <h1 id="title">The Fluent Spanish House</h1>
          <PlaceholderImg
            src="img/carretera.webp"
            className="banner"
            alt="Banner with inspiring images, sevillana dance"
          >
            <span>Hi, my name is Marta</span>
            <br /> I’m a <strong>Spanish teacher</strong> from Spain who helps <strong>English speakers</strong> to get{" "}
            <strong>fluent in Spanish</strong>. <br />
            <br />
            Learning a language is an <strong>exciting journey</strong>, but you need
            <strong> perseverance</strong> to get positive results. I was about to quit many times until I found out
            what was holding me back. I’d been
            <strong> prioritizing incorrectly</strong> for many years. <br />
            <strong>That breakthrough was a real turning point for me!</strong>
          </PlaceholderImg>
        </article>
        <div className="main-content">
          <img src="img/plantas.webp" className="planta left" alt="Image of decorative plants left" />
          <img src="img/plantas.webp" className="planta right" alt="Image of decorative plants right" />
          <div className="achievements-section">
            <h2>What you can achive with my assitence?</h2>
            <ul>
              <li>
                <h4>An effective focus on the number one priorities:</h4>
                <p>
                  Listening, comprehension and speaking. You’ll practice and improve your listening comprehension and
                  speaking through engaging and interactive drills 100% oral. You will use essential Spanish language
                  structures in 90% of daily conversations.
                </p>
              </li>
              <li>
                <h4>Guidance to correct grammar and pronunciation.</h4>
                <p>
                  You’ll learn how to connect words to gain fluency and receive the necessary corrections to avoid
                  permanently ungrained mistakes.
                </p>
              </li>
              <li>
                <h4>A high dose of motivation that boosts your confidence.</h4>
                <p>
                  I’ll get ongoing feedback on the learning process. Besides, you’ll learn interesting facts about the
                  language and the culture which makes the lessons encouraging and stimulating.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <Prices />
        <div className="main-reviews">
          <h2>What my students say about me</h2>
          <Carrousel />
        </div>
      </main>
    </>
  );
};

export default Main;
