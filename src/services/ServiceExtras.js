import { getRequest } from './ServiceModel';
import { URL_TO_GET_EXTRAS } from "../res/api";

// Fetch extras by branch only
const fetchExtrasByBranchService = async (branchId) => {
    try {
        const response = await getRequest(`${URL_TO_GET_EXTRAS}/${branchId}`);

        if (response.status) {
            return {
                success: true,
                status: response.status,
                data: response.data,
                message: response.msg || 'Extras retrieved successfully.'
            };
        } else {
            return {
                success: false,
                status: response.status,
                data: [],
                message: response.msg || 'Failed to fetch extras.'
            };
        }
    } catch (error) {
        return {
            success: false,
            status: error.response?.status,
            data: [],
            message: `Failed to fetch extras: ${error.message || error}`
        };
    }
};

export { fetchExtrasByBranchService };