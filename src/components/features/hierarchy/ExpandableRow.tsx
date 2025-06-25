import { useState } from "react";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Trash2 } from "lucide-react";
import type { HierarchyItem } from "@/types";
import { TABLE_CONFIGS } from "@/config/table-config";
import getCellValue from "@/lib/getCellValue";
import getChildDataType from "@/lib/getChildDataType";

interface ExpandableRowProps {
  item: HierarchyItem;
  level: number;
  path: number[];
  dataType: "character" | "nemesis" | "secret";
  onDelete?: (itemId: string, path: number[]) => void;
  showExpandButton?: boolean;
}

const ExpandableRow = ({
  item,
  level,
  path,
  dataType,
  onDelete,
  showExpandButton = true,
}: ExpandableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChildren = Object.keys(item.children).length > 0;
  const headers = TABLE_CONFIGS[dataType];

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleDelete = () => {
    if (onDelete && item.data.ID) {
      onDelete(item.data.ID, path);
    }
  };

  return (
    <>
      <TableRow className={level > 0 ? "bg-muted/50" : ""}>
        {headers.map((header, index) => (
          <TableCell key={header} className="text-sm">
            {index === 0 && showExpandButton ? (
              <div className="flex items-center gap-2">
                {hasChildren ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleToggle}
                    className="h-6 w-6 p-0"
                  >
                    {isExpanded ? (
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

      {isExpanded && hasChildren && (
        <TableRow>
          <TableCell colSpan={headers.length + 1} className="p-0">
            {Object.entries(item.children).map(
              ([relationshipType, childGroup]) => {
                const childDataType = getChildDataType(relationshipType);
                const childHeaders = TABLE_CONFIGS[childDataType];

                return (
                  <div key={relationshipType} className="ml-8 mt-2 mb-2">
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
                            delete
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {childGroup.records.map(
                          (child: HierarchyItem, childIndex: number) => (
                            <ExpandableRow
                              key={`${child.data.ID}-${childIndex}`}
                              item={child}
                              level={level + 1}
                              path={[...path, childIndex]}
                              dataType={childDataType}
                              onDelete={onDelete}
                              showExpandButton={true}
                            />
                          )
                        )}
                      </TableBody>
                    </Table>
                  </div>
                );
              }
            )}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ExpandableRow;
