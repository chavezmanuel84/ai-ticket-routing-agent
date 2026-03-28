import type { DashboardTicket } from "@/types/dashboard";

type TicketItemProps = {
  ticket: DashboardTicket;
};

export function TicketItem({ ticket }: TicketItemProps) {
  return (
    <li className="rounded-md border border-gray-200 bg-white p-3">
      <p className="text-sm font-medium text-gray-900">{ticket.title ?? "Untitled ticket"}</p>
      <p className="mt-1 text-xs text-gray-600">{ticket.status ?? "No status"}</p>
    </li>
  );
}
