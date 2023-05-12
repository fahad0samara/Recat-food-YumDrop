// import {useState} from "react";
// import axios from "axios";

// function Checkout() {
//   const [paymentInfo, setPaymentInfo] = useState({});

//   const handlePaymentInfoChange = event => {
//     setPaymentInfo({
//       ...paymentInfo,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handlePlaceOrderClick = async () => {
//     try {
//       // Send the payment information to the server
//       const response = await axios.post(
//         "http://localhost:1337/cart/checkout",
//         paymentInfo
//       );

//       if (response.status === 200) {
//         // Payment succeeded, show a success message
//         console.log("====================================");
//         console.log();
//         console.log("====================================");
//       } else {
//         // Payment failed, show an error message
//         console.log("====================================");
//         console.log(response);
//       }
//     } catch (error) {
//       // Something went wrong, show an error message
//       console.log("====================================");
//       console.log(error);
//       console.log("====================================");
//     }
//   };

//   return (
//     <div>
//       <h1>Checkout</h1>
//       <form>
//         <label>
//           Name on card:
//           <input
//             type="text"
//             name="nameOnCard"
//             value={paymentInfo.nameOnCard || ""}
//             onChange={handlePaymentInfoChange}
//           />
//         </label>
//         <label>
//           Card number:
//           <input
//             type="text"
//             name="cardNumber"
//             value={paymentInfo.cardNumber || ""}
//             onChange={handlePaymentInfoChange}
//           />
//         </label>
//         <label>
//           Expiration date:
//           <input
//             type="text"
//             name="expirationDate"
//             value={paymentInfo.expirationDate || ""}
//             onChange={handlePaymentInfoChange}
//           />
//         </label>
//         <label>
//           CVV:
//           <input
//             type="text"
//             name="cvv"
//             value={paymentInfo.cvv || ""}
//             onChange={handlePaymentInfoChange}
//           />
//         </label>
//         <button type="button" onClick={handlePlaceOrderClick}>
//           Place order
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Checkout;

import React, {useState} from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51L9ELNKirGI4xLuFje5nhKydtSWAratO6zSb0HdHA0csOt16sFWs0x247vpjbrFr7HWPcgGHKETaIOUOzYoGUhtL00O0jbZYVV"
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentInfo, setPaymentInfo] = useState({});

  const handlePaymentInfoChange = event => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handlePlaceOrderClick = async () => {
    try {
      // Validate the card information
      if (!stripe || !elements) {
        return;
      }

      // Create a payment method using the card element
      const cardElement = elements.getElement(CardElement);
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.log(error.message);
        return;
      }

      // Send the payment information to the server
      const response = await axios.post("http://localhost:1337/cart/checkout", {
        paymentMethodId: paymentMethod.id,
        ...paymentInfo,
      });

      if (response.status === 200) {
        // Process the payment on the server and show a success message
        console.log("Payment succeeded!");
      } else {
        // Payment failed, show an error message
        console.log(response);
      }
    } catch (error) {
      // Something went wrong, show an error message
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form>
        <label className="block mb-4">
          Name on card:
          <input
            className="border border-gray-300 px-2 py-1 w-64"
            type="text"
            name="nameOnCard"
            value={paymentInfo.nameOnCard || ""}
            onChange={handlePaymentInfoChange}
          />
        </label>
        <label className="block mb-4">
          Card details:
          <CardElement
            options={{style: {base: {fontSize: "16px"}}}}
            className="border border-gray-300 px-2 py-1 w-64"
          />
        </label>
        <button
          type="button"
          onClick={handlePlaceOrderClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Place order
        </button>
      </form>
    </div>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
