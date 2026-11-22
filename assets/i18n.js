/* Ebon Tide Studios: shared language system.
 * One place for every word the site shows. Each entry lists the text in this order:
 *   [English, Spanish, Portuguese (Brazil), Indonesian, Filipino]
 * A missing or empty translation falls back to English, so nothing ever shows blank.
 * Per-game text (names, descriptions, how-to-play) lives in assets/games.js instead.
 */
(function () {
  var LANGS = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'es', name: 'Español', short: 'ES' },
    { code: 'pt-BR', name: 'Português (Brasil)', short: 'PT' },
    { code: 'id', name: 'Bahasa Indonesia', short: 'ID' },
    { code: 'fil', name: 'Filipino', short: 'FIL' }
  ];
  var STORAGE_KEY = 'ets.lang';   // shared with the games (same key, same codes)

  var S = {
    'nav.games':   ['Games', 'Juegos', 'Jogos', 'Game', 'Mga Laro'],
    'nav.updates': ['Updates', 'Novedades', 'Novidades', 'Kabar terbaru', 'Balita'],
    'nav.contact': ['Contact', 'Contacto', 'Contato', 'Kontak', 'Kontak'],
    'nav.studio':    ['Studio', 'Estudio', 'Estúdio', 'Studio', 'Studio'],
    'studio.eyebrow':['Independent game studio', 'Estudio independiente de videojuegos', 'Estúdio independente de games', 'Studio game independen', 'Independent na game studio'],
    'studio.h1a':    ['Small games.', 'Juegos pequeños.', 'Jogos pequenos.', 'Game kecil.', 'Maliliit na laro.'],
    'studio.h1b':    ['Deep currents.', 'Corrientes profundas.', 'Correntes profundas.', 'Arus yang dalam.', 'Malalim na agos.'],
    'studio.text':   ['We make bright, fast, fair games for your phone, and you can play them here first.',
                      'Creamos juegos brillantes, rápidos y justos para tu teléfono, y puedes jugarlos aquí primero.',
                      'Criamos jogos vibrantes, rápidos e justos para o seu celular, e você pode jogá-los aqui primeiro.',
                      'Kami membuat game yang cerah, cepat, dan adil untuk ponselmu, dan kamu bisa memainkannya di sini lebih dulu.',
                      'Gumagawa kami ng makukulay, mabibilis at patas na laro para sa phone mo, at dito mo sila unang malalaro.'],
    'studio.explore':['Explore our games', 'Explora nuestros juegos', 'Conheça nossos jogos', 'Lihat game kami', 'Tingnan ang aming mga laro'],
    'featured.eyebrow': ['Out now · Free in your browser', 'Ya disponible · Gratis en tu navegador', 'Já disponível · Grátis no navegador', 'Sudah rilis · Gratis di browser', 'Labas na · Libre sa browser'],
    'games.by':      ['An Ebon Tide Studios game', 'Un juego de Ebon Tide Studios', 'Um jogo da Ebon Tide Studios', 'Game dari Ebon Tide Studios', 'Isang laro ng Ebon Tide Studios'],
    'games.eyebrow': ['The games', 'Los juegos', 'Os jogos', 'Game-game kami', 'Ang mga laro'],
    'about.eyebrow': ['The studio', 'El estudio', 'O estúdio', 'Tentang studio', 'Ang studio'],
    'about.title':   ['Made to pull you back in', 'Hechos para que vuelvas', 'Feitos para você voltar', 'Dibuat agar kamu kembali lagi', 'Ginawa para balik-balikan mo'],
    'about.text':    ['Ebon Tide Studios is a small independent team. Every game starts with one simple idea and gets polished until it feels great in your hand.',
                      'Ebon Tide Studios es un pequeño equipo independiente. Cada juego nace de una idea sencilla y se pule hasta que se siente genial en tus manos.',
                      'A Ebon Tide Studios é uma pequena equipe independente. Cada jogo nasce de uma ideia simples e é lapidado até ficar ótimo na sua mão.',
                      'Ebon Tide Studios adalah tim independen kecil. Setiap game berawal dari satu ide sederhana dan dipoles sampai terasa pas di tanganmu.',
                      'Maliit at independent na team ang Ebon Tide Studios. Nagsisimula ang bawat laro sa isang simpleng idea at pinapakinis hanggang ang sarap nang laruin.'],
    'updates.eyebrow': ['Updates', 'Novedades', 'Novidades', 'Kabar terbaru', 'Balita'],
    'contact.eyebrow': ['Contact', 'Contacto', 'Contato', 'Kontak', 'Kontak'],
    'lang.label':  ['Language', 'Idioma', 'Idioma', 'Bahasa', 'Wika'],

    'hero.pill':  ['New · Free to play', 'Nuevo · Gratis', 'Novo · Grátis', 'Baru · Gratis', 'Bago · Libre'],
    'hero.play':  ['Play now', 'Jugar ahora', 'Jogar agora', 'Main sekarang', 'Laruin na'],
    'hero.about': ['About the game', 'Sobre el juego', 'Sobre o jogo', 'Tentang game', 'Tungkol sa laro'],
    'hero.meta':  ['Plays instantly in your browser. No download, no sign-up.',
                   'Se juega al instante en tu navegador. Sin descargas ni registro.',
                   'Jogue na hora no navegador. Sem download, sem cadastro.',
                   'Langsung main di browser. Tanpa unduh, tanpa daftar.',
                   'Laruin agad sa browser mo. Walang download, walang sign-up.'],
    'hero.tag':   ['Tap to play', 'Toca para jugar', 'Toque para jogar', 'Ketuk untuk main', 'I-tap para maglaro'],

    'games.title': ['Our games', 'Nuestros juegos', 'Nossos jogos', 'Game kami', 'Aming mga laro'],
    'games.more':  ['More on the way', 'Vienen más', 'Mais a caminho', 'Segera hadir lebih banyak', 'Marami pang darating'],
    'card.play':   ['Play', 'Jugar', 'Jogar', 'Main', 'Laro'],
    'card.info':   ['Info', 'Info', 'Info', 'Info', 'Info'],
    'card.notify': ['Notify me', 'Avísame', 'Me avise', 'Kabari saya', 'Abisuhan ako'],
    'pill.free':   ['Play free', 'Juega gratis', 'Jogue grátis', 'Main gratis', 'Libreng laro'],
    'pill.soon':   ['Coming soon', 'Muy pronto', 'Em breve', 'Segera hadir', 'Malapit na'],

    'perk1.t': ['Play instantly', 'Juega al instante', 'Jogue na hora', 'Main langsung', 'Laro agad'],
    'perk1.d': ['Every game runs right here in your browser.',
                'Todos los juegos funcionan aquí mismo, en tu navegador.',
                'Todos os jogos rodam aqui mesmo, no seu navegador.',
                'Semua game jalan langsung di browser kamu.',
                'Tumatakbo ang bawat laro dito mismo sa browser mo.'],
    'perk2.t': ['Fair by design', 'Justo por diseño', 'Justo de verdade', 'Adil sejak awal', 'Patas talaga'],
    'perk2.d': ['Skill decides your score. Ads are always your choice.',
                'Tu habilidad decide tu puntuación. Los anuncios siempre son tu elección.',
                'Sua habilidade decide a pontuação. Anúncios são sempre escolha sua.',
                'Skor ditentukan oleh skill kamu. Iklan selalu pilihan kamu.',
                'Galing mo ang nagpapasya sa score mo. Ikaw ang pipili kung manonood ng ad.'],
    'perk3.t': ['On Android soon', 'Pronto en Android', 'Em breve no Android', 'Segera di Android', 'Malapit na sa Android'],
    'perk3.d': ['Google Play versions are on the way.',
                'Las versiones para Google Play ya vienen en camino.',
                'As versões para Google Play estão a caminho.',
                'Versi Google Play sedang disiapkan.',
                'Parating na ang mga bersyon sa Google Play.'],

    'notify.title': ['Be first on Google Play', 'Sé el primero en Google Play', 'Seja o primeiro no Google Play', 'Jadi yang pertama di Google Play', 'Mauna sa Google Play'],
    'notify.text':  ["Drop your email and we'll tell you when our games land on Android. Nothing else, ever.",
                     'Déjanos tu correo y te avisaremos cuando nuestros juegos lleguen a Android. Nada más.',
                     'Deixe seu e-mail e avisaremos quando nossos jogos chegarem ao Android. Só isso.',
                     'Tinggalkan email kamu, nanti kami kabari saat game kami rilis di Android. Itu saja.',
                     'Iwan ang email mo at sasabihan ka namin kapag nasa Android na ang mga laro namin. Iyon lang.'],
    'notify.email': ['you@email.com', 'tu@correo.com', 'voce@email.com', 'kamu@email.com', 'ikaw@email.com'],
    'notify.fine':  ['Unsubscribe any time. See our <a href="/privacy/">privacy policy</a>.',
                     'Puedes darte de baja cuando quieras. Lee nuestra <a href="/privacy/">política de privacidad</a>.',
                     'Cancele quando quiser. Veja nossa <a href="/privacy/">política de privacidade</a>.',
                     'Bisa berhenti berlangganan kapan saja. Lihat <a href="/privacy/">kebijakan privasi</a> kami.',
                     'Puwede kang mag-unsubscribe kahit kailan. Basahin ang aming <a href="/privacy/">privacy policy</a>.'],

    'contact.title':   ['Say hi', 'Escríbenos', 'Fale com a gente', 'Sapa kami', 'Kumusta!'],
    'contact.text':    ['Found a bug, got an idea, or want to work together? Send us a message.',
                        '¿Encontraste un error, tienes una idea o quieres trabajar con nosotros? Envíanos un mensaje.',
                        'Achou um bug, teve uma ideia ou quer trabalhar com a gente? Mande uma mensagem.',
                        'Nemu bug, punya ide, atau mau kerja sama? Kirim pesan ke kami.',
                        'May nakitang bug, may idea, o gustong makipag-collab? Mag-message ka sa amin.'],
    'contact.email':   ['Your email', 'Tu correo', 'Seu e-mail', 'Email kamu', 'Email mo'],
    'contact.message': ['Your message', 'Tu mensaje', 'Sua mensagem', 'Pesan kamu', 'Mensahe mo'],
    'contact.send':    ['Send', 'Enviar', 'Enviar', 'Kirim', 'Ipadala'],
    'topic.game':  ['About a game', 'Sobre un juego', 'Sobre um jogo', 'Tentang game', 'Tungkol sa laro'],
    'topic.bug':   ['Bug report', 'Reportar un error', 'Relatar um bug', 'Lapor bug', 'Mag-report ng bug'],
    'topic.biz':   ['Business', 'Negocios', 'Negócios', 'Bisnis', 'Negosyo'],
    'topic.other': ['Something else', 'Otra cosa', 'Outro assunto', 'Lainnya', 'Iba pa'],

    'footer.privacy':    ['Privacy', 'Privacidad', 'Privacidade', 'Privasi', 'Privacy'],
    'footer.appPrivacy': ['Orbit Rush app privacy', 'Privacidad de la app Orbit Rush', 'Privacidade do app Orbit Rush', 'Privasi aplikasi Orbit Rush', 'Privacy ng Orbit Rush app'],

    'game.gameplay':    ['Gameplay', 'Gameplay', 'Gameplay', 'Gameplay', 'Gameplay'],
    'game.soonTo':      ['Coming soon to', 'Muy pronto en', 'Em breve no', 'Segera hadir di', 'Malapit na sa'],
    'game.soonBadge':   ['Soon', 'Pronto', 'Em breve', 'Segera', 'Malapit na'],
    'game.how':         ['How to play', 'Cómo jugar', 'Como jogar', 'Cara main', 'Paano laruin'],
    'game.shots':       ['Screenshots', 'Capturas', 'Capturas de tela', 'Tangkapan layar', 'Mga screenshot'],
    'game.swipe':       ['Swipe', 'Desliza', 'Deslize', 'Geser', 'I-swipe'],
    'game.notifyTitle': ['Get it on Android first', 'Tenlo primero en Android', 'Tenha primeiro no Android', 'Dapatkan duluan di Android', 'Unahin sa Android'],
    'game.notifyText':  ["We'll send one email when {name} is live on Google Play.",
                         'Te enviaremos un solo correo cuando {name} esté en Google Play.',
                         'Enviaremos um único e-mail quando {name} estiver no Google Play.',
                         'Kami akan kirim satu email saat {name} sudah ada di Google Play.',
                         'Magpapadala kami ng isang email kapag live na ang {name} sa Google Play.'],
    'game.inDev':       ['In development', 'En desarrollo', 'Em desenvolvimento', 'Sedang dikembangkan', 'Ginagawa pa'],
    'game.soonText':    ["{name} is still being built. Want to know the moment it's ready?",
                         '{name} todavía está en desarrollo. ¿Quieres saber en cuanto esté listo?',
                         '{name} ainda está sendo feito. Quer saber assim que ficar pronto?',
                         '{name} masih dalam pengerjaan. Mau dikabari begitu siap?',
                         'Ginagawa pa ang {name}. Gusto mo bang malaman agad kapag handa na?'],
    'game.notFound':    ["That game isn't here yet.", 'Ese juego todavía no está aquí.', 'Esse jogo ainda não está aqui.', 'Game itu belum ada di sini.', 'Wala pa rito ang larong iyan.'],

    'thanks.pill':  ['Got it', '¡Listo!', 'Pronto!', 'Beres', 'Ayos!'],
    'thanks.title': ['Thanks!', '¡Gracias!', 'Valeu!', 'Terima kasih!', 'Salamat!'],
    'thanks.text':  ["You're on the list. While you wait, how far can you orbit?",
                     'Ya estás en la lista. Mientras esperas, ¿hasta dónde llegas en órbita?',
                     'Você está na lista. Enquanto espera, até onde você consegue orbitar?',
                     'Kamu sudah masuk daftar. Sambil menunggu, seberapa jauh kamu bisa mengorbit?',
                     'Nasa listahan ka na. Habang naghihintay, gaano kalayo ang kaya mong i-orbit?'],
    'thanks.cta':   ['Play {name}', 'Jugar {name}', 'Jogar {name}', 'Main {name}', 'Laruin ang {name}'],

    'nf.title': ['Lost in orbit', 'Perdido en órbita', 'Perdido em órbita', 'Tersesat di orbit', 'Naligaw sa orbit'],
    'nf.text':  ["That page drifted off. Let's get you back.", 'Esa página se fue a la deriva. Te llevamos de vuelta.', 'Essa página saiu de órbita. Vamos voltar.', 'Halaman itu melayang entah ke mana. Ayo kembali.', 'Lumutang palayo ang page na iyan. Balik na tayo.'],
    'nf.home':  ['Home', 'Inicio', 'Início', 'Beranda', 'Home'],

    'pv.title':   ['Privacy Policy', 'Política de privacidad', 'Política de privacidade', 'Kebijakan Privasi', 'Patakaran sa Privacy'],
    'pv.updated': ['Last updated: [DATE]. Covers this website. Each app has its own policy, linked below.',
                   'Última actualización: [DATE]. Aplica a este sitio web. Cada app tiene su propia política, enlazada abajo. Si esta traducción difiere de la versión en inglés, prevalece la versión en inglés.',
                   'Última atualização: [DATE]. Vale para este site. Cada app tem sua própria política, com link abaixo. Se esta tradução divergir da versão em inglês, vale a versão em inglês.',
                   'Terakhir diperbarui: [DATE]. Berlaku untuk situs ini. Setiap aplikasi punya kebijakan sendiri, tautannya ada di bawah. Jika terjemahan ini berbeda dari versi bahasa Inggris, versi bahasa Inggris yang berlaku.',
                   'Huling na-update: [DATE]. Para sa website na ito. May sariling patakaran ang bawat app, naka-link sa ibaba. Kapag may pagkakaiba sa salin na ito at sa bersyong Ingles, ang Ingles ang masusunod.'],
    'pv.intro':   ['This website is run by [ETS HOLDINGS PTY LTD] (ABN [ABN]), Australia, trading as Ebon Tide Studios ("we", "us").',
                   'Este sitio web lo gestiona [ETS HOLDINGS PTY LTD] (ABN [ABN]), Australia, bajo el nombre comercial Ebon Tide Studios ("nosotros").',
                   'Este site é operado por [ETS HOLDINGS PTY LTD] (ABN [ABN]), Austrália, com o nome comercial Ebon Tide Studios ("nós").',
                   'Situs ini dikelola oleh [ETS HOLDINGS PTY LTD] (ABN [ABN]), Australia, dengan nama dagang Ebon Tide Studios ("kami").',
                   'Ang website na ito ay pinapatakbo ng [ETS HOLDINGS PTY LTD] (ABN [ABN]), Australia, sa pangalang Ebon Tide Studios ("kami").'],
    'pv.h1': ['What we collect', 'Qué recopilamos', 'O que coletamos', 'Apa yang kami kumpulkan', 'Ano ang kinokolekta namin'],
    'pv.p1': ['Only what you choose to send us. If you sign up for updates we keep your email address, the games you picked and your language. If you use the contact form we keep your email address and message. We use these only to send the updates you asked for or to reply to you.',
              'Solo lo que decidas enviarnos. Si te suscribes a las novedades, guardamos tu correo, los juegos que elegiste y tu idioma. Si usas el formulario de contacto, guardamos tu correo y tu mensaje. Los usamos únicamente para enviarte las novedades que pediste o para responderte.',
              'Só o que você decidir nos enviar. Se você se inscrever para novidades, guardamos seu e-mail, os jogos escolhidos e seu idioma. Se usar o formulário de contato, guardamos seu e-mail e sua mensagem. Usamos isso apenas para enviar as novidades que você pediu ou para responder a você.',
              'Hanya yang kamu pilih untuk dikirim. Jika kamu mendaftar untuk kabar terbaru, kami menyimpan email, game yang kamu pilih, dan bahasamu. Jika kamu memakai formulir kontak, kami menyimpan email dan pesanmu. Kami hanya memakainya untuk mengirim kabar yang kamu minta atau untuk membalasmu.',
              'Ang pinipili mo lang na ipadala sa amin. Kapag nag-sign up ka para sa balita, itinatago namin ang email mo, ang mga larong pinili mo at ang wika mo. Kapag ginamit mo ang contact form, itinatago namin ang email at mensahe mo. Ginagamit lang namin ang mga ito para ipadala ang balitang hiniling mo o para sumagot sa iyo.'],
    'pv.h2': ['Where it is stored', 'Dónde se guarda', 'Onde fica armazenado', 'Di mana disimpan', 'Saan ito itinatago'],
    'pv.p2': ['Form submissions are stored by our website host, Netlify, Inc., which may process data outside Australia. We do not sell or share your details with anyone else.',
              'Los formularios enviados los guarda nuestro proveedor de hosting, Netlify, Inc., que puede procesar datos fuera de Australia. No vendemos ni compartimos tus datos con nadie más.',
              'Os formulários enviados são armazenados pela nossa hospedagem, Netlify, Inc., que pode processar dados fora da Austrália. Não vendemos nem compartilhamos seus dados com mais ninguém.',
              'Isi formulir disimpan oleh penyedia hosting kami, Netlify, Inc., yang mungkin memproses data di luar Australia. Kami tidak menjual atau membagikan datamu kepada siapa pun.',
              'Ang mga form na ipinadala ay itinatago ng aming website host, ang Netlify, Inc., na maaaring magproseso ng data sa labas ng Australia. Hindi namin ibinebenta o ibinabahagi ang detalye mo kaninuman.'],
    'pv.h3': ['Games and your language choice', 'Los juegos y tu idioma', 'Os jogos e seu idioma', 'Game dan pilihan bahasamu', 'Ang mga laro at ang wikang pinili mo'],
    'pv.p3': ["Browser games save scores and settings only in your own browser's storage, and this site remembers your chosen language there too. We do not receive any of it, and clearing your browser data removes it.",
              'Los juegos de navegador guardan puntuaciones y ajustes solo en el almacenamiento de tu propio navegador, y este sitio también recuerda ahí el idioma que elegiste. No recibimos nada de eso, y si borras los datos del navegador se elimina.',
              'Os jogos de navegador salvam pontuações e configurações apenas no armazenamento do seu próprio navegador, e este site também guarda lá o idioma escolhido. Não recebemos nada disso, e limpar os dados do navegador apaga tudo.',
              'Game browser menyimpan skor dan pengaturan hanya di penyimpanan browsermu sendiri, dan situs ini juga mengingat bahasa pilihanmu di sana. Kami tidak menerima data itu, dan menghapus data browser akan menghapusnya.',
              'Sa sarili mong browser lang itinatago ng mga browser game ang score at settings, at doon din tinatandaan ng site na ito ang wikang pinili mo. Hindi namin natatanggap ang alinman dito, at mabubura ito kapag nilinis mo ang browser data.'],
    'pv.h4': ['Your choices', 'Tus opciones', 'Suas escolhas', 'Pilihanmu', 'Ang mga pagpipilian mo'],
    'pv.p4': ['Every update email has an unsubscribe link. To see, correct or delete what we hold about you, use the <a href="/#contact">contact form</a> and we\'ll respond within 30 days.',
              'Cada correo de novedades incluye un enlace para darte de baja. Para ver, corregir o borrar los datos que tenemos sobre ti, usa el <a href="/#contact">formulario de contacto</a> y te responderemos en un plazo de 30 días.',
              'Todo e-mail de novidades tem um link para cancelar. Para ver, corrigir ou apagar os dados que temos sobre você, use o <a href="/#contact">formulário de contato</a> e responderemos em até 30 dias.',
              'Setiap email kabar terbaru punya tautan berhenti berlangganan. Untuk melihat, memperbaiki, atau menghapus data kamu yang kami simpan, gunakan <a href="/#contact">formulir kontak</a> dan kami akan membalas dalam 30 hari.',
              'May unsubscribe link ang bawat email ng balita. Para makita, maitama o mabura ang hawak naming detalye mo, gamitin ang <a href="/#contact">contact form</a> at sasagot kami sa loob ng 30 araw.'],
    'pv.h5': ['App privacy policies', 'Políticas de privacidad de las apps', 'Políticas de privacidade dos apps', 'Kebijakan privasi aplikasi', 'Mga privacy policy ng app']
  };

  var CODES = LANGS.map(function (l) { return l.code; });

  function norm(code) {
    if (!code) return null;
    var c = String(code).toLowerCase();
    for (var i = 0; i < CODES.length; i++) if (CODES[i].toLowerCase() === c) return CODES[i];
    var p = c.split(/[-_]/)[0];
    if (p === 'es') return 'es';
    if (p === 'pt') return 'pt-BR';
    if (p === 'id' || p === 'in' || p === 'ms') return 'id';
    if (p === 'fil' || p === 'tl') return 'fil';
    if (p === 'en') return 'en';
    return null;
  }

  function store(code) { try { localStorage.setItem(STORAGE_KEY, code); } catch (e) {} }
  function stored() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }

  // Order: ?lang= in the URL, then the visitor's saved choice, then the phone/browser language, then English.
  function detect() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    var fromUrl = norm(q);
    if (fromUrl) { store(fromUrl); return fromUrl; }
    var saved = norm(stored());
    if (saved) return saved;
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language];
    for (var i = 0; i < list.length; i++) { var n = norm(list[i]); if (n) return n; }
    return 'en';
  }

  var current = detect();
  var listeners = [];

  function idx(code) { var i = CODES.indexOf(code || current); return i < 0 ? 0 : i; }
  function fill(str, vars) {
    return vars ? str.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; }) : str;
  }
  function t(key, vars) {
    var row = S[key];
    if (!row) return key;
    return fill(row[idx()] || row[0], vars);
  }
  // Per-game text: pick this language, fall back to English field by field.
  function pick(textByLang, field) {
    var mine = textByLang[current] || {};
    var v = mine[field];
    if (v == null || v === '' || (Array.isArray(v) && !v.length)) v = (textByLang.en || {})[field];
    return v;
  }
  // Adds ?lang=<code> to a link so games on other domains open in the same language.
  function withLang(url) {
    if (!url) return url;
    var hashAt = url.indexOf('#');
    var hash = hashAt >= 0 ? url.slice(hashAt) : '';
    var base = hashAt >= 0 ? url.slice(0, hashAt) : url;
    base = base.replace(/([?&])lang=[^&]*(&|$)/, function (m, a, b) { return b ? a : ''; }).replace(/[?&]$/, '');
    return base + (base.indexOf('?') >= 0 ? '&' : '?') + 'lang=' + encodeURIComponent(current) + hash;
  }
  function set(code) {
    var n = norm(code) || 'en';
    current = n;
    store(n);
    listeners.forEach(function (fn) { fn(n); });
  }

  window.ETS_I18N = {
    LANGS: LANGS, STORAGE_KEY: STORAGE_KEY,
    get lang() { return current; },
    t: t, pick: pick, withLang: withLang, set: set, norm: norm,
    onChange: function (fn) { listeners.push(fn); }
  };
  document.documentElement.lang = current;
})();
