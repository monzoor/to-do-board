// Error handlers
export const unauthorized = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login"; // Adjust URL as needed
  }
};
