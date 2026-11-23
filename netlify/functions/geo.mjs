// GET /api/geo  ->  {country: 'BR'}
// The visitor's country code from Netlify's edge, so an email signup can be tagged
// with it. Nothing is stored. Open to the games' own domains (CORS).
import { cleanCountry, cors } from './shared.mjs';

export default async (req, context) => {
  const country = cleanCountry(context.geo && context.geo.country && context.geo.country.code);
  return Response.json({ country: country === 'XX' ? '' : country }, {
    headers: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex', ...cors(req) }
  });
};

export const config = { path: '/api/geo' };
