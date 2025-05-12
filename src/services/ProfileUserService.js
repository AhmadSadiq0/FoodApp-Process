import { putRequest } from './ServiceModel';
import { URL_TO_UPDATE_USER_PROFILE } from "../res/api";
const updateUserProfileService = async (userId, userData) => {
  try {
    const response = await putRequest(`${URL_TO_UPDATE_USER_PROFILE}/${userId}`, userData);
    
    if (response.status) {
      return {
        success: true,
        status: response.status,
        data: response.data, 
        message: response.msg || 'User profile updated successfully.'
      };
    } else {
      return {
        success: false,
        status: response.status,
        data: null,
        message: response.msg || 'Failed to update user profile.'
      };
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      data: null,
      message: `Failed to update user profile: ${error.message || error}`
    };
  }
};

export {
  updateUserProfileService,
};