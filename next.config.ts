import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Domínios do Google Tradutor (widget, estilos, ícones e chamadas de tradução)
const GOOGLE_TRANSLATE = "https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.gstatic.com";

/**
 * Content Security Policy: o navegador só carrega o que está listado aqui.
 * Sem nonce porque a página é estática (gerada no build); por isso os scripts inline do Next
 * precisam de 'unsafe-inline'. 'unsafe-eval' só no modo de desenvolvimento (o React usa para depurar).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${GOOGLE_TRANSLATE}`,
  `style-src 'self' 'unsafe-inline' ${GOOGLE_TRANSLATE}`,
  `img-src 'self' data: blob: ${GOOGLE_TRANSLATE} https://www.google.com https://fonts.gstatic.com`,
  "font-src 'self'",
  `connect-src 'self' ${GOOGLE_TRANSLATE}`,
  // o widget do Google cria um iframe interno do próprio site (a barra que escondemos)
  "frame-src 'self' https://translate.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // não deixa o navegador "adivinhar" o tipo de arquivo
  { key: "X-Content-Type-Options", value: "nosniff" },
  // ninguém pode colocar o site dentro de um iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // ao clicar num link externo, envia só o domínio, não a URL inteira
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // o site não usa câmera, microfone nem localização
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // força HTTPS por 2 anos (só tem efeito quando o site já está em HTTPS)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // não anuncia "X-Powered-By: Next.js" nas respostas
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
