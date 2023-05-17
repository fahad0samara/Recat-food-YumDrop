import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../Redux/store";

import {FaMinus, FaPlus, FaShoppingCart} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {
  clearCart,
  fetchCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "../Redux/cart/cartThunks";

const Cart = () => {
  const {userId} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();
  console.log(cart);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const handleRemoveItem = async (itemId: string) => {
    if (userId) {
      await dispatch(removeItemFromCart({userId, itemId}));
      await dispatch(fetchCart(userId));
    }
  };

  const handleClearCart = async () => {
    if (userId) {
      await dispatch(clearCart(userId));
    }
  };

  const handleUpdateQuantity = async (
    e: React.MouseEvent,
    itemId: string,
    quantity: number
  ) => {
    e.preventDefault();
    if (userId) {
      await dispatch(updateCartItemQuantity({userId, itemId, quantity}));
      await dispatch(fetchCart(userId));
    }
  };

  if (cart.loading) {
    return (
      <div className="flex items-center h-screen justify-center">
        <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce mr-2"></div>
        <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce mr-2"></div>
        <div className="w-8 h-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

  const totalPrice: number =
    cart.items?.cart?.items?.reduce(
      (acc: number, cartItem: {item: {price: number}; quantity: number}) =>
        acc + cartItem.item.price * cartItem.quantity,
      0
    ) ?? 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

        <div className="flex flex-col md:flex-row md:-mx-6">
          <div className="md:w-2/3 md:mx-6">
            {cart &&
            cart.items &&
            cart.items.cart &&
            cart.items.cart.items &&
            cart.items.cart.items.length > 0 ? (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul>
                  {cart.items.cart.items.map((cartItem: any) => (
                    <li key={cartItem._id}>
                      <div className="flex px-4 py-5 sm:px-6">
                        <div className="flex-shrink-0">
                          <img
                            className="h-16 w-16 rounded-md object-cover object-center"
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                          />
                        </div>
                        <div className="ml-6 flex-1 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <h3 className="text-md font-medium text-gray-800">
                              {cartItem.item.name}
                            </h3>
                            <button
                              onClick={() =>
                                handleRemoveItem(cartItem.item._id)
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-2">
                                Quantity:
                              </span>
                              <span
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l-lg cursor-pointer"
                                onClick={e =>
                                  cartItem.quantity > 1 &&
                                  handleUpdateQuantity(
                                    e,
                                    cartItem.item._id,
                                    cartItem.quantity - 1
                                  )
                                }
                              >
                                <FaMinus />
                              </span>
                              <span className="bg-gray-200 text-gray-700 px-4 py-1">
                                {cartItem.quantity}
                              </span>
                              <span
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r-lg cursor-pointer"
                                onClick={e =>
                                  handleUpdateQuantity(
                                    e,
                                    cartItem.item._id,
                                    cartItem.quantity + 1
                                  )
                                }
                              >
                                <FaPlus />
                              </span>
                            </div>
                            <span className="text-gray-600">
                              ${cartItem.item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 mx-28">
                  <button
                    onClick={handleClearCart}
                    className="w-full inline-flex rounded-xl items-center justify-center px-4 py-2 border border-transparent shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="md:w-1/3 md:mx-6 mt-8 md:mt-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="border-b border-gray-200 mb-2"></div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout", {state: {totalPrice}})}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaShoppingCart className="mr-2" />
                Checkout
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
