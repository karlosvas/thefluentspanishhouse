import Prices from "@/components/pages-components/main/Prices";
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
      {/* {!imageLoaded && <PlaceholderImg id="banner" />}
      <img
        id="banner"
        src="/img/banner.webp"
        alt="Banner with inspiring images, sevillana dance"
        onError={() => setImageLoaded(false)}
        onLoad={() => setImageLoaded(true)}
        style={{
          display: imageLoaded ? "block" : "none",
        }}
      /> */}
      <main className="main-index">
        <div className="main-title">
          <h1 id="title">The Fluent Spanish House</h1>
          <p>
            Hi, my name is Marta. I’m a Spanish teacher from Spain who helps
            English speakers to get fluent in Spanish. Learning a language is an
            exciting journey, but you need perseverance to get positive results.
            I was about to quit many times until I found out what was holding me
            back. I’d been prioritizing incorrectly for many years. That
            breakthrough was a real turning point for me!
          </p>
          <h2>WHAT YOU CAN ACHIEVE WITH MY ASSISTANCE</h2>
          <h4>● An effective focus on the number one priorities: listening</h4>
          <p>
            Comprehension and speaking. You’ll practice and improve your
            listening comprehension and speaking through engaging and
            interactive drills 100% oral. You will use essential Spanish
            language structures in 90% of daily conversations.
          </p>
          <h4>● Guidance to correct grammar and pronunciation.</h4>
          <p>
            You’ll learn how to connect words to gain fluency and receive the
            necessary corrections to avoid permanently ungrained mistakes. ● A
            high dose of motivation that boosts your confidence. I’ll get
            ongoing feedback on the learning process. Besides, you’ll learn
            interesting facts about the language and the culture which makes the
            lessons encouraging and stimulating.
          </p>
        </div>
        <Prices />
        <h2>WHAT MY STUDENTS SAY ABOUT ME</h2>
        <p>Repuestas de usuarios...</p>
      </main>
    </>
  );
};

export default Main;
