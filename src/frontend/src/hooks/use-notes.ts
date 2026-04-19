import { type Backend, createActor } from "@/backend";
import type { Note, NoteId, NoteInput, NoteUpdate } from "@/types/note";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// ──────────────────────────────────────────────────────────
// Shared hook for actor
// ──────────────────────────────────────────────────────────
function useBackend() {
  return useActor<Backend>(createActor);
}

// ──────────────────────────────────────────────────────────
// Queries
// ──────────────────────────────────────────────────────────

export function useNotes() {
  const { actor, isFetching } = useBackend();
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNote(id: NoteId | undefined) {
  const { actor, isFetching } = useBackend();
  return useQuery<Note | null>({
    queryKey: ["notes", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getNote(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useSearchNotes(searchTerm: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Note[]>({
    queryKey: ["notes", "search", searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      return actor.searchNotes(searchTerm.trim());
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
  });
}

// ──────────────────────────────────────────────────────────
// Mutations
// ──────────────────────────────────────────────────────────

export function useCreateNote() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<Note, Error, NoteInput>({
    mutationFn: async (input: NoteInput) => {
      if (!actor) throw new Error("Actor tidak tersedia");
      return actor.createNote(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useUpdateNote() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<Note | null, Error, NoteUpdate>({
    mutationFn: async (upd: NoteUpdate) => {
      if (!actor) throw new Error("Actor tidak tersedia");
      return actor.updateNote(upd);
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      qc.invalidateQueries({ queryKey: ["notes", variables.id.toString()] });
    },
  });
}

export function useDeleteNote() {
  const { actor } = useBackend();
  const qc = useQueryClient();
  return useMutation<boolean, Error, NoteId>({
    mutationFn: async (id: NoteId) => {
      if (!actor) throw new Error("Actor tidak tersedia");
      return actor.deleteNote(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}
