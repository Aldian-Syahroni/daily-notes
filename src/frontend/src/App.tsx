import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ──────────────────────────────────────────────────────────
// Lazy pages
// ──────────────────────────────────────────────────────────
const NotesListPage = lazy(() => import("@/pages/NotesListPage"));
const NoteDetailPage = lazy(() => import("@/pages/NoteDetailPage"));

// ──────────────────────────────────────────────────────────
// Loading fallback
// ──────────────────────────────────────────────────────────
function PageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
          <Skeleton key={k} className="h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────
// Routes
// ──────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: NotesListPage,
});

const noteDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notes/$id",
  component: NoteDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, noteDetailRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ──────────────────────────────────────────────────────────
// App
// ──────────────────────────────────────────────────────────
export default function App() {
  return <RouterProvider router={router} />;
}
