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

export interface NemesisData {
  ID: string;
  "Character ID": string;
  "Is alive?": string;
  Years: string;
}

export interface SecreteData {
  ID: string;
  "Nemesis ID": string;
  "Secrete Code": string;
}

export type ItemData = CharacterData | NemesisData | SecreteData;

export interface ChildrenContainer {
  [relationshipType: string]: {
    records: HierarchyItem[];
  };
}

export interface HierarchyItem {
  data: ItemData;
  children: ChildrenContainer;
}
