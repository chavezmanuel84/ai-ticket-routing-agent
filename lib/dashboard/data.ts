import type { DashboardSection } from "@/types/dashboard";

const dashboardSectionsSeed: DashboardSection[] = [
  {
    id: "betel-sprint",
    title: "Betel Sprint",
    tickets: [
      { id: "betel-1", title: "Prioritize sprint blockers", status: "Open" },
      { id: "betel-2", title: "Align ownership and ETA", status: "Open" },
    ],
  },
  {
    id: "review",
    title: "Review",
    tickets: [
      { id: "review-1", title: "Validate L3 triage notes", status: "Pending" },
      { id: "review-2", title: "Confirm reproducibility details", status: "In Review" },
    ],
  },
  {
    id: "prodg-todo",
    title: "PRODG ToDo",
    tickets: [{ id: "prodg-1", title: "Prepare backlog sync", status: "Todo" }],
  },
];

export function getDashboardSectionsMock(): DashboardSection[] {
  return dashboardSectionsSeed.map((section) => ({
    ...section,
    tickets: section.tickets.map((ticket) => ({ ...ticket })),
  }));
}
