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

import {useState, useEffect} from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
interface Category {
  _id: string;
  name: string;
  description: string;
}

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [error, setError] = useState<boolean>();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get<Category[]>(
          "http://localhost:1337/api/categories"
        );
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1337/api/menu", {
        name,
        description,
        category,
        price: parseFloat(price),
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
          {/* Enter the name of the item */}
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="name"
          >
            Name of the Food:
            <span className="text-gray-500 text-sm ml-2">
              (e.g. Burger, Pizza, Salad)
            </span>
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
          {/* Enter a brief description of the item */}
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Description:
            <span className="text-gray-500 text-sm ml-2">
              (e.g. A delicious burger with cheese and bacon)
            </span>
          </label>

          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          {/* Select the category that the item belongs to */}
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="category"
          >
            Category:
            <span className="text-gray-500 text-sm ml-2">
              (e.g. Burgers, Salads, Drinks)
            </span>
          </label>

          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={e => setCategory(e.target.value)}
            aria-label="Select Category"
          >
            <option value="">--Select Category--</option>

            {/* Populate the dropdown with existing categories */}
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {/* If the category does not exist yet, click "Add Category" and enter the new category name in the prompt */}
          {categories.length === 0 && (
            <p className="text-gray-500 text-sm mt-2">
              No categories found. Click "Add Category" to create a new
              category.
            </p>
          )}

          {/* If the category does not exist yet, add it using the "Add Category" button */}

          <p className="text-gray-500 text-sm mt-2">
            Can't find the category you're looking for? Click
            <span
              className="text-blue-500 text-sm ml-2 cursor-pointer"
              onClick={handleAddCategory}
              aria-label="Add Category"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 inline-block mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z"
                  clipRule="evenodd"
                />
              </svg>
              Add Category
            </span>
            to create a new one. .
          </p>
        </div>

        <div className="mb-4">
          {/* Enter the price of the item in dollars and cents, without the currency symbol */}
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
          {/* Enter the URL of an image of the item, if desired */}
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
          setShowAddCategory={setShowAddCategory}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          setCategories={setCategories}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          categories={categories}
          setCategory={setCategory}
        />
      )}
    </div>
  );
};

export default AddMenuItem;
