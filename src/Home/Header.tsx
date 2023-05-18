import {useState, useEffect} from "react";
import {FiShoppingCart} from "react-icons/fi";
import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../Redux/Auth/authThunks";
import {useNavigate} from "react-router-dom";
import {RootState} from "../Redux/store";
import {fetchCart} from "../Redux/cart/cartThunks";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAuthenticated, isAdmin} = useSelector(
    (state: RootState) => state.auth
  );

  const {userId} = useSelector((state: RootState) => state.auth);

  // Access the cart data from the Redux store
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  // Access the itemCount value from the cart data
  const itemCount = cart.items?.length || 0;

  console.log(itemCount, isAuthenticated);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/Login");
    } catch (error) {
      console.log(error);
    }
  };
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
            <Link to="/cart">
              Cart
              {itemCount > 0 && <span className="badge">{itemCount}</span>}
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
