import { useState } from "react";
import Button from "../components/reusable/Buuton";
import PlaceholderNewsletter from "../components/pages-components/newsletter/PlaceholderNewsletter";
import "../styles/main-newsettler.css";

const Newsletter = () => {
  const [imagesLoaded, setImagesLoaded] = useState<{
    img1: boolean;
    img2: boolean;
    img3: boolean;
    img4: boolean;
    img5: boolean;
  }>({
    img1: false,
    img2: false,
    img3: false,
    img4: false,
    img5: false,
  });

  const handleImageLoad = (imgKey: keyof typeof imagesLoaded) => {
    setImagesLoaded((prev) => ({ ...prev, [imgKey]: true }));
  };

  return (
    <main className="main-newsletter">
      <section className="nw-title">
        <small>WELCOME TO OUR</small>
        <h1>Weekly Newsletter</h1>
      </section>
      <section className="nw-articles">
        <article className="nw-article">
          <figure>
            {!imagesLoaded.img1 && <PlaceholderNewsletter />}
            <img
              src="./img/cafe.webp"
              alt="Coffe image"
              onLoad={() => handleImageLoad("img1")}
              style={{ display: imagesLoaded.img1 ? "block" : "none" }}
            />
          </figure>
          <div className="article-content">
            <h3>HEY, HOW ARE YOU?</h3>
            <h2>A Studio Update</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              quae, officiis error asperiores quidem, assumenda at ut deserunt
              iusto repellendus vitae laudantium placeat temporibus, ducimus
              corrupti harum nobis! Provident, debitis?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              unde fugiat voluptatum consequatur! Est reiciendis quos quam ipsum
              obcaecati voluptas. Eaque voluptas ipsa autem non dolore debitis,
              sint quasi quae!
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos
              sint iure molestiae illo voluptatem, nam consequatur saepe
              perferendis, necessitatibus facere quis omnis? Obcaecati facilis
              ut soluta laboriosam ea reiciendis?
            </p>
          </div>
        </article>
        <article className="nw-article">
          <div className="article-content">
            <h2>New Team Member Alert</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolor
              error quaerat perspiciatis cupiditate voluptatum minus dolore
              culpa placeat minima, ut aliquam quidem eveniet molestias facilis
              accusantium omnis eos nesciunt!
            </p>
          </div>
          <figure>
            {!imagesLoaded.img2 && <PlaceholderNewsletter />}
            <img
              src="./img/newttseler.webp"
              alt="Cafe"
              onLoad={() => handleImageLoad("img2")}
              style={{ display: imagesLoaded.img2 ? "block" : "none" }}
            />
          </figure>
        </article>
      </section>
      <section className="nw-freecontent">
        <article className="freecontent-article">
          <figure>
            {!imagesLoaded.img3 && <PlaceholderNewsletter />}
            <img
              src="./img/newttseler2.webp"
              alt="Cafe"
              onLoad={() => handleImageLoad("img3")}
              style={{ display: imagesLoaded.img3 ? "block" : "none" }}
            />
          </figure>
          <div className="freecontent-content">
            <h2>Our Latest Client Project</h2>
            <h4>WE ABSOLUTY LOVED WORKING WHIT THIS CLIENT!</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              quae, officiis error asperiores quidem, assumenda at ut deserunt
              iusto repellendus vitae laudantium placeat temporibus, ducimus
              corrupti harum nobis! Provident, debitis?
            </p>
            <Button>SEE FULL CLASES STUDY</Button>
          </div>
        </article>
        <div className="freecontent-felx">
          <article className="freecontent-article">
            <figure>
              {!imagesLoaded.img4 && <PlaceholderNewsletter />}
              <img
                src="./img/paisaje.webp"
                alt="Cafe"
                onLoad={() => handleImageLoad("img4")}
                style={{ display: imagesLoaded.img4 ? "block" : "none" }}
              />
            </figure>
            <div className="freecontent-content">
              <h3>Comming Up</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos
                sint iure molestiae illo voluptatem, nam consequatur saepe
                perferendis, necessitatibus facere quis omnis? Obcaecati facilis
                ut soluta laboriosam ea reiciendis?
              </p>
            </div>
            <Button>FIND OUT MORE</Button>
          </article>
          <article className="freecontent-article">
            <figure>
              {!imagesLoaded.img5 && <PlaceholderNewsletter />}
              <img
                src="./img/paisaje2.webp"
                alt="Cafe"
                onLoad={() => handleImageLoad("img5")}
                style={{ display: imagesLoaded.img5 ? "block" : "none" }}
              />
            </figure>
            <div className="freecontent-content">
              <h3>Free Resouce</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex quos
                sint iure molestiae illo voluptatem, nam consequatur saepe
                perferendis, necessitatibus facere quis omnis? Obcaecati facilis
                ut soluta laboriosam ea reiciendis?
              </p>
            </div>
            <Button>INSTANT DOWNLOAD</Button>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Newsletter;
