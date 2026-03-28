import type { DashboardSection } from "@/types/dashboard";
import { TicketItem } from "@/app/components/ticket-item";

type SectionColumnProps = {
  section: DashboardSection;
};

export function SectionColumn({ section }: SectionColumnProps) {
  return (
    <section
      aria-label={section.title}
      className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
      {section.tickets.length === 0 ? (
        <p className="mt-3 text-sm text-gray-600">Sin tickets</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {section.tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))}
        </ul>
      )}
    </section>
  );
}
