import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../Redux/authThunks";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorr, setError] = useState("");
  const dispatch = useDispatch();
  const {user, token, isAuthenticated, error} = useSelector(
    (state: any) => state.auth
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({email, password}));

    console.log("====================================");
    console.log(
      "email: ",
      email,
      "password: ",
      password,
      "error: ",
      error,
      "user: ",
      user,
      "token: ",
      token,
      "isAuthenticated: ",
      isAuthenticated
    );
    console.log("====================================");
  };

  const handleFormSubmit = async (e: {preventDefault: () => void}) => {
    e.preventDefault();

    // Prepare the login data
    const loginData = {email, password};

    try {
      // Send a POST request to the server
      const response = await axios.post("/login", loginData);

      // Handle the response data
      const {token} = response.data;

      // Save the token to local storage or state
      // You can use a state management library like Redux to manage the token
      localStorage.setItem("token", token);

      // Redirect or perform any other actions after successful login
      // For example, you can redirect to a dashboard page
      // window.location.href = '/dashboard';
    } catch (error: any) {
      // Handle the error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>

      <div
        className="bg-amber-500
              flex 

              "
      >
        <h2>Login</h2>
        {isAuthenticated ? (
          <p>You are already logged in. User: {user}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <br />
            {error && <p>{error}</p>}
            <button type="submit">Login</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
