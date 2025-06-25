import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { HierarchyItem } from "@/types";

interface HierarchyStore {
  data: HierarchyItem[];
  expandedItems: Set<string>;

  setData: (data: HierarchyItem[]) => void;
  toggleExpanded: (itemId: string) => void;
  deleteItem: (itemId: string, path: number[]) => void;

  isExpanded: (itemId: string) => boolean;
}

export const useHierarchyStore = create<HierarchyStore>()(
  immer((set, get) => ({
    data: [],
    expandedItems: new Set<string>(),
    setData: (data: HierarchyItem[]) => {
      set((state) => {
        state.data = data;
        state.expandedItems = new Set();
      });
    },
    toggleExpanded: (itemId: string) => {
      set((state) => {
        if (state.expandedItems.has(itemId)) {
          state.expandedItems.delete(itemId);
        } else {
          state.expandedItems.add(itemId);
        }
      });
    },

    deleteItem: (itemId: string, path: number[]) => {
      set((state) => {});
    },
    isExpanded: (itemId: string) => {
      return get().expandedItems.has(itemId);
    },
  }))
);
