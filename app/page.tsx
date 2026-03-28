import { DashboardShell } from "@/app/components/dashboard-shell";
import { getDashboardSectionsMock } from "@/lib/dashboard/data";

export default function Home() {
  const sections = getDashboardSectionsMock();

  return <DashboardShell sections={sections} />;
}
