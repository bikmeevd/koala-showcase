import { HierarchyTable } from "./components/features/hierarchy";
import exampleData from "../example-data.json";
import type { HierarchyItem } from "./types";
function App() {
  return (
    <main className="container mx-auto p-6">
      <HierarchyTable data={exampleData as HierarchyItem[]} />
    </main>
  );
}

export default App;
