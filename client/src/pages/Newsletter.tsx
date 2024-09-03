import { useState } from "react";
import Button from "@/components/reusable/Button";
import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import "@/styles/main-newsettler.css";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { subscribeNewsletter } from "@/scripts/render-data";

const Newsletter = () => {
  const [imagesLoaded, setImagesLoaded] = useState({
    img1: false,
    img2: false,
  });
  const [email, setEmail] = useState("");
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await subscribeNewsletter(email);
    } catch (error) {
      console.error(error);
      toast.error("Failed to subscribe to newsletter");
    }
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
        <section>
          <div className="freecontent-felx">
            <article className="freecontent-article">
              <figure>
                {!allImagesLoaded && (
                  <PlaceholderImg className={"img-newsletter"} />
                )}
                <img
                  className="img-newsletter"
                  src="./img/newsletter3.png"
                  alt="Cafe"
                  onLoad={() => handleImageLoad("img1")}
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
            </article>
            <article className="freecontent-article">
              <h2>Do you wonnt all beneficies</h2>
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
              <form onSubmit={onSubmit}>
                <label htmlFor="email">
                  Email:
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <Button type="submit">DOWNLOAD NOW</Button>
              </form>
            </article>
          </div>
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
                onLoad={() => handleImageLoad("img2")}
                style={{ display: allImagesLoaded ? "block" : "none" }}
              />
            </figure>
            <div className="freecontent-content">
              <h2>Our Latest Spanish Class Highlights</h2>
              <p>
                This week, our students made incredible progress in mastering
                conversational Spanish. We focused on practical scenarios,
                helping them feel more confident in real-world situations. Their
                dedication and enthusiasm truly shone through!
              </p>
              <Button>SEE FULL CLASS STUDY</Button>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Newsletter;
