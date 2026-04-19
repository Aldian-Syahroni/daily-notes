import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface NoteUpdate {
    id: NoteId;
    title: string;
    content: string;
}
export type NoteId = bigint;
export interface NoteInput {
    title: string;
    content: string;
}
export interface Note {
    id: NoteId;
    title: string;
    content: string;
    createdAt: bigint;
    updatedAt: bigint;
}
export interface backendInterface {
    createNote(input: NoteInput): Promise<Note>;
    deleteNote(id: NoteId): Promise<boolean>;
    getNote(id: NoteId): Promise<Note | null>;
    listNotes(): Promise<Array<Note>>;
    searchNotes(searchTerm: string): Promise<Array<Note>>;
    updateNote(upd: NoteUpdate): Promise<Note | null>;
}
