import { formatDate } from "../format-date";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const date = new Date("2024-12-11T18:00:00.000Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Dec 11 2024, 18:00");
  });

  it("should handle string input", () => {
    const date = "2023-10-01T16:04:00Z";
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Oct 01 2023, 16:04");
  });

  it("should handle number input", () => {
    const date = Date.parse("2023-10-01T16:04:00Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("Oct 01 2023, 16:04");
  });
});
