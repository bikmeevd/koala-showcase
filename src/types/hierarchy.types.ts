// Údaje o postavě - základní info o každém hrdinovi
export interface CharacterData {
  ID: string;
  Name: string;
  Gender: string;
  Ability: string;
  "Minimal distance": string;
  Weight: string;
  Born: string;
  "In space since": string;
  "Beer consumption (l/y)": string;
  "Knows the answer?": string;
}
// Údaje o nepříteli postavy
export interface NemesisData {
  ID: string;
  "Character ID": string;
  "Is alive?": string;
  Years: string;
}
// Tajné kódy nepřátel
export interface SecreteData {
  ID: string;
  "Nemesis ID": string;
  "Secrete Code": string;
}
// Jakýkoliv typ dat v tabulce
export type ItemData = CharacterData | NemesisData | SecreteData;
// Kontejner pro děti - různé typy vztahů
export interface ChildrenContainer {
  [relationshipType: string]: {
    records: HierarchyItem[];
  };
}
// Jeden prvek hierarchie - data + jejich děti
export interface HierarchyItem {
  data: ItemData;
  children: ChildrenContainer;
}
