import "../styles/main-newsettler.css";

const Newsletter = () => {
  return (
    <main className="main-newsletter">
      <section className="newsletter-intro">
        <small>WELCOME TO OUR</small>
        <h1>Weekly Newsletter</h1>
      </section>
      <section className="newsletter-articles">
        <article className="newsletter-article">
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
        <article className="newsletter-article">
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
            <img src="./img/cafe.png" alt="Cafe" />
          </figure>
        </article>
      </section>
    </main>
  );
};

export default Newsletter;
