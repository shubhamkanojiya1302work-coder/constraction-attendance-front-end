import { QrCode } from "lucide-react";

// Site code badge plus a button to scan the supervisor's QR code.
export default function SiteCodeCard({ code, onScan }) {
  return (
    <section className="rounded-2xl bg-white p-5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <QrCode className="h-5 w-5 text-[#965000]" /> Site Code &amp; QR Scan
        </h3>
        <span className="rounded-md bg-orange-50 px-2 py-0.5 font-mono text-xs font-semibold text-[#965000]">
          {code}
        </span>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Gate scanner active. You can also scan supervisor badge or QR code on
        kiosk.
      </p>
      <button
        onClick={onScan}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-100 py-3 text-sm text-slate-900 hover:bg-indigo-200"
      >
        <QrCode className="h-4 w-4 text-[#965000]" /> Scan Supervisor QR Code
      </button>
    </section>
  );
}
