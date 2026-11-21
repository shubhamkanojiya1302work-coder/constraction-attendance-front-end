import { Headset } from "lucide-react";

// "Need help?" link that dials the supervisor on phones.
export default function HelpCallLink({ name, phone }) {
  return (
    <a
      href={`tel:${phone}`}
      className="flex items-center justify-center gap-2 py-2 text-sm text-slate-800 hover:text-[#965000]"
    >
      <Headset className="h-4 w-4 text-[#965000]" /> Need help? Tap to call{" "}
      {name}
    </a>
  );
}
