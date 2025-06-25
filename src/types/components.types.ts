import type { HierarchyItem } from "./hierarchy.types";

// Hlavní komponenta tabulky - co potřebuje
export interface HierarchyTableProps {
  data: HierarchyItem[];
  onItemDelete?: (itemId: string, path: number[]) => void;
}
// Jeden řádek tabulky - vše co řádek musí vědět
export interface TableRowProps {
  item: HierarchyItem;
  level: number;
  path: number[];
  isExpanded: boolean;
  onToggleExpand: (path: number[]) => void;
  onDelete?: (itemId: string, path: number[]) => void;
}
// Rozbalovací řádek - děti uvnitř
export interface ExpandableRowProps {
  children: React.ReactNode;
  isExpanded: boolean;
  level: number;
}
