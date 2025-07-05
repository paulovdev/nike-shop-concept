import { create } from "zustand";

export const useFilterStore = create((set) => ({
  selectedFilter: {
    title: "",
    category: "",
    order: "asc",
  },
  setSelectedFilter: (update) =>
    set((state) => ({
      selectedFilter:
        typeof update === "function" ? update(state.selectedFilter) : update,
    })),
}));

export const useMenuStore = create((set) => ({
  selectedMenu: "index",
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));

export const useShoeStore = create((set) => ({
  selectedShoe: null,
  setSelectedShoe: (shoe) => set({ selectedShoe: shoe }),
}));

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((item) => item.id === product.id);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
