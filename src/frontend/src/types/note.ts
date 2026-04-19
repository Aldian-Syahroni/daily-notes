export type NoteId = bigint;

export interface Note {
  id: NoteId;
  title: string;
  content: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface NoteInput {
  title: string;
  content: string;
}

export interface NoteUpdate {
  id: NoteId;
  title: string;
  content: string;
}

export type SortOrder = "newest" | "oldest" | "title";
