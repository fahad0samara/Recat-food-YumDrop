// import {useState, useEffect} from "react";
// import {Link, useParams} from "react-router-dom";
// import axios from "axios";

// function Menu() {
//   const {categoryId} = useParams();
//   const [categories, setCategories] = useState([]);
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");

//   async function fetchData() {
//     try {
//       const response = await axios.get("http://localhost:1337/api/categories");
//       setCategories(response.data);

//       if (categoryId) {
//         const response = await axios.get(
//           `http://localhost:1337/api/menu/${categoryId}`
//         );
//         setMenuItems(response.data);
//       } else {
//         const response = await axios.get("http://localhost:1337/api/menu");
//         setMenuItems(response.data);
//         console.log("====================================");
//         console.log("response.data: ", response.data);
//         console.log("====================================");
//       }

//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [categoryId]);

//   const filteredMenuItems = menuItems.filter(menuItem =>
//     menuItem.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-3xl font-extrabold text-gray-900">Menu</h1>
//       <div className="my-4">
//         <input
//           type="text"
//           placeholder="Search menu items..."
//           className="w-full px-3 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-500"
//           value={searchQuery}
//           onChange={e => setSearchQuery(e.target.value)}
//         />
//       </div>
//       <div className="border-b border-green-200">
//         <ul className="grid grid-cols-12 gap-2 mx-3 bg-white rounded-lg shadow-md">
//           <li key="all">
//             <Link
//               to={`/menu`}
//               className={`
//                 col-span-7 px-2 py-1 text-center font-bold text-md hover:bg-green-200 hover:text-green-900
//                 ${!categoryId ? "bg-green-200 " : "bg-white "}
//                 flex items-center justify-center rounded-md transition-colors duration-300
//               `}
//             >
//               All
//             </Link>
//           </li>
//           {categories.length > 0 &&
//             categories.map(category => (
//               <li key={category._id}>
//                 <Link
//                   to={`/menu/${category._id}`}
//                   className={`
//                     col-span-7 px-2 py-1 text-center font-bold text-md hover:bg-green-200 hover:text-green-900
//                     ${
//                       category._id === categoryId
//                         ? "bg-green-200 "
//                         : "bg-white "
//                     }
//                     flex items-center justify-center rounded-md transition-colors duration-300
//                   `}
//                 >
//                   {category.name}
//                 </Link>
//               </li>
//             ))}
//         </ul>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//           {filteredMenuItems.length === 0 ? (
//             <p>No items found.</p>
//           ) : (
//             filteredMenuItems.map(menuItem => (
//               <div
//                 key={menuItem._id}
//                 className="bg-white overflow-hidden shadow rounded-lg"
//               >
//                 <div className="relative">
//                   <img
//                     className="w-full h-48 object-cover"
//                     src={menuItem.image}
//                     alt={menuItem.name}
//                   />
//                   <span className="absolute top-0 right-0 bg-green-200 text-green-900 py-1 px-2 m-2 rounded-md text-sm font-semibold">
//                     {menuItem.price}
//                   </span>
//                 </div>
//                 <div className="px-4 py-4">
//                   <h2 className="text-lg font-bold text-gray-900 mb-2">
//                     {menuItem.name}
//                   </h2>
//                   <p className="text-sm text-gray-500 mb-4">
//                     {menuItem.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <button className="hover:bg-green-200 hover:text-green-900 bg-green-900 text-white px-4 py-2 rounded-md transition-colors duration-300">
//                       Add to Cart
//                     </button>
//                     <span className="text-lg font-bold text-gray-900">
//                       {menuItem.price}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Menu;

import {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {LRUCache} from "lru-cache";

const cache = new LRUCache({
  max: 10,
  maxAge: 1000 * 60 * 60, // 1 hour
});

function Menu() {
  const {categoryId} = useParams();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

  async function fetchData(categoryId) {
    try {
      let response;
      const cacheKey = categoryId ? `menu_${categoryId}` : "menu_all";

      if (cache.has(cacheKey)) {
        console.log("Fetching menu items from cache...");
        response = cache.get(cacheKey);
      } else {
        console.log("Fetching menu items from server...");
        if (categoryId) {
          response = await axios.get(
            `http://localhost:1337/api/menu/${categoryId}`
          );
        } else {
          response = await axios.get("http://localhost:1337/api/menu");
        }
        cache.set(cacheKey, response);
      }

      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const filteredMenuItems = menuItems.filter(menuItem =>
    menuItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSortOptionChange(event) {
    setSortOption(event.target.value);
  }

  function sortMenuItems(items, option) {
    if (option === "name") {
      return items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "price") {
      return items.sort((a, b) => a.price - b.price);
    } else if (option === "new") {
      return items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return items;
  }

  const sortedMenuItems = sortMenuItems(filteredMenuItems, sortOption);

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900">Menu</h1>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search menu items..."
          className="w-full px-3 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-500"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="border-b border-green-200">
        <ul className="grid grid-cols-12 gap-2 mx-3 bg-white rounded-lg shadow-md">
          <li key="all">
            <Link
              to={`/menu`}
              className={`
                col-span-7 px-2 py-1 text-center font-bold text-md hover:bg-green-200 hover:text-green-900
                ${!categoryId ? "bg-green-200 " : "bg-white "}
                flex items-center justify-center rounded-md transition-colors duration-300
              `}
            >
              All
            </Link>
          </li>
          {categories.map(category => (
            <li key={category._id}>
              <Link
                to={`/menu/${category._id}`}
                className={`
                  col-span-7 px-2 py-1 text-center font-bold text-md hover:bg-green-200 hover:text-green-900
                  ${category._id === categoryId ? "bg-green-200 " : "bg-white "}
                  flex items-center justify-center rounded-md transition-colors duration-300
                `}
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li key="sort">
            <div className="col-span-5 sm:col-span-4 md:col-span-3 lg:col-span-2 flex items-center">
              <label htmlFor="sortOption" className="mr-2 font-bold">
                Sort by:
              </label>
              <select
                id="sortOption"
                className="w-full px-3 py-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-500"
                value={sortOption}
                onChange={handleSortOptionChange}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="new">New</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sortedMenuItems.length === 0 ? (
            <p>No items found.</p>
          ) : (
            sortedMenuItems.map(menuItem => (
              <div
                key={menuItem._id}
                className="bg-white overflow-hidden shadow rounded-lg relative"
              >
                {menuItem.isNew && (
                  <span className="absolute top-0 left-0 bg bg-green-900 text-white text-b45309 text-xs font-bold py-1 px-2 uppercase z-10">
                    New
                  </span>
                )}
                <img
                  className="w-full h-48 object-cover"
                  src={menuItem.image}
                  alt={menuItem.name}
                />
                <span className="absolute top-0 right-0 bg-green-200 text-green-900 py-1 px-2 m-2 rounded-md text-sm font-semibold">
                  {menuItem.price}
                </span>
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
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;
