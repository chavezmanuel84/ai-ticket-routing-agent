import { render, screen, within } from "@testing-library/react";

import { DashboardShell } from "@/app/components/dashboard-shell";
import type { DashboardSection } from "@/types/dashboard";

describe("DashboardShell", () => {
  it("renders project title, refresh button and the three sections", () => {
    const sections: DashboardSection[] = [
      { id: "review", title: "Review", tickets: [{ id: "r-1", title: "Check SLA" }] },
      {
        id: "betel-sprint",
        title: "Betel Sprint",
        tickets: [{ id: "b-1", title: "Triaging pending tickets" }],
      },
      {
        id: "prodg-todo",
        title: "PRODG ToDo",
        tickets: [{ id: "p-1", title: "Create backlog clean-up" }],
      },
    ];

    render(<DashboardShell sections={sections} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "L3 Support Monitor" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refresh" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Review" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Betel Sprint" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PRODG ToDo" })).toBeInTheDocument();
  });

  it("renders empty state when a section has no tickets", () => {
    const sections: DashboardSection[] = [
      { id: "review", title: "Review", tickets: [] },
      { id: "betel-sprint", title: "Betel Sprint", tickets: [] },
      { id: "prodg-todo", title: "PRODG ToDo", tickets: [] },
    ];

    render(<DashboardShell sections={sections} />);

    const reviewSection = screen.getByRole("region", { name: "Review" });
    expect(within(reviewSection).getByText("Sin tickets")).toBeInTheDocument();
  });

  it("renders safe fallbacks for incomplete ticket entries", () => {
    const sections: DashboardSection[] = [
      { id: "review", title: "Review", tickets: [{ id: "r-1" }] },
      { id: "betel-sprint", title: "Betel Sprint", tickets: [] },
      { id: "prodg-todo", title: "PRODG ToDo", tickets: [] },
    ];

    render(<DashboardShell sections={sections} />);

    expect(screen.getByText("Untitled ticket")).toBeInTheDocument();
    expect(screen.getByText("No status")).toBeInTheDocument();
  });
});
