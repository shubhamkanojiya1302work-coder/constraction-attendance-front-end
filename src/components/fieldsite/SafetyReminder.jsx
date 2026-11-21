import { ShieldPlus } from "lucide-react";

// PPE reminder shown before clocking in.
export default function SafetyReminder() {
  return (
    <section className="flex gap-3 rounded-2xl bg-indigo-50 p-4">
      <ShieldPlus className="mt-0.5 h-5 w-5 shrink-0 text-[#965000]" />
      <div>
        <p className="font-medium">Safety First Reminder</p>
        <p className="text-sm text-slate-600">
          Remember your helmet, high-vis vest, and steel-toe boots before
          clocking in on site.
        </p>
      </div>
    </section>
  );
}
