// Shared rules for the visit counter. No cookies, no IPs, no IDs: only
// totals per day, per link source, per country and per kind of event.
// visit / play / signup ("Notify me" form) come from the site.
// ask / join / skip are the email invite: shown, joined, closed without joining.
export const EVENTS = ['visit', 'play', 'signup', 'ask', 'join', 'skip'];
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
// The games live on their own Netlify sites (ets-*.netlify.app) and report here too.
export function cors(req) {
  const o = (req && req.headers.get('origin')) || '';
  const ok = /^https:\/\/([a-z0-9-]+--)?ets-[a-z0-9-]+\.netlify\.app$/.test(o);
  return ok ? { 'access-control-allow-origin': o, 'vary': 'origin' } : {};
}
export const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|monitor/i;
