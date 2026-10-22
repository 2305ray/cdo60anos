import { describe, expect, it } from "vitest";
import { cookieValueFor, isRtl, langFromBrowser, langFromCookie, shortLabel } from "./translate";

describe("langFromCookie", () => {
  it("lê o idioma do cookie do Google", () => {
    expect(langFromCookie("googtrans=/pt/en")).toBe("en");
    expect(langFromCookie("foo=1; googtrans=/pt/ja; bar=2")).toBe("ja");
  });

  it("volta para português sem cookie ou com idioma fora da lista", () => {
    expect(langFromCookie("")).toBe("pt");
    expect(langFromCookie("foo=1")).toBe("pt");
    expect(langFromCookie("googtrans=/pt/fr")).toBe("pt");
  });

  it("não confunde com outro cookie que termina em googtrans", () => {
    expect(langFromCookie("xgoogtrans=/pt/en")).toBe("pt");
  });
});

describe("cookieValueFor", () => {
  it("monta /origem/destino", () => {
    expect(cookieValueFor("es")).toBe("/pt/es");
    expect(cookieValueFor("iw")).toBe("/pt/iw");
  });

  it("retorna null para o idioma original (apagar o cookie)", () => {
    expect(cookieValueFor("pt")).toBeNull();
  });

  it("é o inverso de langFromCookie", () => {
    for (const lang of ["en", "es", "it", "ru", "iw", "ja"]) {
      expect(langFromCookie(`googtrans=${cookieValueFor(lang)}`)).toBe(lang);
    }
  });
});

describe("langFromBrowser", () => {
  it("usa só o idioma, ignorando a região", () => {
    expect(langFromBrowser("es-AR")).toBe("es");
    expect(langFromBrowser("en-US")).toBe("en");
  });

  it("converte hebraico para o código do Google", () => {
    expect(langFromBrowser("he-IL")).toBe("iw");
  });

  it("não traduz quem já está em português nem idiomas não suportados", () => {
    expect(langFromBrowser("pt-BR")).toBeNull();
    expect(langFromBrowser("fr-FR")).toBeNull();
    expect(langFromBrowser(undefined)).toBeNull();
  });
});

describe("helpers", () => {
  it("só hebraico é da direita para a esquerda", () => {
    expect(isRtl("iw")).toBe(true);
    expect(isRtl("en")).toBe(false);
  });

  it("mostra HE no botão em vez de IW", () => {
    expect(shortLabel("iw")).toBe("HE");
    expect(shortLabel("ja")).toBe("JA");
  });
});
