import { useState } from "react";
import Button from "@/components/reusable/Buuton";
import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import "@/styles/main-newsettler.css";
import { Helmet } from "react-helmet-async";

const Newsletter = () => {
  const [imagesLoaded, setImagesLoaded] = useState({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
    img5: false,
  });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const handleImageLoad = (imgKey: keyof typeof imagesLoaded) => {
    setImagesLoaded((prev) => {
      const newImagesLoaded = { ...prev, [imgKey]: true };
      const allLoaded = Object.values(newImagesLoaded).every(Boolean);
      if (allLoaded) {
        setAllImagesLoaded(true);
      }
      return newImagesLoaded;
    });
  };

  return (
    <>
      <Helmet>
        <title>Newsletter</title>
        <meta
          name="description"
          content="Newsletter of The Fluent Spanish House. Here you can find all the news and updates of the teacher, Marta Gutiérrez Fonseca."
        />
      </Helmet>
      <main className="main-newsletter">
        <section className="nw-articles">
          <article className="nw-article">
            <figure>
              {!allImagesLoaded && (
                <PlaceholderImg className={"img-newsletter"} />
              )}
              <img
                className="img-newsletter"
                src="./img/cafe.webp"
                alt="Coffe image"
                onLoad={() => handleImageLoad("img1")}
                style={{ display: allImagesLoaded ? "block" : "none" }}
              />
            </figure>
            <div className="article-content">
              <h3>HEY, HOW ARE YOU?</h3>
              <h2>A Studio Update</h2>
              <p>
                Dear students, I hope you are enjoying the learning process as
                much as I enjoy teaching you. In today’s class, we explored new
                ways to enrich our vocabulary and improve our grammatical
                understanding. Remember, constant practice is key to mastering
                any language.
              </p>
              <p>
                Additionally, it’s important that you feel comfortable asking
                questions. There are no silly questions; they all help us move
                forward. So don’t hesitate to raise your hand if something isn’t
                clear! Our goal is for each of you to feel confident using
                Spanish in real-life situations.
              </p>
              <p>
                Don’t forget to review your notes and complete the exercises we
                assigned as homework. It’s essential to go over what you’ve
                learned to solidify your knowledge. See you in the next class,
                where we will continue working together to achieve the fluency
                level you desire.
              </p>
            </div>
          </article>
          <article className="nw-article">
            <div className="article-content">
              <h3>HEY, HOW ARE YOU?</h3>
              <h2>A Studio Update</h2>
              <p>
                Dear students, I hope you are enjoying the learning process as
                much as I enjoy teaching you. In today’s class, we explored new
                ways to enrich our vocabulary and improve our grammatical
                understanding. Remember, constant practice is key to mastering
                any language.
              </p>
              <p>
                Additionally, it’s important that you feel comfortable asking
                questions. There are no silly questions; they all help us move
                forward. So don’t hesitate to raise your hand if something isn’t
                clear! Our goal is for each of you to feel confident using
                Spanish in real-life situations.
              </p>
              <p>
                Don’t forget to review your notes and complete the exercises we
                assigned as homework. It’s essential to go over what you’ve
                learned to solidify your knowledge. See you in the next class,
                where we will continue working together to achieve the fluency
                level you desire.
              </p>
            </div>

            <figure>
              {!allImagesLoaded && (
                <PlaceholderImg className={"img-newsletter"} />
              )}
              <img
                className="img-newsletter"
                src="./img/newttseler.webp"
                alt="Cafe"
                onLoad={() => handleImageLoad("img2")}
                style={{ display: allImagesLoaded ? "block" : "none" }}
              />
            </figure>
          </article>
        </section>
        <section className="nw-freecontent">
          <article className="freecontent-article">
            <figure>
              {!allImagesLoaded && (
                <PlaceholderImg className={"img-newsletter"} />
              )}
              <img
                className="img-newsletter"
                src="./img/newttseler2.webp"
                alt="Cafe"
                onLoad={() => handleImageLoad("img3")}
                style={{ display: allImagesLoaded ? "block" : "none" }}
              />
            </figure>
            <div className="freecontent-content">
              <h2>Our Latest Spanish Class Highlights</h2>
              <h4>WE ABSOLUTELY LOVED TEACHING THIS GROUP OF STUDENTS!</h4>
              <p>
                This week, our students made incredible progress in mastering
                conversational Spanish. We focused on practical scenarios,
                helping them feel more confident in real-world situations. Their
                dedication and enthusiasm truly shone through!
              </p>
              <Button>SEE FULL CLASS STUDY</Button>
            </div>
          </article>
          <div className="freecontent-felx">
            <article className="freecontent-article">
              <figure>
                {!allImagesLoaded && (
                  <PlaceholderImg className={"img-newsletter"} />
                )}
                <img
                  className="img-newsletter"
                  src="./img/paisaje.webp"
                  alt="Cafe"
                  onLoad={() => handleImageLoad("img4")}
                  style={{ display: allImagesLoaded ? "block" : "none" }}
                />
              </figure>
              <div className="freecontent-content">
                <h3>Free Spanish Learning Resources</h3>
                <p>
                  Are you eager to improve your Spanish skills? Download our
                  free resources packed with essential vocabulary, grammar tips,
                  and practice exercises. Perfect for beginners and advanced
                  learners alike! Click the button below to get your free
                  Spanish lessons and start your journey to fluency today!
                </p>
              </div>
              <Button>INSTANT DOWNLOAD</Button>
            </article>
            <article className="freecontent-article">
              <figure>
                {!allImagesLoaded && (
                  <PlaceholderImg className={"img-newsletter"} />
                )}
                <img
                  className="img-newsletter"
                  src="./img/paisaje2.webp"
                  alt="Cafe"
                  onLoad={() => handleImageLoad("img5")}
                  style={{ display: allImagesLoaded ? "block" : "none" }}
                />
              </figure>
              <div className="freecontent-content">
                <h3>Get Your Free Spanish Guide</h3>
                <p>
                  Enhance your Spanish learning with our free guide! This
                  resource includes practical exercises, key phrases, and tips
                  to boost your confidence in speaking Spanish. Ideal for all
                  levels. Download now and take the next step in mastering the
                  language!
                </p>
              </div>

              <Button>FIND OUT MORE</Button>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default Newsletter;
