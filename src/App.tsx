import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "./Redux/Auth/authThunks";
import {useNavigate} from "react-router-dom";
import Router from "./Router/Router";
import {ToastContainer} from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading, isAuthenticated, user} = useSelector(state => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isAuthenticated) {
      // If the user is already authenticated, fetch user data
      dispatch(fetchUserData());
    } else if (token) {
      // If there is a token in local storage, attempt to authenticate the user
      dispatch(fetchUserData())
        .unwrap()
        .catch(error => {
          console.log("Failed to authenticate user:", error);
          // If authentication fails, clear the token and redirect to the login page
          localStorage.removeItem("token");
          navigate("/login");
        });
    } else {
      // If no token and not authenticated, redirect to the login page
      navigate("/login");
    }
  }, [dispatch, isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ToastContainer />
      <Router />
    </div>
  );
};

export default App;

// import {useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {fetchUserData, logout} from "./Redux/Auth/authThunks";
// import {useNavigate} from "react-router-dom";
// import Router from "./Router/Router";
// import {ToastContainer} from "react-toastify";

// const App = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const {loading, isAuthenticated} = useSelector(state => state.auth);

//   // useEffect(() => {
//   //   const token = localStorage.getItem("token");

//   //   if (isAuthenticated) {
//   //     // If the user is already authenticated, fetch user data
//   //     dispatch(fetchUserData());
//   //   } else if (token) {
//   //     // If there is a token in local storage, attempt to authenticate the user
//   //     dispatch(fetchUserData());
//   //   } else {
//   //     // If no token and not authenticated, redirect to the login page
//   //     navigate("/login");
//   //   }
//   // }, [dispatch, isAuthenticated, navigate]);

//   return (
//     <div>
//       <ToastContainer />
//       <Router />
//     </div>
//   );
// };

// export default App;
