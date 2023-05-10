import Router from "./Router/Router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {useNavigate} from "react-router-dom";
import {fetchUserData} from "./Redux/Auth/authThunks";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserData(token));
    } else {
      alert("You are not logged in. Please log in to access the application.");
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <ToastContainer />
      <Router />
    </div>
  );
};

export default App;
