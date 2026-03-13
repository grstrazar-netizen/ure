import { LayoutGrid, CheckSquare, Timer, FileText, Receipt } from "lucide-react";

const items = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Tasks", icon: CheckSquare },
  { label: "Time", icon: Timer, active: true },
  { label: "Invoices", icon: Receipt },
  { label: "Proposals", icon: FileText },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-20 w-[min(95vw,430px)] -translate-x-1/2 rounded-full border border-stone-300 bg-panel/95 p-2 backdrop-blur">
      <ul className="grid grid-cols-5 gap-1 text-[11px]">
        {items.map(({ label, icon: Icon, active }) => (
          <li key={label} className="text-center">
            <button className={`w-full rounded-full px-1 py-1.5 ${active ? "bg-ink text-white" : "text-muted"}`}>
              <Icon className="mx-auto mb-1 h-4 w-4" />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
