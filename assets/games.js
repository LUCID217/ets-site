/* Ebon Tide Studios: the game list. The home page grid, the signup checkboxes and every page at
 * /games/<id>/ are built from this file, so adding a game only means adding an entry here.
 * See README.md for the steps. Text missing in a language falls back to English.
 *
 * Fields:
 *   id        url name, lowercase-with-dashes. The page will be /games/<id>/
 *   status    'live' (has a Play button) or 'soon' (shows "Coming soon" + notify signup)
 *   featured  true for the game shown big at the top of the home page (one game)
 *   playUrl   where Play goes. ?lang=<code> is added automatically.
 *   cover     16:10 card art.   hero: tall phone screenshot.   clip: optional 9:16 .mp4
 *   shots     tall screenshots for the game page (optional)
 *   theme     the game's own look on its card, banner and page (the studio look stays around it):
 *             bg (CSS background), a1/a2 (button gradient), edge (button shadow), btnInk (button text),
 *             hot (badge colour), font (display font name; must be loaded in site.css)
 *   text      per language: name, genre, hook, short, tagline, how: [[title, line], ...]
 */
window.ETS_GAMES = [
  {
    id: 'orbit-rush',
    status: 'live',
    featured: true,
    playUrl: 'https://ets-orbit-rush.netlify.app/',
    theme: { bg: 'linear-gradient(170deg, #2f6bff, #6a3df5 48%, #b04bf0 78%, #ff4fa0)', a1: '#ffe86b', a2: '#ffb01f', edge: '#d98a00', btnInk: '#5a2a00', hot: '#ff4fa0', font: 'Lilita One' },
    cover: '/assets/img/covers/orbit-rush.svg',
    hero: '/assets/img/or-play.jpg',
    clip: '/media/orbit-rush.mp4',
    shots: ['/assets/img/or-menu.jpg', '/assets/img/or-play.jpg', '/assets/img/or-loss.jpg', '/assets/img/or-shop.jpg'],
    text: {
      en: {
        name: 'Orbit Rush',
        genre: 'Arcade · One tap · Free',
        hook: 'One tap. One orbit. Land in the next ring and see how far you can go.',
        short: 'A one-tap arcade game. Time your release, chain perfect landings, hit FEVER.',
        tagline: 'Your dot is spinning around a ring. Tap to let go, fly into the next ring, and keep the chain alive.',
        how: [['Tap to release', 'Let go of the ring at the right moment.'],
              ['Land it perfect', 'Hit the centre to build your combo.'],
              ['Hit FEVER', 'Chain 5 perfects and the whole screen lights up.'],
              ['Unlock worlds', 'Earn coins and XP for new colours, skins and worlds.']]
      },
      es: {
        genre: 'Arcade · Un toque · Gratis',
        hook: 'Un toque. Una órbita. Aterriza en el siguiente anillo y descubre hasta dónde llegas.',
        short: 'Un juego arcade de un solo toque. Suelta en el momento justo, encadena aterrizajes perfectos y entra en FEVER.',
        tagline: 'Tu punto gira alrededor de un anillo. Toca para soltarlo, vuela al siguiente anillo y mantén viva la racha.',
        how: [['Toca para soltar', 'Suelta el anillo en el momento justo.'],
              ['Aterrizaje perfecto', 'Da en el centro para subir tu combo.'],
              ['Entra en FEVER', 'Encadena 5 perfectos y toda la pantalla se ilumina.'],
              ['Desbloquea mundos', 'Gana monedas y XP para nuevos colores, skins y mundos.']]
      },
      'pt-BR': {
        genre: 'Arcade · Um toque · Grátis',
        hook: 'Um toque. Uma órbita. Pouse no próximo anel e veja até onde você vai.',
        short: 'Um jogo arcade de um toque só. Solte na hora certa, encadeie pousos perfeitos e entre em FEVER.',
        tagline: 'Seu ponto gira em volta de um anel. Toque para soltar, voe até o próximo anel e mantenha a sequência viva.',
        how: [['Toque para soltar', 'Solte o anel no momento certo.'],
              ['Pouso perfeito', 'Acerte o centro para aumentar o combo.'],
              ['Entre em FEVER', 'Faça 5 perfeitos seguidos e a tela inteira se acende.'],
              ['Desbloqueie mundos', 'Ganhe moedas e XP para novas cores, skins e mundos.']]
      },
      id: {
        genre: 'Arcade · Satu ketukan · Gratis',
        hook: 'Satu ketukan. Satu orbit. Mendarat di cincin berikutnya dan lihat seberapa jauh kamu bisa.',
        short: 'Game arcade satu ketukan. Lepas di waktu yang pas, rangkai pendaratan sempurna, masuk mode FEVER.',
        tagline: 'Titikmu berputar mengelilingi cincin. Ketuk untuk melepas, terbang ke cincin berikutnya, dan jaga rantainya tetap hidup.',
        how: [['Ketuk untuk melepas', 'Lepaskan cincin di saat yang tepat.'],
              ['Mendarat sempurna', 'Kenai bagian tengah untuk menambah combo.'],
              ['Masuk FEVER', 'Rangkai 5 perfect dan seluruh layar menyala.'],
              ['Buka dunia baru', 'Kumpulkan koin dan XP untuk warna, skin, dan dunia baru.']]
      },
      fil: {
        genre: 'Arcade · Isang tap · Libre',
        hook: 'Isang tap. Isang orbit. Lumapag sa susunod na ring at tingnan kung gaano ka kalayo.',
        short: 'Arcade game na isang tap lang. Bumitaw sa tamang tiyempo, sunud-sunurin ang perfect landing, at umabot sa FEVER.',
        tagline: 'Umiikot ang tuldok mo sa isang ring. I-tap para bumitaw, lumipad papunta sa susunod na ring, at panatilihing buhay ang chain.',
        how: [['I-tap para bumitaw', 'Bitawan ang ring sa tamang sandali.'],
              ['Perfect landing', 'Tamaan ang gitna para lumaki ang combo mo.'],
              ['Umabot sa FEVER', 'Makakuha ng 5 perfect nang sunod-sunod at liliwanag ang buong screen.'],
              ['Mag-unlock ng worlds', 'Mag-ipon ng coins at XP para sa bagong kulay, skin at world.']]
      }
    }
  },
  {
    id: 'solar-surfer',
    status: 'soon',
    theme: { bg: 'linear-gradient(165deg, #1c0f3a, #4a1f7a 50%, #e8641a)', a1: '#ffd27a', a2: '#ff8a2a', edge: '#b4500c', btnInk: '#3a1400', hot: '#ff6a1a', font: 'Lilita One' },
    cover: '/assets/img/world/vox-ignis.webp',
    text: {
      en:      { name: 'Solar Surfer', short: 'Ride the solar winds across the sky.' },
      es:      { short: 'Surfea los vientos solares por el cielo.' },
      'pt-BR': { short: 'Surfe os ventos solares pelo céu.' },
      id:      { short: 'Berselancar di angin matahari melintasi langit.' },
      fil:     { short: 'Mag-surf sa solar wind sa kalangitan.' }
    }
  },
  {
    id: 'monster-fusion-tycoon',
    status: 'soon',
    theme: { bg: 'linear-gradient(160deg, #1fd39a, #14a89a 45%, #3a1f9e)', a1: '#ffe86b', a2: '#ffb01f', edge: '#c98a00', btnInk: '#4a2200', hot: '#ff4fa0', font: 'Lilita One' },
    cover: '/assets/img/covers/monster-fusion-tycoon.webp',
    text: {
      en:      { name: 'Monster Fusion Tycoon', short: 'Fuse monsters and grow your empire.' },
      es:      { short: 'Fusiona monstruos y haz crecer tu imperio.' },
      'pt-BR': { short: 'Funda monstros e faça seu império crescer.' },
      id:      { short: 'Gabungkan monster dan bangun kerajaanmu.' },
      fil:     { short: 'Pagsamahin ang mga halimaw at palaguin ang imperyo mo.' }
    }
  }
];
