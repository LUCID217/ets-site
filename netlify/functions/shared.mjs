import { createHash, timingSafeEqual } from 'node:crypto';
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
// The games live on their own Netlify sites (ets-*.netlify.app, plus Monster Fusion's
// older address) and report here too. Deploy previews ("<id>--ets-…") count as well.
const OK_ORIGIN = /^https:\/\/([a-z0-9-]+--)?(ets-[a-z0-9-]+|monster-fusion-0125bf)\.netlify\.app$/;
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
export function allowedOrigin(o) { return OK_ORIGIN.test(o || '') || LOCAL.test(o || ''); }
export function cors(req) {
  const o = (req && req.headers.get('origin')) || '';
  return allowedOrigin(o) ? { 'access-control-allow-origin': o, 'vary': 'origin' } : {};
}
// True when a request came from one of our own pages. Browsers always send Origin on a
// POST (sendBeacon included) or at least a Referer; plain scripts usually send neither.
// It can be faked, so it stops casual abuse, not a determined attacker. The rate limit
// on /api/hit does the rest.
export function fromOurSite(req) {
  const o = req.headers.get('origin');
  if (o && o !== 'null') return allowedOrigin(o);
  try { return allowedOrigin(new URL(req.headers.get('referer') || '').origin); } catch (e) { return false; }
}

// Stats key check. STATS_KEY is a Netlify environment variable; if it isn't set the
// numbers stay locked. Compares hashes so the check takes the same time either way.
function sha(s) { return createHash('sha256').update(String(s)).digest(); }
export function keyOk(given) {
  const want = (globalThis.Netlify && Netlify.env.get('STATS_KEY')) || process.env.STATS_KEY || '';
  if (want.length < 16 || !given) return false;
  return timingSafeEqual(sha(given), sha(want));
}
export const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|monitor/i;
