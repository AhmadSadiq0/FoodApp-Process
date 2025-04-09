import { 
    postRequest, 
    getRequest, 
    putRequest 
} from './ServiceModel';
import { 
    URL_TO_REGISTER_USER, 
    URL_TO_SIGNIN_USER, 
    URL_TO_FETCH_USER_DATA, 
    URL_TO_UPDATE_USER_DATA,
    URL_TO_VALIDATE_TOKEN,
    URL_TO_REFRESH_TOKEN
} from '../res/api';

const signUpService = async (userData) => {
    try {
        const response = await postRequest(URL_TO_REGISTER_USER, userData);
        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'User successfully registered!'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: {},
                message: response.message
            };
        }

    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Failed to register the user: ${error.message || error}`
        };
    }
};

const signInService = async (payload) => {
    try {
        const response = await postRequest(URL_TO_SIGNIN_USER, payload);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'User sign in successful!'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: {},
                message: response.message
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `User sign in failed: ${error.message || error}`
        };
    }
};

const fetchUserService = async () => {
    try {
        const response = await getRequest(URL_TO_FETCH_USER_DATA);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'User data successfully fetched!'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: {},
                message: response.message
            };
        }

    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Failed to fetch the user data: ${error.message || error}`
        };
    }
};

const updateUserService = async (payload) => { 
    try {
        const response = await putRequest( URL_TO_UPDATE_USER_DATA, payload);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'User data successfully updated!'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: {},
                message: response.message
            };
        }

    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Failed to update user data: ${error.message || error}`
        };
    }
};


const validateTokenService = async () => {
    try {
        const response = await getRequest(URL_TO_VALIDATE_TOKEN);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Token is valid!'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: {},
                message: response.message || 'Invalid token.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Token validation failed: ${error.message || error}`
        };
    }
};

const refreshTokenService = async () => {
    try {
        const response = await postRequest(URL_TO_REFRESH_TOKEN);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Token refreshed successfully!'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: {},
                message: response.message || 'Failed to refresh token.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Token refresh failed: ${error.message || error}`
        };
    }
};


export {
    signUpService,
    signInService,
    fetchUserService,
    updateUserService,
    validateTokenService,
    refreshTokenService
}