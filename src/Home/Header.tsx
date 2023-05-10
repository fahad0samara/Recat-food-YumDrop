import {useState, useEffect} from "react";
import {FiShoppingCart} from "react-icons/fi";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../Redux/Auth/authThunks";
import {useNavigate} from "react-router-dom";
import {RootState} from "../Redux/store";

const Header = () => {
  const {isAuthenticated, isAdmin} = useSelector((state: any) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const currentCount = cartItems.reduce((total, item) => {
  //     if (typeof item.quantity === "number") {
  //       return total + item.quantity;
  //     } else {
  //       console.error(`Invalid quantity for item ${item.id}: ${item.quantity}`);
  //       return total;
  //     }
  //   }, 0);

  //   if (currentCount !== cartItemsCount) {
  //     setIsAnimating(true);
  //     setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 1000);
  //   }

  //   setCartItemsCount(currentCount);
  // }, [cartItems, cartItemsCount]);

  return (
    <header
      className={
        "relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-slate-700 md:mx-auto md:flex-row md:items-center"
      }
    >
      <Link
        to="/"
        className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black"
      >
        <span className="mr-2 text-4xl text-green-500">20</span>
        the future
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label
        className={"absolute top-5 right-7 cursor-pointer md:hidden"}
        htmlFor="navbar-open"
      >
        <span className="sr-only">Toggle Navigation</span>
        fff
      </label>
      <nav
        aria-label="Header Navigation"
        className={
          "flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start"
        }
      >
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="font-bold md:mr-12">
            <Link to="/">Home</Link>
          </li>
          <li className="md:mr-12">
            <Link to="/menu">Menu</Link>
          </li>
          {isAuthenticated && isAdmin && (
            <li className="md:mr-12">
              <Link to="/AddMenuItem">AddMenuItem</Link>
            </li>
          )}
          <li className={"md:mr-12"}>
            <Link to="/cart" className="relative flex items-center">
              <FiShoppingCart className="text-2xl" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 inline-block bg-red-500 text-white rounded-full px-1 text-xs">
                  {cartItemsCount}
                </span>
              )}
              {isAnimating && (
                <span className="absolute top-0 right-0 inline-block bg-green-500 text-white rounded-full px-1 text-xs animate-ping">
                  +
                </span>
              )}
            </Link>
          </li>
          {!isAuthenticated && (
            <>
              <li className="md:mr-12">
                <Link to="/Register">Register</Link>
              </li>
              <li className="md:mr-12">
                <Link
                  to="/Login"
                  className={
                    "rounded-full border-2 border-green-500 px-6 py-1 text-green-600 transition-colors hover:bg-green-500 hover:text-white"
                  }
                >
                  Login
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className={"md:mr-12"}>
              <button
                onClick={handleLogout}
                className="rounded-full border-2 border-red-500 px-6 py-1 text-red-600 transition-colors hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
