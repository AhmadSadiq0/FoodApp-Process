import { create } from 'zustand';
import { fetchCategorizedItemsService, fetchHomeSectionItemsService } from '../services/ServiceItem';

const initialState = {
    categorized_items: [],
    categorized_loading: true,
    categorized_error: null,
    
    homeSectionItems : [],
    homeSectionItemsLoading : true,
    homeSectionItemsError : null
};

const useItemStore = create((set) => ({
    ...initialState,

    fetchItemsByBranch: async (branchId) => {
        set({ categorized_loading: true, categorized_error: null , categorized_items : [] });
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

    fetchHomeSectionItems: async (branchId) => {
        set({ homeSectionItemsLoading: true, homeSectionItemsError: null , homeSectionItems : [] });
        try {
            const response = await fetchHomeSectionItemsService(branchId);
            console.log(response.data)
            if (response.success) {
                set({ homeSectionItems : response.data.data, homeSectionItemsLoading: false });
            } else {
                set({ homeSectionItems : [], homeSectionItemsLoading: false, homeSectionItemsError: response.message });
            }
        } catch (error) {
            set({ homeSectionItems : [], homeSectionItemsLoading: false, homeSectionItemsError: error.message });
        }
    },

    clearCategorizedItems: () => set({ categorized_items: [] }),
}));

export default useItemStore;
