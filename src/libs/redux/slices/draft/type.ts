// Define the shape of the draft data
export interface Draft {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

// Define the initial state
export interface DraftState {
  drafts: Draft[];
}
