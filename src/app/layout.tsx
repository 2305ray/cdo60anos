import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import { CONTENT } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { palette } from "../../tailwind.config";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
});

const { title, description, shareDescription } = CONTENT.meta;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  // os ícones (aba, iPhone, favicon.ico) vêm de app/icon.png, app/apple-icon.png e app/favicon.ico;
  // a imagem de compartilhamento vem de app/opengraph-image.tsx
  openGraph: { title, description: shareDescription, locale: "pt_BR", type: "website", siteName: "Dia de Ouro 2027" },
  twitter: { card: "summary_large_image", title, description: shareDescription },
};

export const viewport: Viewport = {
  themeColor: palette.navy[900], // cor da barra do navegador no celular
};

// O Google Tradutor troca os nós de texto da página por <font>. Quando o React tenta mexer num nó
// que não está mais lá, o navegador lança erro e a página quebra. Este patch ignora só esse caso.
const TRANSLATE_GUARD = `(function(){if(typeof Node!=="function"||!Node.prototype)return;var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c.parentNode!==this)return c;return r.apply(this,arguments)};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this)return n;return i.apply(this,arguments)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={rubik.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TRANSLATE_GUARD }} />
      </head>
      <body>
        {/* atalho para quem navega pelo teclado ou leitor de tela: aparece só ao receber foco */}
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-lg bg-gold px-4 py-2 font-bold text-navy-900 focus:not-sr-only focus:fixed focus:start-3 focus:top-3"
        >
          {CONTENT.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
