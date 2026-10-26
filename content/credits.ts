/** Footer credits. Keep every music entry here that the site actually plays:
 *  CC BY tracks MUST stay credited (title, author, source, licence) for as long as they're used. */

export const INSPIRATION = {
  work: "Reverend Insanity",
  author: "Gu Zhen Ren",
  url: "https://en.wikipedia.org/wiki/Reverend_Insanity",
  note: "An unofficial fan tribute, not affiliated with the author or publishers. The quotes on this site are original lines written in its spirit.",
};

export type Credit = {
  title: string;
  author: string;
  source: string;
  licence: string;
  licenceUrl?: string;
  /** which path plays it */
  use?: string;
};

export const MUSIC: Credit[] = [
  {
    title: "Lotus Pond",
    author: "Bite Me Games",
    source: "https://bitemegames.itch.io/chinese-game-music",
    licence: "CC0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    use: "Righteous",
  },
  {
    title: "Dark Zen",
    author: "Tsorthan Grove",
    source: "https://opengameart.org/content/dark-zen",
    licence: "CC BY 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by/4.0/",
    use: "Demonic",
  },
  // Alternatives — move into the list above if you switch tracks:
  // { title: "Dark Ambient Drone", author: "Tsorthan Grove", source: "https://opengameart.org/content/dark-ambient-drone", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0/" },
  // { title: "By The Quiet Water", author: "kaazoom", source: "<the track page on Pixabay>", licence: "Pixabay Content License", licenceUrl: "https://pixabay.com/service/license-summary/" },
  // { title: "Mist On The Crimson River", author: "kaazoom", source: "<the track page on Pixabay>", licence: "Pixabay Content License", licenceUrl: "https://pixabay.com/service/license-summary/" },
  // { title: "Imperial China Cinematic", author: "Shane Ivers", source: "https://www.silvermansound.com/free-music/imperial-china-cinematic", licence: "CC BY 4.0", licenceUrl: "https://creativecommons.org/licenses/by/4.0/" },
];

export const FONTS = {
  names: ["Cormorant Garamond", "Inter", "IBM Plex Mono", "Ma Shan Zheng"],
  licence: "SIL Open Font License",
  licenceUrl: "https://openfontlicense.org",
};

export const ART = "3D renders and hero scenes made for this site with three.js.";
