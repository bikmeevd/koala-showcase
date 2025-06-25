import { parseCustomDate } from "./dateParser";
import { formatGender } from "./genderFormatter";

export type FormatterFunction = (value: string) => string;

export const formatters: Record<string, FormatterFunction> = {
  Born: (value: string) => {
    const date = parseCustomDate(value);
    if (!date) return value;

    return date.toLocaleDateString("cs-CZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  "In space since": (value: string) => {
    const date = parseCustomDate(value);
    if (!date) return value;

    return date.toLocaleDateString("cs-CZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  "Minimal distance": (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return num.toFixed(3);
  },

  Gender: (value: string) => {
    return formatGender(value);
  },

  "Knows the answer?": (value: string) => {
    return value === "true" ? "Know" : "Doesn't know";
  },
};

export const applyFormatter = (header: string, value: string): string => {
  const formatter = formatters[header];
  return formatter ? formatter(value) : value;
};
