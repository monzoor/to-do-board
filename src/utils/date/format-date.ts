export const formatDate = (date: string | number | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // Short month (e.g., Jan)
    day: "2-digit", // Day (e.g., 25)
    year: "numeric", // Year (e.g., 2022)
    hour: "2-digit", // Hour (e.g., 16)
    minute: "2-digit", // Minute (e.g., 04)
    hour12: false, // 24-hour format
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(new Date(date)).replace(",", "");
};
