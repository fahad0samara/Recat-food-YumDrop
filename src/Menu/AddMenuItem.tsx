// // import React, {memo, useCallback, useState} from "react";
// // import classes from "./Cardapio.module.css";

// // import {useEffect} from "react";

// // type MenuItemCategoryProps = {
// //   category: string;
// //   changeCategory: (category: string) => void;
// //   selectedCategory: string;
// // };

// // const MenuItemCategory = memo(
// //   ({category, changeCategory, selectedCategory}: MenuItemCategoryProps) => {
// //     return (
// //       <li key={category}>
// //         <button
// //           onClick={() => changeCategory(category)}
// //           className={category === selectedCategory ? classes.activeBtn : ""}
// //         >
// //           {category}
// //         </button>
// //       </li>
// //     );
// //   }
// // );

// // type MenuItemProps = {
// //   item: MenuItemType;
// //   showModal: (item: MenuItemType) => void;
// // };

// // const MenuItem = memo(({item, showModal}: MenuItemProps) => {
// //   const [imgSrc, setImgSrc] = useState<string>("");

// //   useEffect(() => {
// //     const loadImage = async () => {
// //       try {
// //         const module = await import(`../assets/${item.img}`);
// //         setImgSrc(module.default);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     loadImage();
// //   }, [item.img]);
// //   return (
// //     <li
// //       className="bg-white cursor-pointer flex items-center justify-between mb-4 p-4 rounded-xl shadow-sm transition-colors w-full hover:bg-gray-100"
// //       onClick={() => showModal(item)}
// //       tabIndex={0}
// //     >
// //       <img
// //         className="flex-shrink-0 h-16 mr-4 object-cover rounded-xl w-16"
// //         src={imgSrc}
// //         alt={item.name}
// //       />

// //       <div className="flex flex-col justify-between">
// //         <p className="font-semibold text-lg">{item.name}</p>
// //         <p className="text-gray-500 text-sm">{item.description}</p>
// //       </div>
// //     </li>
// //   );
// // });

// // const Menu = () => {
// //   const menuItemCategories = Object.entries(menuItems);
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(
// //     null
// //   );

// //   const showModal = useCallback((item: MenuItemType) => {
// //     setSelectedMenuItem(item);
// //   }, []);

// //   const closeModal = useCallback(() => {
// //     setSelectedMenuItem(null);
// //   }, []);

// //   const changeCategory = useCallback((category: string) => {
// //     setSelectedCategory(category);
// //   }, []);

// //   const filteredMenuItems =
// //     menuItems[selectedCategory] || Object.values(menuItems).flat();

// //   return (
// //     <>
// //       {selectedMenuItem && (
// //         <MenuItemModal item={selectedMenuItem} onClose={closeModal} />
// //       )}
// //       <div className={classes.menu}>
// //         <h1>Menu</h1>
// //         <div className={classes.categories}>
// //           <p>Categories</p>
// //           <ul className={classes.categoryList}>
// //             <li>
// //               <button
// //                 onClick={() => changeCategory("All")}
// //                 className={"All" === selectedCategory ? classes.activeBtn : ""}
// //               >
// //                 All
// //               </button>
// //             </li>
// //             {menuItemCategories.map(([category]) => (
// //               <MenuItemCategory
// //                 key={category}
// //                 category={category}
// //                 changeCategory={changeCategory}
// //                 selectedCategory={selectedCategory}
// //               />
// //             ))}
// //           </ul>
// //         </div>
// //         <ul className={classes.menuItemList}>
// //           {filteredMenuItems.map(item => (
// //             <MenuItem key={item.id} item={item} showModal={showModal} />
// //           ))}
// //         </ul>
// //       </div>
// //     </>
// //   );
// // };

// import {useState, useEffect} from "react";
// import axios from "axios";
// import AddCategory from "./AddCategory";
// import {AiOutlineFileAdd} from "react-icons/ai";
// interface Category {
//   _id: string;
//   name: string;
//   description: string;
// }

// const AddMenuItem = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [showAddCategory, setShowAddCategory] = useState(false);
//   const [error, setError] = useState<{[key: string]: string}>({});
//   const [submitSuccess, setSubmitSuccess] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const res = await axios.get<Category[]>(
//           "http://localhost:1337/api/categories"
//         );

//         setCategories(res.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     }
//     fetchCategories();
//   }, []);

//   const handleAddCategory = () => {
//     setShowAddCategory(true);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     setLoading(true);
//     setSubmitSuccess(false);
//     setError({});

//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:1337/api/menu", {
//         name,
//         description,
//         category,
//         price: parseFloat(price),
//         image,
//       });
//       console.log(res.data); // the newly created menu item object
//       // reset form fields
//       setName("");
//       setDescription("");
//       setCategory("");
//       setPrice("");
//       setImage("");
//       setSubmitSuccess(true);
//       setLoading(false);
//     } catch (error) {
//       console.error(error.response.data.error.message);
//       setLoading(false);

//       setError(error.response.data.error.message);
//     }
//   };

//   if (submitSuccess) {
//     return (
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
//         <p className="text-green-500 text-xl mb-4">Menu item added!</p>
//         <button
//           onClick={() => setSubmitSuccess(false)}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Add another menu item
//         </button>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center">
//         <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
//         <p className="text-green-500 text-xl mb-4">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <form onSubmit={handleSubmit} className="w-full max-w-md">
//         <div className="mb-4">
//           {/* Enter the name of the item */}
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="name"
//           >
//             Name of the Food:
//             <span className="text-gray-500 text-sm ml-2">
//               (e.g. Burger, Pizza, Salad)
//             </span>
//           </label>
//           <input
//             className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               error.name ? "border-red-500" : ""
//             }`}
//             onChange={e => {
//               setName(e.target.value);
//               setError(prevErrors => ({...prevErrors, name: ""}));
//             }}
//             type="text"
//             id="name"
//             value={name}
//             placeholder="Enter the name of the food"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           {/* Enter a brief description of the item */}
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="description"
//           >
//             Description:
//             <span className="text-gray-500 text-sm ml-2">
//               (e.g. A delicious burger with cheese and bacon)
//             </span>
//           </label>

//           <textarea
//             className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               error.description ? "border-red-500" : ""
//             }`}
//             placeholder="Enter a brief description of the food"
//             required
//             id="description"
//             value={description}
//             onChange={e => {
//               setDescription(e.target.value);
//               setError(prevErrors => ({...prevErrors, description: ""}));
//             }}
//             rows={2}
//             autoFocus
//           />
//         </div>
//         <div className="mb-4">
//           {/* Select the category that the item belongs to */}
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="category"
//           >
//             Category:
//             <span className="text-gray-500 text-sm ml-2">
//               (e.g. Burgers, Salads, Drinks)
//             </span>
//           </label>

//           <select
//             className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${
//               error.category ? "border-red-500" : ""
//             }`}
//             id="category"
//             onChange={e => {
//               setCategory(e.target.value);
//               setError(prevErrors => ({...prevErrors, category: ""}));
//             }}
//             value={category}
//             aria-label="Select Category"
//           >
//             <option value="">--Select Category--</option>

//             {/* Populate the dropdown with existing categories */}
//             {categories.map(cat => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {/* If the category does not exist yet, click "Add Category" and enter the new category name in the prompt */}
//           {categories.length === 0 && (
//             <p className="text-gray-500 text-sm mt-2">
//               No categories found. Click "Add Category" to create a new
//               category.
//             </p>
//           )}

//           {/* If the category does not exist yet, add it using the "Add Category" button */}

//           <p className="text-gray-500 text-sm mt-2">
//             Can't find the category you're looking for? Click
//             <span
//               className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-[3px] px-2 rounded cursor-pointer text-xs mx-1"
//               onClick={handleAddCategory}
//               aria-label="Add Category"
//             >
//               <AiOutlineFileAdd className="inline-block align-middle mr-1" />
//               Add Category
//             </span>
//             to create a new one. .
//           </p>
//         </div>

//         <div className="mb-4">
//           {/* Enter the price of the item in dollars and cents, without the currency symbol */}
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="price"
//           >
//             Price:
//             <span className="text-gray-500 text-sm ml-2">
//               (e.g. 5.99, 10, 15.50)
//             </span>
//           </label>

//           <input
//             className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//               error.price ? "border-red-500" : ""
//             }`}
//             placeholder="Enter the price of the food"
//             required
//             id="price"
//             value={price}
//             onChange={e => {
//               setPrice(e.target.value);
//               setError(prevErrors => ({...prevErrors, price: ""}));
//             }}
//             type="number"
//             step="0.01"
//             min="0"
//             max="99999"
//             aria-label="Enter the price of the food"
//           />
//         </div>
//         <div className="mb-4">
//           {/* Enter the URL of an image of the item, if desired */}
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="image"
//           >
//             Image:
//           </label>
//           <input
//             className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             placeholder="Enter the URL of an image of the food"
//             required
//             id="image"
//             value={image}
//             type="text"
//             aria-label="Enter the URL of an image of the food"
//             onChange={e => setImage(e.target.value)}
//           />
//         </div>
//         <button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
//           type="submit"
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Add food"}
//         </button>
//       </form>
//       {showAddCategory && (
//         <AddCategory
//           setShowAddCategory={setShowAddCategory}
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           //@ts-ignore
//           setCategories={setCategories}
//           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//           //@ts-ignore
//           categories={categories}
//           setCategory={setCategory}
//         />
//       )}
//     </div>
//   );
// };

// export default AddMenuItem;

import React, {useState, useEffect} from "react";
import axios from "axios";

const AddMenuItem = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const response = await axios.get("http://localhost:1337/api/categories");
      setCategories(response.data);
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = event => {
    setCategory(event.target.value);
  };

  const handleAddCategory = () => {
    const categoryName = prompt("Enter category name");
    if (categoryName) {
      axios
        .post("http://localhost:1337/api/categories", {
          name: categoryName,
          description: `${categoryName} items`,
        })
        .then(response => {
          setCategory(response.data._id);
          setCategories(prevState => [...prevState, response.data]);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:1337/api/menu", {
        name,
        description,
        category,
        price,
        image,
      })
      .then(response => {
        console.log(response.data);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage("");
      })
      .catch(error => {
        console.log("====================================");
        console.log("There was an error creating the menu item:");
        console.log(error, "error");
      });
  };

  return (
    <div>
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Select category...</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
