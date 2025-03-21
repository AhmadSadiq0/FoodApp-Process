import { 
    postRequest, 
    getRequest, 
    putRequest, 
    deleteRequest 
} from './ServiceModel';
import { 
    URL_TO_GET_ITEMS, 
    URL_TO_CREATE_ITEM, 
    URL_TO_UPDATE_ITEM, 
    URL_TO_DELETE_ITEM, 
    URL_TO_GET_CATEGORIZED_ITEMS,
    URL_TO_GET_HOME_SECTION_ITEMS
} from '../res/api';

const fetchItemsService = async () => {
    try {
        const response = await getRequest(URL_TO_GET_ITEMS);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Items successfully fetched!'
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
            message: `Failed to fetch items: ${error.message || error}`
        };
    }
};


const fetchCategorizedItemsService = async (branchId) => {
    try {
        const response = await getRequest(`${URL_TO_GET_CATEGORIZED_ITEMS}/${branchId}`);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Items successfully fetched!'
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
            message: `Failed to fetch items: ${error.message || error}`
        };
    }
};

const fetchHomeSectionItemsService = async (branchId) => {
    try {
        const response = await getRequest(`${URL_TO_GET_HOME_SECTION_ITEMS}/${branchId}`);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Items successfully fetched!'
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
            message: `Failed to fetch items: ${error.message || error}`
        };
    }
};

const createItemService = async (itemData) => {
    try {
        const payload = {
            name: itemData.name, 
            description: itemData.description, 
            price: itemData.price,        
            quantity: itemData.quantity, 
            category: itemData.category,  
            imageUrl: itemData.imageUrl  
        };

        const response = await postRequest(URL_TO_CREATE_ITEM, payload);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Item successfully created!'
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
            message: `Failed to create the item: ${error.message || error}`
        };
    }
};


const updateItemService = async (itemId, itemData) => {
    try {
        const response = await putRequest(`${URL_TO_UPDATE_ITEM}/${itemId}`, itemData);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Item successfully updated!'
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
            message: `Failed to update the item: ${error.message || error}`
        };
    }
};

const deleteItemService = async (itemId) => {
    try {
        const response = await deleteRequest(`${URL_TO_DELETE_ITEM}/${itemId}`);

        if (response.success) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: 'Item successfully deleted!'
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
            message: `Failed to delete the item: ${error.message || error}`
        };
    }
};

export {
    fetchItemsService,
    fetchCategorizedItemsService,
    fetchHomeSectionItemsService,
    createItemService,
    updateItemService,
    deleteItemService,
};