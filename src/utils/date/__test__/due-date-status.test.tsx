import { getDueDateStatus } from "../due-date-status";

describe("getDueDateStatus", () => {
  it("should return 'Expired' status and red color for past due dates", () => {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const result = getDueDateStatus(pastDate);
    expect(result).toEqual({ status: "Expired", color: "bg-red-200" });
  });

  it("should return 'Due Soon' status and yellow color for due dates within 6 hours", () => {
    const dueSoonDate = new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString();
    const result = getDueDateStatus(dueSoonDate);
    expect(result).toEqual({ status: "Due Soon", color: "bg-yellow-200" });
  });

  it("should return 'On Time' status and green color for due dates more than 6 hours away", () => {
    const onTimeDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const result = getDueDateStatus(onTimeDate);
    expect(result).toEqual({ status: "On Time", color: "bg-green-200" });
  });
});
