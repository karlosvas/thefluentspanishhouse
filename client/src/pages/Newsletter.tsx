import Button from "../components/reusable/Buuton";
import "../styles/main-newsettler.css";

const Newsletter = () => {
  return (
    <main className="main-newsletter">
      <section className="nw-title">
        <small>WELCOME TO OUR</small>
        <h1>Weekly Newsletter</h1>
      </section>
      <section className="nw-articles">
        <article className="nw-article">
          <figure>
            <img src="./img/cafe.png" alt="Cafe" />
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
            <img src="./img/newttseler.png" alt="Cafe" />
          </figure>
        </article>
      </section>
      <section className="nw-freecontent">
        <article className="freecontent-article">
          <figure>
            <img src="./img/newttseler2.png" alt="Cafe" />
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
              <img src="./img/paisaje.png" alt="Cafe" />
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
              <img src="./img/paisaje2.png" alt="Cafe" />
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
