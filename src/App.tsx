import Router from "./Router/Router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <Router />
    </div>
  );
};

export default App;
