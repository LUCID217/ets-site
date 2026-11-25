// GET /api/stats?days=30  ->  {days: {'2026-11-22': {'visit|tiktok|BR|pt-BR|-': 3, ...}}}
// Totals only. Read by /stats/. Needs header x-stats-key matching the STATS_KEY env var.
import { getStore } from '@netlify/blobs';
import { STORE, keyOk } from './shared.mjs';

export default async (req) => {
  const nope = { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' };
  if (!keyOk(req.headers.get('x-stats-key'))) return Response.json({ error: 'locked' }, { status: 401, headers: nope });
  const url = new URL(req.url);
  const n = Math.min(Math.max(parseInt(url.searchParams.get('days') || '30', 10) || 30, 1), 400);
  const since = new Date(Date.now() - (n - 1) * 864e5).toISOString().slice(0, 10);
  const store = getStore({ name: STORE, consistency: 'strong' });
  const { blobs } = await store.list({ prefix: 'd/' });
  const keys = blobs.map(b => b.key).filter(k => k.slice(2) >= since).sort();
  const days = {};
  await Promise.all(keys.map(async k => { days[k.slice(2)] = (await store.get(k, { type: 'json' })) || {}; }));
  return Response.json({ since, days }, { headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex' } });
};

// 10 tries a minute per IP, so the key can't be guessed by brute force.
export const config = {
  path: '/api/stats',
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] }
};
