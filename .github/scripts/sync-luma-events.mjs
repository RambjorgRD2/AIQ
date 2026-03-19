/**
 * sync-luma-events.mjs
 *
 * Fetches upcoming (and recent past) events from the Luma public API
 * for the Sosial AI Forum calendar and rewrites the `events` array in
 * src/pages/forum.astro.
 *
 * Runs without an API key — uses Luma's unauthenticated public endpoint.
 * If Luma ever restricts this, set a LUMA_API_KEY secret in GitHub Actions
 * and it will be picked up automatically via the Authorization header below.
 *
 * Usage:  node .github/scripts/sync-luma-events.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FORUM_ASTRO = join(__dirname, '../../src/pages/forum.astro');
const CAL_ID = 'cal-CvikyKmsIwGWlEz';

// ─── FORMAT INFERENCE ────────────────────────────────────────────────────────
// Luma doesn't have a "format" field — we infer it from the event name/tags.
// Edit this list to add new keywords.
const FORMAT_RULES = [
  [/workshop/i,   'Workshop'],
  [/webinar/i,    'Webinar'],
  [/roundtable/i, 'Roundtable'],
  [/q&a|q and a/i,'Q&A'],
  [/meetup/i,     'Meetup'],
  [/brainstorm/i, 'Workshop'],
];

function inferFormat(name = '', tags = []) {
  const text = [name, ...tags].join(' ');
  for (const [re, fmt] of FORMAT_RULES) {
    if (re.test(text)) return fmt;
  }
  return 'Workshop'; // safe default
}

// ─── DATE / TIME HELPERS ─────────────────────────────────────────────────────
function localDate(iso, tz) {
  // Returns YYYY-MM-DD in the event's timezone
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date(iso));
}

function localTime(iso, tz) {
  // Returns HH:MM (24h) in the event's timezone
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(new Date(iso));
}

const TZ_ABBR = {
  'Europe/Oslo': 'CET',      'Europe/Stockholm': 'CET',
  'Europe/Copenhagen': 'CET','Europe/Berlin': 'CET',
  'Europe/Paris': 'CET',     'Europe/London': 'GMT',
  'America/New_York': 'ET',  'America/Chicago': 'CT',
  'America/Denver': 'MT',    'America/Los_Angeles': 'PT',
  'UTC': 'UTC',
};

// ─── PRESERVE MANUAL FIELDS ──────────────────────────────────────────────────
// tierRecommended is not a Luma field — if someone has already set it manually
// in forum.astro we want to keep it rather than overwriting with null.
function parseExistingTiers(src) {
  const tiers = {};
  const re = /lumaEventId:\s*['"]([^'"]+)['"]\s*,[\s\S]*?tierRecommended:\s*([^,\n]+)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const raw = m[2].trim();
    if (raw !== 'null') tiers[m[1]] = raw.replace(/^['"]|['"]$/g, '');
  }
  return tiers;
}

// ─── SERIALISE ────────────────────────────────────────────────────────────────
function serializeEvent(e) {
  const q = s => JSON.stringify(s ?? '');
  return [
    `  {`,
    `    lumaEventId: ${q(e.lumaEventId)},`,
    `    title: ${q(e.title)},`,
    `    date: ${q(e.date)},`,
    `    time: ${q(e.time)},`,
    `    timezone: ${q(e.timezone)},`,
    `    format: ${q(e.format)},`,
    `    location: ${q(e.location)},`,
    `    description: ${q(e.description)},`,
    `    tierRecommended: ${e.tierRecommended ? q(e.tierRecommended) : 'null'},`,
    `    host: 'Sosial AI Forum',`,
    `    capacity: ${e.capacity ?? 'null'},`,
    `    status: ${q(e.status)},`,
    `  }`,
  ].join('\n');
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  // Build request — attach API key if the secret is available
  const headers = { Accept: 'application/json' };
  if (process.env.LUMA_API_KEY) {
    headers['Authorization'] = `Bearer ${process.env.LUMA_API_KEY}`;
    console.log('Using LUMA_API_KEY from environment.');
  }

  const apiUrl = `https://api.lu.ma/public/v1/calendar/list-events?calendar_api_id=${CAL_ID}`;
  console.log(`Fetching: ${apiUrl}`);
  const res = await fetch(apiUrl, { headers });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Luma API returned ${res.status}.\n${body}\n\n` +
      `If Luma now requires auth for public calendars, add a LUMA_API_KEY secret to this repo.`
    );
  }

  const { entries = [] } = await res.json();
  console.log(`Got ${entries.length} event(s) from Luma.`);

  if (entries.length === 0) {
    // Don't wipe the list if the API returns nothing — could be a temporary issue
    console.log('No events returned. Skipping update to avoid clearing existing data.');
    process.exit(0);
  }

  // Read current file and extract any manually-set tier labels
  const src = readFileSync(FORUM_ASTRO, 'utf-8');
  const existingTiers = parseExistingTiers(src);

  const now = new Date();

  const events = entries.map(({ event: e }) => {
    const tz = e.timezone ?? 'UTC';
    const status = new Date(e.start_at) > now ? 'upcoming' : 'past';

    // Location: virtual trumps physical
    let location = 'Online';
    if (e.virtual_info?.zoom_meeting_url || e.virtual_info?.has_zoom) {
      location = 'Online — Zoom';
    } else if (e.virtual_info?.url) {
      location = 'Online';
    } else if (e.geo_address_info?.full_address) {
      location = e.geo_address_info.full_address;
    }

    // Clean up description: strip basic markdown, collapse whitespace, cap at 300 chars
    const desc = (e.description ?? '')
      .replace(/\*\*|__|~~|`{1,3}/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links
      .replace(/\n+/g, ' ')
      .trim()
      .slice(0, 300);

    return {
      lumaEventId: e.api_id,
      title: e.name,
      date: localDate(e.start_at, tz),
      time: localTime(e.start_at, tz),
      timezone: TZ_ABBR[tz] ?? tz,
      format: inferFormat(e.name, e.tags ?? []),
      location,
      description: desc,
      tierRecommended: existingTiers[e.api_id] ?? null,
      capacity: e.guest_limit ?? e.capacity ?? null,
      status,
    };
  });

  // Sort: upcoming first (chronological), then past (reverse chronological)
  events.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'upcoming' ? -1 : 1;
    const cmp = a.date.localeCompare(b.date);
    return a.status === 'past' ? -cmp : cmp;
  });

  // Replace the events array in forum.astro
  // The sentinel is: `const events = [` ... `];\n\nconst upcomingEvents`
  const newBlock =
    `const events = [\n` +
    events.map(serializeEvent).join(',\n') +
    `,\n];`;

  const updated = src.replace(
    /const events = \[[\s\S]*?\];\n\nconst upcomingEvents/,
    `${newBlock}\n\nconst upcomingEvents`
  );

  if (updated === src) {
    console.log('forum.astro is already up to date.');
    process.exit(0);
  }

  writeFileSync(FORUM_ASTRO, updated, 'utf-8');
  console.log(`forum.astro updated — ${events.filter(e => e.status === 'upcoming').length} upcoming, ${events.filter(e => e.status === 'past').length} past.`);
}

main().catch(err => {
  console.error('sync-luma-events failed:', err.message);
  process.exit(1);
});
