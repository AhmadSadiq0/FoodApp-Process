import { 
    postRequest, 
    getRequest, 
    putRequest, 
    deleteRequest 
} from './ServiceModel';
import { 
    URL_TO_GET_CATEGORIES, 
    URL_TO_CREATE_CATEGORY, 
    URL_TO_UPDATE_CATEGORY, 
    URL_TO_DELETE_CATEGORY 
} from '../res/api';

const fetchCategoriesService = async () => {
    try {
        const response = await getRequest(URL_TO_GET_CATEGORIES);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Categories successfully fetched!'
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
            message: `Failed to fetch categories: ${error.message || error}`
        };
    }
};

const createCategoryService = async (categoryData) => {
    try {
        const payload = {
            name: categoryData.name, 
            description: categoryData.description, 
            imageUrl: categoryData.imageUrl  
        };

        const response = await postRequest(URL_TO_CREATE_CATEGORY, payload);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Category successfully created!'
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
            message: `Failed to create the category: ${error.message || error}`
        };
    }
};

const updateCategoryService = async (categoryId, categoryData) => {
    try {
        const response = await putRequest(`${URL_TO_UPDATE_CATEGORY}/${categoryId}`, categoryData);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Category successfully updated!'
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
            message: `Failed to update the category: ${error.message || error}`
        };
    }
};

const deleteCategoryService = async (categoryId) => {
    try {
        const response = await deleteRequest(`${URL_TO_DELETE_CATEGORY}/${categoryId}`);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Category successfully deleted!'
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
            message: `Failed to delete the category: ${error.message || error}`
        };
    }
};

export {
    fetchCategoriesService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
};