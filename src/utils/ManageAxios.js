import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://foodapp-process-backend.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

let interceptorId = null;

export const setAuthTokenInAxios = (token) => {
    // Remove existing interceptor if already set
    if (interceptorId !== null) {
        axiosInstance.interceptors.request.eject(interceptorId);
    }

    interceptorId = axiosInstance.interceptors.request.use(
        (config) => {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            console.log("Request configuration with token: ", config);
            return config;
        },
        (error) => {
            console.error("Request error: ", error);
            return Promise.reject(error);
        }
    );
};

export const removeAuthTokenFromAxios = () => {
    if (interceptorId !== null) {
        axiosInstance.interceptors.request.eject(interceptorId);
        interceptorId = null;
        console.log("Authorization token removed from axiosInstance");
    }
};

export default axiosInstance;
