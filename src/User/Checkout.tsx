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
import {useLocation} from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51L9ELNKirGI4xLuFje5nhKydtSWAratO6zSb0HdHA0csOt16sFWs0x247vpjbrFr7HWPcgGHKETaIOUOzYoGUhtL00O0jbZYVV"
);

import {useNavigate} from "react-router-dom";
function CheckoutForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalPrice = location.state.totalPrice;
  const stripe = useStripe();
  const elements = useElements();
  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    card: "",
  });

  const handlePaymentInfoChange = event => {
    setPaymentInfo({
      ...paymentInfo,
      [event.target.name]: event.target.value,
    });
  };

  const validateStep1 = () => {
    const {name, email} = paymentInfo;
    let isValid = true;
    const errorMessages = {};

    if (!name.trim()) {
      errorMessages.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errorMessages.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errorMessages.email = "Email is invalid";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const validateStep2 = () => {
    const {address, city, state, zipCode} = paymentInfo;
    let isValid = true;
    const errorMessages = {};

    if (!address.trim()) {
      errorMessages.address = "Address is required";
      isValid = false;
    }

    if (!city.trim()) {
      errorMessages.city = "City is required";
      isValid = false;
    }

    if (!state.trim()) {
      errorMessages.state = "State is required";
      isValid = false;
    }

    if (!zipCode.trim()) {
      errorMessages.zipCode = "Zip Code is required";
      isValid = false;
    } else if (!/^\d{5}(?:[-\s]\d{4})?$/.test(zipCode)) {
      errorMessages.zipCode = "Zip Code is invalid";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const validateStep3 = () => {
    const cardElement = elements.getElement(CardElement);
    let isValid = true;
    const errorMessages = {};

    if (!cardElement._complete) {
      errorMessages.card = "Card information is incomplete";
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleNextClick = async () => {
    setIsLoading(true);

    try {
      let isValid = false;
      switch (step) {
        case 1:
          isValid = validateStep1();
          break;
        case 2:
          isValid = validateStep2();
          break;
        case 3:
          isValid = validateStep3();
          break;
        default:
          break;
      }

      if (!isValid) {
        setIsLoading(false);
        return;
      }

      setStep(step + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    setStep(step - 1);
  };

  const handlePlaceOrderClick = async () => {
    setIsLoading(true);

    try {
      if (!stripe || !elements) {
        setIsLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setErrors({card: error.message});
        setIsLoading(false);
        return;
      }

      let response;
      if (step === 3) {
        // Send the payment information and total price to the server
        response = await axios.post("http://localhost:1337/cart/checkout", {
          paymentMethodId: paymentMethod.id,
          totalAmount: totalPrice,
          ...paymentInfo,
        });
      }

      if (response && response.status === 200) {
        // Redirect to success page

        // Redirect to the success page with the paymentInfo
        navigate("/success", {
          state: {
            paymentInfo,
            totalPrice,
            orderTime: new Date().getTime(),
          },
        });
      } else if (step === 3) {
        // Payment failed, show an error message
        console.log(response);
      }
      // handle other steps here
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getStepName = () => {
    switch (step) {
      case 1:
        return "Contact Information";
      case 2:
        return "Shipping Address";
      case 3:
        return "Payment Information";
      default:
        return "";
    }
  };

  const renderStep1 = () => {
    return (
      <>
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
              errors.name ? "border-red-500" : "border-gray-200"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            type="text"
            id="name"
            name="name"
            value={paymentInfo.name}
            onChange={handlePaymentInfoChange}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic">{errors.name}</p>
          )}
        </div>
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            type="email"
            id="email"
            name="email"
            value={paymentInfo.email}
            onChange={handlePaymentInfoChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
      </>
    );
  };

  const renderStep2 = () => {
    return (
      <>
        <div className="w-full px-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
              errors.address ? "border-red-500" : "border-gray-200"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
            type="text"
            id="address"
            name="address"
            value={paymentInfo.address}
            onChange={handlePaymentInfoChange}
          />
          {errors.address && (
            <p className="text-red-500 text-xs italic">{errors.address}</p>
          )}
        </div>
        <div className="flex w-full">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center"
              htmlFor="city"
            >
              City
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors.city ? "border-red-500" : "border-gray-200"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              type="text"
              id="city"
              name="city"
              value={paymentInfo.city}
              onChange={handlePaymentInfoChange}
            />
            {errors.city && (
              <p className="text-red-500 text-xs italic">{errors.city}</p>
            )}
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center"
              htmlFor="state"
            >
              State
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors.state ? "border-red-500" : "border-gray-200"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              type="text"
              id="state"
              name="state"
              value={paymentInfo.state}
              onChange={handlePaymentInfoChange}
            />
            {errors.state && (
              <p className="text-red-500 text-xs italic">{errors.state}</p>
            )}
          </div>
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-center"
              htmlFor="zipCode"
            >
              Zip Code
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
                errors.zipCode ? "border-red-500" : "border-gray-200"
              } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
              type="text"
              id="zipCode"
              name="zipCode"
              value={paymentInfo.zipCode}
              onChange={handlePaymentInfoChange}
            />
            {errors.zipCode && (
              <p className="text-red-500 text-xs italic">{errors.zipCode}</p>
            )}
          </div>
        </div>
      </>
    );
  };

  const renderStep3 = () => {
    return (
      <>
        <div className="w-full px-3 mb-6 md:w-2/3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="card"
          >
            Card Information
          </label>
          <div
            className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
              errors.card ? "border-red-500" : "border-gray-200"
            } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
          >
            <CardElement options={{hidePostalCode: true}} />
          </div>
          {errors.card && (
            <p className="text-red-500 text-xs italic">{errors.card}</p>
          )}
        </div>
      </>
    );
  };

  return (
    <div
      className="
        flex
        flex-col
        items-center
        bg-gray-200
        min-h-screen
        p-4
        sm:p-0
        md:flex-row

      "
    >
      <form
        className="w-full max-w-lg mx-auto
     bg-white
      shadow-lg
      rounded-xl

      px-8
      pt-6
      pb-8
      mb-4
      mt-4"
      >
        <h2 className="text-lg font-medium mb-4">Checkout</h2>

        <div className="text-gray-700 font-bold mb-4">
          Step {step} of 3: {getStepName()}
        </div>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleBackClick}
              disabled={isLoading}
            >
              Back
            </button>
          )}

          {step < 3 && (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleNextClick}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Next"}
            </button>
          )}
          {step === 3 && (
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePlaceOrderClick}
              disabled={isLoading}
            >
              {isLoading ? "Placing Order..." : "Place Order"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Checkout({totalPrice}) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm totalPrice={totalPrice} />
    </Elements>
  );
}

export default Checkout;
