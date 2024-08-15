export const getDueDateStatus = (
  dueDate: string,
): {
  status: string;
  color: string;
} => {
  const now = new Date();
  const due = new Date(dueDate);

  // Calculate the difference in hours
  const diffInHours = Math.floor(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60),
  );

  if (due < now) {
    return { status: "Expired", color: "bg-red-200" };
  } else if (diffInHours <= 6) {
    return { status: "Due Soon", color: "bg-yellow-200" };
  } else {
    return { status: "On Time", color: "bg-green-200" };
  }
};
