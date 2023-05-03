import axios from "axios";
import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

function Menu() {
  const {categoryId} = useParams();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/categories"
        );
        setCategories(response.data);

        if (categoryId) {
          const response = await axios.get(
            `http://localhost:1337/api/menu/${categoryId}`
          );
          setMenuItems(response.data);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [categoryId]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900">Menu</h1>
      <div className="border-b border-green-200">
        <ul className="grid grid-cols-12 gap-2 mx-3 bg-white rounded-lg shadow-md">
          {categories.length > 0 &&
            categories.map(category => (
              <li key={category._id}>
                <Link
                  to={`/menu/${category._id}`}
                  className={`
                    col-span-7 px-2 py-1 text-center font-bold text-md hover:bg-green-200 hover:text-green-900
                    ${
                      category._id === categoryId
                        ? "bg-green-200 "
                        : "bg-white "
                    }
                    flex items-center justify-center rounded-md transition-colors duration-300
                  `}
                >
                  {category.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {categoryId &&
            menuItems.map(menuItem => (
              <div
                key={menuItem._id}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover"
                    src={menuItem.image}
                    alt={menuItem.name}
                  />
                  <span className="absolute top-0 right-0 bg-green-200 text-green-900 py-1 px-2 m-2 rounded-md text-sm font-semibold">
                    {menuItem.price}
                  </span>
                </div>
                <div className="px-4 py-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">
                    {menuItem.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    {menuItem.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button className="hover:bg-green-200 hover:text-green-900 bg-green-900 text-white px-4 py-2 rounded-md transition-colors duration-300">
                      Add to Cart
                    </button>
                    <span className="text-lg font-bold text-gray-900">
                      {menuItem.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
