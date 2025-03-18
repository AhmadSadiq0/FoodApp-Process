// User-Auth API URLs:
const BASE_URL  = 'http://192.168.12.237:8000';

//Auth Endpoints
export const URL_TO_REGISTER_USER = `${BASE_URL}/users/signup`;    
export const URL_TO_SIGNIN_USER = `${BASE_URL}/users/signin`; 
export const URL_TO_FETCH_USER_DATA = `${BASE_URL}/users/getUserData`;
export const URL_TO_UPDATE_USER_DATA = `${BASE_URL}/users/updateUserData`;

//items endpoint
export const URL_TO_GET_ITEMS = `${BASE_URL}/items/getItems`;
export const URL_TO_CREATE_ITEM = `${BASE_URL}/items/createItem`;
export const URL_TO_UPDATE_ITEM = `${BASE_URL}/items/updateItem`;
export const URL_TO_DELETE_ITEM = `${BASE_URL}/items/deleteItem`;
export const URL_TO_GET_CATEGORIZED_ITEMS = `${BASE_URL}/items/getcategorizeditems`;
//CATEGORY ENDPOINTS
export const URL_TO_GET_CATEGORIES = `${BASE_URL}/categories/getCategories`;
export const URL_TO_CREATE_CATEGORY = `${BASE_URL}/categories/createCategory`; 
export const URL_TO_UPDATE_CATEGORY = `${BASE_URL}/categories/updateCategory`;
export const URL_TO_DELETE_CATEGORY = `${BASE_URL}/categories/deleteCategory`;
  //Branch Endpoints
export const URL_TO_GET_BRANCHES = `${BASE_URL}/branches/get`;
export const URL_TO_CREATE_BRANCH = `${BASE_URL}/branches/create`;
export const URL_TO_UPDATE_BRANCH = `${BASE_URL}/branches/update`;
export const URL_TO_DELETE_BRANCH = `${BASE_URL}/branches/delete`;