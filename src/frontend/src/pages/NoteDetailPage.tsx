import { Layout } from "@/components/Layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteNote, useNote, useUpdateNote } from "@/hooks/use-notes";
import { formatFullDate, formatRelativeTime } from "@/lib/format";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ClockIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ──────────────────────────────────────────────────────────
// Loading skeleton
// ──────────────────────────────────────────────────────────
function DetailSkeleton() {
  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4"
      data-ocid="note_detail.loading_state"
    >
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-10 w-3/4 mt-6" />
      <Skeleton className="h-4 w-40 mt-2" />
      <div className="mt-6 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Not found state
// ──────────────────────────────────────────────────────────
function NotFoundState({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center"
      data-ocid="note_detail.error_state"
    >
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircleIcon className="w-8 h-8 text-destructive/60" />
      </div>
      <h2 className="font-display font-bold text-xl text-foreground mb-2">
        Catatan tidak ditemukan
      </h2>
      <p className="text-sm text-muted-foreground text-center max-w-xs mb-6">
        Catatan yang kamu cari mungkin sudah dihapus atau tidak tersedia.
      </p>
      <Button
        variant="outline"
        onClick={onBack}
        className="flex items-center gap-2"
        data-ocid="note_detail.back_button"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Kembali ke Daftar
      </Button>
    </motion.div>
  );
}

// ──────────────────────────────────────────────────────────
// Auto-save indicator
// ──────────────────────────────────────────────────────────
type SaveStatus = "idle" | "saving" | "saved" | "error";

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === "idle") return null;
  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`text-xs flex items-center gap-1 ${
        status === "saving"
          ? "text-muted-foreground"
          : status === "saved"
            ? "text-accent"
            : "text-destructive"
      }`}
      data-ocid={`note_detail.${status === "saving" ? "loading" : status}_state`}
    >
      {status === "saving" && (
        <span className="inline-block w-3 h-3 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
      )}
      {status === "saving" && "Menyimpan…"}
      {status === "saved" && (
        <>
          <SaveIcon className="w-3 h-3" />
          Tersimpan
        </>
      )}
      {status === "error" && "Gagal menyimpan"}
    </motion.span>
  );
}

// ──────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────
export default function NoteDetailPage() {
  const router = useRouter();
  const { id } = useParams({ from: "/notes/$id" });
  const noteId = BigInt(id);

  const { data: note, isLoading } = useNote(noteId);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  // Sync local state when note loads for the first time
  useEffect(() => {
    if (note && !initializedRef.current) {
      setTitle(note.title);
      setContent(note.content);
      initializedRef.current = true;
    }
  }, [note]);

  const triggerSave = useCallback(
    (newTitle: string, newContent: string) => {
      if (!note) return;
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(async () => {
        setSaveStatus("saving");
        try {
          await updateNote.mutateAsync({
            id: note.id,
            title: newTitle,
            content: newContent,
          });
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2000);
        } catch {
          setSaveStatus("error");
          setTimeout(() => setSaveStatus("idle"), 3000);
        }
      }, 800);
    },
    [note, updateNote],
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    triggerSave(value, content);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    triggerSave(title, value);
  };

  const handleDelete = async () => {
    if (!note) return;
    try {
      await deleteNote.mutateAsync(note.id);
      toast.success("Catatan berhasil dihapus");
      router.navigate({ to: "/" });
    } catch {
      toast.error("Gagal menghapus catatan");
    }
  };

  const handleBack = () => {
    router.navigate({ to: "/" });
  };

  if (isLoading)
    return (
      <Layout>
        <DetailSkeleton />
      </Layout>
    );

  if (!note) {
    return (
      <Layout>
        <NotFoundState onBack={handleBack} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
            data-ocid="note_detail.back_button"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Semua Catatan</span>
          </Button>

          <div className="flex items-center gap-3">
            <SaveIndicator status={saveStatus} />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center gap-1.5"
                  data-ocid="note_detail.delete_button"
                >
                  <Trash2Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">Hapus</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="note_detail.dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus catatan ini?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Catatan akan dihapus
                    secara permanen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="note_detail.cancel_button">
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    data-ocid="note_detail.confirm_button"
                  >
                    Ya, Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Note editor */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border border-border border-l-4 border-l-primary shadow-sm p-6 sm:p-8"
        >
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Judul catatan…"
            className="w-full bg-transparent font-display font-bold text-2xl sm:text-3xl text-foreground placeholder:text-muted-foreground/50 outline-none border-none resize-none leading-tight mb-3"
            data-ocid="note_detail.title_input"
            aria-label="Judul catatan"
          />

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ClockIcon className="w-3.5 h-3.5" />
              <span title={formatFullDate(note.updatedAt)}>
                Diperbarui {formatRelativeTime(note.updatedAt)}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              Dibuat {formatFullDate(note.createdAt)}
            </span>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Tulis catatanmu di sini…"
            rows={16}
            className="w-full bg-transparent font-body text-foreground placeholder:text-muted-foreground/50 outline-none border-none resize-none leading-relaxed text-sm sm:text-base"
            data-ocid="note_detail.content_textarea"
            aria-label="Isi catatan"
          />
        </motion.div>

        {/* Word count */}
        <div className="mt-3 text-right">
          <span className="text-xs text-muted-foreground">
            {content.trim()
              ? `${content.trim().split(/\s+/).length} kata · ${content.length} karakter`
              : "Mulai menulis…"}
          </span>
        </div>
      </div>
    </Layout>
  );
}
