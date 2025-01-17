import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "theme-storage", 
      storage: {
        getItem: AsyncStorage.getItem.bind(AsyncStorage),
        setItem: AsyncStorage.setItem.bind(AsyncStorage),
        removeItem: AsyncStorage.removeItem.bind(AsyncStorage),
      },
    }
  )
);

export default useThemeStore;
