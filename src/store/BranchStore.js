import { create } from 'zustand';
import { 
    fetchBranchesService, 
    createBranchService, 
    updateBranchService, 
    deleteBranchService 
} from '../services/ServiceBranch';

const initialState = {
    branches: [],
    branches_loading: false,
    branches_error: null,
};

const useBranchStore = create((set) => ({
    ...initialState,

    // Fetch all branches
    fetchBranches: async () => {
        set({ branches_loading: true, branches_error: null });
        try {
            const response = await fetchBranchesService();
            console.log("branches data are" , response)
            if (response.success) {
                set({ branches: response.data, branches_loading: false });
            } else {
                set({ branches: [], branches_loading: false, branches_error: response.message });
            }
        } catch (error) {
            set({ branches: [], branches_loading: false, branches_error: error.message });
        }
    },
    // Create a new branchh
    createBranch: async (branchData) => {
        set({ branches_loading: true, branches_error: null });
        try {
            const response = await createBranchService(branchData);
            if (response.success) {
                set((state) => ({ 
                    branches: [...state.branches, response.data], 
                    branches_loading: false 
                }));
            } else {
                set({ branches_loading: false, branches_error: response.message });
            }
        } catch (error) {
            set({ branches_loading: false, branches_error: error.message });
        }
    },

    // Update an existing branch
    updateBranch: async (branchId, branchData) => {
        set({ branches_loading: true, branches_error: null });
        try { 
            const response = await updateBranchService(branchId, branchData);
            if (response.success) {
                set((state) => ({
                    branches: state.branches.map(branch => 
                        branch._id === branchId ? response.data : branch
                    ),
                    branches_loading: false
                }));
            } else {
                set({ branches_loading: false, branches_error: response.message });
            }
        } catch (error) {
            set({ branches_loading: false, branches_error: error.message });
        }
    },

    // Delete a branch 
    deleteBranch: async (branchId) => {
        set({ branches_loading: true, branches_error: null });
        try {
            const response = await deleteBranchService(branchId);
            if (response.success) {
                set((state) => ({
                    branches: state.branches.filter(branch => branch._id !== branchId),
                    branches_loading: false
                }));
            } else {
                set({ branches_loading: false, branches_error: response.message });
            }
        } catch (error) {
            set({ branches_loading: false, branches_error: error.message });
        }
    },

    // Clear branches
    clearBranches: () => set({ branches: [] }),
}));

export default useBranchStore;