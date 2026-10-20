"use client";

import { useEffect, useRef, useState } from "react";
import { Flag, type FlagCode } from "./Flag";

// `google` é o código que o Google Tradutor usa (hebraico ainda é "iw" no widget)
const LANGS: { google: string; name: string; flag: FlagCode; rtl?: boolean }[] = [
  { google: "pt", name: "Português", flag: "BR" },
  { google: "en", name: "English", flag: "US" },
  { google: "es", name: "Español", flag: "ES" },
  { google: "it", name: "Italiano", flag: "IT" },
  { google: "ru", name: "Русский", flag: "RU" },
  { google: "iw", name: "עברית", flag: "IL", rtl: true },
  { google: "ja", name: "日本語", flag: "JP" },
];
const SOURCE = "pt";
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

function readCookieLang() {
  const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
  return m ? decodeURIComponent(m[1]) : SOURCE;
}

function writeCookie(value: string | null) {
  const host = location.hostname;
  const domains = ["", host, `.${host.split(".").slice(-2).join(".")}`];
  for (const d of domains) {
    const domain = d ? `; domain=${d}` : "";
    document.cookie = value
      ? `googtrans=${value}; path=/${domain}`
      : `googtrans=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

function setDir(google: string) {
  document.documentElement.dir = LANGS.find((l) => l.google === google)?.rtl ? "rtl" : "ltr";
}

function loadGoogleTranslate() {
  if (document.getElementById("google-translate-script")) return;
  window.googleTranslateElementInit = () => {
    if (!window.google) return;
    new window.google.translate.TranslateElement(
      {
        pageLanguage: SOURCE,
        includedLanguages: LANGS.filter((l) => l.google !== SOURCE).map((l) => l.google).join(","),
        autoDisplay: false,
      },
      "google_translate_element",
    );
  };
  const s = document.createElement("script");
  s.id = "google-translate-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);
}

// Troca o idioma pelo <select> escondido do Google; se ele ainda não carregou, o cookie + reload resolve
function translateTo(google: string) {
  try {
    localStorage.setItem(STORAGE_KEY, google);
  } catch {}
  if (google === SOURCE) {
    writeCookie(null);
    location.reload();
    return;
  }
  writeCookie(`/${SOURCE}/${google}`);
  setDir(google);
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (combo) {
    combo.value = google;
    combo.dispatchEvent(new Event("change"));
  } else {
    location.reload();
  }
}

export function LanguageMenu() {
  const [current, setCurrent] = useState(SOURCE);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const saved = readCookieLang();
    setCurrent(saved);
    setDir(saved);
    loadGoogleTranslate();

    // Primeira visita: segue o idioma do navegador, se for um dos disponíveis
    let chosen: string | null = null;
    try {
      chosen = localStorage.getItem(STORAGE_KEY);
    } catch {}
    if (!chosen && saved === SOURCE) {
      const nav = navigator.language.slice(0, 2).toLowerCase();
      const google = nav === "he" ? "iw" : nav;
      if (google !== SOURCE && LANGS.some((l) => l.google === google)) {
        setCurrent(google);
        // espera o widget do Google existir
        const id = setInterval(() => {
          if (document.querySelector("select.goog-te-combo")) {
            clearInterval(id);
            translateTo(google);
          }
        }, 300);
        setTimeout(() => clearInterval(id), 8000);
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLLIElement>('[aria-selected="true"]')?.focus();
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  const choose = (google: string) => {
    setOpen(false);
    if (google === current) return;
    setCurrent(google);
    translateTo(google);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(listRef.current?.children ?? []) as HTMLElement[];
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % items.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + items.length) % items.length]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      (document.activeElement as HTMLElement)?.click();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const active = LANGS.find((l) => l.google === current) ?? LANGS[0];

  return (
    <div className="lang notranslate" translate="no" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Idioma: ${active.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Flag code={active.flag} />
        <span>{active.google === "iw" ? "HE" : active.google.toUpperCase()}</span>
        <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      {open && (
        <ul role="listbox" ref={listRef} onKeyDown={onKeyDown}>
          {LANGS.map((l) => (
            <li
              key={l.google}
              role="option"
              tabIndex={-1}
              aria-selected={l.google === current}
              onClick={() => choose(l.google)}
            >
              <Flag code={l.flag} />
              {l.name}
            </li>
          ))}
        </ul>
      )}
      <div id="google_translate_element" />
    </div>
  );
}
