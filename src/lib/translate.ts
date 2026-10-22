// Regras do seletor de idioma (Google Tradutor). Sem acesso ao DOM, para poder testar.

export type Lang = { google: string; name: string; flag: "BR" | "US" | "ES" | "IT" | "RU" | "IL" | "JP"; rtl?: boolean };

export const SOURCE_LANG = "pt";

// `google` é o código que o widget usa: hebraico ainda é "iw"
export const LANGS: Lang[] = [
  { google: "pt", name: "Português", flag: "BR" },
  { google: "en", name: "English", flag: "US" },
  { google: "es", name: "Español", flag: "ES" },
  { google: "it", name: "Italiano", flag: "IT" },
  { google: "ru", name: "Русский", flag: "RU" },
  { google: "iw", name: "עברית", flag: "IL", rtl: true },
  { google: "ja", name: "日本語", flag: "JP" },
];

/** Idioma ativo a partir do cookie `googtrans` (ex.: "/pt/en" → "en"). */
export function langFromCookie(cookie: string): string {
  const m = cookie.match(/(?:^|;\s*)googtrans=\/[^/;]*\/([^;]+)/);
  const lang = m ? decodeURIComponent(m[1]).trim() : SOURCE_LANG;
  return LANGS.some((l) => l.google === lang) ? lang : SOURCE_LANG;
}

/** Valor do cookie `googtrans` para um idioma; null significa "voltar ao original". */
export function cookieValueFor(lang: string): string | null {
  return lang === SOURCE_LANG ? null : `/${SOURCE_LANG}/${lang}`;
}

/** Idioma do navegador (ex.: "es-AR", "he-IL") convertido para um código disponível, ou null. */
export function langFromBrowser(navigatorLanguage: string | undefined): string | null {
  if (!navigatorLanguage) return null;
  const base = navigatorLanguage.slice(0, 2).toLowerCase();
  const google = base === "he" ? "iw" : base;
  if (google === SOURCE_LANG) return null;
  return LANGS.some((l) => l.google === google) ? google : null;
}

export const isRtl = (lang: string) => LANGS.some((l) => l.google === lang && l.rtl);

/** Rótulo curto do botão (HE em vez de IW, que é o código interno do Google). */
export const shortLabel = (lang: string) => (lang === "iw" ? "HE" : lang.toUpperCase());
