import { render, screen } from "@testing-library/react";

import { DashboardShell } from "@/app/components/dashboard-shell";
import type { DashboardSection } from "@/types/dashboard";

describe("DashboardShell", () => {
  it("muestra el título, el botón Refresh y las tres secciones del dashboard", () => {
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
});
