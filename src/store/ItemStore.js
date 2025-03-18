import { create } from 'zustand';
import { fetchCategorizedItemsService } from '../services/ServiceItem';

const initialState = {
    categorized_items: [],
    categorized_loading: false,
    categorized_error: null,
};

const useItemStore = create((set) => ({
    ...initialState,

    fetchItemsByBranch: async (branchId) => {
        set({ categorized_loading: true, categorized_error: null });
        try {
            const response = await fetchCategorizedItemsService(branchId);
            console.log(response.data)
            if (response.success) {
                set({ categorized_items: response.data.data, categorized_loading: false });
            } else {
                set({ categorized_items: [], categorized_loading: false, categorized_error: response.message });
            }
        } catch (error) {
            set({ categorized_items: [], categorized_loading: false, categorized_error: error.message });
        }
    },

    clearCategorizedItems: () => set({ categorized_items: [] }),
}));

export default useItemStore;
