import { HierarchyTable } from "./components/features/hierarchy";
import exampleData from "../example-data.json";
import type { HierarchyItem } from "./types";
function App() {
  return (
    <main className="container mx-auto">
      <HierarchyTable data={exampleData as HierarchyItem[]} />
    </main>
  );
}

export default App;
