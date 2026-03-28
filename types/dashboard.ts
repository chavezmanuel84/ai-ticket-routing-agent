export type DashboardSectionId = "review" | "betel-sprint" | "prodg-todo";

export type DashboardTicket = {
  id: string;
  title?: string;
  status?: string;
};

export type DashboardSection = {
  id: DashboardSectionId;
  title: string;
  tickets: DashboardTicket[];
};
