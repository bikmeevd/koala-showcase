import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { HierarchyItem } from "@/types";

interface HierarchyStore {
  data: HierarchyItem[];
  expandedItems: Set<string>;

  setData: (data: HierarchyItem[]) => void;
  toggleExpanded: (itemId: string) => void;
  deleteItem: (path: number[]) => void;

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
    deleteItem: (path) =>
      set((state) => {
        const remove = (
          level: HierarchyItem[] | undefined,
          depth = 0
        ): void => {
          if (!level) return;
          const idx = path[depth];

          if (depth === path.length - 1) {
            level.splice(idx, 1);
            return;
          }
          const nextItem = level[idx];
          for (const group of Object.values(nextItem.children)) {
            remove(group.records, depth + 1);
          }
        };

        remove(state.data, 0);
      }),
    isExpanded: (itemId: string) => {
      return get().expandedItems.has(itemId);
    },
  }))
);
