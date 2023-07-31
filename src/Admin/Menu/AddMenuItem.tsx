/* eslint-disable @typescript-eslint/ban-ts-comment */
import {ChangeEventHandler} from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import {AiOutlineCloudUpload, AiOutlineFileAdd} from "react-icons/ai";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {useCallback} from "react";
import {MenuPreviewModal} from "./Model/MenuPreviewModal";
import {FETCH_CATEGORIES_URL, FETCH_MENU_URL} from "../../urls";
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
  const [image, setImage] = useState<FileList | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [error, setError] = useState<{[key: string]: string | unknown}>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagePreview, setImagePreview] = useState<string>();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [menuPreview, setMenuPreview] = useState({});
  const isFormEmpty = !name || !description || !price || !category || !image;
  const handlePreview = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    if (image) {
      formData.append("image", image[0]);
    }
    setMenuPreview(Object.fromEntries(formData));
    setShowPreviewModal(true);
  };

  const handleClosePreviewModal = () => {
    setShowPreviewModal(false);
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get<Category[]>(FETCH_CATEGORIES_URL);
        const data = res.data;

        setCategories(data);
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
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setLoading(true);
      setSubmitSuccess(false);

      e.preventDefault();
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);

      if (image) {
        formData.append("image", image[0]);
      }

      // Check for missing required fields and image
      if (!name || !description || !category || !price || !image) {
        {
          setLoading(false);
          setSubmitSuccess(false);
          setShowAddCategory(false);

          toast.error(
            `
          Error: Please fill in all required fields.

          Missing fields:
          ${!name ? "Name" : ""}
          ${!description ? "Description" : ""}
          ${!category ? "Category" : ""}
          ${!price ? "Price" : ""}
          ${!image ? "Image" : ""}
          
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
              className: "toast-light",
            }
          );
        }

        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        await axios.post(FETCH_MENU_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // reset form fields
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setImage(null);

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
      } catch (error: any) {
        let errorMessage = "An error occurred while adding the menu item.";
        if (error.response) {
          if (error.response.status === 400) {
            errorMessage = error.response.data.error;
          } else {
            errorMessage = "Something went wrong.";
          }
        } else if (error.request) {
          errorMessage = "The request was made but no response was received.";
        } else {
          errorMessage = error.message;
        }
        setError({
          message: errorMessage,
          error: true,
        });
        toast.error(errorMessage, {
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
      } finally {
        setTimeout(() => {
          setLoading(false);
          setError({});
        }, 2000);
      }
    },
    [name, description, category, price, image]
  );

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = event => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(files);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
        <p className="text-green-500 text-xl mb-4">Menu item added!</p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className={
            "bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          }
        >
          Add another menu item
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
        <p className="text-green-500 text-xl mb-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-9">
      <h1 className="text-2xl font-semibold mb-4">Add Menu Item</h1>
      <div
        className="flex
        flex-col
        items-center
      justify-start
        "
      >
        <p className=" text-xl mb-4 italic">
          Fill in the form below to add a new menu item. All fields are required
          unless otherwise state,
        </p>
        <p className=" text-xl mb-4 italic">
          Click "Preview" to preview the menu item before adding it.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-xl shadow-xl shadow-green-500 px-9"
      >
        <div className="mb-4">
          {/* Enter the name of the item */}

          {error && error.error ? (
            //@ts-ignore
            <p className="text-red-500 text-sm mb-2">{error.error}</p>
          ) : null}

          <label className="block  font-medium mb-2" htmlFor="name">
            Name of the Food:
            <span className="text-green-500 text-sm ml-2">
              (e.g. Burger, Pizza, Salad)
            </span>
          </label>

          <input
            className={`appearance-none border-green-500 border-2  text-black rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
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
          <label className="block  font-medium mb-2" htmlFor="description">
            Description:
            <span className="text-green-500 text-sm ml-2">
              (e.g.
              <span className="italic">
                A delicious burger with a juicy patty and fresh vegetables.
              </span>
              )
            </span>
          </label>

          <textarea
            className={`appearance- text-black  border-green-500 border-2 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
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
          <label className="block  font-medium mb-2" htmlFor="category">
            Category:
            <span className="text-green-500 text-sm ml-2">
              (e.g. Burgers, Salads, Drinks)
            </span>
          </label>

          <select
            className={`appearance-none text-black border-green-500 border-2 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
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
            <p className=" text-sm mt-2">
              No categories found. Click "Add Category" to create a new
              category.
            </p>
          )}

          {/* If the category does not exist yet, add it using the "Add Category" button */}

          <p className=" text-sm mt-2">
            Can't find the category you're looking for? Click
            <span
              className={
                "inline-block bg-green-500 hover:bg-blue-700 text-white font-bold py-[3px] px-2 rounded cursor-pointer text-xs mx-1"
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
          <label className="block  font-medium mb-2" htmlFor="price">
            Price:
            <span className="text-green-500 text-sm ml-2">
              (e.g. 5.99, 10, 15.50)
            </span>
          </label>

          <input
            className={`appearance-none border rounded text-black border-green-500 border-2  w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
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
          <label className="block  font-medium mb-2" htmlFor="image">
            Image:
          </label>
          <div className="relative border-dashed border-2 border-green-500 rounded-lg h-44">
            <input
              //@ts-ignorenpm run 
              key={image ? image.name : ""}
              className="h-full w-full opacity-0"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <div className="absolute top-0 left-0 h-full w-full">
                <img
                  src={imagePreview}
                  alt="Selected image preview"
                  className="h-full w-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-opacity-75 bg-gray-700 rounded-b-lg">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
                    onClick={() => {
                      setImage(null);

                      setImagePreview(undefined);
                    }}
                  >
                    Cancel or Change
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center">
                  <AiOutlineCloudUpload className=" w-12 h-12" />

                  <span className="block text-gray-400 font-normal">
                    Select a file or drag and drop it here
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex justify-between items-center ${
            showAddCategory ? "mb-4" : "mb-8"
          }`}
        >
          <button
            onClick={handlePreview}
            disabled={isFormEmpty}
            className={`
          ${
            isFormEmpty
              ? "bg-gray-300 cursor-not-allowed  font-medium py-2 px-4 rounded-md"
              : "bg-green-500 hover:bg-blue-600  font-medium py-2 px-4 rounded-md"
          }
        `}
            type="button"
          >
            Preview
          </button>
          <button
            className={
              "bg-green-500 hover:bg-blue-600  font-medium py-2 px-4 rounded-md"
            }
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Add food"}
          </button>
        </div>
      </form>

      {showAddCategory && (
        <AddCategory
          setShowAddCategory={setShowAddCategory}
          //@ts-ignore
          setCategories={setCategories}
        />
      )}

      {showPreviewModal && (
        <MenuPreviewModal
          //@ts-ignore
          previewData={menuPreview}
          onClose={handleClosePreviewModal}
        />
      )}
    </div>
  );
};

export default AddMenuItem;
