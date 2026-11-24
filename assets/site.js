/* Ebon Tide Studios: builds the translated page. Needs i18n.js and games.js loaded first. */
(function () {
  var I = window.ETS_I18N, G = window.ETS_GAMES || [];
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function gName(g) { return I.pick(g.text, 'name'); }
  function featured() { return G.filter(function (g) { return g.featured; })[0] || G.filter(function (g) { return g.status === 'live'; })[0] || G[0]; }
  function byId(id) { return G.filter(function (g) { return g.id === id; })[0]; }
  function page(g) { return '/games/' + g.id + '/'; }
  // The game's own look, as CSS variables for anything inside .gtheme
  function themeVars(g) {
    var t = g.theme || {}, map = { bg: '--g-bg', a1: '--g-a1', a2: '--g-a2', edge: '--g-edge', btnInk: '--g-btn-ink', hot: '--g-hot' }, out = [];
    Object.keys(map).forEach(function (k) { if (t[k]) out.push(map[k] + ':' + t[k]); });
    if (t.font) out.push('--g-font:"' + t.font + '", var(--sans)');
    return out.join(';');
  }
  function applyTheme(el, g) { if (el) { el.classList.add('gtheme'); el.setAttribute('style', themeVars(g)); } }
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" fill="currentColor"/></svg>';
  var GP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#34a853" d="M3.6 2.2 13.4 12l-9.8 9.8c-.4-.2-.6-.6-.6-1.1V3.3c0-.5.2-.9.6-1.1z"/><path fill="#fbbc04" d="m16.8 8.6-3.4 3.4 3.4 3.4 3.9-2.2c.8-.5.8-1.7 0-2.2z"/><path fill="#4285f4" d="M3.6 21.8 13.4 12l3.4 3.4-11.5 6.6c-.6.3-1.2.2-1.7-.2z"/><path fill="#ea4335" d="M3.6 2.2c.5-.4 1.1-.5 1.7-.2l11.5 6.6-3.4 3.4z"/></svg>';

  /* ---------- language switcher (added to every page header) ---------- */
  function buildSwitcher() {
    var nav = $('.top .nav');
    if (!nav || $('.lang', nav)) return;
    var wrap = document.createElement('label');
    wrap.className = 'lang';
    wrap.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" fill="none" stroke="currentColor" stroke-width="2"/></svg><span class="lang-code"></span><select></select>';
    var sel = $('select', wrap);
    I.LANGS.forEach(function (l) { var o = document.createElement('option'); o.value = l.code; o.textContent = l.name; sel.appendChild(o); });
    sel.addEventListener('change', function () { I.set(sel.value); });
    nav.appendChild(wrap);
  }
  function syncSwitcher() {
    var wrap = $('.top .lang'); if (!wrap) return;
    var l = I.LANGS.filter(function (x) { return x.code === I.lang; })[0];
    $('.lang-code', wrap).textContent = l.short;
    var sel = $('select', wrap); sel.value = I.lang; sel.setAttribute('aria-label', I.t('lang.label'));
  }

  /* ---------- fixed words marked in the HTML ---------- */
  function applyStatic() {
    var f = featured(), vars = { name: f ? gName(f) : '' };
    $$('[data-i18n]').forEach(function (el) { el.textContent = I.t(el.getAttribute('data-i18n'), vars); });
    $$('[data-i18n-html]').forEach(function (el) { el.innerHTML = I.t(el.getAttribute('data-i18n-html'), vars); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = I.t(el.getAttribute('data-i18n-ph')); });
    $$('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', I.t(el.getAttribute('data-i18n-aria'))); });
    $$('[data-i18n-alt]').forEach(function (el) { el.alt = I.t(el.getAttribute('data-i18n-alt')); });
    $$('input[name="lang"]').forEach(function (el) { el.value = I.lang; });
    if (f) {
      $$('[data-featured="name"]').forEach(function (el) { el.textContent = gName(f); });
      $$('[data-featured="hook"]').forEach(function (el) { el.textContent = I.pick(f.text, 'hook') || I.pick(f.text, 'short'); });
      $$('a[data-featured="play"]').forEach(function (el) { el.href = I.withLang(f.playUrl); });
      $$('a[data-featured="page"]').forEach(function (el) { el.href = page(f); });
      $$('[data-featured-theme]').forEach(function (el) { applyTheme(el, f); });
      $$('img[data-featured="hero"]').forEach(function (el) { if (f.hero) { el.src = f.hero; if (!el.closest('[aria-hidden]')) el.alt = gName(f); } });
    }
  }

  /* ---------- home page grid ---------- */
  function card(g) {
    var live = g.status === 'live';
    return '<article class="gcard">' +
      '<a class="art" href="' + page(g) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(g.cover) + '" alt="" loading="lazy"></a>' +
      '<div class="body"><span class="status' + (live ? ' live' : '') + '">' + esc(I.t(live ? 'pill.free' : 'pill.soon')) + '</span>' +
      '<h3>' + esc(gName(g)) + '</h3><p>' + esc(I.pick(g.text, 'short')) + '</p><div class="row">' +
      (live
        ? '<a class="s-btn" href="' + esc(I.withLang(g.playUrl)) + '">' + esc(I.t('card.play')) + '</a><a class="t-link" href="' + page(g) + '">' + esc(I.t('card.info')) + '</a>'
        : '<a class="s-btn line" href="' + page(g) + '#notify">' + esc(I.t('card.notify')) + '</a>') +
      '</div></div></article>';
  }
  function renderGrid() {
    var grid = $('#game-grid'); if (grid) grid.innerHTML = G.map(card).join('');
  }

  /* ---------- signup checkboxes (one per game) ---------- */
  function renderChecks() {
    $$('[data-notify-games]').forEach(function (box) {
      var picked = $$('input:checked', box).map(function (i) { return i.value; });
      box.innerHTML = G.map(function (g) {
        var v = g.text.en.name; // saved in English so signups are easy to sort
        return '<label><input type="checkbox" name="games" value="' + esc(v) + '"' + (picked.indexOf(v) >= 0 ? ' checked' : '') + '> ' + esc(gName(g)) + '</label>';
      }).join('');
    });
  }

  /* ---------- game page (/games/<id>/) ---------- */
  function renderGamePage() {
    var root = $('[data-game-page]'); if (!root) return;
    var m = location.pathname.match(/\/games\/([^\/]+)/);
    var id = (m && m[1] !== 'game.html') ? m[1] : new URLSearchParams(location.search).get('id');
    var g = byId(id);
    $$('[data-g-only]', root).forEach(function (el) { el.hidden = !g; });
    $('[data-g-missing]', root).hidden = !!g;
    if (!g) { document.title = I.t('nf.title') + ' · Ebon Tide Studios'; return; }

    var live = g.status === 'live', n = gName(g);
    document.title = n + ' · Ebon Tide Studios';
    applyTheme($('.gpage', root) || root, g);
    $$('[data-g-by-name]').forEach(function (el) { el.textContent = n; });
    var meta = $('meta[name="description"]'); if (meta) meta.content = I.pick(g.text, 'short') || '';

    var media = $('[data-g-media]', root);
    $('.game-grid', root).classList.toggle('is-soon', !live);
    if (live) {
      if (media.getAttribute('data-for') !== g.id) {
        media.className = 'clip';
        media.innerHTML = (g.clip
          ? '<video autoplay muted loop playsinline preload="metadata" poster="' + esc(g.hero || g.cover) + '"><source src="' + esc(g.clip) + '" type="video/mp4"></video>'
          : '<img src="' + esc(g.hero || g.cover) + '" alt="">') + '<span class="g-pill hot"></span>';
        media.setAttribute('data-for', g.id);
      }
      $('.g-pill', media).textContent = I.t('game.gameplay');
    } else {
      media.className = 'clip wide';
      media.innerHTML = '<img src="' + esc(g.cover) + '" alt=""><span class="g-pill soon">' + esc(I.t('pill.soon')) + '</span>';
    }

    $('[data-g-genre]', root).textContent = I.pick(g.text, 'genre') || I.t(live ? 'pill.free' : 'game.inDev');
    $('[data-g-name]', root).textContent = n;
    $('[data-g-tagline]', root).textContent = live
      ? (I.pick(g.text, 'tagline') || I.pick(g.text, 'short'))
      : (I.pick(g.text, 'short') + ' ' + I.t('game.soonText', { name: n }));

    $('[data-g-actions]', root).innerHTML =
      (live ? '<a class="g-btn big block" href="' + esc(I.withLang(g.playUrl)) + '">' + PLAY + esc(I.t('hero.play')) + '</a>' : '') +
      '<a class="gp" href="#notify"><span class="gp-icon">' + GP + '</span><span><small>' + esc(I.t('game.soonTo')) + '</small><strong>Google Play</strong></span><span class="g-pill soon">' + esc(I.t('game.soonBadge')) + '</span></a>';

    var how = I.pick(g.text, 'how') || [];
    $('[data-g-how-wrap]', root).hidden = !how.length;
    $('[data-g-how]', root).innerHTML = how.map(function (h) { return '<div class="g-perk"><b>' + esc(h[0]) + '</b><span>' + esc(h[1]) + '</span></div>'; }).join('');

    var shots = g.shots || [];
    $('[data-g-shots-wrap]', root).hidden = !shots.length;
    $('[data-g-shots]', root).innerHTML = shots.map(function (s) { return '<img src="' + esc(s) + '" alt="' + esc(n) + '" loading="lazy">'; }).join('');

    $('[data-g-notify-text]', root).textContent = I.t('game.notifyText', { name: n });
    $('[data-g-games-field]', root).value = g.text.en.name;
  }

  /* ---------- "Join the crew" email box (footer of every page + /links) ----------
   * Sends to the Netlify form "newsletter" (registered by a hidden form in index.html).
   * Without JavaScript the box isn't shown; the "Notify me" form still works. */
  var crewCountry = '';
  function crewGeo() {
    if (crewCountry) return;
    crewCountry = '-';
    try {
      fetch('/api/geo', { cache: 'no-store' }).then(function (r) { return r.ok ? r.json() : {}; })
        .then(function (j) { crewCountry = (j && j.country) || ''; }).catch(function () { crewCountry = ''; });
    } catch (e) {}
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function buildCrew() {
    var spots = $$('[data-crew]');
    var foot = $('footer .wrap');
    if (foot && !$('[data-crew]', foot)) {
      var d = document.createElement('div'); d.setAttribute('data-crew', 'site');
      foot.insertBefore(d, foot.firstChild); spots.push(d);
    }
    spots.forEach(function (box) {
      if (box.firstChild) return;
      var where = box.getAttribute('data-crew');
      box.classList.add('crew');
      box.innerHTML =
        '<div class="crew-copy"><span class="eyebrow" data-i18n="crew.eyebrow"></span><p data-i18n="crew.text"></p></div>' +
        '<form class="crew-form" novalidate>' +
          '<p class="hp"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>' +
          '<div class="field"><input type="email" name="email" required autocomplete="email" data-i18n-ph="notify.email" data-i18n-aria="crew.eyebrow">' +
          '<button class="s-btn" type="submit" data-i18n="crew.btn"></button></div>' +
          '<p class="fine crew-msg" role="status" data-i18n-html="crew.fine"></p>' +
        '</form>';
      var f = $('form', box), msg = $('.crew-msg', box), email = $('input[type=email]', f), btn = $('button', f);
      function done() { box.classList.add('is-done'); f.innerHTML = '<p class="crew-ok" data-i18n="crew.done">' + esc(I.t('crew.done')) + '</p>'; }
      function bad(key) { msg.textContent = I.t(key); msg.classList.add('bad'); }
      email.addEventListener('focus', crewGeo);
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var v = email.value.trim();
        if (!EMAIL.test(v) || v.length > 200) { bad('crew.bad'); email.focus(); return; }
        if ($('input[name="bot-field"]', f).value) { done(); return; }
        btn.disabled = true;
        var body = new URLSearchParams({ 'form-name': 'newsletter', 'bot-field': '', email: v, source: where, game: '',
          lang: I.lang, country: crewCountry === '-' ? '' : crewCountry, ref: window.ETS_REF || 'direct' });
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            done();
            if (window.ETS_HIT) window.ETS_HIT('join', { game: where });
          })
          .catch(function () { btn.disabled = false; bad('crew.err'); });
      });
    });
  }

  function render() {
    document.documentElement.lang = I.lang;
    applyStatic(); syncSwitcher(); renderGrid(); renderChecks(); renderGamePage();
  }
  buildSwitcher();
  buildCrew();
  render();
  I.onChange(render);
})();
