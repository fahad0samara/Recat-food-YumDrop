// import React, {memo, useCallback, useState} from "react";
// import classes from "./Cardapio.module.css";

// import {useEffect} from "react";

// type MenuItemCategoryProps = {
//   category: string;
//   changeCategory: (category: string) => void;
//   selectedCategory: string;
// };

// const MenuItemCategory = memo(
//   ({category, changeCategory, selectedCategory}: MenuItemCategoryProps) => {
//     return (
//       <li key={category}>
//         <button
//           onClick={() => changeCategory(category)}
//           className={category === selectedCategory ? classes.activeBtn : ""}
//         >
//           {category}
//         </button>
//       </li>
//     );
//   }
// );

// type MenuItemProps = {
//   item: MenuItemType;
//   showModal: (item: MenuItemType) => void;
// };

// const MenuItem = memo(({item, showModal}: MenuItemProps) => {
//   const [imgSrc, setImgSrc] = useState<string>("");

//   useEffect(() => {
//     const loadImage = async () => {
//       try {
//         const module = await import(`../assets/${item.img}`);
//         setImgSrc(module.default);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     loadImage();
//   }, [item.img]);
//   return (
//     <li
//       className="bg-white cursor-pointer flex items-center justify-between mb-4 p-4 rounded-xl shadow-sm transition-colors w-full hover:bg-gray-100"
//       onClick={() => showModal(item)}
//       tabIndex={0}
//     >
//       <img
//         className="flex-shrink-0 h-16 mr-4 object-cover rounded-xl w-16"
//         src={imgSrc}
//         alt={item.name}
//       />

//       <div className="flex flex-col justify-between">
//         <p className="font-semibold text-lg">{item.name}</p>
//         <p className="text-gray-500 text-sm">{item.description}</p>
//       </div>
//     </li>
//   );
// });

// const Menu = () => {
//   const menuItemCategories = Object.entries(menuItems);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(
//     null
//   );

//   const showModal = useCallback((item: MenuItemType) => {
//     setSelectedMenuItem(item);
//   }, []);

//   const closeModal = useCallback(() => {
//     setSelectedMenuItem(null);
//   }, []);

//   const changeCategory = useCallback((category: string) => {
//     setSelectedCategory(category);
//   }, []);

//   const filteredMenuItems =
//     menuItems[selectedCategory] || Object.values(menuItems).flat();

//   return (
//     <>
//       {selectedMenuItem && (
//         <MenuItemModal item={selectedMenuItem} onClose={closeModal} />
//       )}
//       <div className={classes.menu}>
//         <h1>Menu</h1>
//         <div className={classes.categories}>
//           <p>Categories</p>
//           <ul className={classes.categoryList}>
//             <li>
//               <button
//                 onClick={() => changeCategory("All")}
//                 className={"All" === selectedCategory ? classes.activeBtn : ""}
//               >
//                 All
//               </button>
//             </li>
//             {menuItemCategories.map(([category]) => (
//               <MenuItemCategory
//                 key={category}
//                 category={category}
//                 changeCategory={changeCategory}
//                 selectedCategory={selectedCategory}
//               />
//             ))}
//           </ul>
//         </div>
//         <ul className={classes.menuItemList}>
//           {filteredMenuItems.map(item => (
//             <MenuItem key={item.id} item={item} showModal={showModal} />
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

import React, {useState, useEffect} from "react";
import axios from "axios";
import AddCategory from "./AddCategory";

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("http://localhost:1337/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleAddCategoryClose = () => {
    setShowAddCategory(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // check if the selected category exists in the categories array
    const selectedCategory = categories.find(cat => cat._id === category);

    if (!selectedCategory) {
      // if the category doesn't exist, add it to the categories array
      try {
        const res = await axios.post("http://localhost:1337/api/categories", {
          name: category,
        });
        setCategories(prevCategories => [...prevCategories, res.data]);
        setCategory(res.data._id); // set the category to the newly created category's ID
      } catch (error) {
        console.error(error);
        return;
      }
    }

    try {
      const res = await axios.post("http://localhost:1337/api/menu", {
        name,
        description,
        category,
        price,
        image,
      });
      console.log(res.data); // the newly created menu item object
      // reset form fields
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">--Select Category--</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md ml-4"
            type="button"
            onClick={handleAddCategory}
          >
            Add Category
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="image"
          >
            Image:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="image"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          type="submit"
        >
          Add Item
        </button>
      </form>
      {showAddCategory && (
        <AddCategory
          setCategories={setCategories}
          setShowAddCategory={setShowAddCategory}
          handleAddCategoryClose={handleAddCategoryClose}
        />
      )}
    </div>
  );
};

export default AddMenuItem;
