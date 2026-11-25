/* /stats/ page. Moved out of the HTML so the site can forbid inline scripts (see _headers). */
(function () {
  var REGION = {
    LATAM: 'AR BO BR CL CO CR CU DO EC GT HN MX NI PA PE PR PY SV UY VE',
    SEA: 'BN KH ID LA MY MM PH SG TH TL VN',
    AU: 'AU'
  };
  function region(c) { for (var r in REGION) if (REGION[r].split(' ').indexOf(c) >= 0) return r; return 'Other'; }
  var REGIONS = ['LATAM', 'SEA', 'AU', 'Other'];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pct(a, b) { return b ? Math.round(100 * a / b) + '%' : '–'; }
  function blank() { return { visit: 0, play: 0, signup: 0, ask: 0, join: 0, skip: 0 }; }
  function add(map, k, e, n) { (map[k] = map[k] || blank())[e] += n; }

  function render(data) {
    var src = {}, reg = {}, ctry = {}, day = {}, crew = {}, tot = blank();
    Object.keys(data.days).forEach(function (d) {
      var c = data.days[d];
      Object.keys(c).forEach(function (k) {
        var p = k.split('|'), e = p[0], ref = p[1], cc = p[2], n = c[k];
        if (!(e in tot)) return;
        if (e === 'ask' || e === 'join' || e === 'skip') { tot[e] += n; add(crew, p[4] || '-', e, n); add(day, d, e, n); return; }
        tot[e] += n; add(src, ref, e, n); add(ctry, cc, e, n); add(day, d, e, n);
        add(reg, ref + '|' + region(cc), e, n);
      });
    });
    var tiles = [['Visits', tot.visit], ['Plays', tot.play], ['Play rate', pct(tot.play, tot.visit)], ['Signups', tot.signup],
      ['Email list joins', tot.join], ['Game invites shown', tot.ask], ['Invite join rate', pct((crew['orbit-rush'] || blank()).join, tot.ask)], ['Invites closed', tot.skip]];
    document.getElementById('tiles').innerHTML = tiles.map(function (t) { return '<div class="tile"><b>' + t[1] + '</b><span>' + t[0] + '</span></div>'; }).join('');

    var WHERE = { 'orbit-rush': 'Orbit Rush (in game)', site: 'Site footer', links: '/links page' };
    var ws = Object.keys(crew).sort(function (a, b) { return crew[b].join - crew[a].join; });
    table('byCrew', ['Joined from', 'Shown', 'Joined', 'Closed', 'Join rate'], ws.map(function (w) {
      var s = crew[w]; return [esc(WHERE[w] || w), s.ask || '–', s.join, s.ask ? s.skip : '–', s.ask ? pct(s.join, s.ask) : '–'];
    }));
    var refs = Object.keys(src).sort(function (a, b) { return src[b].visit - src[a].visit; });
    var maxV = refs.length ? src[refs[0]].visit || 1 : 1;
    table('bySource', ['Source', 'Visits', 'Plays', 'Play rate', 'Signups'], refs.map(function (r) {
      var s = src[r];
      return [esc(r), s.visit + '<span class="meter" style="width:' + Math.round(60 * s.visit / maxV) + 'px"></span>', s.play, pct(s.play, s.visit), s.signup];
    }));
    table('byRegion', ['Source'].concat(REGIONS.map(function (r) { return r + ' visits / plays'; })), refs.map(function (r) {
      return [esc(r)].concat(REGIONS.map(function (g) { var x = reg[r + '|' + g]; return x ? x.visit + ' / ' + x.play : '–'; }));
    }));
    var cs = Object.keys(ctry).sort(function (a, b) { return ctry[b].visit - ctry[a].visit; }).slice(0, 25);
    table('byCountry', ['Country', 'Region', 'Visits', 'Plays', 'Play rate', 'Signups'], cs.map(function (c) {
      var s = ctry[c]; return [esc(c === 'XX' ? 'Unknown' : c), region(c), s.visit, s.play, pct(s.play, s.visit), s.signup];
    }));
    var ds = Object.keys(day).sort().reverse();
    table('byDay', ['Day', 'Visits', 'Plays', 'Signups', 'Email joins'], ds.map(function (d) { var s = day[d]; return [d, s.visit, s.play, s.signup, s.join]; }));
  }
  function table(id, head, rows) {
    var el = document.getElementById(id);
    el.innerHTML = '<thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      (rows.length ? rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('')
        : '<tr><td class="empty" colspan="' + head.length + '">No visits counted yet.</td></tr>') + '</tbody>';
  }
  // The numbers need the stats key (Netlify env var STATS_KEY). It is kept in this browser only.
  var KEY = 'ets.statsKey', current = 30;
  function getKey() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function setKey(k) { try { if (k) localStorage.setItem(KEY, k); else localStorage.removeItem(KEY); } catch (e) {} }
  var gate = document.getElementById('gate'), out = document.getElementById('out');
  function locked(msg) { gate.hidden = false; out.hidden = true; document.getElementById('gate-msg').textContent = msg || ''; document.getElementById('gate-key').focus(); }
  gate.addEventListener('submit', function (e) {
    e.preventDefault();
    setKey(document.getElementById('gate-key').value.trim());
    document.getElementById('gate-key').value = '';
    load(current);
  });
  document.getElementById('lock').addEventListener('click', function () { setKey(''); locked('Locked on this device.'); });
  function load(d) {
    current = d;
    var k = getKey();
    if (!k) return locked();
    Array.prototype.forEach.call(document.querySelectorAll('#range button'), function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-d') === String(d))); });
    fetch('/api/stats?days=' + d, { cache: 'no-store', headers: { 'x-stats-key': k } }).then(function (r) {
      if (r.status === 401) { setKey(''); throw new Error('wrong key'); }
      if (r.status === 429) throw new Error('too many tries, wait a minute');
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (data) { gate.hidden = true; out.hidden = false; render(data); })
      .catch(function (e) { if (e.message === 'wrong key') return locked('That key did not work.'); out.hidden = false; document.getElementById('tiles').innerHTML = '<p class="note">Could not load the numbers (' + esc(e.message) + ').</p>'; });
  }
  document.getElementById('range').addEventListener('click', function (e) { var d = e.target.getAttribute('data-d'); if (d) load(d); });
  load(30);
})();
