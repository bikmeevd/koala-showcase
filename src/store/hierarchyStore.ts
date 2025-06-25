import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { HierarchyItem } from "@/types";
import { enableMapSet } from "immer";

enableMapSet();

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

    deleteItem: (path) => {
      set((state) => {
        const removeItemAtPath = (
          items: HierarchyItem[],
          currentPath: number[],
          depth = 0
        ): boolean => {
          if (depth >= currentPath.length) return false;

          const index = currentPath[depth];

          if (depth === currentPath.length - 1) {
            if (index >= 0 && index < items.length) {
              items.splice(index, 1);
              return true;
            }
            return false;
          }

          if (index >= 0 && index < items.length) {
            const currentItem = items[index];

            for (const [_, childGroup] of Object.entries(
              currentItem.children
            )) {
              if (childGroup?.records && Array.isArray(childGroup.records)) {
                if (
                  removeItemAtPath(childGroup.records, currentPath, depth + 1)
                ) {
                  return true;
                }
              }
            }
          }

          return false;
        };

        removeItemAtPath(state.data, path);
      });
    },

    isExpanded: (itemId: string) => {
      return get().expandedItems.has(itemId);
    },
  }))
);
