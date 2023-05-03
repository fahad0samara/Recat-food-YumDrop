// import axios from "axios";
// import React, {useState} from "react";
// import {useParams} from "react-router-dom";

// function MenuItemsByCategory() {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const {categoryId} = useParams();

//   React.useEffect(() => {
//     async function fetchMenuItems() {
//       try {
//         const response = await axios.get(
//           `http://localhost:1337/api/menu/${categoryId}`
//         );
//         setMenuItems(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log(
//           "error from fetchMenuItems() in MenuItemsByCategory.tsx: ",
//           error
//         );
//         setLoading(false);
//       }
//     }

//     fetchMenuItems();
//   }, [categoryId]);

//   return (
//     <div className="max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">
//         Menu Items for Category {categoryId}
//       </h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="space-y-4">
//           {menuItems.map(menuItem => (
//             <li key={menuItem._id} className="border p-4 rounded-lg">
//               <h2 className="text-lg font-semibold">{menuItem.name}</h2>
//               <p className="text-gray-600 mb-2">{menuItem.description}</p>
//               <p className="font-semibold text-green-600">${menuItem.price}</p>

//               <img className="rounded-lg mt-4" src={menuItem.image} alt="" />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default MenuItemsByCategory;

export default function MenuItemsByCategory() {
  return <div>MenuItemsByCategory</div>;
}
