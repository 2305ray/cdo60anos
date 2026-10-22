import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/**
 * Paleta do site. Todas as cores saem daqui:
 * - nas classes do Tailwind: bg-gold, text-navy-500, border-gold-600, fill-dist-near…
 * - no CSS: var(--color-gold-400), var(--color-navy-800)…
 * - em código que não usa CSS (imagem de compartilhamento, cor da barra do navegador): import { palette }
 *
 * Não escreva cor solta (#hex) nos componentes: use uma destas.
 */
export const palette = {
  // o dourado do evento (gold = gold-400)
  gold: {
    50: "#fff9e6",
    100: "#fff4cc",
    200: "#ffe28a",
    300: "#ffd666",
    400: "#ffc93c",
    500: "#f0b400",
    600: "#e0a800",
    700: "#a67c00",
    800: "#5a4500",
    DEFAULT: "#ffc93c",
  },
  // os azuis, do fundo claro da página ao azul-marinho (navy = navy-800)
  navy: {
    50: "#eef4ff",
    100: "#dce6ff",
    200: "#c9d7f5",
    300: "#afc0ee",
    400: "#6e83c2",
    500: "#3a4c82",
    600: "#1c46c9",
    700: "#0e2a86",
    800: "#0a1c5e",
    900: "#071444",
    950: "#06103a",
    DEFAULT: "#0a1c5e",
  },
  sky: "#5fb8f5",
  sand: "#f2ece0", // fundo do mapa de hotéis
  success: "#1a8f3c",
  // faixas de distância dos hotéis (verde / laranja / vermelho)
  dist: { near: "#22a447", mid: "#f2711c", far: "#d33a2c" },
  // cores de marcas externas
  whatsapp: { DEFAULT: "#128c4a", dark: "#0b5e31" },
  booking: { DEFAULT: "#003580", dark: "#00224f" },
} as const;

type Shades = string | { readonly [shade: string]: string };

/** { gold: { 400: "#…", DEFAULT: "#…" } } → { "--color-gold-400": "#…", "--color-gold": "#…" } */
export function paletteToCssVars(colors: Record<string, Shades>) {
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(colors)) {
    if (typeof value === "string") vars[`--color-${name}`] = value;
    else
      for (const [shade, hex] of Object.entries(value))
        vars[shade === "DEFAULT" ? `--color-${name}` : `--color-${name}-${shade}`] = hex;
  }
  return vars;
}

export default {
  theme: {
    extend: {
      colors: palette,
    },
  },
  // Com o arquivo de config, o Tailwind v4 gera as classes mas não as variáveis CSS.
  // Este plugin publica a paleta como variáveis (var(--color-gold-400)…) para o CSS e o shadcn usarem.
  plugins: [plugin(({ addBase }) => addBase({ ":root": paletteToCssVars(palette) }))],
} satisfies Config;
