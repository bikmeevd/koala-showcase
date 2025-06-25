import type { HierarchyItem } from "@/types";

const getCellValue = (header: string, item: HierarchyItem): string => {
  const value = item.data[header as keyof typeof item.data];
  if (value === null || value === undefined) {
    return "";
  }
  return String(value);
};

export default getCellValue;
