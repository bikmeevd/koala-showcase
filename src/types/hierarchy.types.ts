export type Gender = "female" | "m" | "M" | "F" | "male" | "mouse" | "";

export type BooleanString = "true" | "false";

// Údaje o postavě
export interface CharacterData {
  ID: string;
  Name: string;
  Gender: Gender;
  Ability: string;
  "Minimal distance": string;
  Weight: string;
  Born: string;
  "In space since": string;
  "Beer consumption (l/y)": string;
  "Knows the answer?": BooleanString;
}

// Údaje o nepříteli postavy
export interface NemesisData {
  ID: string;
  "Character ID": string;
  "Is alive?": BooleanString | "";
  Years: string;
}

// Tajné kódy nepřátel
export interface SecreteData {
  ID: string;
  "Nemesis ID": string;
  "Secrete Code": string;
}

// Jakýkoliv typ dat
export type ItemData = CharacterData | NemesisData | SecreteData;

export interface ChildrenContainer {
  has_nemesis?: {
    records: HierarchyItem[];
  };
  has_secrete?: {
    records: HierarchyItem[];
  };
}

export interface HierarchyItem {
  data: ItemData;
  children: ChildrenContainer;
}

export type FullData = HierarchyItem[];
