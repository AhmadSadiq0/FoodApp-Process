import { 
    postRequest, 
    getRequest, 
    putRequest, 
    deleteRequest 
} from './ServiceModel';
import { 
    URL_TO_GET_BRANCHES, 
    URL_TO_CREATE_BRANCH, 
    URL_TO_UPDATE_BRANCH, 
    URL_TO_DELETE_BRANCH 
} from "../res/api";

// Fetch all branches
const fetchBranchesService = async () => {
    try {
        const response = await getRequest(URL_TO_GET_BRANCHES);

        if (response.status) { // Assuming `status` is the success flag from your API
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: response.msg || 'Branches retrieved successfully.'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: [],
                message: response.msg || 'Failed to fetch branches.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: [],
            message: `Failed to fetch branches: ${error.message || error}`
        };
    }
};

// Create a new branch
const createBranchService = async (branchData) => {
    try {
        const payload = {
            name: branchData.name,
            location: branchData.location,
            adminId: branchData.adminId // Assuming adminId is required
        };

        const response = await postRequest(URL_TO_CREATE_BRANCH, payload);

        if (response.status) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: response.msg || 'Branch created successfully.'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: null,
                message: response.msg || 'Failed to create branch.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Failed to create branch: ${error.message || error}`
        };
    }
};

// Update an existing branch
const updateBranchService = async (branchId, branchData) => {
    try {
        const response = await putRequest(`${URL_TO_UPDATE_BRANCH}/${branchId}`, branchData);
        if (response.status) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: response.msg || 'Branch updated successfully.'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: null,
                message: response.msg || 'Failed to update branch.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Failed to update branch: ${error.message || error}`
        };
    }
};

// Delete a branch
const deleteBranchService = async (branchId) => {
    try {
        const response = await deleteRequest(`${URL_TO_DELETE_BRANCH}/${branchId}`);

        if (response.status) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: response.msg || 'Branch deleted successfully.'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: null,
                message: response.msg || 'Failed to delete branch.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: null,
            message: `Failed to delete branch: ${error.message || error}`
        };
    }
};

export {
    fetchBranchesService,
    createBranchService,
    updateBranchService,
    deleteBranchService,
};