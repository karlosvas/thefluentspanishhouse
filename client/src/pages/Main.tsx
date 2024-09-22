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
            src="img/2.webp"
            className="banner"
            alt="Banner with inspiring images, sevillana dance"
          >
            <strong>
              Hi, my name is Marta.
              <br /> I’m a Spanish teacher from Spain and I help English
              speakers become fluent in Spanish. <br />
            </strong>
            <br />
            Before becoming a language teacher, I studied English for many
            years. <br /> I spent most of my time filling in gaps in exercise
            books, reading, and writing. <br /> After quite a few years, I still
            struggled to say two words in a row, and I felt embarrassed to speak
            English. <br /> What holds many students back from speaking
            fluently? <br />
            That’s why we have been prioritizing incorrectly for many years.{" "}
            <br /> We use languages to connect with others through speech.{" "}
            <br /> So, understanding and mastering basic grammar is our top
            priority. <br /> If you need to change your language learning
            approach significantly, I can help you.
          </PlaceholderImg>
        </article>
        <div className="main-content">
          <img
            src="img/plantas.webp"
            className="planta left"
            alt="Image of decorative plants left"
          />
          <img
            src="img/plantas.webp"
            className="planta right"
            alt="Image of decorative plants right"
          />
          <div className="achievements-section">
            <h2>What you can achive with my assitence?</h2>
            <ul>
              <li>
                <h4>An effective focus on the top priorities:</h4>
                <p>
                  You will improve your understanding and speaking skills
                  through engaging, 100% oral interactive drills. You will
                  master essential Spanish language structures used in 90% of
                  daily conversations.
                </p>
              </li>
              <li>
                <h4>Guidance for correcting grammar and pronunciation</h4>
                <p>
                  You will learn to pronounce and connect words to improve
                  fluency while getting corrections to avoid ingrained mistakes.
                </p>
              </li>
              <li>
                <h4>A high dose of motivation that boosts your confidence</h4>
                <p>
                  You'll receive feedback on the learning process. Besides,
                  you’ll learn interesting facts about the language and the
                  culture which makes the lessons encouraging and stimulating.
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
