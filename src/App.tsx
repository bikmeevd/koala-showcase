import { HierarchyTable } from "./components/features/hierarchy";
import exampleData from "../example-data.json";
import type { HierarchyItem } from "./types";
import { useHierarchyStore } from "./store";
import { useEffect } from "react";
function App() {
  const { setData } = useHierarchyStore();
  useEffect(() => {
    setData(exampleData as HierarchyItem[]);
  }, [exampleData]);
  return (
    <main className="container mx-auto">
      <HierarchyTable />
    </main>
  );
}

export default App;
