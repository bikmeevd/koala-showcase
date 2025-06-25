import type { HierarchyItem } from "@/types";
import ExpandableRow from "./ExpandableRow";

interface HierarchyRowProps {
  item: HierarchyItem;
  level: number;
  path: number[];
  dataType: "character" | "nemesis" | "secret";
  onDelete?: (itemId: string, path: number[]) => void;
}

const HierarchyRow = ({
  item,
  level,
  path,
  dataType,
  onDelete,
}: HierarchyRowProps) => {
  return (
    <ExpandableRow
      item={item}
      level={level}
      path={path}
      dataType={dataType}
      onDelete={onDelete}
      showExpandButton={level === 0}
    />
  );
};

export default HierarchyRow;
