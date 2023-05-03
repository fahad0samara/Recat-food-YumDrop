/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface MyErrorType {
  response: {
    status: number;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface AddCategoryProps {
  setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: string;
        name: string;
        description: string;
      }>
    >
  >;
}

const AddCategory: React.FC<AddCategoryProps> = ({
  setShowAddCategory,
  setCategories,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post<Category>(
        "http://localhost:1337/api/categories",
        {
          name,
          description,
        }
      );
      setCategories(prevState => [...prevState, res.data]);
      setName("");
      setDescription("");
      setShowAddCategory(false);
      toast.success(
        ` the
        category ${res.data.name} was added successfully
        you can see it in the list of categories in 
        the menu`,

        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } catch (error) {
      if ((error as MyErrorType).response?.status === 400) {
        const errorMessage = error.response.data.error;
        setError(errorMessage);
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
      } else {
        setError(
          "Something went wrong. Please check your internet connection and try again."
        );
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md z-20">
          <h2 className="text-lg font-medium mb-4">Add Category</h2>
          {error && (
            <div className="bg-red-200 text-red-800 p-2 mb-4 rounded-md">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-200 text-green-800 p-2 mb-4 rounded-md">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  error ? "border-red-500" : ""
                }`}
                type="text"
                id="name"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  setError("");
                }}
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
                className="border border-gray-400 rounded-md p-2 w-full"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add category"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md ml-2"
              onClick={() => setShowAddCategory(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
