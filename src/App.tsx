import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, logout} from "./Redux/Auth/authThunks";
import {useNavigate} from "react-router-dom";
import Router from "./Router/Router";
import {ToastContainer} from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = useSelector(state => state.auth.token);
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    const initializeApp = async () => {
      if (isAuthenticated || token) {
        // If the user is already authenticated or a token exists in Redux state, fetch user data
        dispatch(fetchUserData());
      } else {
        // If no token and not authenticated, redirect to the login page

        navigate("/Login");
      }
    };

    initializeApp();
  }, [dispatch, isAuthenticated, token]);

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
