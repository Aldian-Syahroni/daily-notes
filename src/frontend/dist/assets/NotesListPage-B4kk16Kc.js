import { j as jsxRuntimeExports, c as cn, r as reactExports, u as useRouter, S as Skeleton } from "./index-DqP1-Ozk.js";
import { c as createLucideIcon, B as Button, u as useNotes, a as useCreateNote, g as groupNotesByDate, L as Layout, m as motion, P as Plus, f as formatRelativeTime } from "./proxy-CE_EdgfE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
];
const ArrowUpDown = createLucideIcon("arrow-up-down", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }],
  ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]
];
const StickyNote = createLucideIcon("sticky-note", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
function NotesSearch({ notes, onFilter, className }) {
  const [query, setQuery] = reactExports.useState("");
  const handleChange = reactExports.useCallback(
    (value) => {
      setQuery(value);
      if (!value.trim()) {
        onFilter(notes);
        return;
      }
      const lower = value.toLowerCase();
      const filtered = notes.filter(
        (n) => n.title.toLowerCase().includes(lower) || n.content.toLowerCase().includes(lower)
      );
      onFilter(filtered);
    },
    [notes, onFilter]
  );
  const handleClear = () => {
    setQuery("");
    onFilter(notes);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex items-center ${className ?? ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        type: "search",
        placeholder: "Cari catatan...",
        value: query,
        onChange: (e) => handleChange(e.target.value),
        className: "pl-9 pr-9 bg-card border-border focus-visible:ring-ring",
        "data-ocid": "notes.search_input",
        "aria-label": "Cari catatan"
      }
    ),
    query && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "absolute right-1 w-7 h-7 text-muted-foreground hover:text-foreground",
        onClick: handleClear,
        "aria-label": "Hapus pencarian",
        "data-ocid": "notes.search_clear_button",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
      }
    )
  ] });
}
const CARD_ACCENTS = [
  "border-l-primary",
  "border-l-accent",
  "border-l-secondary"
];
function NoteCard({ note, index, onClick }) {
  const accentClass = CARD_ACCENTS[index % CARD_ACCENTS.length];
  const preview = note.content.slice(0, 100);
  const hasMore = note.content.length > 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.25, delay: index * 0.04 },
      whileHover: { scale: 1.015, y: -2 },
      onClick,
      className: `group w-full text-left rounded-lg bg-card border border-border border-l-4 ${accentClass} p-4 shadow-xs hover:shadow-md transition-smooth cursor-pointer`,
      "data-ocid": `notes.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight line-clamp-2 mb-1.5 group-hover:text-primary transition-colors duration-200", children: note.title || "Catatan tanpa judul" }),
        note.content && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground line-clamp-3 leading-relaxed", children: [
          preview,
          hasMore && "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-xs text-muted-foreground/70 font-mono", children: formatRelativeTime(note.updatedAt) })
      ]
    }
  );
}
function EmptyState({ onCreateNote }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-20 px-4",
      "data-ocid": "notes.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StickyNote, { className: "w-10 h-10 text-primary/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Belum ada catatan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-xs mb-6", children: "Mulai dokumentasikan kegiatan harianmu. Buat catatan pertamamu sekarang!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: onCreateNote,
            className: "flex items-center gap-2",
            "data-ocid": "notes.empty_create_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "Buat Catatan Pertama"
            ]
          }
        )
      ]
    }
  );
}
function EmptySearch() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "flex flex-col items-center justify-center py-14 px-4",
      "data-ocid": "notes.search_empty_state",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Tidak ada catatan yang sesuai dengan pencarian Anda." })
    }
  );
}
function ListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", "data-ocid": "notes.loading_state", children: ["a", "b"].map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-lg" }, i)) })
  ] }, g)) });
}
const SORT_LABELS = {
  newest: "Terbaru",
  oldest: "Terlama",
  title: "Judul A-Z"
};
function sortNotes(notes, order) {
  return [...notes].sort((a, b) => {
    if (order === "newest") return Number(b.updatedAt - a.updatedAt);
    if (order === "oldest") return Number(a.updatedAt - b.updatedAt);
    return a.title.localeCompare(b.title, "id");
  });
}
function NotesListPage() {
  const router = useRouter();
  const { data: notes, isLoading } = useNotes();
  const createNote = useCreateNote();
  const [filteredNotes, setFilteredNotes] = reactExports.useState(null);
  const [sortOrder, setSortOrder] = reactExports.useState("newest");
  const [sortCycle, setSortCycle] = reactExports.useState(0);
  const handleFilter = reactExports.useCallback(
    (filtered) => {
      if (!notes) return;
      const isSameAsAll = filtered.length === notes.length && filtered.every((n, i) => n.id === notes[i].id);
      const active = !isSameAsAll;
      setFilteredNotes(active ? filtered : null);
    },
    [notes]
  );
  const cycleSortOrder = () => {
    const orders = ["newest", "oldest", "title"];
    const next = orders[(sortCycle + 1) % orders.length];
    setSortOrder(next);
    setSortCycle((c) => c + 1);
  };
  const handleCreateNote = async () => {
    const newNote = await createNote.mutateAsync({
      title: "",
      content: ""
    });
    if (newNote) {
      router.navigate({ to: "/notes/$id", params: { id: String(newNote.id) } });
    }
  };
  const handleNoteClick = (noteId) => {
    router.navigate({ to: "/notes/$id", params: { id: String(noteId) } });
  };
  const activeNotes = filteredNotes ?? notes ?? [];
  const sorted = sortNotes(activeNotes, sortOrder);
  const grouped = groupNotesByDate(sorted);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { onCreateNote: handleCreateNote, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-heading-lg", "data-ocid": "notes.page", children: "Catatan Harian" }),
      notes && notes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
        notes.length,
        " catatan"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotesSearch,
        {
          notes: notes ?? [],
          onFilter: (filtered) => {
            handleFilter(filtered);
          },
          className: "flex-1"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: cycleSortOrder,
          className: "flex items-center gap-1.5 shrink-0 text-xs h-10 px-3",
          "aria-label": "Urutkan catatan",
          "data-ocid": "notes.sort_toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: SORT_LABELS[sortOrder] })
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, {}) : !notes || notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { onCreateNote: handleCreateNote }) : filteredNotes !== null && sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptySearch, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: grouped.map(({ group, notes: groupNotes }, gi) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": `notes.group.${gi + 1}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.h2,
        {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.3, delay: gi * 0.05 },
          className: "text-sm font-display font-bold text-foreground/70 uppercase tracking-widest mb-3 flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary inline-block" }),
            group
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: groupNotes.map((note, ni) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        NoteCard,
        {
          note,
          index: ni,
          onClick: () => handleNoteClick(note.id)
        },
        note.id.toString()
      )) })
    ] }, group)) })
  ] }) });
}
export {
  NotesListPage as default
};
