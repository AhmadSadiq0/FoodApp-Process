// src/services/ServiceUserOrders.js
import { getRequest } from './ServiceModel';
import { URL_TO_GET_USER_ORDERS } from "../res/api";

// Fetch all orders for a specific user
const fetchUserOrdersService = async (userId) => {
  try {
    const response = await getRequest(`${URL_TO_GET_USER_ORDERS}`);
    if (response.status) {
      return {
        success: true,
        status: response.status,
        data: response.data, // Note: Adjust based on actual response structure
        message: response.msg || 'User orders retrieved successfully.'
      };
    } else {
      return {
        success: false,
        status: response.status,
        data: [],
        message: response.msg || 'Failed to fetch user orders.'
      };
    }
  } catch (error) {
    return {
      success: false,
      status: error.response?.status,
      data: [],
      message: `Failed to fetch user orders: ${error.message || error}`
    };
  }
};

export {
  fetchUserOrdersService,
};