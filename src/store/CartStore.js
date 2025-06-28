import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  extras: [],

  addItem: (item) =>
    set((state) => ({
      items: [
        ...state.items,
        {
          ...item,
          active: true,
          id: item.id || `${item.name}-${Date.now()}`
        }
      ]
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id)
    })),

  clearCart: () => set({ items: [], extras: [] }),

  toggleItemActive: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    })),

  updateExtraQuantity: (parentId, extraId, change) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === parentId
          ? {
              ...item,
              extras: item.extras?.map((extra) =>
                extra._id === extraId
                  ? {
                      ...extra,
                      quantity: Math.max(1, extra.quantity + change)
                    }
                  : extra
              )
            }
          : item
      )
    })),

  updateItemQuantity: (id, amount) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    })),

  updateItemExtras: (itemId, newExtras) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, extras: newExtras } : item
      )
    })),

  removeExtra: (extraId) =>
    set((state) => ({
      items: state.items.map((item) => ({
        ...item,
        extras: item.extras?.filter((extra) => extra._id !== extraId)
      }))
    }))
}));

export default useCartStore;
