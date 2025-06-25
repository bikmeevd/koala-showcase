import type { HierarchyItem } from "@/types";
import ExpandableRow from "./ExpandableRow";

interface HierarchyRowProps {
  item: HierarchyItem;
  level: number;
  path: number[];
  dataType: "character" | "nemesis" | "secret";
}

const HierarchyRow = ({ item, level, path, dataType }: HierarchyRowProps) => {
  return (
    <ExpandableRow
      item={item}
      level={level}
      path={path}
      dataType={dataType}
      showExpandButton={level === 0}
    />
  );
};

export default HierarchyRow;
