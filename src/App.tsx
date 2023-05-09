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
  const {loading} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  //  useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     dispatch(fetchUserData(token));
  //   } else {
  //     navigate("/Login");
  //   }

  // }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Router />
    </div>
  );
};

export default App;
