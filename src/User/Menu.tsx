import axios from "axios";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";

function Menu() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/categories"
        );
        setCategories(response.data);
        setLoading(false);
        console.log("====================================");
        console.log(
          "response.data from fetchCategories() in Menu.tsx: ",
          response.data
        );
        console.log("====================================");
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Menu</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {categories.map(category => (
            <li key={category._id}>
              <Link to={`/menu/${category._id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Menu;
