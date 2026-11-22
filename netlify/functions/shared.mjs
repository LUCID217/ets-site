// Shared rules for the visit counter. No cookies, no IPs, no IDs: only
// totals per day, per link source, per country and per kind of event.
export const EVENTS = ['visit', 'play', 'signup'];
export const STORE = 'ets-stats';

// Link sources the site knows. Anything else is kept (cleaned) so new ad
// campaigns show up without a code change, but capped in length.
export function cleanRef(r) {
  r = String(r || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24);
  return r || 'direct';
}
export function cleanCountry(c) {
  c = String(c || '').toUpperCase();
  return /^[A-Z]{2}$/.test(c) ? c : 'XX';
}
export function cleanGame(g) {
  return String(g || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 32);
}
export function today() { return new Date().toISOString().slice(0, 10); }
export const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|monitor/i;
