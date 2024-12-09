import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import { Helmet } from "react-helmet-async";
import "@/styles/main-aboutme.css";

const AboutMe = () => {
  return (
    <>
      <Helmet>
        <title>About Me</title>
        <meta
          name="description"
          content="Marta Gutiérrez Fonseca, a Spanish teacher with years of experience helping students from all over the world master this beautiful language. <br />"
        />
      </Helmet>
      <main className="main-aboutme">
        <div className="backgroundBanner"></div>
        <div className="div-aboutme">
          <h2 id="haboutme">About me</h2>
          <article>
            <PlaceholderImg
              className="img-aboutme"
              src="/img/about"
              alt="Decoración de libros y cafe en un escritorio"
              areaLabel="Imagen decorativa de un escritorio con libros y café"
            >
              I was born and raised in Valladolid, two hundred kilometers from Madrid. My city is renowned chiefly for
              three historical events: <br />
              <br />
              <ul>
                <li>The marriage of the Catholic Monarchs in 1462,</li>
                <li>Miguel de Cervantes's writing of the first part of his well-known book Don Quijote here</li>
                <li>The death of Cristobal Colon in 1506.</li>
              </ul>
              <br />
              I’m passionate about my profession because it allows me to stay in contact with people worldwide and learn
              about different cultures. <br />
              My hobbies are going for a run, doing Pilates, cooking, and sharing a delicious meal with friends and
              family. Many of my students visit me and enjoy Spanish culture and cuisine firsthand. <br /> Will you join
              me?
            </PlaceholderImg>
          </article>
          <article>
            <h2>My background</h2>
            <p>
              I studied for a Bachelor’s in Spanish Language and Literature and culture at my town university. I also
              hold a Master’s Degree in Spanish Language Teaching, focusing on Grammar and Literature, similar to a U.S.
              Master’s in Secondary Spanish Education. This program prepared me to teach Spanish grammar and literature
              at the high school level. After completing my studies,
              <br />
              I decided to switch things up and pursue a master's degree in International Assistant Management.
              <br />
              However, after gaining expertise as a manager assistant for quite a few years in a language school, I
              became a Spanish teacher as a second language. Recently,
              <br />
              I obtained a Master's in Cognitive Grammar recognized by El Instituto Cervantes.
              <br />
            </p>
          </article>
          <article>
            <h2>Teaching experience</h2>
            <p>
              I have been a freelance Spanish teacher since 2018, specializing in one-to-one and two-student sessions
              for English speakers.
              <br />
              With over 1,000 hours of teaching experience, I have guided students from A1 to B2 levels.
              <br />
              My advanced proficiency in English allows me to explain the nuances between both languages, making the
              learning process smoother and more effective for my students.
            </p>
          </article>
        </div>
      </main>
    </>
  );
};

export default AboutMe;
