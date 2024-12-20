import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import { useEffect, useState } from "react";

const Profile = () => {
  const [src, setSrc] = useState("img/perfil-main.webp");

  const updateSrc = () => {
    if (window.innerWidth <= 768) setSrc("img/perfil-main-sm");
    else setSrc("img/perfil-main");
  };

  useEffect(() => {
    updateSrc();
    window.addEventListener("resize", updateSrc);
    return () => window.removeEventListener("resize", updateSrc);
  }, []);

  return (
    <>
      <article className="main-title">
        <h1 id="title">The Fluent Spanish House</h1>

        <PlaceholderImg src={src} className="banner" alt="Banner with inspiring images, sevillana dance">
          <strong className="introduction">
            Hi, my name is Marta.
            <br /> I’m a Spanish teacher from Spain and I help English speakers become fluent in Spanish. <br />
            I’ve been where you are. I know the struggle of learning a new language. <br />
          </strong>
          <br />
          Before becoming a Spanish teacher, I spent years studying English the “traditional” way: filling in countless
          textbook exercises, reading long passages, and writing essays. Yet, after all that effort, I still couldn’t
          string together a simple sentence in honest conversations. I was frustrated and embarrassed, unable to keep up
          with native speakers
          <br />
          So, what was holding me back?
          <br />
          We often spend years focusing on the wrong things, neglecting essential skills. Language is about connecting
          with people, not just memorizing rules. My real progress came when I learned to{" "}
          <strong>prioritize understanding and mastering basic structures</strong>, the building blocks of fluency.
          <br />
          As a teacher, I use that experience to guide my students. I know firsthand what it’s like to feel stuck and
          see the approach that can make a real difference. If you’re ready to change how you learn Spanish and start
          making progress, I’m here to help.
          <br />
        </PlaceholderImg>
        <div className="backgroundBanner"></div>
      </article>
      <div className="main-content">
        <img src="img/plantas.webp" className="planta left" alt="Image of decorative plants left" />
        <img src="img/plantas.webp" className="planta right" alt="Image of decorative plants right" />
        <div className="achievements-section">
          <h2>What you can achive with my assitence?</h2>
          <ul>
            <li>
              <h4>An effective focus on the top priorities:</h4>
              <p>
                You will improve your understanding and speaking skills through engaging, 100% oral interactive drills.
                You will master essential Spanish language structures used in 90% of daily conversations.
              </p>
            </li>
            <li>
              <h4>Guidance for correcting grammar and pronunciation</h4>
              <p>
                You will learn to pronounce and connect words to improve fluency while getting corrections to avoid
                ingrained mistakes.
              </p>
            </li>
            <li>
              <h4>A high dose of motivation that boosts your confidence</h4>
              <p>
                You'll receive feedback on the learning process. Besides, you’ll learn interesting facts about the
                language and the culture which makes the lessons encouraging and stimulating.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
