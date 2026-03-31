/**
 * sync-luma-events.mjs
 *
 * Fetches events from Luma's iCal feed (no API key required) and rewrites
 * the `events` array in src/data/events.ts.
 *
 * Setup:
 *   1. Luma Dashboard → Calendar → Settings → "Subscribe to Calendar"
 *   2. Copy the .ics URL
 *   3. Add it as a GitHub secret: LUMA_ICAL_URL
 *      (Settings → Secrets → Actions → New repository secret)
 *
 * Usage:  LUMA_ICAL_URL=https://... node .github/scripts/sync-luma-events.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const EVENTS_TS = join(__dirname, '../../src/data/events.ts');

const ICAL_URL = process.env.LUMA_ICAL_URL;
if (!ICAL_URL) {
  console.error('LUMA_ICAL_URL is not set. Add it as a GitHub secret or env var.');
  console.error('Find it: Luma Dashboard → Calendar → Settings → Subscribe to Calendar');
  process.exit(1);
}

// ─── FORMAT INFERENCE ─────────────────────────────────────────────────────────
const FORMAT_RULES = [
  [/workshop/i,            'Workshop'],
  [/webinar/i,             'Webinar'],
  [/roundtable/i,          'Roundtable'],
  [/q&a|q and a/i,         'Q&A'],
  [/meetup/i,              'Meetup'],
  [/brainstorm|brainstorm/i,'brAInstorm'],
];

function inferFormat(title = '') {
  for (const [re, fmt] of FORMAT_RULES) {
    if (re.test(title)) return fmt;
  }
  return 'Workshop';
}

// ─── ICAL PARSER ──────────────────────────────────────────────────────────────
// Minimal inline parser — no npm dependencies.
// Handles: line folding, DTSTART with TZID, escaped chars, multi-event feeds.

function unfold(raw) {
  // RFC 5545: lines folded with CRLF + whitespace — rejoin them
  return raw.replace(/\r?\n[ \t]/g, '');
}

function parseParams(keyAndParams) {
  // e.g. "DTSTART;TZID=Europe/Oslo" → { key: 'DTSTART', TZID: 'Europe/Oslo' }
  const parts = keyAndParams.split(';');
  const key = parts[0];
  const params = {};
  for (const p of parts.slice(1)) {
    const eq = p.indexOf('=');
    if (eq > -1) params[p.slice(0, eq)] = p.slice(eq + 1);
  }
  return { key, params };
}

function unescape(s) {
  return s
    .replace(/\\n/g, ' ')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim();
}

const TZ_ABBR = {
  'Europe/Oslo': 'CET',       'Europe/Stockholm': 'CET',
  'Europe/Copenhagen': 'CET', 'Europe/Berlin': 'CET',
  'Europe/Paris': 'CET',      'Europe/London': 'GMT',
  'America/New_York': 'ET',   'America/Chicago': 'CT',
  'America/Denver': 'MT',     'America/Los_Angeles': 'PT',
  'UTC': 'UTC',
};

function parseIcal(raw) {
  const text = unfold(raw);

  // Calendar-level timezone — prefer X-WR-TIMEZONE from feed, fall back to
  // CALENDAR_TIMEZONE env var (set in workflow). Used when DTSTART is in UTC.
  const calTzMatch = text.match(/X-WR-TIMEZONE:(.+)/);
  const calTzid = (calTzMatch ? calTzMatch[1].trim() : '') || process.env.CALENDAR_TIMEZONE || '';

  const results = [];

  for (const block of text.split('BEGIN:VEVENT').slice(1)) {
    const fields = {};
    for (const line of block.split(/\r?\n/)) {
      const colon = line.indexOf(':');
      if (colon < 1) continue;
      const { key, params } = parseParams(line.slice(0, colon));
      fields[key] = { value: line.slice(colon + 1).trim(), params };
    }

    const summary   = unescape(fields.SUMMARY?.value   || '');
    const uid       = fields.UID?.value                 || '';
    const location  = unescape(fields.LOCATION?.value  || '');
    const url       = fields.URL?.value                 || '';
    const rawDesc   = unescape(fields.DESCRIPTION?.value || '');
    const dtstart   = fields.DTSTART?.value             || '';
    const tzid      = fields.DTSTART?.params?.TZID      || '';

    if (!dtstart || !summary) continue;

    // Parse DTSTART: YYYYMMDDTHHMMSS[Z] or YYYYMMDD (all-day)
    const d = dtstart.replace(/Z$/, '');
    let date = `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
    let time = d.length >= 13 ? `${d.slice(9,11)}:${d.slice(11,13)}` : '00:00';

    // Resolve timezone:
    //   1. Explicit TZID on DTSTART → use as-is, no conversion needed
    //   2. Z-suffix (UTC) + calTzid → convert UTC→local, use calTzid as label
    //   3. Floating time (no Z, no TZID) → already local, just label with calTzid
    const effectiveTzid = tzid || calTzid || '';
    if (dtstart.endsWith('Z') && effectiveTzid) {
      const utc = new Date(`${date}T${time}:00Z`);
      date = new Intl.DateTimeFormat('en-CA', {
        timeZone: effectiveTzid, year: 'numeric', month: '2-digit', day: '2-digit',
      }).format(utc);
      time = new Intl.DateTimeFormat('en-GB', {
        timeZone: effectiveTzid, hour: '2-digit', minute: '2-digit', hour12: false,
      }).format(utc);
    }
    const timezone = TZ_ABBR[effectiveTzid] || effectiveTzid || 'UTC';

    // Extract Luma event ID from URL or UID (evt-xxxxxxxxxx pattern)
    const idMatch = (url + uid).match(/evt-[a-zA-Z0-9]+/);
    const lumaEventId = idMatch ? idMatch[0] : uid.split('@')[0];

    // Status: upcoming if start is in the future
    const status = new Date(`${date}T${time}:00`) > new Date() ? 'upcoming' : 'past';

    // Clean description: strip Luma management noise, markdown, cap at 300 chars
    const description = rawDesc
      .replace(/You are hosting this event\.\s*/g, '')
      .replace(/View the public page at https?:\/\/\S+\s*/g, '')
      .replace(/Manage the event at https?:\/\/\S+\s*/g, '')
      .replace(/Hosted by\s+.+$/m, '')
      .replace(/Address:\s*/g, '')
      .replace(/\*\*|__|~~|`{1,3}/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 300);

    results.push({ lumaEventId, title: summary, date, time, timezone,
      format: inferFormat(summary), location: location || 'Online',
      description, status });
  }

  return results;
}

// ─── PRESERVE MANUAL FIELDS ───────────────────────────────────────────────────
// tierRecommended and capacity are not in iCal — keep any values already set.

function parseExisting(src) {
  const tiers = {}, capacities = {}, formats = {};
  const re = /lumaEventId:\s*['"]([^'"]+)['"]\s*,[\s\S]*?tierRecommended:\s*([^,\n]+)[\s\S]*?capacity:\s*([^,\n]+)/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const id = m[1];
    const tier = m[2].trim();
    const cap  = m[3].trim();
    if (tier !== 'null' && tier !== "''") tiers[id] = tier.replace(/^['"]|['"]$/g, '');
    if (cap  !== 'null')                  capacities[id] = cap;
  }
  // Preserve manually set format (auto-inferred format from title may be wrong)
  const fmtRe = /lumaEventId:\s*['"]([^'"]+)['"][\s\S]*?format:\s*['"]([^'"]+)['"]/g;
  while ((m = fmtRe.exec(src)) !== null) {
    formats[m[1]] = m[2];
  }
  return { tiers, capacities, formats };
}

// ─── SERIALISE ────────────────────────────────────────────────────────────────
function serialize(events) {
  return events.map(e => {
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
  }).join(',\n');
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Fetching iCal feed: ${ICAL_URL}`);
  const res = await fetch(ICAL_URL);

  if (!res.ok) {
    throw new Error(`iCal fetch failed: HTTP ${res.status} ${res.statusText}`);
  }

  const ical = await res.text();
  if (!ical.includes('BEGIN:VCALENDAR')) {
    throw new Error('Response does not look like an iCal feed. Check your LUMA_ICAL_URL.');
  }

  const events = parseIcal(ical);
  console.log(`Parsed ${events.length} event(s) from iCal feed.`);

  if (events.length === 0) {
    console.log('No events parsed — skipping update to avoid clearing existing data.');
    process.exit(0);
  }

  // Restore manually curated fields
  const src = readFileSync(EVENTS_TS, 'utf-8');
  const { tiers, capacities, formats } = parseExisting(src);
  for (const e of events) {
    if (tiers[e.lumaEventId])      e.tierRecommended = tiers[e.lumaEventId];
    if (capacities[e.lumaEventId]) e.capacity        = capacities[e.lumaEventId];
    if (formats[e.lumaEventId])    e.format          = formats[e.lumaEventId];
  }

  // Sort: upcoming first (chronological), then past (reverse chronological)
  events.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'upcoming' ? -1 : 1;
    return a.status === 'past'
      ? b.date.localeCompare(a.date)
      : a.date.localeCompare(b.date);
  });

  // Replace the events array in events.ts, preserving everything else
  const newArray = `export const events: ForumEvent[] = [\n${serialize(events)},\n];`;
  const updated  = src.replace(
    /export const events: ForumEvent\[\] = \[[\s\S]*?\];/,
    newArray,
  );

  if (updated === src) {
    console.log('events.ts is already up to date.');
    process.exit(0);
  }

  writeFileSync(EVENTS_TS, updated, 'utf-8');
  const upcoming = events.filter(e => e.status === 'upcoming').length;
  const past     = events.filter(e => e.status === 'past').length;
  console.log(`events.ts updated — ${upcoming} upcoming, ${past} past.`);
}

main().catch(err => {
  console.error('sync-luma-events failed:', err.message);
  process.exit(1);
});
