// import { create } from 'zustand';
// import { 
//     fetchBranchesService, 
//     createBranchService, 
//     updateBranchService, 
//     deleteBranchService 
// } from '../services/ServiceBranch';

// const initialState = {
//     branches: [],
//     branches_loading: false,
//     branches_error: null,
// };

// const useBranchStore = create((set) => ({
//     ...initialState,

//     // Fetch all branches
//     fetchBranches: async () => {
//         set({ branches_loading: true, branches_error: null });
//         try {
//             const response = await fetchBranchesService();
//             console.log("branches data are" , response.data.data)
//             if (response.success) {
//                 set({ branches: response.data.data, branches_loading: false });
//             } else {
//                 set({ branches: [], branches_loading: false, branches_error: response.message });
//             }
//         } catch (error) {
//             set({ branches: [], branches_loading: false, branches_error: error.message });
//         }
//     },
//     // Create a new branchh
//     createBranch: async (branchData) => {
//         set({ branches_loading: true, branches_error: null });
//         try {
//             const response = await createBranchService(branchData);
//             if (response.success) {
//                 set((state) => ({ 
//                     branches: [...state.branches, response.data], 
//                     branches_loading: false 
//                 }));
//             } else {
//                 set({ branches_loading: false, branches_error: response.message });
//             }
//         } catch (error) {
//             set({ branches_loading: false, branches_error: error.message });
//         }
//     },

//     // Update an existing branch
//     updateBranch: async (branchId, branchData) => {
//         set({ branches_loading: true, branches_error: null });
//         try { 
//             const response = await updateBranchService(branchId, branchData);
//             if (response.success) {
//                 set((state) => ({
//                     branches: state.branches.map(branch => 
//                         branch._id === branchId ? response.data : branch
//                     ),
//                     branches_loading: false
//                 }));
//             } else {
//                 set({ branches_loading: false, branches_error: response.message });
//             }
//         } catch (error) {
//             set({ branches_loading: false, branches_error: error.message });
//         }
//     },

//     // Delete a branch 
//     deleteBranch: async (branchId) => {
//         set({ branches_loading: true, branches_error: null });
//         try {
//             const response = await deleteBranchService(branchId);
//             if (response.success) {
//                 set((state) => ({
//                     branches: state.branches.filter(branch => branch._id !== branchId),
//                     branches_loading: false
//                 }));
//             } else {
//                 set({ branches_loading: false, branches_error: response.message });
//             }
//         } catch (error) {
//         }
//             set({ branches_loading: false, branches_error: error.message });
//     },

//     // Clear branches
//     clearBranches: () => set({ branches: [] }),
// }));
// export default useBranchStore;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  fetchBranchesService, 
  createBranchService, 
  updateBranchService, 
  deleteBranchService 
} from '../services/ServiceBranch';

const initialState = {
  branches: [],
  selectedBranch: null,
  branches_loading: false,
  branches_error: null,
};

const useBranchStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // Fetch all branches
      fetchBranches: async () => {
        set({ branches_loading: true, branches_error: null });
        try {
          const response = await fetchBranchesService();
          if (response.success) {
            set({ 
              branches: response.data.data, 
              branches_loading: false 
            });
            // Keep selected branch if it still exists in the new list
            const currentSelected = get().selectedBranch;
            if (currentSelected) {
              const branchStillExists = response.data.data.some(
                branch => branch._id === currentSelected._id
              );
              if (!branchStillExists) {
                set({ selectedBranch: null });
              }
            }
          } else {
            set({ 
              branches: [], 
              branches_loading: false, 
              branches_error: response.message 
            });
          }
        } catch (error) {
          set({ 
            branches: [], 
            branches_loading: false, 
            branches_error: error.message 
          });
        }
      },

      // Create a new branch
      createBranch: async (branchData) => {
        set({ branches_loading: true, branches_error: null });
        try {
          const response = await createBranchService(branchData);
          if (response.success) {
            set((state) => ({ 
              branches: [...state.branches, response.data], 
              branches_loading: false 
            }));
            return { success: true, data: response.data };
          } else {
            set({ branches_loading: false, branches_error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ branches_loading: false, branches_error: error.message });
          return { success: false, error: error.message };
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
              branches_loading: false,
              // Update selectedBranch if it's the one being updated
              selectedBranch: state.selectedBranch?._id === branchId 
                ? response.data 
                : state.selectedBranch
            }));
            return { success: true, data: response.data };
          } else {
            set({ branches_loading: false, branches_error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ branches_loading: false, branches_error: error.message });
          return { success: false, error: error.message };
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
              branches_loading: false,
              // Clear selectedBranch if it's the one being deleted
              selectedBranch: state.selectedBranch?._id === branchId 
                ? null 
                : state.selectedBranch
            }));
            return { success: true };
          } else {
            set({ branches_loading: false, branches_error: response.message });
            return { success: false, error: response.message };
          }
        } catch (error) {
          set({ branches_loading: false, branches_error: error.message });
          return { success: false, error: error.message };
        }
      },

      // Select a branch
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
      
      // Clear selected branch
      clearSelectedBranch: () => set({ selectedBranch: null }),

      // Clear all branches
      clearBranches: () => set({ 
        branches: [], 
        selectedBranch: null,
        branches_error: null 
      }),

      // Reset entire store to initial state
      resetStore: () => set(initialState),
    }),
    {
      name: 'branch-storage', // unique name for localStorage
      getStorage: () => localStorage, // or AsyncStorage for React Native
      partialize: (state) => ({
        selectedBranch: state.selectedBranch, // persist only selectedBranch
      }),
    }
  )
);

export default useBranchStore;