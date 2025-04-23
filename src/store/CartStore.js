// import { create } from 'zustand';

// const useCartStore = create((set) => ({
//   items: [],
//   addItem: (item) => set((state) => ({ 
//     items: [...state.items, {
//       ...item,
//       active: true,
//       id: item.id || `${item.name}-${Date.now()}`,
//     }]
//   })),
//   removeItem: (id) => set((state) => ({ 
//     items: state.items.filter(i => i.id !== id) 
//   })),
//   clearCart: () => set({ items: [] }),
//   // toggleItemActive: (id) => set((state) => ({
//   //   items: state.items.map(item => 
//   //     item.id === id ? { ...item, active: !item.active } : item
//   //   )
//   // }))
//   toggleItemActive: (id) => set(state => ({
//     items: state.items.map(item => 
//       item.id === id ? { ...item, active: !item.active } : item
//     )
//   })),
// }));

// export default useCartStore;
import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({
    items: [...state.items, { ...item, active: true, id: item.id || `${item.name}-${Date.now()}` }]
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  toggleItemActive: (id) => set(state => ({
    items: state.items.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    )
  })),
 // In your cart store (store/CartStore.js)
// In your cart store (store/CartStore.js)
updateExtraQuantity: (parentId, extraId, change) => set(state => ({
  items: state.items.map(item => 
    item.id === parentId
      ? {
          ...item,
          extras: item.extras?.map(extra => 
            extra._id === extraId
              ? { ...extra, quantity: Math.max(1, extra.quantity + change) }
              : extra
          )
        }
      : item
  )
})),
// Inside useCartStore.js
updateItemQuantity: (id, amount) =>
  set(state => ({
    items: state.items.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ),
  })),

}));
export default useCartStore;
