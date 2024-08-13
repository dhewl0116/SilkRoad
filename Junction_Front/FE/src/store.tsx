import { create } from "zustand";

interface StoreState {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (val: boolean) => set(() => ({ sidebarOpen: val })),
}));

export default useStore;
