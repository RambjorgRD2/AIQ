// ─── EVENTS DATA ─────────────────────────────────────────────────────────────
// To add an event:
//   1. Create the event on Luma (lu.ma) under the Sosial AI Forum calendar
//   2. Open the event → More → "Embed Registration Button"
//   3. Copy the data-luma-event-id value (looks like "evt-xxxxxxxx")
//   4. Add a new object to the `events` array below
//   5. Commit & push — GitHub Actions will redeploy automatically
//
// Format options: 'Workshop' | 'Webinar' | 'Roundtable' | 'Q&A' | 'Meetup' | 'brAInstorm'
// Status options: 'upcoming' | 'past'
// ─────────────────────────────────────────────────────────────────────────────

export interface ForumEvent {
  lumaEventId: string;
  title: string;
  date: string;
  time: string;
  timezone: string;
  format: 'Workshop' | 'Webinar' | 'Roundtable' | 'Q&A' | 'Meetup' | 'brAInstorm';
  location: string;
  description: string;
  tierRecommended: string;
  host: string;
  capacity: number;
  status: 'upcoming' | 'past';
}

export const events: ForumEvent[] = [
  {
    lumaEventId: "evt-ksh9sNL7qgWZWup",
    title: "Sosial AI Forum",
    date: "2026-04-15",
    time: "10:00",
    timezone: "UTC",
    format: "Meetup",
    location: "PEAK Sunnfjord, Hafstadvegen 23, Hafstadvegen 25, 6800 Førde, Norway",
    description: "PEAK Sunnfjord Førde, Vestland Norway 🤖 AI Agents — Setup, Creation & Understanding",
    tierRecommended: "All tiers",
    host: 'Sosial AI Forum',
    capacity: 50,
    status: "upcoming",
  },
];

export const formatColors: Record<string, string> = {
  Workshop:    'rgba(0,207,255,0.12)',
  Webinar:     'rgba(124,58,237,0.15)',
  Roundtable:  'rgba(168,85,247,0.12)',
  'Q&A':       'rgba(0,207,255,0.08)',
  Meetup:      'rgba(236,72,153,0.12)',
  brAInstorm:  'rgba(0,207,255,0.12)',
};

export const formatTextColors: Record<string, string> = {
  Workshop:    '#00CFFF',
  Webinar:     '#a78bfa',
  Roundtable:  '#c084fc',
  'Q&A':       '#67e8f9',
  Meetup:      '#f472b6',
  brAInstorm:  '#00CFFF',
};

export function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    day: d.toLocaleDateString('en-GB', { day: 'numeric' }),
    month: d.toLocaleDateString('en-GB', { month: 'short' }).toUpperCase(),
    weekday: d.toLocaleDateString('en-GB', { weekday: 'long' }),
    full: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  };
}
