# Ebon Tide Studios website

The studio brand on the page is **Ebon Tide Studios**; the web address stays `ets-games.netlify.app`.

A plain static site with no build step. Pushing to `main` publishes it (see Deploys below).

Live: https://ets-games.netlify.app · Orbit Rush itself: https://ets-orbit-rush.netlify.app

## Languages

The site speaks English, Spanish, Portuguese (Brazil), Indonesian and Filipino.

- **Picking the language:** a `?lang=` in the link wins first. Next comes the visitor's earlier choice, then their phone or browser language, and English last.
- **Switcher:** the globe button in the header. The choice is saved in the browser under `ets.lang`.
- **Codes:** `en`, `es`, `pt-BR`, `id`, `fil`. The games use the same codes.
- **Passing it to games:** every Play button adds `?lang=<code>` to the game's link, so a game on another domain opens in the same language.
- **Missing text:** if a translation is missing, the English text shows instead, so nothing is ever blank.

| File | What's in it |
|---|---|
| `assets/i18n.js` | Every word of the site's buttons, menus, forms and pages, in all 5 languages. Also the language detection. |
| `assets/games.js` | The game list: each game's name, descriptions, how-to-play, art and play link, per language. |
| `assets/site.css` | Two layers: the studio look, taken from the Ebon Tide world bible and concept art (tar-black sea, brass, lantern ember, phosphorous green, Cinzel capitals), and each game's own look (`.gtheme`, coloured by the game's `theme`). |
| `assets/img/world/` | Ebon Tide concept art used by the studio pages (Fool's Hope, Tide's Fang, the Dominion medallion, the looking glass) and the Solar Surfer cover. |
| `assets/site.js` | Builds the pages from those two files. You shouldn't need to touch it. |

## Add a new game

You only need to change `assets/games.js`. The home page card, the signup checkbox and the game's own page at `/games/<id>/` all appear automatically, in every language.

1. Put a 16:10 cover image in `assets/img/covers/<id>.svg` (or `.jpg` / `.png`). If the game is live, also add a tall phone screenshot or two in `assets/img/`.
2. Copy an existing entry in `assets/games.js` and change it:
   - `id`: the address, lowercase with dashes, e.g. `solar-surfer`
   - `status`: `'soon'` while in development, `'live'` once people can play it. Live games get a Play button.
   - `playUrl`: where Play goes, e.g. `https://ets-solar-surfer.netlify.app/`
   - `theme`: the game's own colours and display font for its card, home banner and page, e.g. `bg`, `a1`/`a2` (button colours), `hot` (badge colour). The studio look stays around it.
   - `cover`, `hero`, `shots`, `clip`: image and video paths. Leave out any you don't have yet.
   - `text.en`: the English `name`, `genre`, `hook`, `short`, `tagline` and `how`
3. Fill in `text.es`, `text['pt-BR']`, `text.id` and `text.fil` with the same fields. You only need fields that differ, because the name usually stays the same. Easiest is to ask Claude to "translate the new game entry in games.js".
4. Push to `main`.

To move a game from "coming soon" to playable, change its `status` to `'live'` and add its `playUrl`.

## Add a new language

1. Add it to `LANGS` at the top of `assets/i18n.js`, and teach `norm()` its browser codes.
2. Add one more item to the end of every line in `assets/i18n.js`. If you skip a line, it shows in English.
3. Add a `text.<code>` block to each game in `assets/games.js`.

## Add words to a page

In the HTML, mark the element with `data-i18n="some.key"`. Use `data-i18n-ph` for placeholder text, or `data-i18n-html` if the text contains a link. Then add `'some.key': [English, Spanish, Portuguese, Indonesian, Filipino]` to `assets/i18n.js`.

## Other bits

- **Forms:** "Notify me" and "Contact" use Netlify Forms. Form detection must be on under Project configuration → Forms. Each submission records the visitor's language in a `lang` field, so you know which language to reply in.
- **Game pages:** all game pages are one file, `games/game.html`. The rule in `_redirects` sends every `/games/<id>/` address to it.
- **Old links:** old `/play/orbit-rush/` links redirect to the Orbit Rush site.
- **Gameplay clip:** put the 9:16 clip at `media/orbit-rush.mp4`. Keep it muted, H.264 and under about 4 MB. Until then a screenshot shows.
- **App privacy policy:** `privacy/orbit-rush.html` is the Orbit Rush app policy for Google Play. It's still English only, and its `[PLACEHOLDERS]` need the company details once ETS Holdings is registered. The website policy is `privacy/index.html`, and it is translated.

## Deploys

Pushing to `main` deploys this automatically on Netlify (project ets-games).

Last deploy test: 2026-11-22.

## Social links and traffic counting

- **Link-in-bio page:** `/links/` has Play, Android signup, the studio site and the social accounts. Turn an account on in `assets/socials.js` (`on: true`) once it exists.
- **Tracked short links:** put these in each platform's bio so the site knows where people came from. They're set in `_redirects`.

  | Platform | Bio link |
  |---|---|
  | TikTok | `ets-games.netlify.app/tt` |
  | YouTube | `ets-games.netlify.app/yt` |
  | Instagram | `ets-games.netlify.app/ig` |
  | Facebook | `ets-games.netlify.app/fb` |
  | X | `ets-games.netlify.app/x` |
  | Threads / Discord / Reddit | `/th`, `/dc`, `/rd` |

  Any page also takes `?ref=<name>` (or `utm_source=`) for one-off links and ad campaigns, e.g. `/?ref=tt-ads-br`. No code change is needed for a new name.
- **The counter:** `assets/track.js` sends one *visit* per browser session, a *play* for each Play click and a *signup* for each "Notify me" form. It also passes `ref` on to the game and into the forms' `ref` field. Links from TikTok, YouTube etc. without a tag are still recognised from the referring site.
- **Where the numbers go:** two Netlify Functions in `netlify/functions/` keep daily totals in Netlify Blobs (store `ets-stats`): source, country, language and game. No cookies, IP addresses or IDs. See them at **`/stats/`** (unlisted, not indexed). The privacy page explains this under "Counting visits".
- `package.json` exists only so Netlify installs `@netlify/blobs` for the functions. There is still no build step.
