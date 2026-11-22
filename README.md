# Ebon Tide Studios website

The studio brand on the page is **Ebon Tide Studios**; the web address stays `ets-games.netlify.app`.

A plain static site. To publish it, drag this whole folder onto the **Deploys** tab of the `ets-games` site on Netlify. There's no build step.

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
| `assets/site.css` | Two layers: the studio look (dark, tidal, serif) and each game's own look (`.gtheme`, coloured by the game's `theme`). |
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
4. Drag the folder onto Netlify.

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
