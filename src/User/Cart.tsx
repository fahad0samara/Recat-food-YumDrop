import {useDispatch, useSelector} from "react-redux";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "../Redux/cart/cartSlice";
import {useState} from "react";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const {items} = useSelector(state => state.cart);
  const [sortOrder, setSortOrder] = useState("name");

  const handleAddItem = item => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = item => {
    dispatch(removeItem(item));
  };

  const handleUpdateQuantity = (item, quantity) => {
    if (quantity < 0) {
      quantity = 0;
    }
    dispatch(updateQuantity({_id: item._id, quantity}));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getTotalDiscount = () => {
    let discount = 0;
    if (items.length >= 3) {
      discount = 10;
    }
    return discount;
  };

  const getQuantityDiscount = () => {
    let discount = 0;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    if (itemCount >= 5) {
      discount = 5;
    }
    return discount;
  };

  const getSpecificItemDiscount = () => {
    let discount = 0;
    const specificItem = items.find(item => item.name === "Specific Item");
    if (specificItem) {
      discount = 5;
    }
    return discount;
  };
  const getTotal = () => {
    let total = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Discount 1: Total discount based on number of items in cart
    const itemCount = items.length;
    let totalDiscount = 0;
    if (itemCount >= 3) {
      const discountPercentage = getTotalDiscount();
      const discountAmount = total * (discountPercentage / 100);
      totalDiscount += discountAmount;
      total -= discountAmount;
    }

    // Discount 2: Quantity discount based on total number of items
    const totalQuantity = items.reduce(
      (total, item) => total + item.quantity,
      0
    );
    if (totalQuantity >= 5) {
      const discountPercentage = getQuantityDiscount();
      const discountAmount = total * (discountPercentage / 100);
      totalDiscount += discountAmount;
      total -= discountAmount;
    }

    // Discount 3: Specific item discount
    const specificItemDiscountPercentage = getSpecificItemDiscount();
    if (specificItemDiscountPercentage > 0) {
      const specificItemTotal = items
        .filter(item => item.name === "Specific Item")
        .reduce((total, item) => total + item.price * item.quantity, 0);
      const discountAmount =
        specificItemTotal * (specificItemDiscountPercentage / 100);
      totalDiscount += discountAmount;
      total -= discountAmount;
    }

    return {
      totalPrice: total.toFixed(2),
      discountAmount: totalDiscount.toFixed(2),
      discountedPrice: (total - totalDiscount).toFixed(2),
    };
  };
  const getDiscountDescription = () => {
    const discounts = [];

    if (getTotalDiscount() > 0) {
      discounts.push({
        amount: `$${getTotalDiscount()}`,
        description: "Total discount based on number of items in cart",
      });
    }
    if (getQuantityDiscount() > 0) {
      discounts.push({
        amount: `${getQuantityDiscount()}%`,
        description: "Quantity discount based on total number of items",
      });
    }
    if (getSpecificItemDiscount() > 0) {
      discounts.push({
        amount: `${getSpecificItemDiscount()}%`,
        description: "Discount on specific item",
      });
    }

    if (discounts.length === 0) {
      return null;
    }

    return (
      <ul className="discount-description">
        {discounts.map(discount => (
          <li key={discount.description}>
            {discount.amount} discount: {discount.description}
          </li>
        ))}
      </ul>
    );
  };

  const getSortedItems = () => {
    if (sortOrder === "name") {
      return items.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "price") {
      return items.slice().sort((a, b) => a.price - b.price);
    } else {
      return items;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="mb-4">
          <div className="flex items-center mb-2 justify-between">
            <div>
              <label htmlFor="sortOrder" className="mr-2">
                Sort by:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={event => setSortOrder(event.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
              </select>
            </div>
            {getDiscountDescription()}
          </div>

          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getSortedItems().map(item => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <img src={item.image} alt={item.name} className="h-20" />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item, item.quantity - 1)
                      }
                      className="bg-gray-200 text-gray-700 rounded-md px-3 py-2 mr-2 hover:bg-gray-300"
                    >
                      <FaMinusCircle />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item, item.quantity + 1)
                      }
                      className="bg-gray-200 text-gray-700 rounded-md px-3 py-2 ml-2 hover:bg-gray-300"
                    >
                      <FaPlusCircle />
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 mr-2"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="border px-4 py-2" colSpan="3">
                  <button
                    onClick={handleClearCart}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2"
                  >
                    Clear Cart
                  </button>
                </td>

                <td className="border px-4 py-2 text-right">Total:</td>
                <td className="border px-4 py-2">
                  <div>
                    <span className="text-gray-600">Before Discount:</span> $
                    {getTotal().totalPrice}
                  </div>
                  <div>
                    <span className="text-gray-600">Discount:</span> $
                    {getTotal().discountAmount}
                  </div>

                  <div>
                    <span className="text-gray-600">After Discount:</span> $
                    {getTotal().discountedPrice}
                  </div>
                </td>
                <td className="border px-4 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;

// import {useDispatch, useSelector} from "react-redux";
// import {
//   addItem,
//   removeItem,
//   updateQuantity,
//   clearCart,
// } from "../Redux/cart/cartSlice";
// import {useState} from "react";
// import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const {items} = useSelector(state => state.cart);
//   const [sortOrder, setSortOrder] = useState("name");

//   const handleAddItem = item => {
//     dispatch(addItem(item));
//   };

//   const handleRemoveItem = item => {
//     dispatch(removeItem(item));
//   };

//   const handleUpdateQuantity = (item, quantity) => {
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
//     const itemCount = items.reduce((count, item) => count + item.quantity, 0);
//     if (itemCount >= 5) {
//       discount = 5;
//     }
//     return discount;
//   };

//   const getSpecificItemDiscount = () => {
//     let discount = 0;
//     const specificItem = items.find(item => item.name === "Specific Item");
//     if (specificItem) {
//       discount = 5;
//     }
//     return discount;
//   };

//   const getTotal = () => {
//     let total = items.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );

//     // Discount 1: Total discount based on number of items in cart
//     const itemCount = items.length;
//     let totalDiscount = 0;
//     if (itemCount >= 3) {
//       const discountPercentage = getTotalDiscount();
//       const discountAmount = (total * discountPercentage) / 100;
//       totalDiscount += discountAmount;
//       total -= discountAmount;
//     }

//     // Discount 2: Quantity discount based on total number of items
//     const totalQuantity = items.reduce(
//       (total, item) => total + item.quantity,
//       0
//     );
//     if (totalQuantity >= 5) {
//       const discountPercentage = getQuantityDiscount();
//       const discountAmount = (total * discountPercentage) / 100;
//       totalDiscount += discountAmount;
//       total -= discountAmount;
//     }

//     // Discount 3: Specific item discount
//     const specificItemDiscountPercentage = getSpecificItemDiscount();
//     if (specificItemDiscountPercentage > 0) {
//       const specificItem = items.find(item => item.name === "Specific Item");
//       if (specificItem) {
//         const discountAmount =
//           (specificItem.price * specificItemDiscountPercentage) / 100;
//         totalDiscount += discountAmount;
//         total -= discountAmount;
//       }
//     }

//     return {
//       total,
//       totalDiscount,
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
//             {discount.amount} discount: {discount.description}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const sortItems = items => {
//     switch (sortOrder) {
//       case "name":
//         return [...items].sort((a, b) => a.name.localeCompare(b.name));
//       case "price":
//         return [...items].sort((a, b) => a.price - b.price);
//       case "quantity":
//         return [...items].sort((a, b) => a.quantity - b.quantity);
//       default:
//         return items;
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Cart</h1>
//       {items.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           <div className="flex flex-row justify-between mb-4">
//             <p>
//               Total:{" "}
//               <span className="font-bold">${getTotal().total.toFixed(2)}</span>
//             </p>
//             <p>
//               Total Discount:{" "}
//               <span className="font-bold">
//                 -${getTotal().totalDiscount.toFixed(2)}
//               </span>
//             </p>
//           </div>
//           {getDiscountDescription()}
//           <div className="flex flex-row justify-between mb-4">
//             <div>
//               <label htmlFor="sort">Sort by:</label>
//               <select
//                 className="ml-2 p-2 border rounded"
//                 id="sort"
//                 onChange={e => setSortOrder(e.target.value)}
//                 value={sortOrder}
//               >
//                 <option value="name">Name</option>
//                 <option value="price">Price</option>
//                 <option value="quantity">Quantity</option>
//               </select>
//             </div>
//             <button
//               className="p-2 border rounded"
//               onClick={() => handleClearCart()}
//             >
//               Clear Cart
//             </button>
//           </div>
//           <table className="table-auto w-full">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Item Name</th>
//                 <th className="px-4 py-2">Price</th>
//                 <th className="px-4 py-2">Quantity</th>
//                 <th className="px-4 py-2"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortItems(items).map(item => (
//                 <tr key={item._id}>
//                   <td className="border px-4 py-2">{item.name}</td>
//                   <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
//                   <td className="border px-4 py-2">
//                     <div className="flex flex-row items-center">
//                       <button
//                         className="p-1 border rounded"
//                         onClick={() =>
//                           handleUpdateQuantity(item, item.quantity - 1)
//                         }
//                       >
//                         <FaMinusCircle />
//                       </button>
//                       <p className="mx-2">{item.quantity}</p>
//                       <button
//                         className="p-1 border rounded"
//                         onClick={() =>
//                           handleUpdateQuantity(item, item.quantity + 1)
//                         }
//                       >
//                         <FaPlusCircle />
//                       </button>
//                     </div>
//                   </td>
//                   <td className="border px-4 py-2">
//                     <button
//                       className="p-1 text-red-500"
//                       onClick={() => handleRemoveItem(item)}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
