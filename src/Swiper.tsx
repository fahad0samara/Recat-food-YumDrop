// import {useState} from "react";

// export default function App() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const handleNext = () => {
//     setActiveIndex(prev => (prev === 2 ? 0 : prev + 1));
//   };
//   const handlePrev = () => {
//     setActiveIndex(prev => (prev === 0 ? 2 : prev - 1));
//   };
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <div className="w-64 h-64 relative">
//         <img
//           src={`https://picsum.photos/id/${activeIndex + 1}/640/640`}
//           alt=""
//           className="w-full h-full object-cover rounded-lg"
//         />
//         <div className="absolute bottom-0 left-0 w-full flex justify-center">
//           {[0, 1, 2].map(i => (
//             <div
//               key={i}
//               className={`w-3 h-3 rounded-full mx-1 bg-white ${
//                 i === activeIndex ? "opacity-100" : "opacity-60"
//               }`}
//             ></div>
//           ))}
//         </div>
//         <button
//           onClick={handlePrev}
//           className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-white rounded-l-full hover:bg-gray-800 transition-all duration-300"
//         >
//           Prev
//         </button>
//         <button
//           onClick={handleNext}
//           className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-white rounded-r-full hover:bg-gray-800 transition-all duration-300"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

import {useState, useEffect} from "react";

const images = [
  {
    id: 1,
    src: "https://www.foodiesfeed.com/wp-content/uploads/2023/04/green-spring-salad-with-a-turquoise-background.jpg",
  },
  {
    id: 2,
    src: "https://www.foodiesfeed.com/wp-content/uploads/2023/04/fresh-fruit-salad-with-mint.jpg",
  },
  {
    id: 3,
    src: "https://www.foodiesfeed.com/wp-content/uploads/2021/05/fresh-coconut.jpg",
  },
  {
    id: 4,
    src: "https://www.foodiesfeed.com/wp-content/uploads/2021/10/carrot-cake-with-fresh-fruits.jpg",
  },
  {
    id: 5,
    src: "https://www.foodiesfeed.com/wp-content/uploads/2021/06/small-donut-with-raspberry-on-top.jpg",
  },
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const handleNext = () => {
    setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      className="
     
           w-full h-full
            
       relative"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="img1" x="0" y="0" width="1" height="1">
            <image
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMaxYMax slice"
              href={images[activeIndex].src}
            />
          </pattern>
        </defs>

        <path
          fill="url(#img1)"
          d="M40,-62.6C52.2,-54.5,62.5,-43.9,66.9,-31.4C71.3,-18.9,69.6,-4.6,65.9,8.3C62.2,21.1,56.4,32.5,49.2,45.2C42.1,57.9,33.7,72.1,22.2,75.3C10.7,78.5,-3.9,70.7,-14.8,62.1C-25.7,53.5,-32.8,44.1,-44.9,37.3C-57,30.5,-74.3,26.4,-83.9,15.1C-93.5,3.9,-95.5,-14.5,-90.5,-29.9C-85.5,-45.3,-73.5,-58.7,-60.3,-67.7C-47.2,-76.6,-32.8,-81.1,-20.5,-79.2C-8.2,-77.2,-0.1,-68.9,11.4,-66.4C22.9,-63.9,45.8,-67.1,57.3,-60.3Z"
          transform="translate(100 100)"
        />
      </svg>

      {showButtons && (
        <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
          <button onClick={handlePrev} className="bg-white rounded-full p-2">
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button onClick={handleNext} className="bg-white rounded-full p-2">
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
