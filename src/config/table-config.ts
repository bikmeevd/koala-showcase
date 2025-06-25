export const TABLE_CONFIGS = {
  character: [
    "ID",
    "Name",
    "Gender",
    "Ability",
    "Minimal distance",
    "Weight",
    "Born",
    "In space since",
    "Beer consumption (l/y)",
    "Knows the answer?",
  ],
  nemesis: ["ID", "Character ID", "Is alive?", "Years"],
  secret: ["ID", "Nemesis ID", "Secrete Code"],
} as const;
