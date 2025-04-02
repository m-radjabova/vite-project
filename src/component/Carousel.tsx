import { useState, useEffect } from "react";

interface Slide {
  imgUrl: string;
  text: string;
}

const slides: Slide[] = [
  {
    imgUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    text: "Discover your next favorite book!",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    text: "Explore our vast collection of books.",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    text: "Enjoy special discounts on bestsellers!",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    text: "Join our community of book lovers!",
  },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel-slide"
        style={{ backgroundImage: `url(${slides[currentIndex].imgUrl})` }}
      >
        <div className="carousel-gradient"></div>
        <div className="carousel-text">
          <p>{slides[currentIndex].text}</p>
        </div>
      </div>
    </div>
  );
}

export default Carousel;