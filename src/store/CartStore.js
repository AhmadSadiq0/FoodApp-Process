import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, {
      ...item,
      active: true,
      id: item.id || `${item.name}-${Date.now()}`,
    }]
  })),
  removeItem: (id) => set((state) => ({ 
    items: state.items.filter(i => i.id !== id) 
  })),
  clearCart: () => set({ items: [] }),
  // toggleItemActive: (id) => set((state) => ({
  //   items: state.items.map(item => 
  //     item.id === id ? { ...item, active: !item.active } : item
  //   )
  // }))
  toggleItemActive: (id) => set(state => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    )
  })),
}));

export default useCartStore;