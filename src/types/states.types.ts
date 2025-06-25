import type { HierarchyItem } from "./hierarchy.types";

// Stav celé aplikace - co si pamatuje
export interface HierarchyState {
  items: HierarchyItem[];
  expandedItems: Set<string>;
}

// Akce které můžu dělat - klikat a mazat
export interface HierarchyActions {
  toggleExpand: (path: number[], relationshipType?: string) => void;
  deleteItem: (itemId: string, path: number[]) => void;
}
