export type GenderType = "female" | "m" | "M" | "F" | "male" | "mouse" | "";

const GENDER_MAP: Record<string, string> = {
  m: "Male",
  M: "Male",
  male: "Male",

  f: "Female",
  F: "Female",
  female: "Female",

  mouse: "Mouse",
  "": "Unknown",
};

export const formatGender = (value: string): string => {
  const normalizedValue = value.toLowerCase().trim();

  const exactMatch = GENDER_MAP[value] || GENDER_MAP[normalizedValue];
  if (exactMatch) {
    return exactMatch;
  }

  if (normalizedValue.includes("male")) {
    return "Male";
  }

  if (normalizedValue.includes("female")) {
    return "Female";
  }

  if (normalizedValue.includes("mouse")) {
    return "Mouse";
  }

  return value.charAt(0).toUpperCase() + value.slice(1) || "Unknown";
};
