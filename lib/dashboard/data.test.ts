import { getDashboardSectionsMock } from "@/lib/dashboard/data";

describe("getDashboardSectionsMock", () => {
  it("returns the three fixed dashboard sections", () => {
    const sections = getDashboardSectionsMock();

    expect(sections.map((section) => section.title)).toEqual([
      "Betel Sprint",
      "Review",
      "PRODG ToDo",
    ]);
  });

  it("returns mock sections as independent arrays", () => {
    const firstRead = getDashboardSectionsMock();
    const secondRead = getDashboardSectionsMock();

    firstRead[0]?.tickets.push({ id: "new", title: "Mutated item" });

    expect(secondRead[0]?.tickets).toHaveLength(2);
  });
});
