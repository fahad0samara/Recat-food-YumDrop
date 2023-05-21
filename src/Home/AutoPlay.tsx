import React, {useState} from "react";

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      id: 1,

      caption: "Slide 1",
    },
    {
      id: 2,

      caption: "Slide 2",
    },
    {id: 3, caption: "Slide 3"},
  ];

  const nextSlide = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      prevIndex => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const getItemClass = index => {
    let className = "w-full transform transition-transform duration-500";
    if (index === activeIndex) {
      className += " translate-x-0";
    } else if (index < activeIndex) {
      className += " -translate-x-full";
    } else {
      className += " translate-x-full";
    }
    return className;
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto relative">
      <div className="flex justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div key={slide.id} className={getItemClass(index)}>
            <div className="p-4 bg-black bg-opacity-50 text-white text-lg">
              {slide.caption}
            </div>
          </div>
        ))}
      </div>

      <button
        className="absolute top-1/2 transform -translate-y-1/2 left-4 bg-transparent text-white text-xl py-2 px-4"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 right-4 bg-transparent text-white text-xl py-2 px-4"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;
