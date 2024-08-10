import { useState } from "react";
import PlaceholderAboutme from "../components/pages-components/aboutme/PlaceholderAboutme";
import "../styles/main-aboutme.css";

const AboutMe = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      <main className="main-aboutme">
        <div className="div-aboutme">
          <h2 id="haboutme">About me</h2>
          {!imageLoaded && <PlaceholderAboutme />}
          <article>
            <figure>
              <img
                src="/img/profe.png"
                alt="Descripción de la imagen"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? "block" : "none" }}
              />
              <figcaption>
                "I have firsthand knowledge of the difficulties Spanish learners
                face in mastering my language. <br />
                Memorizing rules and vocabulary are not the keys to fluency.
                <br /> You need to build a solid grammatical foundation. My
                courses provide guidance and solutions, take the next step!"
              </figcaption>
            </figure>
          </article>
          <article>
            <h2>Who am I?</h2>
            <p>
              Hello, I am Marta Gutiérrez Fonseca, a Spanish teacher with years
              of experience helping students from all over the world master this
              beautiful language.
              <br />
              My passion is teaching, and my goal is for my students not only to
              learn to speak Spanish fluently but also to fall in love with the
              culture surrounding it.
              <br />
            </p>
          </article>
          <article>
            <h2>What do I offer?</h2>
            <p>
              My classes are designed to be dynamic, challenging, and
              stimulating, adapting to the individual needs of each student. I
              firmly believe that mastering fundamental grammatical structures
              is crucial for achieving effective and confident communication.
              <br />
              With a personalized approach and custom-made materials, my lessons
              focus not only on theory but also on constant practice, with an
              emphasis on oral reproduction of the language.
              <br /> I speak with a neutral accent and clearly, and I always
              encourage my students to ask questions and clarify their doubts.
              <br />
            </p>
          </article>
          <article>
            <h2>How will our classes be?</h2>
            <p>
              I offer private lessons for all levels, from A1 to C1, using video
              conferencing platforms such as Zoom, Skype, and Google Meet.
              <br /> Additionally, I provide all the necessary learning
              materials, as well as assignments and constant communication
              outside of class to resolve any doubts.
              <br />
            </p>
          </article>
          <article>
            <h2>How to start?</h2>
            <p>
              I am here to help you achieve your language goals and make your
              Spanish learning journey as enjoyable and effective as possible.
              <br /> I invite you to take a free 45-minute trial class and start
              this adventure together!
            </p>
          </article>
        </div>
      </main>
    </>
  );
};

export default AboutMe;
