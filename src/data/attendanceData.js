// ---------------------------------------------------------------------------
// Mock data. In a real app this would come from an API (e.g. GET /workers/:id/week/:week).
// The UI only reads from these shapes, so swapping in live data is a drop-in change.
// ---------------------------------------------------------------------------

export const supervisor = { name: "Marcus Reyes", role: "Site Supervisor" };

export const worker = {
  name: "Ramesh Kumar",
  badgeId: "#LAB-1082",
  trade: "Master Mason",
  site: "Green Valley Tower",
  siteDetail: "Phase 2 • Sector B",
  mobileSite: "Green Valley Tower Phase 2 • Zone 4B",
  certification: "OSHA 30 Certified",
  photo: null, // put an image URL here; initials are shown when null
  online: true,
};

export const payPeriods = [
  { label: "Oct 14 – Oct 20, 2024", week: 42 },
  { label: "Oct 21 – Oct 27, 2024", week: 43 },
  { label: "Oct 28 – Nov 03, 2024", week: 44 },
];

export const weeklyStats = {
  totalHours: 38.5,
  goalHours: 40,
  regularHours: 36.0,
  baseRate: 32.4,
  overtimeHours: 2.5,
  overtimeApprover: "Marcus",
  punctuality: 100,
  shiftsInWindow: 5,
  shiftsTotal: 5,
  timesheetState: "Approved",
  approvedBy: "Marcus Vance",
  approvedAt: "Friday, Oct 25 • 17:45 PM",
};

// One entry per day of the pay week. `type: "rest"` rows render as a single
// italic line instead of punch columns.
export const weekShifts = [
  {
    id: "mon",
    label: "Mon, Oct 21",
    fullLabel: "Monday, Oct 21",
    task: "Masonry Framing",
    in: "07:55 AM",
    inGate: "Gate 2",
    lunch: "12:30 – 01:15 PM",
    lunchMins: 45,
    lunchStart: "12:30 PM",
    lunchEnd: "01:15 PM",
    out: "05:10 PM",
    outGate: "Gate 2",
    duration: "8h 30m",
    hours: 8.5,
    pin: "#4821",
    lat: "30.267",
    lon: "-97.743",
    radius: "+10m",
  },
  {
    id: "tue",
    label: "Tue, Oct 22",
    fullLabel: "Tuesday, Oct 22",
    task: "Retaining Wall Pour",
    in: "07:52 AM",
    inGate: "Gate 2",
    lunch: "12:30 – 01:15 PM",
    lunchMins: 45,
    lunchStart: "12:30 PM",
    lunchEnd: "01:15 PM",
    out: "05:05 PM",
    outGate: "Gate 2",
    duration: "8h 28m",
    hours: 8.4,
    pin: "#4821",
    lat: "30.267",
    lon: "-97.743",
    radius: "+9m",
  },
  {
    id: "wed",
    label: "Wed, Oct 23",
    fullLabel: "Wednesday, Oct 23",
    task: "Rebar & Blockwork",
    in: "07:59 AM",
    inGate: "Gate 1",
    lunch: "12:35 – 01:20 PM",
    lunchMins: 45,
    lunchStart: "12:35 PM",
    lunchEnd: "01:20 PM",
    out: "05:02 PM",
    outGate: "Gate 1",
    duration: "8h 18m",
    hours: 8.3,
    pin: "#4821",
    lat: "30.268",
    lon: "-97.742",
    radius: "+14m",
  },
  {
    id: "thu",
    label: "Thu, Oct 24",
    fullLabel: "Thursday, Oct 24",
    task: "Scaffold Brick Laying",
    in: "07:58 AM",
    inGate: "Gate 2",
    lunch: "12:30 – 01:15 PM",
    lunchMins: 45,
    lunchStart: "12:30 PM",
    lunchEnd: "01:15 PM",
    out: "05:08 PM",
    outGate: "Gate 2",
    duration: "8h 25m",
    hours: 8.4,
    pin: "#4821",
    lat: "30.267",
    lon: "-97.743",
    radius: "+12m",
  },
  {
    id: "fri",
    label: "Fri, Oct 25",
    fullLabel: "Friday, Oct 25",
    task: "+2.5h Approved Overtime",
    taskIsOvertime: true,
    in: "07:45 AM",
    inGate: "Gate 2",
    lunch: "12:30 – 01:15 PM",
    lunchMins: 45,
    lunchStart: "12:30 PM",
    lunchEnd: "01:15 PM",
    out: "06:32 PM",
    outGate: "Gate 2",
    duration: "10h 02m",
    hours: 10.0,
    overtime: true,
    pin: "#4821",
    lat: "30.267",
    lon: "-97.744",
    radius: "+11m",
  },
  {
    id: "sat",
    label: "Sat, Oct 26",
    type: "rest",
    note: "Scheduled Rest Day • Jobsite Closed for Weekend Maintenance",
  },
  { id: "sun", label: "Sun, Oct 27", type: "rest", note: "Scheduled Rest Day" },
];

// ---- FieldSite Check-In tab ------------------------------------------------

export const checkIn = {
  gate: "Green Valley Tower • Gate 2",
  geofenceMessage:
    "Ready for your shift — Tap below to record your attendance for today.",
  shiftTiming: "8:00 AM – 5:00 PM",
  shiftNote: "(9 hrs standard)",
  siteCode: "#4821",
  helpContact: { name: "Supervisor Sharma", phone: "+15550192831" },

  // Check-in modal. In the real app the code is checked by the backend and
  // GPS / face results come back from the API; never ship the code to the client.
  accessCode: "4821",
  siteFullName: "Green Valley Tower (Phase 2 - Gate 2)",
  gpsZone: "Within 35m zone",
  faceMatch: 98,
};

// ---- Mobile (worker self-service) view data --------------------------------

export const mobileDays = [
  {
    id: "mon",
    date: "Mon, Oct 21",
    status: "Punched Out",
    logged: "8h 15m",
    loggedMins: 495,
    punches: [
      {
        kind: "in",
        title: "Morning Check-In",
        time: "08:00 AM",
        detail: "Verified via Face ID & Site Code #4821 at Main Gate",
        badge: "GPS Geofence Verified (within 6m)",
        accent: true,
      },
      {
        kind: "lunchOut",
        title: "Lunch Break Out",
        time: "12:30 PM",
        detail: "Meal interval started • Duration: 45 min scheduled",
      },
      {
        kind: "lunchIn",
        title: "Lunch Break In",
        time: "01:15 PM",
        detail: "Resumed work • Biometric verify at Gate 2 Checkpoint",
      },
      {
        kind: "out",
        title: "Evening Check-Out",
        time: "05:15 PM",
        detail: "Shift concluded • Perimeter Exit Reader #B",
        badge: "Geofence Boundary Exit confirmed",
        accent: true,
      },
    ],
    overtimeNote: "+15m overtime pending approval",
  },
  {
    id: "thu",
    date: "Thu, Oct 24",
    status: "Punched Out",
    logged: "7h 45m",
    loggedMins: 465,
    punches: [
      {
        kind: "in",
        title: "Morning Check-In",
        time: "07:58 AM",
        detail: "Verified via Face ID & Site Code #4821 at Main Gate",
        badge: "GPS Geofence Verified (within 8m)",
        accent: true,
      },
      {
        kind: "lunchOut",
        title: "Lunch Break Out",
        time: "12:30 PM",
        detail: "Meal interval started • Duration: 45 min scheduled",
      },
      {
        kind: "lunchIn",
        title: "Lunch Break In",
        time: "01:15 PM",
        detail: "Resumed work • Biometric verify at Gate 2 Checkpoint",
      },
      {
        kind: "out",
        title: "Evening Check-Out",
        time: "05:08 PM",
        detail: "Shift concluded • Perimeter Exit Reader #B",
        badge: "Geofence Boundary Exit confirmed",
        accent: true,
      },
    ],
    overtimeNote: "No Overtime accrued today",
  },
];

export const shiftSchedule = {
  label: "Standard Shift (08:00 AM - 05:00 PM)",
  scheduledMins: 480,
};

export const approval = {
  by: "Marcus Vance",
  role: "Site General Foreman",
  signedAt: "05:15 PM",
  token: "#MV-9921-OK",
};

export const mobileTimesheet = {
  weekLabel: "Week 43 • Oct 21 – Oct 25",
  total: "32h 30m",
  rows: [
    {
      abbr: "Mo",
      day: "Monday, Oct 21",
      range: "08:00 AM - 05:15 PM",
      hours: "8h 15m",
      note: "+15m OT",
      noteTone: "ot",
    },
    {
      abbr: "Tu",
      day: "Tuesday, Oct 22",
      range: "07:55 AM - 05:00 PM",
      hours: "8h 00m",
      note: "Regular",
      noteTone: "muted",
    },
    {
      abbr: "We",
      day: "Wednesday, Oct 23",
      range: "07:45 AM - 05:15 PM",
      hours: "8h 30m",
      note: "+30m OT",
      noteTone: "ot",
    },
    {
      abbr: "Th",
      day: "Thursday, Oct 24 (Today)",
      range: "07:58 AM - 05:08 PM",
      hours: "7h 45m",
      note: "Logged",
      noteTone: "ok",
      today: true,
    },
    {
      abbr: "Fr",
      day: "Friday, Oct 25",
      range: "Scheduled: 08:00 AM - 05:00 PM",
      hours: "--",
      future: true,
    },
  ],
};
