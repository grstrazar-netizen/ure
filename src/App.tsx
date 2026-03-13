import { useMemo, useState } from "react";
import { DashboardScreen } from "@/features/dashboard/dashboard-screen";
import { TimeScreen } from "@/features/time/time-screen";
import { InvoiceScreen } from "@/features/invoices/invoice-screen";
import { ProposalScreen } from "@/features/proposals/proposal-screen";
import { TasksScreen } from "@/features/tasks/tasks-screen";
import { ReportsScreen } from "@/features/reports/reports-screen";
import { SettingsScreen } from "@/features/settings/settings-screen";
import { MobileNav, type NavItem } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";

type Section = "Dashboard" | "Tasks" | "Time" | "Invoices" | "Proposals" | "Reports" | "Settings";

const sections: Section[] = ["Dashboard", "Tasks", "Time", "Invoices", "Proposals", "Reports", "Settings"];

function renderSection(section: Section) {
  switch (section) {
    case "Dashboard":
      return <DashboardScreen />;
    case "Tasks":
      return <TasksScreen />;
    case "Time":
      return <TimeScreen />;
    case "Invoices":
      return <InvoiceScreen />;
    case "Proposals":
      return <ProposalScreen />;
    case "Reports":
      return <ReportsScreen />;
    case "Settings":
      return <SettingsScreen />;
    default:
      return null;
  }
}

export default function App() {
  const [section, setSection] = useState<Section>("Dashboard");
  const heading = useMemo(() => `${section}`, [section]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-[#efeff2] px-3 pb-28 pt-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      <header className="mb-3">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Flowtime</p>
        <h1 className="text-xl font-semibold text-stone-900">{heading}</h1>
      </header>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {sections.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={item === section ? "default" : "soft"}
            className="shrink-0"
            onClick={() => setSection(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {renderSection(section)}
      <MobileNav active={(section === "Reports" || section === "Settings" ? "Dashboard" : section) as NavItem} onChange={(item) => setSection(item)} />
    </div>
  );
}
