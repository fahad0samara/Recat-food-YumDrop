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
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchCart, removeItemFromCart} from "../Redux/cart/cartThunks";

function Cart() {
  const {userId} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [itemImageUrls, setItemImageUrls] = useState([]);

  useEffect(() => {
    console.log("userId in Cart component:", userId);
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);
  const cart = useSelector(state => state.cart);
  useEffect(() => {
    if (cart.items && cart.items.cart && cart.items.cart.items) {
      setCartItems(cart.items.cart.items);
      setItemImageUrls(
        cart.items.cart.items.map(cartItem => cartItem.item.image)
      );
    }
  }, [cart]);

  const handleRemoveItem = itemId => {
    if (userId) {
      dispatch(removeItemFromCart({userId, itemId}));
    }
  };


  return (
    <div>
      <h2>Your Cart</h2>
      {cart && cartItems && cartItems.length > 0 ? (
        cartItems.map((cartItem, index) => (
          <div key={cartItem._id}>
            <h3>{cartItem.item.name}</h3>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Price: {cartItem.item.price}</p>
            <img src={itemImageUrls[index]} alt={cartItem.item.name} />
            <button onClick={() => handleRemoveItem(cartItem._id)}>
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
}

export default Cart;


// import {useEffect} from "react";
// import {useSelector, useDispatch} from "react-redux";
// import { addItemToCart, fetchCart, removeItemFromCart } from "../Redux/cart/cartThunks";


// function Cart() {
//   const {userId} = useSelector(state => state.auth);
//   const cart = useSelector(state => state.cart.items);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCart(userId));
//   }, [dispatch, userId]);

//   // const handleQuantityChange = (itemId, newQuantity) => {
//   //   dispatch(updateItemQuantity({userId, itemId, quantity: newQuantity}));
//   // };

//   const handleRemoveItem = itemId => {
//     dispatch(removeItemFromCart({userId, itemId}));
//   };

//   const handleAddToCart = (itemId, quantity) => {
//     dispatch(addItemToCart({userId, itemId, quantity}));
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
//             {/* <button
//               onClick={() =>
//                 handleQuantityChange(cartItem._id, cartItem.quantity - 1)
//               }
//             >
//               -
//             </button> */}
//             {/* <input
//               type="number"
//               value={cartItem.quantity}
//               onChange={e =>
//                 handleQuantityChange(cartItem._id, parseInt(e.target.value, 10))
//               }
//             />
//             <button
//               onClick={() =>
//                 handleQuantityChange(cartItem._id, cartItem.quantity + 1)
//               }
//             >
//               +
//             </button> */}
//             <button onClick={() => handleRemoveItem(cartItem._id)}>
//               Remove
//             </button>
//           </div>
//         ))
//       ) : (
//         <p>No items in the cart.</p>
//       )}
//       <h3>Add Item to Cart</h3>
//       {/* <input
//         type="number"
//         value={quantity}
//         onChange={e => setQuantity(parseInt(e.target.value, 10))}
//       />
//       <button onClick={() => handleAddToCart(itemId, quantity)}>
//         Add to Cart
//       </button> */}
//     </div>
//   );
// }

// export default Cart;

