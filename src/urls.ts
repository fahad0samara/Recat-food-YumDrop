export const BASE_URL = "https://food-yumdrop0.azurewebsites.net/";

export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const LOGOUT_URL = `${BASE_URL}/auth/logout`;
export const FETCH_USER_URL = `${BASE_URL}/auth/me`;

export const ADD_TO_CART_URL = `${BASE_URL}/cart/add`;
export const FETCH_CART_URL = (userId: string) =>
  `${BASE_URL}/cart/cart/${userId}`;
export const REMOVE_ITEM_FROM_CART_URL = (userId: string, itemId: string) =>
  `${BASE_URL}/cart/delete/${userId}/${itemId}`;
export const CLEAR_CART_URL = (userId: string) =>
  `${BASE_URL}/cart/clear/${userId}`;
export const UPDATE_CART_ITEM_QUANTITY_URL = (userId: string, itemId: string) =>
  `${BASE_URL}/cart/updateQuantity/${userId}/${itemId}`; 
export const FETCH_CATEGORIES_URL = `${BASE_URL}/api/categories`;
export const FETCH_MENU_URL = `${BASE_URL}/api/menu`;


// `https://food-yumdrop0.azurewebsites.net/api/menu/${categoryId}`
export const FETCH_MENU_BY_CATEGORY_URL = (categoryId: string) =>
  `${BASE_URL}/api/menu/${categoryId}`;
  


