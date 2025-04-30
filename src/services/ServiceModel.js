import axios from "axios";
import axiosInstance from "../utils/ManageAxios";

export const postRequest = 
async (url,  payload) => {
    try {
        let response;
        console.log('RequestUrl ===> ', url)
        console.log('RequestPayload ===> ', payload)

        response = await axiosInstance.post(url, payload, {
            headers: {
                'Content-Type' : 'application/json',
            }
        });
        return { status: response.status, success: true, data: response.data, message: 'Success!' }
    }
    catch (e) {
        return { status: e.response?.status, success: false, data: {}, message: e.message || 'Failure!' };
    }
}

export const getRequest = 
async (url) => {
    try {
        let response;
        console.log('RequestUrl ===> ', url)

        response = await axiosInstance.get(url);
        return { status: response.status, success: true, data: response.data, message: 'Success!' }
    }
    catch (e) {
        return { status: e.response?.status, success: false, data: {}, message: e.message || 'Failure!' };
    }
}

export const putRequest = 
async (url,  payload) => {
    try {
        let response;
        console.log('RequestUrl ===> ', url)
        console.log('RequestPayload ===> ', payload)
        response = await axios.put(url, payload, {
            headers: {
                'Content-Type' : 'application/json',
            }
        });
        return { status: response.status, success: true, data: response.data, message: 'Success!' }
    }
    catch (e) {
        return { status: e.response?.status, success: false, data: {}, message: e.message || 'Failure!' };
    }
} 

// Service function to fetch categories
// export const fetchCategoriesService = async () => {
//     try {
//         // Making a GET request to fetch categories from the API
//         const response = await axiosInstance.get('/category/getCategories');
//         return response.data;
//     } catch (error) {
//         // Throwing error in case of failure
//         throw error;
//     }
// };