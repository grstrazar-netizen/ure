import { AlertCircle, Banknote, Frog, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const matrix = [
  "Urgent + Important",
  "Important + Not Urgent",
  "Urgent + Not Important",
  "Not Urgent + Not Important",
];

export function DashboardScreen() {
  return (
    <section className="space-y-4">
      <Card className="p-4">
        <p className="text-xs uppercase tracking-wide text-muted">Today focus</p>
        <h2 className="mt-1 text-xl font-semibold">Eat the Frog: Send overdue proposal update</h2>
        <p className="mt-2 text-sm text-muted">Start with the hardest meaningful task first.</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold">Eisenhower matrix</h3>
        <ul className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {matrix.map((item) => (
            <li key={item} className="rounded-2xl border border-stone-200 bg-white p-3">
              {item}
            </li>
          ))}
        </ul>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <p className="flex items-center gap-1 text-xs text-muted"><AlertCircle className="h-3.5 w-3.5" /> Money waiting</p>
          <p className="mt-1 text-lg font-semibold">€2,140</p>
          <p className="text-xs text-muted">4 unpaid invoices</p>
        </Card>
        <Card className="p-3">
          <p className="flex items-center gap-1 text-xs text-muted"><Banknote className="h-3.5 w-3.5" /> Money received</p>
          <p className="mt-1 text-lg font-semibold">€5,820</p>
          <p className="text-xs text-muted">This month</p>
        </Card>
        <Card className="p-3">
          <p className="flex items-center gap-1 text-xs text-muted"><TrendingUp className="h-3.5 w-3.5" /> Proposal pipeline</p>
          <p className="mt-1 text-lg font-semibold">6 active</p>
          <p className="text-xs text-muted">2 need follow-up</p>
        </Card>
        <Card className="p-3">
          <p className="flex items-center gap-1 text-xs text-muted"><Frog className="h-3.5 w-3.5" /> Tax reserve SI</p>
          <p className="mt-1 text-lg font-semibold">22%</p>
          <p className="text-xs text-muted">Estimated reserve</p>
        </Card>
      </div>
    </section>
  );
}
