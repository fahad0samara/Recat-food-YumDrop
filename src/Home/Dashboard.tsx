import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchUserData} from "../Redux/authThunks";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/Login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>My Info</h2>
        <p>
          Name: {user?.firstName} {user?.lastName}
        </p>
        <p>Email: {user?.email}</p>
        <p>Admin: {isAdmin ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default Dashboard;
