export const parseCustomDate = (dateString: string): Date | null => {
  try {
    const cleanDateString = dateString.replace(/\s[A-Z]{3,4}\s/, " ");

    let date = new Date(cleanDateString);

    if (!isNaN(date.getTime())) {
      return date;
    }

    const dateRegex =
      /^(\w{3})\s+(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})\s+\w+\s+(\d{4})$/;
    const match = dateString.match(dateRegex);

    if (match) {
      const [, , monthStr, day, hours, minutes, seconds, year] = match;

      const months: Record<string, number> = {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11,
      };

      const monthNum = months[monthStr];
      if (monthNum !== undefined) {
        date = new Date(
          parseInt(year),
          monthNum,
          parseInt(day),
          parseInt(hours),
          parseInt(minutes),
          parseInt(seconds)
        );

        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const formatDate = (dateString: string): string => {
  const date = parseCustomDate(dateString);

  if (!date) {
    return dateString;
  }

  return date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = parseCustomDate(dateString);

  if (!date) {
    return dateString;
  }

  return date.toLocaleDateString("cs-CZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
