// src/services/ServiceUser.js
import { putRequest } from './ServiceModel'; 
import { URL_TO_UPDATE_USER_DATA } from "../res/api";

const updateUserDataService = async (userData) => {
  try {
    const response = await putRequest(URL_TO_UPDATE_USER_DATA, userData);
    // console.log("dckdkc:", response);
    
    if (response.status) {
      return {
        success: true,
        status: response.status,
        data: response.data, 
        message: response.msg || 'User data updated successfully.'
      };
    } else {
      return {
        success: false,
        status: response.status || 400,
        data: null,
        message: response.msg || 'Failed to update user data.'
      };
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      data: null,
      message: error.response?.data?.msg || `Failed to update user data: ${error.message}`
    };
  }
};

export { updateUserDataService };