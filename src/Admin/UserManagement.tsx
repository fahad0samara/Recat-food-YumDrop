// UserManagement Component

// This component is responsible for displaying a list of users and admins with their respective roles, names, and email addresses. It provides functionalities to promote users to admins and delete users or admins. The user list is fetched from the backend API and displayed in a table format.

// Dependencies
import {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import axios from "axios";
import {useSelector} from "react-redux"; // React Redux hook to access the global state
import {toast} from "react-toastify"; // Importing a notification library for displaying messages
import "react-toastify/dist/ReactToastify.css"; // CSS for the notification library
import {FaUserPlus, FaTrash} from "react-icons/fa"; // Icons from React Icons library used for "Promote to Admin" and "Delete" buttons.
import Loder from "../Loder";

const UserManagement = () => {
  const pageTitle = "EasyBuy | User Management";
  // State variables using React's useState hook
  const [users, setUsers] = useState([]); // Array to store the user data retrieved from the backend
  const [loadingUsers, setLoadingUsers] = useState(false); // State to track loading while fetching users from the backend
  const [loadingUpdate, setLoadingUpdate] = useState(""); // State to track loading while updating each user's role

  // Using the useSelector hook from React Redux to extract data from the global state
  const {userId} = useSelector((state: any) => state.auth);

  // Finding the logged-in admin in the user list (if any)
  const loggedInAdmin = users.find(
    user => user._id === userId && user.role === "admin"
  );

  // useEffect hook to fetch the user data from the backend API on component mount
  useEffect(() => {
    // Fetch user data from the backend API
    const fetchUsers = async () => {
      setLoadingUsers(true); // Set loading state while fetching users
      try {
        const response = await axios.get(
          "https://api-api-arab.azurewebsites.net/auth/users-admins"
        );

        setUsers(response.data.users); // Set the fetched user data into the state variable
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingUsers(false); // Set loading state to false after fetching users
      }
    };

    fetchUsers();
  }, []);

  // Function to handle the action of promoting a user to an admin or vice versa
  const handleUpdateRole = async (userId, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user"; // Determine the new role based on the current role of the user

    const token = localStorage.getItem("token"); // Get the token from local storage for authentication

    // Show a confirmation dialog before proceeding
    const shouldPromote = window.confirm(
      `Are you sure you want to promote this user to ${newRole}?`
    );

    if (!shouldPromote) {
      return; // If the user cancels the confirmation, do nothing
    }

    setLoadingUpdate(userId); // Set loading state for the specific user being updated
    try {
      const response = await axios.put(
        `https://api-api-arab.azurewebsites.net/auth/make-admin/${userId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      // After promoting the user to admin, fetch the updated list of admins from the backend
      const updatedAdminListResponse = await axios.get(
        "https://api-api-arab.azurewebsites.net/auth/users-admins"
      );
      setUsers(updatedAdminListResponse.data.users); // Update the user list with the new admin
    } catch (error) {
      console.error("Error updating user role:", error);
    } finally {
      setLoadingUpdate(""); // Reset loading state for the specific user after updating
    }
  };

  // Function to handle the action of deleting a user
  const handleDeleteUser = async userId => {
    // Show a confirmation dialog before proceeding with the deletion
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!shouldDelete) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get the token from local storage for authentication
      await axios.delete(
        `https://api-api-arab.azurewebsites.net/auth/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the users list after deletion
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to handle the action of deleting an admin
  const handleDeleteAdmin = async adminId => {
    try {
      // Show the confirmation dialog
      const confirmed = window.confirm(
        "Are you sure you want to delete this admin?"
      );
      if (!confirmed) {
        return; // If the user cancels, do nothing
      }

      const token = localStorage.getItem("token"); // Get the token from local storage for authentication
      await axios.delete(
        `https://api-api-arab.azurewebsites.net/auth/admins/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the admins list after deletion
      setUsers(prevUsers => prevUsers.filter(admin => admin._id !== adminId));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  // Render the UI
  if (loadingUsers) {
    return <Loder />; // Display the custom loader component while fetching data
  }

  return (
    <div
      className="p-4
    h-screen
    overflow-y-auto
    
    "
    >
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h1
        className="text-2xl font-bold mb-4 mt-10
      
      "
      >
        User Management
      </h1>
      {/* Display a message if there are no users */}
      {users.length === 0 && <p className="text-gray-500">No users found.</p>}
      {/* Display a table of users if there are users */}

      <table className="table-auto w-full border-collapse border ">
        <thead>
          <tr>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2 hidden md:block">Email</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">{user.firstName}</td>
              <td className="border px-4 py-2 hidden md:block">{user.email}</td>
              <td className="border px-4 py-2">
                {/* Check if the user is the logged-in admin */}
                {user._id === userId && user.role === "admin" ? (
                  <span>Admin</span>
                ) : (
                  <>
                    {/* "Promote to Admin" button */}
                    {user.role === "user" && (
                      <button
                        className={`px-4 py-2 rounded text-cyan-500 hover:text-cyan-700`}
                        onClick={() => {
                          // Check if the user is not the logged-in admin
                          if (user._id !== userId) {
                            handleUpdateRole(user._id, user.role);
                          }
                        }}
                        disabled={
                          loadingUpdate === user._id ||
                          (loggedInAdmin && loggedInAdmin._id === user._id)
                        }
                      >
                        {loadingUpdate === user._id ? (
                          "Loading..."
                        ) : (
                          <FaUserPlus />
                        )}
                      </button>
                    )}
                  </>
                )}
                {/* Disable "Delete" button for the logged-in admin */}
                <button
                  className={`px-4 py-2 rounded text-red-500 hover:text-red-700`}
                  onClick={() => {
                    // Check if the user is not the logged-in admin
                    if (user._id !== userId) {
                      if (user.role === "user") {
                        handleDeleteUser(user._id);
                      } else if (user.role === "admin") {
                        handleDeleteAdmin(user._id);
                      }
                    } else {
                      toast.error("You cannot delete your own account!");
                    }
                  }}
                  disabled={
                    loadingUpdate === user._id ||
                    (loggedInAdmin &&
                      loggedInAdmin._id === user._id &&
                      user._id !== userId)
                  }
                >
                  {loadingUpdate === user._id ? "Loading..." : <FaTrash />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
