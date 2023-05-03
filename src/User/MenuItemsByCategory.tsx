import axios from "axios";
import React, {useState} from "react";
import {useParams} from "react-router-dom";

function MenuItemsByCategory() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {categoryId} = useParams();

  React.useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/menu/${categoryId}`
        );
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.log("====================================");
        console.log(
          "error from fetchMenuItems() in MenuItemsByCategory.tsx: ",
          error
        );
        console.log("====================================");
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, [categoryId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {menuItems.map(menuItem => (
            <li key={menuItem._id}>
              <h2>{menuItem.name}</h2>
              <p>{menuItem.description}</p>
              <p>{menuItem.price}</p>

              <img src={menuItem.image} alt="" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MenuItemsByCategory;
