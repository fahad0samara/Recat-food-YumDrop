import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../Redux/authThunks";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user", // Default role is 'user'
  });

  const dispatch = useDispatch();
  const {error, loading} = useSelector((state: any) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  const handleChange = (e: {target: {name: any; value: any}}) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // const handleSubmit = async e => {
  //   e.preventDefault();

  //   try {
  //     // Make a POST request to your server's registration route
  //     const response = await axios.post(
  //       "http://localhost:1337/auth/register",
  //       formData
  //     );
  //     console.log(response.data); // Registration successful message

  //     // Reset the form fields
  //     setFormData({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //       role: "user",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div>{error && <p style={{color: "red"}}>{error.message}</p>}</div>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Role:
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button type="submit">{loading ? "Loading..." : "Register"}</button>
    </form>
  );
};

export default Register;
