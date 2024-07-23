import { type Translations } from "../../types/types";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import "../styles/aboutme/main-aboutMe.css";

const AboutMe: React.FC<Translations> = ({ translation }) => {
  const navInfo: string[] = translation("navInfo", { returnObjects: true });

  return (
    <>
      <Header translation={translation} />
      <h2 id="haboutme">{navInfo[2]}</h2>
      <div className="divAboutMe">
        <img src="/img/profe.png" alt="" />
        <div className="aboutMe">
          <p
            dangerouslySetInnerHTML={{
              __html: translation("descriptionTitle").split(".").join(".<br>"),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: `
              <h2>¿Quién soy?</h2>
              Hola, soy Marta Gutiérrez Fonseca, profesora de español con años de experiencia ayudando a estudiantes de todo el mundo a dominar este hermoso idioma.<br> Mi pasión es la enseñanza y mi objetivo es que mis alumnos no solo aprendan a hablar español con fluidez, sino que también se enamoren de la cultura que lo rodea.<br><br>
              
              <h2>¿Qué ofrezco?</h2>
              Mis clases están diseñadas para ser dinámicas, desafiantes y estimulantes, adaptándome a las necesidades individuales de cada estudiante.<br> Creo firmemente que dominar las estructuras gramaticales fundamentales es crucial para lograr una comunicación efectiva y segura.<br><br> 
              
              Con un enfoque personalizado y materiales hechos a medida, mis lecciones no solo se enfocan en la teoría, sino también en la práctica constante, con énfasis en la reproducción oral del idioma.<br> Hablo con un acento neutral y de forma clara, y siempre animo a mis estudiantes a preguntar y aclarar sus dudas.<br><br>
              
              <h2>¿Cómo serán nuestras clases?</h2>
              Ofrezco clases particulares para todos los niveles, desde A1 hasta C1, utilizando plataformas de videoconferencia como Zoom, Skype y Google Meet.<br> Además, proporciono todos los materiales necesarios para el aprendizaje, así como tareas y comunicación constante fuera de clase para resolver cualquier duda.<br><br>
              
              <h2>¿Cómo empezar?</h2>
              Estoy aquí para ayudarte a alcanzar tus metas lingüísticas y hacer que tu viaje de aprendizaje del español sea lo más agradable y efectivo posible.<br> ¡Te invito a que tomes una clase muestra gratuita de 45 minutos y comencemos juntos esta aventura!
            `,
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMe;
