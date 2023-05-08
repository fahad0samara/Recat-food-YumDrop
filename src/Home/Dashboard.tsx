import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchUserData} from "../Redux/authThunks";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (!user) {
    navigate("/Login");

    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>User Info</h2>
        <p>User ID: {user._id}</p>
        <p>User Email: {user.email}</p>
        <p>User role: {isAdmin ? "Admin" : "User"}</p>
      </div>
    </div>
  );
};

export default Dashboard;
