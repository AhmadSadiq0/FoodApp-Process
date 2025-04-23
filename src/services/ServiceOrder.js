import { 
    postRequest, 
    getRequest, 
    putRequest, 
    deleteRequest 
  } from './ServiceModel';
  
  import { 
    URL_TO_CREATE_ORDER, 
    URL_TO_GET_ORDERS, 
    URL_TO_UPDATE_ORDER, 
    URL_TO_DELETE_ORDER 
  } from "../res/api";
  
  // Fetch all orders
  const fetchOrdersService = async () => {
    try {
      const response = await getRequest(URL_TO_GET_ORDERS);
      if (response.status) {
        return {
          success: true,
          status: response.status,
          data: response.data.data,
          message: response.msg || 'Orders retrieved successfully.'
        };
      } else {
        return {
          success: false,
          status: response.status,
          data: [],
          message: response.msg || 'Failed to fetch orders.'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: error.response?.status,
        data: [],
        message: `Failed to fetch orders: ${error.message || error}`
      };
    }
  };
  
  // Create new order
  const createOrderService = async (orderData) => {
    try {
      const response = await postRequest(URL_TO_CREATE_ORDER, orderData);
      if (response.status) {
        return {
          success: true,
          status: response.status,
          data: response.data.data,
          message: response.msg || 'Order created successfully.'
        };
      } else {
        return {
          success: false,
          status: response.status,
          data: null,
          message: response.msg || 'Failed to create order.'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: error.response?.status,
        data: null,
        message: `Failed to create order: ${error.message || error}`
      };
    }
  };
  
  // Update order
  const updateOrderService = async (orderId, orderData) => {
    try {
      const response = await putRequest(`${URL_TO_UPDATE_ORDER}/${orderId}`, orderData);
      if (response.status) {
        return {
          success: true,
          status: response.status,
          data: response.data.data,
          message: response.msg || 'Order updated successfully.'
        };
      } else {
        return {
          success: false,
          status: response.status,
          data: null,
          message: response.msg || 'Failed to update order.'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: error.response?.status,
        data: null,
        message: `Failed to update order: ${error.message || error}`
      };
    }
  };
  
  // Delete order
  const deleteOrderService = async (orderId) => {
    try {
      const response = await deleteRequest(`${URL_TO_DELETE_ORDER}/${orderId}`);
      if (response.status) {
        return {
          success: true,
          status: response.status,
          data: response.data.data,
          message: response.msg || 'Order deleted successfully.'
        };
      } else {
        return {
          success: false,
          status: response.status,
          data: null,
          message: response.msg || 'Failed to delete order.'
        };
      }
    } catch (error) {
      return {
        success: false,
        status: error.response?.status,
        data: null,
        message: `Failed to delete order: ${error.message || error}`
      };
    }
  };
  
  export {
    fetchOrdersService,
    createOrderService,
    updateOrderService,
    deleteOrderService,
  };
  