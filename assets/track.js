/* Ebon Tide Studios: counts which link brought people here. No cookies and nothing that identifies anyone.
 * - Social links carry ?ref=<source> (e.g. ?ref=tiktok). Short links like /tt do this for you (see _redirects).
 * - The source is remembered in this browser for 30 days, so a later Play or signup still counts for it.
 * - Sends one "visit" per browser session, one "play" per Play click and one "signup" per Notify form.
 * - Totals are at /stats/. Needs games.js loaded first (to know which links are game links).
 */
(function () {
  var KEY = 'ets.ref', DAYS = 30;
  var G = window.ETS_GAMES || [], I = window.ETS_I18N || {};
  function clean(r) { return String(r || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24); }
  function fromReferrer() {
    var h = '';
    try { h = document.referrer ? new URL(document.referrer).hostname.replace(/^www\.|^m\.|^l\./, '') : ''; } catch (e) {}
    if (!h || h === location.hostname) return '';
    var map = [[/tiktok/, 'tiktok'], [/youtube|youtu\.be/, 'youtube'], [/instagram/, 'instagram'], [/facebook|fb\.(com|me)/, 'facebook'],
      [/^t\.co$|^x\.com$|twitter/, 'x'], [/threads\./, 'threads'], [/reddit/, 'reddit'], [/discord/, 'discord'],
      [/google\./, 'google'], [/bing\.|duckduckgo|yahoo\./, 'search']];
    for (var i = 0; i < map.length; i++) if (map[i][0].test(h)) return map[i][1];
    return 'web';
  }
  function load() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.r && Date.now() - s.t < DAYS * 864e5) return s.r; } catch (e) {}
    return '';
  }
  function save(r) { try { localStorage.setItem(KEY, JSON.stringify({ r: r, t: Date.now() })); } catch (e) {} }

  var q = null;
  try { var p = new URLSearchParams(location.search); q = p.get('ref') || p.get('utm_source'); } catch (e) {}
  var ref = clean(q) || fromReferrer();
  if (ref) save(ref); else ref = load() || 'direct';

  function send(e, extra) {
    var body = { e: e, ref: ref, lang: I.lang || '' };
    for (var k in extra || {}) body[k] = extra[k];
    var data = JSON.stringify(body);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon('/api/hit', data)) return;
    } catch (err) {}
    try { fetch('/api/hit', { method: 'POST', body: data, keepalive: true }); } catch (err) {}
  }

  // One visit per browser session.
  var seen = false;
  try { seen = sessionStorage.getItem('ets.v') === '1'; sessionStorage.setItem('ets.v', '1'); } catch (e) {}
  if (!seen) send('visit');

  // Play clicks: any link to a game's play site. Also passes the source on to the game.
  function gameFor(a) {
    var host;
    try { host = new URL(a.href, location.href).hostname; } catch (e) { return null; }
    for (var i = 0; i < G.length; i++) {
      if (!G[i].playUrl) continue;
      try { if (new URL(G[i].playUrl).hostname === host) return G[i]; } catch (e) {}
    }
    return null;
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var g = gameFor(a);
    if (!g) return;
    try {
      var u = new URL(a.href, location.href);
      u.searchParams.set('ref', ref);
      a.href = u.toString();
    } catch (e) {}
    send('play', { game: g.id });
  }, true);

  // Signups: tag the form with the source and count it.
  document.addEventListener('submit', function (ev) {
    var f = ev.target;
    if (!f || !f.getAttribute) return;
    var r = f.querySelector('input[name="ref"]');
    if (r) r.value = ref;
    if (f.getAttribute('name') === 'notify') send('signup');
  }, true);

  window.ETS_REF = ref;
})();
