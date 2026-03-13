import { CheckSquare, FileText, LayoutGrid, Receipt, Timer } from "lucide-react";

export type NavItem = "Dashboard" | "Tasks" | "Time" | "Invoices" | "Proposals";

const items: { label: NavItem; icon: typeof LayoutGrid }[] = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Tasks", icon: CheckSquare },
  { label: "Time", icon: Timer },
  { label: "Invoices", icon: Receipt },
  { label: "Proposals", icon: FileText },
];

interface MobileNavProps {
  active: NavItem;
  onChange: (item: NavItem) => void;
}

export function MobileNav({ active, onChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-4 left-1/2 z-20 w-[min(95vw,430px)] -translate-x-1/2 rounded-[28px] border border-stone-300 bg-stone-900/95 p-2 text-white shadow-lg backdrop-blur">
      <ul className="grid grid-cols-5 gap-1 text-[11px]">
        {items.map(({ label, icon: Icon }) => {
          const isActive = active === label;
          return (
            <li key={label} className="text-center">
              <button
                onClick={() => onChange(label)}
                className={`w-full rounded-2xl px-1 py-1.5 transition ${
                  isActive ? "bg-white text-stone-900" : "text-stone-300 hover:text-white"
                }`}
              >
                <Icon className="mx-auto mb-1 h-4 w-4" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
