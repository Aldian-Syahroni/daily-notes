import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Note } from "@/types/note";
import { SearchIcon, XIcon } from "lucide-react";
import { useCallback, useState } from "react";

interface NotesSearchProps {
  notes: Note[];
  onFilter: (filtered: Note[]) => void;
  className?: string;
}

export function NotesSearch({ notes, onFilter, className }: NotesSearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (!value.trim()) {
        onFilter(notes);
        return;
      }
      const lower = value.toLowerCase();
      const filtered = notes.filter(
        (n) =>
          n.title.toLowerCase().includes(lower) ||
          n.content.toLowerCase().includes(lower),
      );
      onFilter(filtered);
    },
    [notes, onFilter],
  );

  const handleClear = () => {
    setQuery("");
    onFilter(notes);
  };

  return (
    <div className={`relative flex items-center ${className ?? ""}`}>
      <SearchIcon className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder="Cari catatan..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className="pl-9 pr-9 bg-card border-border focus-visible:ring-ring"
        data-ocid="notes.search_input"
        aria-label="Cari catatan"
      />
      {query && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 w-7 h-7 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
          aria-label="Hapus pencarian"
          data-ocid="notes.search_clear_button"
        >
          <XIcon className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
  );
}
