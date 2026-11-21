import { BadgeCheck, Stamp } from "lucide-react";

// Supervisor sign-off with the digital signature token.
export default function ApprovalCard({ approval }) {
  return (
    <section className="flex gap-3 rounded-2xl bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-emerald-900">
        <Stamp className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1 text-sm">
          Approved by {approval.by}{" "}
          <BadgeCheck className="h-3.5 w-3.5 text-emerald-700" />
        </p>
        <p className="text-xs text-slate-600">
          {approval.role} • Signed at {approval.signedAt}
        </p>
        <p className="mt-1 inline-block rounded bg-indigo-50 px-2 py-0.5 text-[11px] text-slate-700">
          Digital Signature Token:{" "}
          <code className="font-mono font-semibold">{approval.token}</code>
        </p>
      </div>
    </section>
  );
}
