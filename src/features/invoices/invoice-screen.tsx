import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function InvoiceScreen() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold">Invoice manager (MVP)</h2>
      <p className="mt-1 text-sm text-muted">Draft from tracked hours, track paid/unpaid, add extra costs.</p>
      <div className="mt-4 flex gap-2">
        <Button size="sm">Create invoice</Button>
        <Button variant="soft" size="sm">View unpaid</Button>
      </div>
    </Card>
  );
}
