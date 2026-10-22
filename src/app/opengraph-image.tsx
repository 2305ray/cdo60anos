import { ImageResponse } from "next/og";
import { CONTENT } from "@/lib/content";
import { palette } from "../../tailwind.config";

// Imagem que aparece ao compartilhar o link (WhatsApp, Instagram, Facebook…). Gerada no build.
export const alt = CONTENT.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// o gerador de imagem não lê CSS, então as cores vêm direto da paleta
const { gold, navy } = palette;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          color: "white",
          background: `radial-gradient(60% 80% at 85% 20%, ${navy[600]}, ${navy[800]} 60%, ${navy[900]})`,
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: 4, color: gold[400] }}>
          22, 23 E 24 DE JANEIRO DE 2027 • SÃO PAULO/SP
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 36, marginTop: 24 }}>
          <div style={{ fontSize: 260, fontWeight: 900, lineHeight: 0.85, color: gold[400] }}>60</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 900, lineHeight: 1 }}>
            <span>ANOS</span>
            <span style={{ fontSize: 44, color: navy[100] }}>Cordão de Ouro</span>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 34, color: navy[100] }}>
          Dia de Ouro · O encontro mundial com Mestre Suassuna
        </div>
        {/* faixa de "cordão" na base */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 22,
            background: `repeating-linear-gradient(115deg, ${gold[400]} 0 9px, ${gold[600]} 9px 12px, ${gold[200]} 12px 15px, ${gold[400]} 15px 18px)`,
          }}
        />
      </div>
    ),
    size,
  );
}
