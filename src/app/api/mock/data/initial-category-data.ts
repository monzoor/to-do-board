// Calculate dynamic due dates
const currentDate = new Date();
const backDate = new Date(currentDate);
backDate.setDate(currentDate.getDate() - 1);

const sixHoursLeft = new Date(currentDate);
sixHoursLeft.setHours(currentDate.getHours() + 6);

const twoDaysAhead = new Date(currentDate);
twoDaysAhead.setDate(currentDate.getDate() + 2);

export const initialCategoryData = [
  {
    _id: "mock-category-id-1",
    name: "Mock Category 1",
    description: "Description for Mock Category 1",
    createdAt: currentDate,
    userId: "mock-user-id",
    tickets: [
      {
        _id: "mock-ticket-id-1",
        title: "Mock Ticket 1",
        description: "Description for Mock Ticket 1",
        category: "mock-category-id-1",
        dueDate: backDate,
        createdAt: currentDate,
        updatedAt: currentDate,
        history: [
          {
            _id: "mock-history-id-1",
            userId: "mock-history-id-1",
            previousCategory: "mock-category-id-2",
            newCategory: "mock-category-id-1",
            historyDate: currentDate,
            dueDate: backDate,
          },
          {
            _id: "mock-history-id-2",
            userId: "mock-history-id-2",
            previousCategory: "mock-category-id-1",
            newCategory: "mock-category-id-2",
            historyDate: currentDate,
            dueDate: backDate,
          },
        ],
      },
      {
        _id: "mock-ticket-id-2",
        title: "Mock Ticket 2",
        description: "Description for Mock Ticket 2",
        category: "mock-category-id-1",
        dueDate: sixHoursLeft,
        createdAt: currentDate,
        updatedAt: currentDate,
        history: [
          {
            _id: "mock-history-id-3",
            userId: "mock-history-id-3",
            previousCategory: "mock-category-id-2",
            newCategory: "mock-category-id-1",
            historyDate: currentDate,
            dueDate: sixHoursLeft,
          },
        ],
      },
    ],
  },
  {
    _id: "mock-category-id-2",
    name: "Mock Category 2",
    description: "Description for Mock Category 2",
    createdAt: currentDate,
    userId: "mock-user-id",
    tickets: [
      {
        _id: "mock-ticket-id-3",
        title: "Mock Ticket 3",
        description: "Description for Mock Ticket 3",
        category: "mock-category-id-2",
        dueDate: twoDaysAhead,
        createdAt: currentDate,
        updatedAt: currentDate,
        history: [
          {
            _id: "mock-history-id-4",
            userId: "mock-history-id-4",
            previousCategory: "mock-category-id-1",
            newCategory: "mock-category-id-2",
            historyDate: currentDate,
            dueDate: twoDaysAhead,
          },
        ],
      },
    ],
  },
];

export const movedTicketFromCategory1ToCategory2 = [
  {
    _id: "mock-category-id-1",
    name: "Mock Category 1",
    description: "Description for Mock Category 1",
    createdAt: currentDate,
    userId: "mock-user-id",
    tickets: [
      {
        _id: "mock-ticket-id-1",
        title: "Mock Ticket 1",
        description: "Description for Mock Ticket 1",
        category: "mock-category-id-1",
        dueDate: backDate,
        createdAt: currentDate,
        updatedAt: currentDate,
        history: [
          {
            _id: "mock-history-id-1",
            userId: "mock-history-id-1",
            previousCategory: "mock-category-id-2",
            newCategory: "mock-category-id-1",
            historyDate: currentDate,
            dueDate: backDate,
          },
          {
            _id: "mock-history-id-2",
            userId: "mock-history-id-2",
            previousCategory: "mock-category-id-1",
            newCategory: "mock-category-id-2",
            historyDate: currentDate,
            dueDate: backDate,
          },
        ],
      },
    ],
  },
  {
    _id: "mock-category-id-2",
    name: "Mock Category 2",
    description: "Description for Mock Category 2",
    createdAt: currentDate,
    userId: "mock-user-id",
    tickets: [
      {
        _id: "mock-ticket-id-3",
        title: "Mock Ticket 3",
        description: "Description for Mock Ticket 3",
        category: "mock-category-id-2",
        dueDate: twoDaysAhead,
        createdAt: currentDate,
        updatedAt: currentDate,
        history: [
          {
            _id: "mock-history-id-4",
            userId: "mock-history-id-4",
            previousCategory: "mock-category-id-1",
            newCategory: "mock-category-id-2",
            historyDate: currentDate,
            dueDate: twoDaysAhead,
          },
          {
            _id: "mock-history-id-5",
            userId: "mock-history-id-5",
            previousCategory: "mock-category-id-2",
            newCategory: "mock-category-id-1",
            historyDate: currentDate,
            dueDate: twoDaysAhead,
          },
        ],
      },
      {
        _id: "mock-ticket-id-2",
        title: "Mock Ticket 2",
        description: "Description for Mock Ticket 2",
        category: "mock-category-id-1",
        dueDate: sixHoursLeft,
        createdAt: currentDate,
        updatedAt: currentDate,
        history: [
          {
            _id: "mock-history-id-3",
            userId: "mock-history-id-3",
            previousCategory: "mock-category-id-2",
            newCategory: "mock-category-id-1",
            historyDate: currentDate,
            dueDate: sixHoursLeft,
          },
        ],
      },
    ],
  },
];
