import { Card } from "@/components/ui/card";

export function ProposalScreen() {
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold">Proposal manager (MVP)</h2>
      <p className="mt-1 text-sm text-muted">Track sent, pending, accepted, rejected with follow-up reminders.</p>
    </Card>
  );
}
