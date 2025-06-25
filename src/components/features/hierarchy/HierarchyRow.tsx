import type { HierarchyItem } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useHierarchyStore } from "@/store";
import { TABLE_CONFIGS } from "@/config/table-config";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import getCellValue from "@/lib/getCellValue";
import getChildDataType from "@/lib/getChildDataType";

interface HierarchyRowProps {
  item: HierarchyItem;
  level: number;
  path: number[];
  dataType: "character" | "nemesis" | "secret";
}

const HierarchyRow = ({ item, level, path, dataType }: HierarchyRowProps) => {
  const { isExpanded, toggleExpanded, deleteItem } = useHierarchyStore();

  const hasChildren = Object.keys(item.children).length > 0;
  const headers = TABLE_CONFIGS[dataType];
  const expanded = isExpanded(item.data.ID);

  const handleToggle = () => hasChildren && toggleExpanded(item.data.ID);
  const handleDelete = () => deleteItem(path);

  return (
    <>
      <TableRow className={level > 0 ? "bg-muted/50" : ""}>
        {headers.map((header, index) => (
          <TableCell key={header} className="text-sm">
            {index === 0 ? (
              <div className="flex items-center gap-2">
                {hasChildren ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggle}
                    className="h-6 w-6 p-0"
                  >
                    {expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <div className="w-6" />
                )}
                <span>{getCellValue(header, item)}</span>
              </div>
            ) : (
              getCellValue(header, item)
            )}
          </TableCell>
        ))}
        <TableCell className="text-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      {expanded && hasChildren && (
        <TableRow>
          <TableCell colSpan={headers.length + 1} className="p-0">
            <div className="ml-8 mt-2 mb-2 space-y-4">
              {Object.entries(item.children).map(
                ([relationshipType, childGroup]) => {
                  if (!childGroup?.records || childGroup.records.length === 0) {
                    return null;
                  }

                  const childDataType = getChildDataType(relationshipType);
                  const childHeaders = TABLE_CONFIGS[childDataType];

                  const groupTitle =
                    relationshipType === "has_nemesis"
                      ? "Nemeses"
                      : relationshipType === "has_secrete"
                      ? "Secret Codes"
                      : relationshipType;

                  return (
                    <div key={relationshipType}>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2 px-2">
                        {groupTitle} ({childGroup.records.length} items)
                      </h4>
                      <Table className="border">
                        <TableHeader>
                          <TableRow>
                            {childHeaders.map((header) => (
                              <TableHead
                                key={header}
                                className="text-black font-semibold"
                              >
                                {header}
                              </TableHead>
                            ))}
                            <TableHead className="text-right text-black font-semibold">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {childGroup.records.map(
                            (child: HierarchyItem, childIndex: number) => (
                              <HierarchyRow
                                key={`${child.data.ID}-${childIndex}`}
                                item={child}
                                level={level + 1}
                                path={[...path, childIndex]}
                                dataType={childDataType}
                              />
                            )
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  );
                }
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default HierarchyRow;
