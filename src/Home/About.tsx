import {FaUtensils} from "react-icons/fa";

const AboutSection = () => {
  return (
    <div className="w-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="mx-auto px-4 py-12 max-w-screen-xl">
        <h2 className="text-4xl font-semibold tracking-wide text-center text-gray-800 sm:text-5xl">
          Why Choose Us?
        </h2>
        <div className="flex flex-col justify-between mt-16 space-y-16 sm:flex-row sm:space-y-0 sm:space-x-10">
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
              <FaUtensils className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Delicious Recipes
              </h3>
              <p className="mt-2 text-gray-700">
                Explore a wide range of delicious recipes from around the world.
                Our curated collection includes various cuisines, dietary
                preferences, and cooking styles to suit your taste buds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
