import { Card } from "@/components/ui/card";

export function TasksScreen() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold">Tasks</h2>
      <p className="mt-1 text-sm text-muted">Quick add, urgency/importance matrix, frog task highlight.</p>
    </Card>
  );
}
