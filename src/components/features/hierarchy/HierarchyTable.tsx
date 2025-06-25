import type { HierarchyTableProps } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HierarchyRow from "./HierarchyRow";
import { TABLE_CONFIGS } from "@/config/table-config";

const HierarchyTable = (props: HierarchyTableProps) => {
  const { data, onItemDelete } = props;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_CONFIGS.character.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((rootItem, index) => (
              <HierarchyRow
                key={`${rootItem.data.ID}-${index}`}
                item={rootItem}
                level={0}
                path={[index]}
                dataType="character"
                onDelete={onItemDelete}
              />
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={TABLE_CONFIGS.character.length + 1}
                className="h-24 text-center"
              >
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HierarchyTable;
