"use client";

import { ChevronDownIcon } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { Flag } from "./Flag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LANGS,
  SOURCE_LANG,
  cookieValueFor,
  isRtl,
  langFromBrowser,
  langFromCookie,
  shortLabel,
} from "@/lib/translate";

const STORAGE_KEY = "cdo60-lang";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string,
        ) => unknown;
      };
    };
  }
}

// Idioma atual = o que está no cookie do Google. Quem grava o cookie avisa os ouvintes.
const listeners = new Set<() => void>();
const subscribeLang = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const useCurrentLang = () =>
  useSyncExternalStore(
    subscribeLang,
    () => langFromCookie(document.cookie),
    () => SOURCE_LANG,
  );

// O Google grava o cookie no domínio atual e às vezes no domínio pai; apaga/grava nos dois
function writeCookie(value: string | null) {
  const host = location.hostname;
  for (const domain of ["", host, `.${host.split(".").slice(-2).join(".")}`]) {
    const d = domain ? `; domain=${domain}` : "";
    document.cookie = value
      ? `googtrans=${value}; path=/${d}`
      : `googtrans=; path=/${d}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
  listeners.forEach((l) => l());
}

function loadGoogleTranslate() {
  if (document.getElementById("google-translate-script")) return;
  window.googleTranslateElementInit = () => {
    if (!window.google) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: SOURCE_LANG,
        includedLanguages: LANGS.filter((l) => l.google !== SOURCE_LANG).map((l) => l.google).join(","),
        autoDisplay: false,
      },
      "google_translate_element",
    );
    // Como o script carrega depois da página pronta, o widget não aplica sozinho o idioma salvo
    // no cookie (visitante que já tinha escolhido outro idioma): aplicamos assim que o <select> existir.
    const saved = langFromCookie(document.cookie);
    if (saved === SOURCE_LANG) return;
    const id = setInterval(() => {
      const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
      if (!combo) return;
      clearInterval(id);
      combo.value = saved;
      combo.dispatchEvent(new Event("change"));
    }, 200);
    setTimeout(() => clearInterval(id), 10_000);
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

// Troca pelo <select> escondido do widget; se ele ainda não existe, o cookie + reload resolve
function translateTo(lang: string) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  const value = cookieValueFor(lang);
  writeCookie(value);
  if (!value) {
    location.reload();
    return;
  }
  document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (!combo) {
    location.reload();
    return;
  }
  combo.value = lang;
  combo.dispatchEvent(new Event("change"));
}

export function LanguageMenu() {
  const current = useCurrentLang();

  // O script do Google (~100 KB, de terceiros) só é baixado quando precisa:
  // idioma já escolhido antes, navegador em outro idioma, ou quando o menu é aberto.
  useEffect(() => {
    const saved = langFromCookie(document.cookie);
    document.documentElement.dir = isRtl(saved) ? "rtl" : "ltr";

    // Primeira visita: segue o idioma do navegador, se for um dos disponíveis
    let chosenBefore = false;
    try {
      chosenBefore = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {}
    const auto = !chosenBefore && saved === SOURCE_LANG ? langFromBrowser(navigator.language) : null;
    if (saved !== SOURCE_LANG || auto) loadGoogleTranslate();
    if (!auto) return;
    const id = setInterval(() => {
      if (!document.querySelector("select.goog-te-combo")) return;
      clearInterval(id);
      translateTo(auto);
    }, 300);
    const stop = setTimeout(() => clearInterval(id), 10_000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, []);

  const active = LANGS.find((l) => l.google === current) ?? LANGS[0];

  return (
    <div className="notranslate" translate="no">
      <DropdownMenu onOpenChange={(open) => open && loadGoogleTranslate()}>
        <DropdownMenuTrigger
          aria-label={`Idioma: ${active.name}`}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 ps-1.5 pe-3 text-sm font-bold text-white transition-colors hover:bg-white/15 aria-expanded:bg-white/15"
        >
          <Flag code={active.flag} />
          <span>{shortLabel(active.google)}</span>
          <ChevronDownIcon className="size-3.5 transition-transform in-aria-expanded:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="notranslate w-56 rounded-2xl border-2 border-gold p-1.5 text-navy shadow-[0_20px_50px_rgb(0_0_0/0.35)] ring-0"
          translate="no"
        >
          <DropdownMenuRadioGroup
            value={current}
            onValueChange={(lang: string) => {
              if (lang !== current) translateTo(lang);
            }}
          >
            {LANGS.map((l) => (
              <DropdownMenuRadioItem
                key={l.google}
                value={l.google}
                closeOnClick
                className="cursor-pointer gap-3 rounded-[10px] py-2.5 ps-3 text-[15px] transition-colors hover:bg-muted data-checked:bg-accent data-checked:font-extrabold data-highlighted:bg-muted"
              >
                <Flag code={l.flag} className="h-5 w-[30px]" />
                {l.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div id="google_translate_element" />
    </div>
  );
}
