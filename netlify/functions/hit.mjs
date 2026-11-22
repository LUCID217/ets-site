// POST /api/hit  {e: 'visit'|'play'|'signup', ref, lang, game}
// Adds one to today's totals. Stores nothing about the visitor.
import { getStore } from '@netlify/blobs';
import { EVENTS, STORE, cleanRef, cleanCountry, cleanGame, today, BOT } from './shared.mjs';

const MAX_KEYS_PER_DAY = 3000;

export default async (req, context) => {
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });
  if (BOT.test(req.headers.get('user-agent') || '')) return new Response(null, { status: 204 });
  let body = {};
  try { body = JSON.parse(await req.text() || '{}'); } catch (e) { return new Response('bad json', { status: 400 }); }
  const e = EVENTS.includes(body.e) ? body.e : null;
  if (!e) return new Response('bad event', { status: 400 });

  const ref = cleanRef(body.ref);
  const country = cleanCountry(context.geo && context.geo.country && context.geo.country.code);
  const game = cleanGame(body.game);
  const lang = String(body.lang || '').replace(/[^a-zA-Z-]/g, '').slice(0, 6) || '-';
  const key = [e, ref, country, lang, game || '-'].join('|');

  const store = getStore({ name: STORE, consistency: 'strong' });
  const day = 'd/' + today();
  const counts = (await store.get(day, { type: 'json' })) || {};
  if (counts[key] == null && Object.keys(counts).length >= MAX_KEYS_PER_DAY) return new Response(null, { status: 204 });
  counts[key] = (counts[key] || 0) + 1;
  await store.setJSON(day, counts);
  return new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });
};

export const config = { path: '/api/hit' };
