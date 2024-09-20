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
          content="Marta Gutiérrez Fonseca, a Spanish teacher with years of experience helping students from all over the world master this beautiful language."
        />
      </Helmet>
      <main className="main-aboutme">
        <div className="div-aboutme">
          <h2 id="haboutme">About me</h2>
          <article>
            <PlaceholderImg
              className="img-aboutme"
              src="/img/1.webp"
              alt="Decoración de libros y cafe en un escritorio"
              areaLabel="Imagen decorativa de un escritorio con libros y café"
            >
              I was born and raised in Valladolid, two hundred kilometers from Madrid.
              <br />I love meeting people from around the world and learning about different cultures. My hobbies are
              going for a run, doing Pilates, cooking, and sharing a delicious meal with friends and family."
            </PlaceholderImg>
          </article>
          <article>
            <h2>My background</h2>
            <p>
              I studied for a Bachelor’s in Spanish Language and Literature and culture at my town university. After
              completing my studies, <br />I decided to switch things up and pursue a master&#39;s degree in
              International Assistant Management. However, after gaining expertise as a manager assistant for quite a
              few years, I became a Spanish teacher for foreign workers in a language school. Recently, <br />I obtained
              a Master&#39;s degree in Cognitive Grammar recognized by El Instituto Cervantes. Currently, 3 I’m doing a
              master&#39;s in teaching Spanish as a foreign language at the well-known University of Salamanca.
            </p>
          </article>
          <article>
            <h2>Teaching experience</h2>
            <p>
              I have been a freelance Spanish teacher since 2018, specializing in one-to-one and two-student sessions
              for English speakers. With over 1,000 hours of teaching experience, I have guided students from A1 to B2
              levels. My advanced proficiency in English allows me to explain the nuances between both languages, making
              the learning process smoother and more effective for my students.
            </p>
          </article>
        </div>
      </main>
    </>
  );
};

export default AboutMe;
