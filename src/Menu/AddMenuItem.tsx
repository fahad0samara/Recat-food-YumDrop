/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import AddCategory from "./AddCategory";
import { AiOutlineFileAdd } from "react-icons/ai";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Category {
  [x: string]: string | number | readonly string[] | undefined;
  _id: string;
  name: string;
  description: string;
}

interface MyErrorType {
  response: {
    status: number;
    data: {
      message: boolean | unknown;
      error: string;
    };
  };
}

const AddMenuItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [error, setError] = useState<{[key: string]: string | unknown}>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get<Category[]>(
          "http://localhost:1337/api/categories"
        );

        setCategories(res.data);
        setLoading(false);
      } catch (error) {
        const errorMessage = error
          ? (error as MyErrorType).response?.data.error
          : "An error occurred while fetching categories.";

        toast.error(
          `
          Error: ${errorMessage}
        `,
          {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        console.error(error);
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    setShowAddCategory(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setSubmitSuccess(false);

    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1337/api/menu", {
        name,
        description,
        category,
        price: parseFloat(price),
        image,
      });

      // reset form fields
      setName("");
      setDescription("");
      setCategory("");
      setPrice("");
      setImage("");
      setSubmitSuccess(true);
      setLoading(false);
      toast.success("Menu item added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      if ((error as MyErrorType).response?.status === 400) {
        const errorMessage = (error as MyErrorType).response.data.error;
        setError({
          message: "An error occurred while adding the menu item.",
          error: errorMessage,
        });
        toast.error(`Error: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      } else {
        setError({
          message: "An error occurred while adding the menu item.",
          error: "Something went wrong.",
        });
        toast.error("An error occurred while adding the menu item.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        setError({});
      }, 9000);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
        <p className="text-green-500 text-xl mb-4">Menu item added!</p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
        >
          Add another menu item
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
        <p className="text-green-500 text-xl mb-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          {/* Enter the name of the item */}

          {error && error.error ? (
            //@ts-ignore
            <p className="text-red-500 text-sm mb-2">{error.error}</p>
          ) : null}

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
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            onChange={e => {
              setName(e.target.value);
              setError(prevErrors => ({...prevErrors, name: ""}));
            }}
            type="text"
            id="name"
            value={name}
            placeholder="Enter the name of the food"
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
              (e.g.
              <span className="italic">
                A delicious burger with a juicy patty and fresh vegetables.
              </span>
              )
            </span>
          </label>

          <textarea
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter a brief description of the food"
            required
            id="description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              setError(prevErrors => ({...prevErrors, description: ""}));
            }}
            rows={2}
            autoFocus
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
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="category"
            onChange={e => {
              setCategory(e.target.value);
            }}
            value={category}
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
              className={
                "inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-[3px] px-2 rounded cursor-pointer text-xs mx-1"
              }
              onClick={handleAddCategory}
              aria-label="Add Category"
            >
              <AiOutlineFileAdd className="inline-block align-middle mr-1" />
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
            <span className="text-gray-500 text-sm ml-2">
              (e.g. 5.99, 10, 15.50)
            </span>
          </label>

          <input
            className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            placeholder="Enter the price of the food"
            required
            id="price"
            value={price}
            onChange={e => {
              setPrice(e.target.value);
              setError(prevErrors => ({...prevErrors, price: ""}));
            }}
            type="number"
            step="0.01"
            min="0"
            max="99999"
            aria-label="Enter the price of the food"
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
            className={
              "appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            }
            placeholder="Enter the URL of an image of the food"
            required
            id="image"
            value={image}
            type="text"
            aria-label="Enter the URL of an image of the food"
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <button
          className={
            "bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          }
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add food"}
        </button>
      </form>
      {showAddCategory && (
        <AddCategory
          setShowAddCategory={setShowAddCategory}
          //@ts-ignore
          setCategories={setCategories}
        />
      )}
    </div>
  );
};

export default AddMenuItem;
