import type { DashboardSection } from "@/types/dashboard";
import { SectionColumn } from "@/app/components/section-column";

type DashboardShellProps = {
  sections: DashboardSection[];
};

export function DashboardShell({ sections }: DashboardShellProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-6 md:p-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">L3 Support Monitor</h1>
        <button
          type="button"
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800"
        >
          Refresh
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <SectionColumn key={section.id} section={section} />
        ))}
      </section>
    </main>
  );
}
