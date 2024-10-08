import {FaUtensils, FaUsers, FaClock} from "react-icons/fa";
const AboutSection = () => {

  return (
    <div className={` bg-gradient-to-b from-green-50 to-green-100`}>
      <div className="mx-auto px-4 py-12 max-w-screen-xl">
        <h2 className="text-4xl font-semibold tracking-wide text-center text-gray-800 sm:text-5xl">
          Why Choose Us?
        </h2>
        <div className=" grid grid-cols-1 xl:grid-cols-3  mt-16 space-y-16  xl:space-y-0 xl:space-x-10">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 p-3 rounded-full bg-black">
              <FaUtensils className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Interactive Learning
              </h3>
              <p className="mt-2 text-gray-700">
                Discover new recipes, cooking techniques, and culinary tips
                through our interactive learning platform. Engage with our
                community and enhance your culinary skills.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 p-3 rounded-full bg-black">
              <FaUsers className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Community Support
              </h3>
              <p className="mt-2 text-gray-700">
                Join our vibrant community of food enthusiasts, share your
                recipes, and collaborate with fellow cooks. Get inspired by
                others and receive valuable feedback on your culinary creations.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 p-3 rounded-full bg-black">
              <FaClock className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Time-Saving Solutions
              </h3>
              <p className="mt-2 text-gray-700">
                We understand the value of your time. Explore our collection of
                quick and easy recipes designed to fit your busy schedule. Cook
                delicious meals in no time and make every minute count.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
