export const formatDate = (date: string | number | Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short", // Short month (e.g., Dec)
    day: "2-digit", // Day (e.g., 11)
    year: "numeric", // Year (e.g., 2024)
    hour: "2-digit", // Hour (e.g., 18)
    minute: "2-digit", // Minute (e.g., 00)
    hour12: false, // 24-hour format
    timeZone: "UTC", // Use UTC time zone
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  let formattedDate = formatter.format(new Date(date)).replace(",", "");

  return formattedDate;
};
