import { Layout } from "@/components/Layout";
import { NotesSearch } from "@/components/NotesSearch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateNote, useNotes } from "@/hooks/use-notes";
import { formatRelativeTime, groupNotesByDate } from "@/lib/format";
import type { Note, SortOrder } from "@/types/note";
import { useRouter } from "@tanstack/react-router";
import { ArrowUpDownIcon, PlusIcon, StickyNoteIcon } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";

// ──────────────────────────────────────────────────────────
// NoteCard
// ──────────────────────────────────────────────────────────
interface NoteCardProps {
  note: Note;
  index: number;
  onClick: () => void;
}

const CARD_ACCENTS = [
  "border-l-primary",
  "border-l-accent",
  "border-l-secondary",
];

function NoteCard({ note, index, onClick }: NoteCardProps) {
  const accentClass = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const preview = note.content.slice(0, 100);
  const hasMore = note.content.length > 100;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      whileHover={{ scale: 1.015, y: -2 }}
      onClick={onClick}
      className={`group w-full text-left rounded-lg bg-card border border-border border-l-4 ${accentClass} p-4 shadow-xs hover:shadow-md transition-smooth cursor-pointer`}
      data-ocid={`notes.item.${index + 1}`}
    >
      <h3 className="font-display font-semibold text-foreground text-sm leading-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors duration-200">
        {note.title || "Catatan tanpa judul"}
      </h3>
      {note.content && (
        <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
          {preview}
          {hasMore && "…"}
        </p>
      )}
      <p className="mt-2.5 text-xs text-muted-foreground/70 font-mono">
        {formatRelativeTime(note.updatedAt)}
      </p>
    </motion.button>
  );
}

// ──────────────────────────────────────────────────────────
// Empty state
// ──────────────────────────────────────────────────────────
function EmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4"
      data-ocid="notes.empty_state"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <StickyNoteIcon className="w-10 h-10 text-primary/60" />
      </div>
      <h2 className="font-display font-bold text-xl text-foreground mb-2">
        Belum ada catatan
      </h2>
      <p className="text-sm text-muted-foreground text-center max-w-xs mb-6">
        Mulai dokumentasikan kegiatan harianmu. Buat catatan pertamamu sekarang!
      </p>
      <Button
        onClick={onCreateNote}
        className="flex items-center gap-2"
        data-ocid="notes.empty_create_button"
      >
        <PlusIcon className="w-4 h-4" />
        Buat Catatan Pertama
      </Button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────
// Empty search state
// ──────────────────────────────────────────────────────────
function EmptySearch() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-14 px-4"
      data-ocid="notes.search_empty_state"
    >
      <p className="text-muted-foreground text-sm">
        Tidak ada catatan yang sesuai dengan pencarian Anda.
      </p>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────
// Loading skeleton
// ──────────────────────────────────────────────────────────
function ListSkeleton() {
  return (
    <div className="space-y-6" data-ocid="notes.loading_state">
      {["a", "b"].map((g) => (
        <div key={g}>
          <Skeleton className="h-5 w-24 mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-lg" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────
const SORT_LABELS: Record<SortOrder, string> = {
  newest: "Terbaru",
  oldest: "Terlama",
  title: "Judul A-Z",
};

function sortNotes(notes: Note[], order: SortOrder): Note[] {
  return [...notes].sort((a, b) => {
    if (order === "newest") return Number(b.updatedAt - a.updatedAt);
    if (order === "oldest") return Number(a.updatedAt - b.updatedAt);
    return a.title.localeCompare(b.title, "id");
  });
}

export default function NotesListPage() {
  const router = useRouter();
  const { data: notes, isLoading } = useNotes();
  const createNote = useCreateNote();

  const [filteredNotes, setFilteredNotes] = useState<Note[] | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [sortCycle, setSortCycle] = useState(0);

  const handleFilter = useCallback(
    (filtered: Note[]) => {
      if (!notes) return;
      const isSameAsAll =
        filtered.length === notes.length &&
        filtered.every((n, i) => n.id === notes[i].id);
      const active = !isSameAsAll;
      setFilteredNotes(active ? filtered : null);
    },
    [notes],
  );

  const cycleSortOrder = () => {
    const orders: SortOrder[] = ["newest", "oldest", "title"];
    const next = orders[(sortCycle + 1) % orders.length];
    setSortOrder(next);
    setSortCycle((c) => c + 1);
  };

  const handleCreateNote = async () => {
    const newNote = await createNote.mutateAsync({
      title: "",
      content: "",
    });
    if (newNote) {
      router.navigate({ to: "/notes/$id", params: { id: String(newNote.id) } });
    }
  };

  const handleNoteClick = (noteId: bigint) => {
    router.navigate({ to: "/notes/$id", params: { id: String(noteId) } });
  };

  const activeNotes = filteredNotes ?? notes ?? [];
  const sorted = sortNotes(activeNotes, sortOrder);
  const grouped = groupNotesByDate(sorted);

  return (
    <Layout onCreateNote={handleCreateNote}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Page heading */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-heading-lg" data-ocid="notes.page">
              Catatan Harian
            </h1>
            {notes && notes.length > 0 && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {notes.length} catatan
              </p>
            )}
          </div>
        </div>

        {/* Search + Sort bar */}
        <div className="flex gap-2 mb-6">
          <NotesSearch
            notes={notes ?? []}
            onFilter={(filtered) => {
              handleFilter(filtered);
            }}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={cycleSortOrder}
            className="flex items-center gap-1.5 shrink-0 text-xs h-10 px-3"
            aria-label="Urutkan catatan"
            data-ocid="notes.sort_toggle"
          >
            <ArrowUpDownIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{SORT_LABELS[sortOrder]}</span>
          </Button>
        </div>

        {/* Content */}
        {isLoading ? (
          <ListSkeleton />
        ) : !notes || notes.length === 0 ? (
          <EmptyState onCreateNote={handleCreateNote} />
        ) : filteredNotes !== null && sorted.length === 0 ? (
          <EmptySearch />
        ) : (
          <div className="space-y-8">
            {grouped.map(({ group, notes: groupNotes }, gi) => (
              <section key={group} data-ocid={`notes.group.${gi + 1}`}>
                <motion.h2
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: gi * 0.05 }}
                  className="text-sm font-display font-bold text-foreground/70 uppercase tracking-widest mb-3 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  {group}
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groupNotes.map((note, ni) => (
                    <NoteCard
                      key={note.id.toString()}
                      note={note}
                      index={ni}
                      onClick={() => handleNoteClick(note.id)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
