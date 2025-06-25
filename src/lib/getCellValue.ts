import type { HierarchyItem } from "@/types";
import { applyFormatter } from "./formatters";

const getCellValue = (header: string, item: HierarchyItem): string => {
  const value = item.data[header as keyof typeof item.data];

  if (value === null || value === undefined) {
    return "";
  }

  return applyFormatter(header, String(value));
};

export default getCellValue;
