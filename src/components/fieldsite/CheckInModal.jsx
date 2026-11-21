import { useEffect, useMemo, useRef, useState } from "react";
import {
  Binary,
  Camera,
  CircleAlert,
  CircleCheck,
  Clock,
  Lock,
  Navigation,
  QrCode,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Modal from "../ui/Modal";
import AccessCodeInput from "./AccessCodeInput";

// "Site Check-In" dialog opened by the Start Check-In button.
// The worker enters the 4-digit gate code and takes a selfie, then confirms.
// The selfie input opens the front camera on phones (`capture="user"`) and a
// file picker on desktop.
//
// Props:
//   worker, site ({ accessCode, siteFullName, gpsZone, faceMatch })
//   photo     File from the camera, or null before the selfie is taken
//   time      check-in time shown in the "Shift Time" tile
//   onPhoto(file), onScanQr(), onCancel(), onConfirm()
export default function CheckInModal({
  open,
  worker,
  site,
  photo,
  time,
  onPhoto,
  onScanQr,
  onCancel,
  onConfirm,
}) {
  // Mount this only while it's open (`{open && <CheckInModal open … />}`),
  // so the code boxes start empty each time.
  const [code, setCode] = useState("");
  const cameraRef = useRef(null);

  const photoUrl = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo],
  );
  useEffect(() => () => photoUrl && URL.revokeObjectURL(photoUrl), [photoUrl]);

  const complete = code.length === site.accessCode.length;
  // TODO: verify the code with the backend instead of comparing locally.
  const verified = complete && code === site.accessCode;
  const canConfirm = verified && photo;

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (file) onPhoto(file);
    event.target.value = "";
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      icon={ShieldCheck}
      title="Site Check-In"
      description="Verify your site access code to confirm attendance"
    >
      <div className="space-y-4">
        {/* Worker */}
        <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 p-4">
          <WorkerPhoto worker={worker} />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-medium">{worker.name}</p>
            <p className="text-slate-600">
              {worker.trade} • {worker.badgeId}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-1 text-sm text-emerald-900">
            <span className="h-2 w-2 rounded-full bg-emerald-800" /> Ready
          </span>
        </div>

        {/* Site access code */}
        <section className="rounded-2xl bg-indigo-50 p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-medium">Site Access Code</h3>
            <span className="flex items-center gap-1 text-sm text-[#965000]">
              <Binary className="h-4 w-4" /> Required
            </span>
          </div>
          <p className="mb-4 mt-1 text-slate-600">
            Ask your gate supervisor or read the {site.accessCode.length}-digit
            code on the site gate board.
          </p>

          <AccessCodeInput
            length={site.accessCode.length}
            value={code}
            onChange={setCode}
            invalid={complete && !verified}
            autoFocus
          />

          {complete && (
            <div
              role="status"
              className={`mt-4 flex items-center gap-3 rounded-xl px-4 py-3 ${
                verified
                  ? "bg-emerald-300 text-emerald-950"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {verified ? (
                <CircleCheck className="h-5 w-5 shrink-0" />
              ) : (
                <CircleAlert className="h-5 w-5 shrink-0" />
              )}
              <div className="min-w-0">
                <p className="font-medium">
                  {verified ? "Code Verified" : "Code doesn't match"}
                </p>
                <p className="truncate text-sm">
                  {verified
                    ? site.siteFullName
                    : "Check the code on the gate board and try again."}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={onScanQr}
            className="mx-auto mt-4 flex items-center gap-2 text-sm font-medium text-[#965000] underline underline-offset-2"
          >
            <QrCode className="h-4 w-4" /> Scan Site QR Code instead
          </button>
        </section>

        {/* GPS + time */}
        <div className="grid grid-cols-2 gap-3">
          <StatusTile
            icon={Navigation}
            iconClass="bg-emerald-300 text-emerald-900"
            title="GPS Confirmed"
            text={site.gpsZone}
          />
          <StatusTile
            icon={Clock}
            iconClass="bg-indigo-100 text-indigo-900"
            title="Shift Time"
            text={`Today, ${time}`}
          />
        </div>

        {/* Selfie */}
        <div className="flex items-center gap-4 rounded-2xl bg-indigo-50 p-4">
          <div className="relative h-20 w-20 shrink-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Your check-in selfie"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-amber-100 text-[#965000]">
                <Camera className="h-6 w-6" />
              </div>
            )}
            {photoUrl && (
              <span className="absolute -bottom-1 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-700 text-white">
                <CircleCheck className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            {photo ? (
              <>
                <p className="font-medium">Face &amp; Helmet Verified</p>
                {/* TODO: show the real match score from the backend. */}
                <p className="flex items-center gap-1.5 text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" /> Live
                  match {site.faceMatch}%
                </p>
              </>
            ) : (
              <>
                <p className="font-medium">Face &amp; Helmet Check</p>
                <p className="text-sm text-slate-600">
                  Take a selfie with your hard hat on.
                </p>
              </>
            )}
          </div>
          <button
            onClick={() => cameraRef.current?.click()}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              photo
                ? "bg-indigo-100 text-slate-800 hover:bg-indigo-200"
                : "bg-[#965000] text-white hover:bg-[#794000]"
            }`}
          >
            <Camera className="h-4 w-4" /> {photo ? "Retake" : "Take Selfie"}
          </button>
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handlePhoto}
            className="hidden"
          />
        </div>

        {/* Actions */}
        <button
          onClick={onConfirm}
          disabled={!canConfirm}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#965000] py-4 text-lg font-medium text-white hover:bg-[#794000] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <UserCheck className="h-5 w-5" /> Confirm &amp; Complete Check-In
        </button>
        <button
          onClick={onCancel}
          className="w-full rounded-xl bg-indigo-100 py-3.5 text-lg text-slate-900 hover:bg-indigo-200"
        >
          Cancel
        </button>

        <p className="flex items-center justify-center gap-3 px-2 text-center text-slate-600">
          <Lock className="h-4 w-4 shrink-0" />
          Check-in is timestamped and recorded for daily wage roster
        </p>
      </div>
    </Modal>
  );
}

function WorkerPhoto({ worker }) {
  const initials = worker.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return worker.photo ? (
    <img
      src={worker.photo}
      alt=""
      className="h-16 w-16 shrink-0 rounded-full object-cover"
    />
  ) : (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-100 font-semibold text-[#965000]">
      {initials}
    </span>
  );
}

function StatusTile({ icon: Icon, iconClass, title, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-indigo-50 p-4">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconClass}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-slate-600">{text}</p>
      </div>
    </div>
  );
}
