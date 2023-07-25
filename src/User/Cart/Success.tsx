// import React, {useEffect, useState} from "react";
// import {useLocation} from "react-router-dom";
// import {
//   FaCheckCircle,
//   FaClock,
//   FaTruck,
//   FaBoxOpen,
//   FaShippingFast,
//   FaSmileBeam,
// } from "react-icons/fa";

// const steps = [
//   {
//     id: 1,
//     title: "Processing Order",
//     description: "We've received your order and are working on it.",
//     image: "https://source.unsplash.com/500x500/?food",
//     icon: FaCheckCircle,
//     message: "Your order is being processed. Please wait...",
//     details: [
//       {label: "Order Number", value: "123456789"},
//       {label: "Payment Method", value: "Credit Card"},
//     ],
//   },
//   {
//     id: 2,
//     title: "Preparing for Delivery",
//     description: "We're preparing your food for delivery.",
//     image: "https://source.unsplash.com/500x500/?restaurant",
//     icon: FaClock,
//     message: "Your food is being prepared. It will be ready soon...",
//     details: [
//       {label: "Order Number", value: "123456789"},
//       {label: "Delivery Address", value: "123 Main St, Anytown USA"},
//     ],
//   },
//   {
//     id: 3,
//     title: "Order Packed",
//     description: "Your order has been packed and is ready to be shipped.",
//     image: "https://source.unsplash.com/500x500/?packaging",
//     icon: FaBoxOpen,
//     message: "Your order has been packed and is ready to be shipped.",
//     details: [
//       {label: "Order Number", value: "123456789"},
//       {label: "Shipping Method", value: "Standard"},
//     ],
//   },
//   {
//     id: 4,
//     title: "Order Shipped",
//     description: "Your order is on the way and should arrive soon.",
//     image: "https://source.unsplash.com/500x500/?delivery",
//     icon: FaShippingFast,
//     message: "Your order is on the way. It should arrive soon...",
//     details: [
//       {label: "Order Number", value: "123456789"},
//       {label: "Tracking Number", value: "123456789"},
//     ],
//   },
//   {
//     id: 5,
//     title: "Out for Delivery",
//     description: "Your food is out for delivery.",
//     image: "https://source.unsplash.com/500x500/?delivery",
//     icon: FaTruck,
//     message: "Your order is out for delivery. It should arrive soon...",
//     details: [
//       {label: "Order Number", value: "123456789"},
//       {label: "Delivery Time", value: "2:00 PM - 4:00 PM"},
//     ],
//   },
//   {
//     id: 6,
//     title: "Order Delivered",
//     description: "Your food has been delivered. Enjoy your meal!",
//     image: "https://source.unsplash.com/500x500/?smile",
//     icon: FaSmileBeam,
//     message: "Your order has been delivered. Enjoy your meal!",
//     details: [
//       {label: "Order Number", value: "123456789"},
//       {label: "Delivery Time", value: "3:30 PM"},
//     ],
//   },
// ];

// function SuccessPage() {
//   const location = useLocation();
//   const {paymentInfo, totalPrice} = location.state;
//   const [currentStep, setCurrentStep] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     let step = 1;
//     const interval = setInterval(() => {
//       step++;
//       if (step <= steps.length) {
//         setCurrentStep(step);
//         setIsLoading(true);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 60000);
//       } else {
//         clearInterval(interval);
//       }
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleStepClick = step => {
//     setCurrentStep(step.id);
//   };

//   const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

//   return (
//     <div className="text-center">
//       <h1 className="text-3xl font-semibold mb-4">Order Successful</h1>
//       ini Copy
//       <div className="mt-8">
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div
//               className="flex flex-col items-center justify-center relative w-1/6"
//               key={step.id}
//             >
//               <div className="flex items-center justify-center">
//                 <div
//                   className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${
//                     step.id === currentStep
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   <step.icon className="w-6 h-6" />
//                 </div>
//                 <div
//                   className={`${
//                     step.id !== steps.length ? "ml-2" : ""
//                   } w-1/2 bg-gray-300`}
//                   style={{height: "2px"}}
//                 >
//                   <div
//                     className={`${
//                       step.id === currentStep ? "bg-green-500" : "bg-gray-400"
//                     } h-full rounded-full transition-all duration-500`}
//                     style={{
//                       width:
//                         step.id < currentStep || index === steps.length - 1
//                           ? "100%"
//                           : `${progress}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`${
//                   step.id === currentStep ? "text-green-500" : "text-gray-500"
//                 } mt-2 font-semibold`}
//                 onClick={() => handleStepClick(step)}
//               >
//                 {step.title}
//               </div>
//               {step.description && (
//                 <div
//                   className={`text-xs ${
//                     step.id === currentStep
//                       ? "text-green-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {step.description}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-8">
//         {isLoading ? (
//           <div className="text-gray-500 text-sm">
//             {steps[currentStep - 1].message}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center">
//             <img
//               className="w-24 h-24 rounded-full object-cover mr-4"
//               src={steps[currentStep - 1].image}
//               alt={steps[currentStep - 1].title}
//             />
//             <div className="text-left">
//               <div className="text-xl font-semibold mb-2">
//                 {steps[currentStep - 1].title}
//               </div>
//               {steps[currentStep - 1].details.map(detail => (
//                 <div className="text-sm mb-1" key={detail.label}>
//                   <span className="font-semibold mr-2">{detail.label}:</span>
//                   {detail.value}
//                 </div>
//               ))}
//               <div className="text-sm font-semibold text-gray-500 mt-4">
//                 Total: ${totalPrice}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SuccessPage;

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
  FaCheckCircle,
  FaClock,
  FaTruck,
  FaBoxOpen,
  FaShippingFast,
  FaSmileBeam,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Processing Order",
    description: "We've received your order and are working on it.",
    image: "https://source.unsplash.com/500x500/?food",
    icon: FaCheckCircle,
    message: "Your order is being processed. Please wait...",
    details: [
      {label: "Order Number", value: "123456789"},
      {label: "Payment Method", value: "Credit Card"},
    ],
  },
  {
    id: 2,
    title: "Preparing for Delivery",
    description: "We're preparing your food for delivery.",
    image: "https://source.unsplash.com/500x500/?restaurant",
    icon: FaClock,
    message: "Your food is being prepared. It will be ready soon...",
    details: [
      {label: "Order Number", value: "123456789"},
      {label: "Delivery Address", value: "123 Main St, Anytown USA"},
    ],
  },
  {
    id: 3,
    title: "Order Packed",
    description: "Your order has been packed and is ready to be shipped.",
    image: "https://source.unsplash.com/500x500/?packaging",
    icon: FaBoxOpen,
    message: "Your order has been packed and is ready to be shipped.",
    details: [
      {label: "Order Number", value: "123456789"},
      {label: "Shipping Method", value: "Standard"},
    ],
  },
  {
    id: 4,
    title: "Order Shipped",
    description: "Your order is on the way and should arrive soon.",
    image: "https://source.unsplash.com/500x500/?delivery",
    icon: FaShippingFast,
    message: "Your order is on the way. It should arrive soon...",
    details: [
      {label: "Order Number", value: "123456789"},
      {label: "Tracking Number", value: "123456789"},
    ],
  },
  {
    id: 5,
    title: "Out for Delivery",
    description: "Your food is out for delivery.",
    image: "https://source.unsplash.com/500x500/?delivery",
    icon: FaTruck,
    message: "Your order is out for delivery. It should arrive soon...",
    details: [
      {label: "Order Number", value: "123456789"},
      {label: "Delivery Time", value: "2:00 PM - 4:00 PM"},
    ],
  },
  {
    id: 6,
    title: "Order Delivered",
    description: "Your food has been delivered. Enjoy your meal!",
    image: "https://source.unsplash.com/500x500/?smile",
    icon: FaSmileBeam,
    message: "Your order has been delivered. Enjoy your meal!",
    details: [
      {label: "Order Number", value: "123456789"},
      {label: "Delivery Time", value: "3:30 PM"},
    ],
  },
];

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const {paymentInfo, totalPrice} = location.state;
  const [currentStep, setCurrentStep] = useState(() => {
    const storedStep = localStorage.getItem("currentStep");
    return storedStep ? parseInt(storedStep) : 1;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let step = currentStep;
    const interval = setInterval(() => {
      step++;
      if (step <= steps.length) {
        setCurrentStep(step);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 6000);
        localStorage.setItem("currentStep", step.toString());
      } else {
        clearInterval(interval);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentStep]);

  useEffect(() => {
    if (location.state.orderType === "fish") {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 10000);
      return () => clearTimeout(timeout);
    }
  }, [location.state.orderType, navigate]);

  const handleStepClick = step => {
    setCurrentStep(step.id);
    localStorage.setItem("currentStep", step.id.toString());
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleGoToHomeClick = () => {
    navigate("/");
    localStorage.clear();
  };

  const handleClearClick = () => {
    navigate("/");
  };

  return (
    <div className="text-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Order Successful</h1>
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded mr-4"
            onClick={handleClearClick}
          >
            Go to Home
          </button>
        </div>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div
              className="flex flex-col items-center justify-center relative w-1/6"
              key={step.id}
            >
              <div className="flex items-center justify-center">
                <div
                  className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${
                    step.id === currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <div
                  className={`${
                    step.id !== steps.length ? "ml-2" : ""
                  } w-1/2 bg-gray-300`}
                  style={{height: "2px"}}
                >
                  <div
                    className={`${
                      step.id === currentStep ? "bg-green-500" : "bg-gray-400"
                    } h-full rounded-full transition-all duration-500`}
                    style={{
                      width:
                        step.id < currentStep || index === steps.length - 1
                          ? "100%"
                          : `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className={`${
                  step.id === currentStep ? "text-green-500" : "text-gray-500"
                } mt-2 font-semibold`}
                onClick={() => handleStepClick(step)}
              >
                {step.title}
              </div>
              {step.description && (
                <div
                  className={`text-xs ${
                    step.id === currentStep
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div className="text-gray-500 text-sm">
            {steps[currentStep - 1].message}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img
              className="w-24 h-24 rounded-full object-cover mr-4"
              src={steps[currentStep - 1].image}
              alt={steps[currentStep - 1].title}
            />
            <div className="text-left">
              <div className="text-xl font-semibold mb-2">
                {steps[currentStep - 1].title}
              </div>
              {steps[currentStep - 1].details.map(detail => (
                <div className="text-sm mb-1" key={detail.label}>
                  <span className="font-semibold mr-2">{detail.label}:</span>
                  {detail.value}
                </div>
              ))}
              <div className="text-sm font-semibold text-gray-500 mt-4">
                Total: ${totalPrice}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-8">
        {isLoading ? null : (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleGoToHomeClick}
          >
            Back to Home
          </button>
        )}
      </div>
    </div>
  );
}

export default Success;

// function SuccessPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {paymentInfo, totalPrice} = location.state;
//   const [currentStep, setCurrentStep] = useState(() => {
//     const storedStep = localStorage.getItem("currentStep");
//     return storedStep ? parseInt(storedStep) : 1;
//   });
//   const [isLoading, setIsLoading] = useState(true);
//   const [redirectToHome, setRedirectToHome] = useState(false);

//   useEffect(() => {
//     let step = currentStep;
//     const interval = setInterval(() => {
//       step++;
//       if (step <= steps.length) {
//         setCurrentStep(step);
//         setIsLoading(true);
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 60000);
//         localStorage.setItem("currentStep", step.toString());
//       } else {
//         clearInterval(interval);
//       }
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [currentStep]);

//   useEffect(() => {
//     if (location.state.orderType === "fish") {
//       const timeout = setTimeout(() => {
//         setRedirectToHome(true);
//       }, 10000);
//       return () => clearTimeout(timeout);
//     }
//   }, [location.state.orderType]);

//   const handleStepClick = step => {
//     setCurrentStep(step.id);
//     localStorage.setItem("currentStep", step.id.toString());
//   };

//   const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

//   const handleGoToHomeClick = () => {
//     setRedirectToHome(true);
//   };

//   if (redirectToHome) {
//     return;
//   }

//   return (
//     <div className="text-center">
//       <h1 className="text-3xl font-semibold mb-4">Order Successful</h1>
//       <div className="mt-8">
//         <div className="mt-8">
//           {isLoading ? null : (
//             <button
//               className={`${
//                 location.state.orderType === "fish"
//                   ? "bg-red-500"
//                   : "bg-green-500"
//               } text-white py-2 px-4 rounded`}
//               onClick={handleGoToHomeClick}
//             >
//               Go to Home
//             </button>
//           )}
//         </div>
//         <div className="flex items-center justify-between">
//           {steps.map((step, index) => (
//             <div
//               className="flex flex-col items-center justify-center relative w-1/6"
//               key={step.id}
//             >
//               <div className="flex items-center justify-center">
//                 <div
//                   className={`flex-shrink-0 rounded-full h-12 w-12 flex items-center justify-center ${
//                     step.id === currentStep
//                       ? "bg-green-500 text-white"
//                       : "bg-gray-200 text-gray-500"
//                   }`}
//                 >
//                   <step.icon className="w-6 h-6" />
//                 </div>
//                 <div
//                   className={`${
//                     step.id !== steps.length ? "ml-2" : ""
//                   } w-1/2 bg-gray-300`}
//                   style={{height: "2px"}}
//                 >
//                   <div
//                     className={`${
//                       step.id === currentStep ? "bg-green-500" : "bg-gray-400"
//                     } h-full rounded-full transition-all duration-500`}
//                     style={{
//                       width:
//                         step.id < currentStep || index === steps.length - 1
//                           ? "100%"
//                           : `${progress}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               <div
//                 className={`${
//                   step.id === currentStep ? "text-green-500" : "text-gray-500"
//                 } mt-2 font-semibold`}
//                 onClick={() => handleStepClick(step)}
//               >
//                 {step.title}
//               </div>
//               {step.description && (
//                 <div
//                   className={`text-xs ${
//                     step.id === currentStep
//                       ? "text-green-500"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {step.description}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="mt-8">
//         {isLoading ? (
//           <div className="text-gray-500 text-sm">
//             {steps[currentStep - 1].message}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center">
//             <img
//               className="w-24 h-24 rounded-full object-cover mr-4"
//               src={steps[currentStep - 1].image}
//               alt={steps[currentStep - 1].title}
//             />
//             <div className="text-left">
//               <div className="text-xl font-semibold mb-2">
//                 {steps[currentStep - 1].title}
//               </div>
//               {steps[currentStep - 1].details.map(detail => (
//                 <div className="text-sm mb-1" key={detail.label}>
//                   <span className="font-semibold mr-2">{detail.label}:</span>
//                   {detail.value}
//                 </div>
//               ))}
//               <div className="text-sm font-semibold text-gray-500 mt-4">
//                 {/* Total: ${totalPrice} */}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="mt-8">
//         {isLoading ? null : (
//           <button
//             className="bg-green-500 text-white py-2 px-4 rounded"
//             onClick={handleHomeClick}
//           >
//             Back to Home
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SuccessPage;
