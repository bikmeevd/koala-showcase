import { useEffect } from "react";
import { useHierarchyStore } from "@/store";

export const useUrlState = () => {
  const { expandedItems, setExpandedItems } = useHierarchyStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const expanded = params.get("expanded");
    if (expanded) {
      const expandedSet = new Set(expanded.split(",").filter(Boolean));
      setExpandedItems(expandedSet);
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (expandedItems.size > 0) {
      url.searchParams.set("expanded", Array.from(expandedItems).join(","));
    } else {
      url.searchParams.delete("expanded");
    }

    window.history.pushState(null, "", url.toString());
  }, [expandedItems]);
};
