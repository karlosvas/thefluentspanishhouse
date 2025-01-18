import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const isDark = () => {
    if (document.documentElement.classList.contains('dark')) return true;
    else if (document.documentElement.classList.contains('light')) return false;
  };
  const [darkMode, setDarkMode] = useState(isDark());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(isDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="main-carrousel">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        data-bs-theme={!darkMode ? 'dark' : 'light'}
        id="carrousel"
      >
        <Carousel.Item interval={5000}>
          <div className="content-caption">
            <Carousel.Caption className="caption">
              <h3>Joan Penn</h3>
              <p>
                Marta is a wonderful and patient teacher. She is passionate
                about teaching Spanish. I am an advanced beginner. I have
                learned a lot, and when the learning doesn't soak in that
                quickly, she repeats until I get it. Gracias Marta.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className="content-caption">
            <Carousel.Caption className="caption">
              <h3>Red Salas</h3>
              <p>
                Marta's Spanish classes are fantastic. She has a unique way of
                making complex topics easy to understand. I highly recommend her
                classes to anyone looking to learn Spanish.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className="w-100 content-caption">
            <Carousel.Caption className="caption">
              <h3>Aryn Ruiz</h3>
              <p>
                Marta is an excellent teacher! Her classes are engaging,
                challenging, and practical for gaining speaking skills, in
                Spanish. Marta is patient and gives posittive, encourning
                facebock. I would highly recommend her to anyone looking to
                learn or improve their Spanish.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <div className="w-100 content-caption">
            <Carousel.Caption className="caption">
              <h3>Connie Latas</h3>
              <p>
                Marta is excelent! I thoroughly enjoyed her as a tutor and look
                forward to future lessons.
              </p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
