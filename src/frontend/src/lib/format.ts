import type { Note } from "@/types/note";
import {
  format,
  formatDistanceToNow,
  isThisWeek,
  isToday,
  isYesterday,
  parseISO,
} from "date-fns";
import { id as localeId } from "date-fns/locale";

export function formatRelativeTime(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  const date = new Date(ms);

  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true, locale: localeId });
  }
  if (isYesterday(date)) {
    return `Kemarin ${format(date, "HH:mm")}`;
  }
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, "EEEE HH:mm", { locale: localeId });
  }
  return format(date, "d MMM yyyy", { locale: localeId });
}

export function formatFullDate(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  return format(new Date(ms), "d MMMM yyyy, HH:mm", { locale: localeId });
}

export type DateGroup = "Hari Ini" | "Kemarin" | "Minggu Ini" | "Lebih Lama";

export function getDateGroup(timestamp: bigint | number): DateGroup {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  const date = new Date(ms);

  if (isToday(date)) return "Hari Ini";
  if (isYesterday(date)) return "Kemarin";
  if (isThisWeek(date, { weekStartsOn: 1 })) return "Minggu Ini";
  return "Lebih Lama";
}

const GROUP_ORDER: DateGroup[] = [
  "Hari Ini",
  "Kemarin",
  "Minggu Ini",
  "Lebih Lama",
];

export function groupNotesByDate(notes: Note[]): {
  group: DateGroup;
  notes: Note[];
}[] {
  const map = new Map<DateGroup, Note[]>();

  for (const note of notes) {
    const group = getDateGroup(note.updatedAt);
    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push(note);
  }

  return GROUP_ORDER.filter((g) => map.has(g)).map((group) => ({
    group,
    notes: map.get(group)!,
  }));
}
