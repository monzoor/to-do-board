export interface Draft {
  id: string;
  title: string;
  description: string;
  dueDate: string;
}

export interface DraftState {
  drafts: Draft[];
}
