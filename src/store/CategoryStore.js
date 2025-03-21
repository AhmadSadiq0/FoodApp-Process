import { create } from 'zustand';
import { 
    fetchCategoriesService, 
    createCategoryService, 
    updateCategoryService, 
    deleteCategoryService 
} from '../services/CategoryService';

const initialState = {
    categories: [],
    categoriesLoading: false,
    categoriesError: null,
};

const useCategoryStore = create((set) => ({
    ...initialState,

    fetchCategories: async () => {
        set({ categoriesLoading: true, categoriesError: null });
        try {
            const response = await fetchCategoriesService();
            console.log(response.data)
            if (response.success) {
                set({ categories: response.data.data, categoriesLoading: false });
            } else {
                set({ categories: [], categoriesLoading: false, categoriesError: response.message });
            }
        } catch (error) {
            set({ categories: [], categoriesLoading: false, categoriesError: error.message });
        }
    },

    createCategory: async (categoryData) => {
        set({ categoriesLoading: true, categoriesError: null });
        try {
            const response = await createCategoryService(categoryData);
            if (response.success) {
                set((state) => ({ 
                    categories: [...state.categories, response.data], 
                    categoriesLoading: false 
                }));
            } else {
                set({ categoriesLoading: false, categoriesError: response.message });
            }
        } catch (error) {
            set({ categoriesLoading: false, categoriesError: error.message });
        }
    },

    updateCategory: async (categoryId, categoryData) => {
        set({ categoriesLoading: true, categoriesError: null });
        try {
            const response = await updateCategoryService(categoryId, categoryData);
            if (response.success) {
                set((state) => ({
                    categories: state.categories.map(cat => 
                        cat.id === categoryId ? response.data : cat
                    ),
                    categoriesLoading: false
                }));
            } else {
                set({ categoriesLoading: false, categoriesError: response.message });
            }
        } catch (error) {
            set({ categoriesLoading: false, categoriesError: error.message });
        }
    },

    deleteCategory: async (categoryId) => {
        set({ categoriesLoading: true, categoriesError: null });
        try {
            const response = await deleteCategoryService(categoryId);
            if (response.success) {
                set((state) => ({
                    categories: state.categories.filter(cat => cat.id !== categoryId),
                    categoriesLoading: false
                }));
            } else {
                set({ categoriesLoading: false, categoriesError: response.message });
            }
        } catch (error) {
            set({ categoriesLoading: false, categoriesError: error.message });
        }
    },
    clearCategories: () => set({ categories: [] }),
}));

export default useCategoryStore;