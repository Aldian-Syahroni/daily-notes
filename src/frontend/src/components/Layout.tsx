import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { BookOpenIcon, PlusIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  onCreateNote?: () => void;
}

export function Layout({ children, onCreateNote }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <BookOpenIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
              Catatan Harian
            </span>
          </Link>

          {onCreateNote && (
            <Button
              onClick={onCreateNote}
              className="btn-primary flex items-center gap-2"
              data-ocid="layout.create_note_button"
            >
              <PlusIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Catatan Baru</span>
              <span className="sm:hidden">Baru</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear}.{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              Dibuat dengan ❤ menggunakan caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
