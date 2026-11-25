/* /links/ page. Moved out of the HTML so the site can forbid inline scripts (see _headers). */
(function () {
  var I = window.ETS_I18N, S = (window.ETS_SOCIALS || []).filter(function (s) { return s.on && s.url; });
  var G = window.ETS_GAMES || [];
  var f = G.filter(function (g) { return g.featured; })[0] || G.filter(function (g) { return g.status === 'live'; })[0];
  function draw() {
    var b = document.querySelector('[data-links-play]');
    if (b && f) b.textContent = I.t('links.play', { name: I.pick(f.text, 'name') });
  }
  var box = document.querySelector('[data-socials]');
  box.innerHTML = S.map(function (s) { return '<a href="' + s.url + '" rel="noopener" target="_blank">' + s.name + '</a>'; }).join('');
  document.querySelector('[data-socials-wrap]').hidden = !S.length;
  draw(); I.onChange(draw);
})();
