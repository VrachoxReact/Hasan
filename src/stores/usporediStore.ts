import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Vozilo } from "@/types/vozilo";

interface UsporediStore {
  vozila: Vozilo[];
  addVozilo: (vozilo: Vozilo) => boolean;
  removeVozilo: (id: string) => void;
  clearAll: () => void;
  isInList: (id: string) => boolean;
}

export const useUsporediStore = create<UsporediStore>()(
  persist(
    (set, get) => ({
      vozila: [],
      addVozilo: (vozilo) => {
        const current = get().vozila;
        if (current.length >= 3) {
          return false;
        }
        if (current.find((v) => v.id === vozilo.id)) {
          return false;
        }
        set({ vozila: [...current, vozilo] });
        return true;
      },
      removeVozilo: (id) => {
        set({ vozila: get().vozila.filter((v) => v.id !== id) });
      },
      clearAll: () => {
        set({ vozila: [] });
      },
      isInList: (id) => {
        return get().vozila.some((v) => v.id === id);
      },
    }),
    {
      name: "usporedi-storage",
    }
  )
);
