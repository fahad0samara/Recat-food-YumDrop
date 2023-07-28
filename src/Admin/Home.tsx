import  {useState, useEffect} from "react";
import axios from "axios";
import {AiOutlineUsergroupDelete} from "react-icons/ai";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    orderCount: 0,
    CartCount: 0,
    UserCount: 0,
    CategoryCount: 0,
    MenuCount: 0,
    AdminCount:0,
    SalesCount: 0,
    RevenueCount: 0,
    ExpenseCount: 0,
    orderPercentageDiff: 0,
    cartPercentageDiff: 0,
    categoryPercentageDiff: 0,
    userPercentageDiff: 0,
    salesPercentageDiff: 0,
    revenuePercentageDiff: 0,
    expensePercentageDiff: 0,
  });

  useEffect(() => {
    // Fetch dashboard data from the server
    axios
      .get("https://food-yumdrop0.azurewebsites.net/orders/count")
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  // Destructure the data for easy access
  const {
    orderCount,
    CartCount,
    UserCount,
    CategoryCount,
    MenuCount,
    AdminCount,
    SalesCount,
    RevenueCount,
    ExpenseCount,
    orderPercentageDiff,
    cartPercentageDiff,
    categoryPercentageDiff,
    userPercentageDiff,
    salesPercentageDiff,
    revenuePercentageDiff,
    expensePercentageDiff,
  } = dashboardData;

  return (
    <div className=" mx-auto grid max-w-6xl md:grid-cols-1 grid-cols-1 gap-y-4 px-4 py-1 sm:my-10 sm:rounded-md sm:border sm:shadow">
      <div></div>
      <div className="grid -mx-4 bg-gradient-to-t md:grid-cols-3 from-green-500 to-green-500 px-4 py-8  sm:mx-0 sm:rounded-xl sm:py-4">
        <div className="mb-6 flex max-w-xs">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 t sm:mr-3 sm:mb-0">
            <AiOutlineUsergroupDelete size={30} />
          </div>
          <div className="px-4">
            <p className="mb-1 text-2xl font-black text-white">{UserCount}</p>
            <p className="font-medium text-indigo-100">Users</p>
          </div>
        </div>
        <div className="mb-6 flex max-w-xs">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 t sm:mr-3 sm:mb-0">
            <AiOutlineUsergroupDelete size={30} />
          </div>
          <div className="px-4">
            <p className="mb-1 text-2xl font-black text-white">
              {CategoryCount}
            </p>
            <p className="font-medium text-indigo-100">Categories</p>
          </div>
        </div>
        <div className="mb-6 flex max-w-xs">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 t sm:mr-3 sm:mb-0">
            <AiOutlineUsergroupDelete size={30} />
          </div>
          <div className="px-4">
            <p className="mb-1 text-2xl font-black text-white">{MenuCount}</p>
            <p className="font-medium text-indigo-100">Menus</p>
          </div>
        </div>
    
      </div>
      <div className=" grid grid-cols-3 gap-4 py-4  sm:gap-8 sm:px-4">
        <div className="">
          <p className="text-lg font-bold">{CartCount}</p>
          <p className="text-green-500 mb-2 font-medium">
            {cartPercentageDiff > 0 ? (
              <span className="text-green-500">{cartPercentageDiff}%</span>
            ) : (
              <span className="text-red-500">{cartPercentageDiff}%</span>
            )}
          </p>
          <span className="rounded-full bg-indigo-200 px-2 py-0.5 text-xs font-medium text-indigo-600">
            Carts
          </span>
        </div>
        <div className="">
          <p className="text-lg font-bold">{CategoryCount}</p>
          <p className="text-green-500 mb-2 font-medium">
            {categoryPercentageDiff > 0 ? (
              <span className="text-green-500">{categoryPercentageDiff}%</span>
            ) : (
              <span className="text-red-500">{categoryPercentageDiff}%</span>
            )}
          </p>
          <span className="rounded-full bg-yellow-200 px-2 py-0.5 text-xs font-medium text-yellow-700">
            Categories
          </span>
        </div>
        <div className="">
          <p className="text-lg font-bold">{SalesCount}</p>
          <p className="text-green-500 mb-2 font-medium">
            {salesPercentageDiff > 0 ? (
              <span className="text-green-500">{salesPercentageDiff}%</span>
            ) : (
              <span className="text-red-500">{salesPercentageDiff}%</span>
            )}
          </p>
          <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-600">
            Sales
          </span>
        </div>
      </div>
      <div className="col-span-2 col-start-1 grid grid-cols-2 gap-6 border-t py-4 sm:grid-cols-4 sm:px-4 sm:py-8">
        <div className="">
          <p className="text-slate-500 text-sm">Revenue</p>
          <p className="text-xl font-medium">${RevenueCount}</p>
        </div>
        <div className="">
          <p className="text-slate-500 text-sm">Expenses</p>
          <p className="text-xl font-medium">${ExpenseCount}</p>
        </div>
        <div className="">
          <p className="text-slate-500 text-sm">Profit</p>
          <p className="text-xl font-medium">${RevenueCount - ExpenseCount}</p>
        </div>
        <div className="">
          <p className="text-slate-500 text-sm">Target</p>
          <p className="text-xl font-medium">${RevenueCount + ExpenseCount}</p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">Revenue Change</p>
          <p className="text-xl font-medium">
            {revenuePercentageDiff > 0 ? (
              <span className="text-green-500">{revenuePercentageDiff}%</span>
            ) : (
              <span className="text-red-500">{revenuePercentageDiff}%</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Expense Change</p>
          <p className="text-xl font-medium">
            {expensePercentageDiff > 0 ? (
              <span className="text-green-500">{expensePercentageDiff}%</span>
            ) : (
              <span className="text-red-500">{expensePercentageDiff}%</span>
            )}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Profit Change</p>
          <p className="text-xl font-medium">
            {revenuePercentageDiff - expensePercentageDiff > 0 ? (
              <span className="text-green-500">
                {revenuePercentageDiff - expensePercentageDiff}%
              </span>
            ) : (
              <span className="text-red-500">
                {revenuePercentageDiff - expensePercentageDiff}%
              </span>
            )}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Target Change</p>
          <p className="text-xl font-medium">
            {revenuePercentageDiff + expensePercentageDiff > 0 ? (
              <span className="text-green-500">
                {revenuePercentageDiff + expensePercentageDiff}%
              </span>
            ) : (
              <span className="text-red-500">
                {revenuePercentageDiff + expensePercentageDiff}%
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
