// User-Auth API URLs:
const BASE_URL  = 'http://192.168.1.141:8000';

//Auth Endpoints
export const URL_TO_REGISTER_USER = `${BASE_URL}/users/signup`;    
export const URL_TO_SIGNIN_USER = `${BASE_URL}/users/signin`; 
export const URL_TO_FETCH_USER_DATA = `${BASE_URL}/users/getUserData`;
export const URL_TO_UPDATE_USER_DATA = `${BASE_URL}/users/updateUserData`;
export const URL_TO_VALIDATE_TOKEN = `${BASE_URL}/users/token/valid`;
export const URL_TO_REFRESH_TOKEN = `${BASE_URL}/users/refresh-token`

//items endpoint
export const URL_TO_GET_ITEMS = `${BASE_URL}/items/getItems`;
export const URL_TO_CREATE_ITEM = `${BASE_URL}/items/createItem`;
export const URL_TO_UPDATE_ITEM = `${BASE_URL}/items/updateItem`;
export const URL_TO_DELETE_ITEM = `${BASE_URL}/items/deleteItem`;
export const URL_TO_GET_CATEGORIZED_ITEMS = `${BASE_URL}/items/getcategorizeditems`;
export const URL_TO_GET_HOME_SECTION_ITEMS = `${BASE_URL}/items/gethomeSectionItems`;
//CATEGORY ENDPOINTS
export const URL_TO_GET_CATEGORIES = `${BASE_URL}/category/get`;
export const URL_TO_CREATE_CATEGORY = `${BASE_URL}/category/create`; 
export const URL_TO_UPDATE_CATEGORY = `${BASE_URL}/category/update`;
export const URL_TO_DELETE_CATEGORY = `${BASE_URL}/category/delete`;
  //Branch Endpoints
export const URL_TO_GET_BRANCHES = `${BASE_URL}/branches/get`;
export const URL_TO_CREATE_BRANCH = `${BASE_URL}/branches/create`;
export const URL_TO_UPDATE_BRANCH = `${BASE_URL}/branches/update`;
export const URL_TO_DELETE_BRANCH = `${BASE_URL}/branches/delete`;
