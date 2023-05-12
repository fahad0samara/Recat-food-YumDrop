import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {FaMinus, FaPlus} from "react-icons/fa";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "../Redux/cart/cartThunks";

function CartItem({cartItem}) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const dispatch = useDispatch();

  const handleRemoveItem = async itemId => {
    await dispatch(removeItemFromCart({itemId}));
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    await dispatch(updateCartItemQuantity({itemId, quantity: newQuantity}));
    setQuantity(newQuantity);
  };

  return (
    <div>
      <h3>{cartItem.item.name}</h3>
      <p>
        Quantity:{" "}
        <span
          onClick={() =>
            quantity > 1 &&
            handleUpdateQuantity(cartItem.item._id, quantity - 1)
          }
        >
          <FaMinus />
        </span>
        {cartItem.loading ? <span>Loading...</span> : cartItem.quantity}
        <span
          onClick={() => handleUpdateQuantity(cartItem.item._id, quantity + 1)}
        >
          <FaPlus />
        </span>
      </p>
      <p>Price: {cartItem.item.price}</p>
      <img src={cartItem.item.image} alt={cartItem.item.name} />
      <button onClick={() => handleRemoveItem(cartItem.item._id)}>
        Remove
      </button>
    </div>
  );
}

export default React.memo(CartItem);
