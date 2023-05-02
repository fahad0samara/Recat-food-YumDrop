/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useState} from "react";
import axios from "axios";

interface Category {
  id: string;
  name: string;
  description: string;
}
interface Props {
  categories: Category[];
  setShowAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const AddCategory: React.FC<Props> = ({setShowAddCategory, setCategories}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<Category>(
        "http://localhost:1337/api/categories",
        {
          name,
          description,
        }
      );

      setCategories(categories => [...categories, res.data]);
      setName("");
      setDescription("");
      setShowAddCategory(false);
      setError("");
      setLoading(false);

      setError("");
    } catch (error) {
      //@ts-ignore
      if (error.response.status === 409) {
        setError("Category already exists.");
      } else {
        setError("Error creating category.");
      }
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                className="border border-gray-400 rounded-md p-2 w-full"
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
                className="border border-gray-400 rounded-md p-2 w-full"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            {
              //loading

              loading && (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              )
            }

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
              type="submit"
            >
              Add category
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md ml-2"
              onClick={() => setShowAddCategory(false)}
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
