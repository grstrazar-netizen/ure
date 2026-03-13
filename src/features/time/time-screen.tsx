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
      <Card className="bg-ink p-4 text-white">
        <p className="text-xs text-stone-300">Time tracker</p>
        <h2 className="mt-1 text-2xl font-semibold">Today, Wednesday</h2>
        <p className="mt-2 text-sm text-stone-300">Voice-first logging for one-hand use.</p>
        <div className="mt-4 flex gap-2">
          <Button variant="soft" size="sm" className="bg-white text-ink"><Play className="mr-1 h-4 w-4" />Start</Button>
          <Button variant="soft" size="sm" className="bg-white text-ink"><Square className="mr-1 h-4 w-4" />Stop</Button>
          <Button variant="accent" size="sm"><Mic className="mr-1 h-4 w-4" />Voice</Button>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-semibold">Daily log</h3>
        <ul className="mt-2 space-y-2">
          {entries.map((entry) => (
            <li key={`${entry.client}-${entry.task}`} className="rounded-2xl border border-stone-200 bg-white p-3 text-sm">
              <p className="font-medium">{entry.client} · {entry.task}</p>
              <p className="text-xs text-muted">{entry.duration} · {entry.amount}</p>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
