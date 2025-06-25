import { HierarchyTable } from "./components/features/hierarchy";
import exampleData from "../example-data.json";
import type { HierarchyItem } from "./types";
import { useHierarchyStore } from "./store";
import { useEffect } from "react";
import { useUrlState } from "./hooks/useUrlState";

function App() {
  const { setData } = useHierarchyStore();
  useUrlState();

  useEffect(() => {
    setData(exampleData as HierarchyItem[]);
  }, [setData]);

  return (
    <main className="container mx-auto">
      <HierarchyTable />
    </main>
  );
}

export default App;
