// import {useDispatch, useSelector} from "react-redux";
// import {
//   addItem,
//   removeItem,
//   updateQuantity,
//   clearCart,
// } from "../Redux/cart/cartSlice";
// import {
//   JSXElementConstructor,
//   Key,
//   ReactElement,
//   ReactFragment,
//   useState,
// } from "react";
// import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const {items} = useSelector(state => state.cart);
//   const [sortOrder, setSortOrder] = useState("name");

//   const handleAddItem = (item: any) => {
//     dispatch(addItem(item));
//   };

//   const handleRemoveItem = (item: any) => {
//     dispatch(removeItem(item));
//   };

//   const handleUpdateQuantity = (item: {_id: any}, quantity: number) => {
//     if (quantity < 0) {
//       quantity = 0;
//     }
//     dispatch(updateQuantity({_id: item._id, quantity}));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const getTotalDiscount = () => {
//     let discount = 0;
//     if (items.length >= 3) {
//       discount = 10;
//     }
//     return discount;
//   };

//   const getQuantityDiscount = () => {
//     let discount = 0;
//     const itemCount = items.reduce(
//       (count: any, item: {quantity: any}) => count + item.quantity,
//       0
//     );
//     if (itemCount >= 5) {
//       discount = 5;
//     }
//     return discount;
//   };

//   const getSpecificItemDiscount = () => {
//     let discount = 0;
//     const specificItem = items.find(
//       (item: {name: string}) => item.name === "Specific Item"
//     );
//     if (specificItem) {
//       discount = 5;
//     }
//     return discount;
//   };
//   const getTotal = () => {
//     let total = items.reduce(
//       (total: number, item: {price: number; quantity: number}) =>
//         total + item.price * item.quantity,
//       0
//     );

//     // Discount 1: Total discount based on number of items in cart
//     const itemCount = items.length;
//     let totalDiscount = 0;
//     if (itemCount >= 3) {
//       const discountPercentage = getTotalDiscount();
//       const discountAmount = total * (discountPercentage / 100);
//       totalDiscount += discountAmount;
//       total -= discountAmount;
//     }

//     // Discount 2: Quantity discount based on total number of items
//     const totalQuantity = items.reduce(
//       (total: any, item: {quantity: any}) => total + item.quantity,
//       0
//     );
//     if (totalQuantity >= 5) {
//       const discountPercentage = getQuantityDiscount();
//       const discountAmount = total * (discountPercentage / 100);
//       totalDiscount += discountAmount;
//       total -= discountAmount;
//     }

//     // Discount 3: Specific item discount
//     const specificItemDiscountPercentage = getSpecificItemDiscount();
//     if (specificItemDiscountPercentage > 0) {
//       const specificItemTotal = items
//         .filter((item: {name: string}) => item.name === "Specific Item")
//         .reduce(
//           (total: number, item: {price: number; quantity: number}) =>
//             total + item.price * item.quantity,
//           0
//         );
//       const discountAmount =
//         specificItemTotal * (specificItemDiscountPercentage / 100);
//       totalDiscount += discountAmount;
//       total -= discountAmount;
//     }

//     return {
//       totalPrice: total.toFixed(2),
//       discountAmount: totalDiscount.toFixed(2),
//       discountedPrice: (total - totalDiscount).toFixed(2),
//     };
//   };
//   const getDiscountDescription = () => {
//     const discounts = [];

//     if (getTotalDiscount() > 0) {
//       discounts.push({
//         amount: `$${getTotalDiscount()}`,
//         description: "Total discount based on number of items in cart",
//       });
//     }
//     if (getQuantityDiscount() > 0) {
//       discounts.push({
//         amount: `${getQuantityDiscount()}%`,
//         description: "Quantity discount based on total number of items",
//       });
//     }
//     if (getSpecificItemDiscount() > 0) {
//       discounts.push({
//         amount: `${getSpecificItemDiscount()}%`,
//         description: "Discount on specific item",
//       });
//     }

//     if (discounts.length === 0) {
//       return null;
//     }

//     return (
//       <ul className="discount-description">
//         {discounts.map(discount => (
//           <li key={discount.description}>
//             {discount.amount} discount:{" "}
//             <span className="text-green-500">{discount.description}</span>
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const getSortedItems = () => {
//     if (sortOrder === "name") {
//       return items
//         .slice()
//         .sort((a: {name: string}, b: {name: any}) =>
//           a.name.localeCompare(b.name)
//         );
//     } else if (sortOrder === "price") {
//       return items
//         .slice()
//         .sort((a: {price: number}, b: {price: number}) => a.price - b.price);
//     } else {
//       return items;
//     }
//   };

//   return (
//     <div className={"max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"}>
//       {items.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <div className="mb-4">
//           <div className="flex items-center mb-2 justify-between">
//             <div>
//               <label htmlFor="sortOrder" className="mr-2">
//                 Sort by:
//               </label>
//               <select
//                 id="sortOrder"
//                 value={sortOrder}
//                 onChange={event => setSortOrder(event.target.value)}
//                 className="bg-white border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               >
//                 <option value="name">Name</option>
//                 <option value="price">Price</option>
//               </select>
//             </div>
//             {getDiscountDescription()}
//           </div>

//           <table className="table-auto w-full">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Item</th>
//                 <th className="px-4 py-2">Price</th>
//                 <th className="px-4 py-2">Image</th>
//                 <th className="px-4 py-2">Quantity</th>
//                 <th className="px-4 py-2">Total</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {getSortedItems().map(
//                 (item: {
//                   _id: Key | null | undefined;
//                   name:
//                     | string
//                     | number
//                     | boolean
//                     | ReactElement<any, string | JSXElementConstructor<any>>
//                     | ReactFragment
//                     | null
//                     | undefined;
//                   price: number;
//                   image: string | undefined;
//                   quantity:
//                     | string
//                     | number
//                     | boolean
//                     | ReactElement<any, string | JSXElementConstructor<any>>
//                     | ReactFragment
//                     | null
//                     | undefined;
//                 }) => (
//                   <tr key={item._id}>
//                     <td className="border px-4 py-2">{item.name}</td>
//                     <td className="border px-4 py-2">
//                       ${item.price.toFixed(2)}
//                     </td>
//                     <td className="border px-4 py-2">
//                       <img src={item.image} alt={item.name} className="h-20" />
//                     </td>
//                     <td className="border px-4 py-2">
//                       <button
//                         onClick={() =>
//                           handleUpdateQuantity(item, item.quantity - 1)
//                         }
//                         className="bg-gray-200 text-gray-700 rounded-md px-3 py-2 mr-2 hover:bg-gray-300"
//                       >
//                         <FaMinusCircle />
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() =>
//                           handleUpdateQuantity(item, item.quantity + 1)
//                         }
//                         className="bg-gray-200 text-gray-700 rounded-md px-3 py-2 ml-2 hover:bg-gray-300"
//                       >
//                         <FaPlusCircle />
//                       </button>
//                     </td>
//                     <td className="border px-4 py-2">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </td>
//                     <td className="border px-4 py-2">
//                       <button
//                         onClick={() => handleRemoveItem(item)}
//                         className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 mr-2"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 )
//               )}
//               <tr>
//                 <td className="border px-4 py-2" colSpan="3">
//                   <button
//                     onClick={handleClearCart}
//                     className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2"
//                   >
//                     Clear Cart
//                   </button>
//                 </td>

//                 <td className="border px-4 py-2 text-right">Total:</td>
//                 <td className="border px-4 py-2">
//                   <div>
//                     <span className="text-gray-600">Before Discount:</span> $
//                     {getTotal().totalPrice}
//                   </div>
//                   <div>
//                     <span className="text-gray-600">Discount:</span> $
//                     {getTotal().discountAmount}
//                   </div>

//                   <div>
//                     <span className="text-gray-600">After Discount:</span> $
//                     {getTotal().discountedPrice}
//                   </div>
//                 </td>
//                 <td className="border px-4 py-2"></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };
// import {useEffect} from "react";
// import {useSelector, useDispatch} from "react-redux";
// import {fetchCart, removeItemFromCart} from "../Redux/cart/cartThunks";

// function Cart() {
//   const {userId} = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state.cart);
//   console.log("====================================");
//   console.log(cart);
//   console.log("====================================");

//   useEffect(() => {
//     console.log("userId in Cart component:", userId); // Add this line to log the value of userId
//     dispatch(fetchCart(userId));
//   }, [dispatch, userId]);

//   const handleRemoveItem = itemId => {
//     if (userId) {
//       console.log("====================================");
//       console.log(userId, "userId");
//       console.log("====================================");
//       //Check that userId is defined and has a valid value
//       dispatch(removeItemFromCart({userId, itemId: itemId}));
//     }
//   };

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cart &&
//       cart.items &&
//       cart.items.cart &&
//       cart.items.cart.items &&
//       cart.items.cart.items.length > 0 ? (
//         cart.items.cart.items.map(cartItem => (
//           <div key={cartItem._id}>
//             <h3>{cartItem.item.name}</h3>
//             <p>Quantity: {cartItem.quantity}</p>
//             <p>Price: {cartItem.item.price}</p>
//             <img src={cartItem.item.image} alt={cartItem.item.name} />
//             <button onClick={() => handleRemoveItem(cartItem.item._id)}>
//               Remove
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart.</p>
//       )}
//     </div>
//   );
// }

// export default Cart;

// import React, {useEffect} from "react";
// import {useSelector, useDispatch} from "react-redux";
// import {fetchCart, removeItemFromCart} from "../Redux/cart/cartThunks";

// function Cart() {
//   const {userId} = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state.cart);
//   console.log('====================================');
//   console.log(cart);
//   console.log('====================================');

//   useEffect(() => {
//     dispatch(fetchCart(userId));
//   }, [dispatch, userId]);

//   const handleRemoveItem = itemId => {
//     if (userId) {
//       dispatch(removeItemFromCart({userId, itemId}));
//     }
//   };

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cart && cart.items && cart.items.length > 0 ? (
//         cart.items.map(cartItem => (
//           <div key={cartItem._id}>
//             <h3>{cartItem.item.name}</h3>
//             <p>Quantity: {cartItem.quantity}</p>
//             <p>Price: {cartItem.item.price}</p>
//             <img src={cartItem.item.image} alt={cartItem.item.name} />
//             <button onClick={() => handleRemoveItem(cartItem._id)}>
//               Remove
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart.</p>
//       )}
//     </div>
//   );
// }

// export default Cart;
// import {FaMinus, FaPlus} from "react-icons/fa";
// import React, {useEffect} from "react";
// import {useSelector, useDispatch} from "react-redux";
// import {
//   fetchCart,
//   removeItemFromCart,
//   clearCart,
//   updateCartItemQuantity,
// } from "../Redux/cart/cartThunks";

// function Cart() {
//   const {userId} = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state.cart);

//  useEffect(() => {
//    if (userId  ) {
//      dispatch(fetchCart(userId));
//    }
//  }, [dispatch, userId, ]);

// const handleRemoveItem = async itemId => {
//   if (userId) {
//     await dispatch(removeItemFromCart({ userId, itemId }));
//     await dispatch(fetchCart(userId));
//   }
//   };
  
//   const handleClearCart = async () => {
//     if (userId) {
//       await dispatch(clearCart(userId));
   
//     }
//   };

//   const handleUpdateQuantity = async (itemId, quantity) => {
  
//   if (userId) {
//     await dispatch(updateCartItemQuantity({ userId, itemId, quantity }));
//     dispatch(fetchCart(userId));
    
//   }
// };



//   if (cart.loading) {
//     return <p>Loading cart...</p>;
//   }

 

//   return (
//     <div className="grid grid-cols-4 gap-7">
//       {cart &&
//       cart.items &&
//       cart.items.cart &&
//       cart.items.cart.items &&
//       cart.items.cart.items.length > 0 ? (
//         cart.items.cart.items.map(cartItem => (
//           <div key={cartItem._id}>
//             <h3>{cartItem.item.name}</h3>
//             <p>Quantity: {cartItem.quantity}</p>
//             <p>Price: {cartItem.item.price}</p>
//             <img src={cartItem.item.image} alt={cartItem.item.name} />
//             <div>
//          <span onClick={() => handleUpdateQuantity(cartItem.item._id, cartItem.quantity - 1)}>
//   <FaMinus />
// </span>
// <span>{cartItem.quantity}</span>
// <span onClick={() => handleUpdateQuantity(cartItem.item._id, cartItem.quantity + 1)}>
//   <FaPlus />
// </span>
//             </div>
//             <button onClick={() => handleRemoveItem(cartItem.item._id)}>
//               Remove
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart.</p>
//       )}

//       <button onClick={handleClearCart}>Clear Cart</button>
//     </div>
//   );
// }

import {FaMinus, FaPlus, FaShoppingCart} from "react-icons/fa";
import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
  fetchCart,
  removeItemFromCart,
  clearCart,
  updateCartItemQuantity,
} from "../Redux/cart/cartThunks";
import {useNavigate} from "react-router-dom";

function Cart(props) {
  const {userId} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch, userId]);

  const handleRemoveItem = async itemId => {
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

  const handleUpdateQuantity = async (e, itemId, quantity) => {
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

  const totalPrice = cart.items?.items?.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

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
                  {cart.items.cart.items.map(cartItem => (
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
                    clear all the cart
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
                onClick={() => navigate("/Checkout", {totalPrice})}
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
}

export default Cart;



