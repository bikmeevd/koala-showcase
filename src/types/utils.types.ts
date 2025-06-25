import type { HierarchyItem } from "./hierarchy.types";

// Cesta k prvku - kde se nachází v hierarchii
export type ItemPath = number[];

// Plochý prvek pro vykreslení
export interface FlattenedItem {
  item: HierarchyItem;
  level: number;
  path: ItemPath;
  relationshipType?: string;
  parentId?: string;
}
