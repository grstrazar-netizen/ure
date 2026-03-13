import { Mic, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const entries = [
  { client: "Acme", task: "UX audit", duration: "1h 20m", amount: "€160" },
  { client: "Nova", task: "Translation", duration: "45m", amount: "€50" },
  { client: "Internal", task: "Admin", duration: "30m", amount: "€0" },
];

export function TimeScreen() {
  return (
    <section className="space-y-4">
      <Card className="rounded-[30px] bg-[#ececf0] p-4">
        <p className="text-xs uppercase tracking-wide text-stone-500">Timer</p>
        <h2 className="mt-1 text-3xl font-medium text-stone-900">00:32:18</h2>
        <p className="mt-1 text-sm text-stone-600">Acme · Design sprint · Billable</p>
        <div className="mt-4 flex gap-2">
          <Button variant="default" size="sm"><Play className="mr-1 h-4 w-4" />Start</Button>
          <Button variant="soft" size="sm"><Square className="mr-1 h-4 w-4" />Stop</Button>
          <Button variant="accent" size="sm"><Mic className="mr-1 h-4 w-4" />Voice log</Button>
        </div>
      </Card>

      <Card className="rounded-[30px] bg-[#f5f5f8] p-3">
        <h3 className="px-1 text-sm font-semibold text-stone-700">Today entries</h3>
        <ul className="mt-2 space-y-2">
          {entries.map((entry) => (
            <li key={`${entry.client}-${entry.task}`} className="rounded-2xl bg-[#e7e7eb] p-3 text-sm">
              <p className="font-medium text-stone-900">{entry.client} · {entry.task}</p>
              <p className="text-xs text-stone-500">{entry.duration} · {entry.amount}</p>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
