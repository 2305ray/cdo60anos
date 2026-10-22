import { describe, expect, it } from "vitest";
import { palette, paletteToCssVars } from "../../tailwind.config";

describe("paletteToCssVars", () => {
  const vars = paletteToCssVars(palette);

  it("gera uma variável por tom (--color-gold-400)", () => {
    expect(vars["--color-gold-400"]).toBe(palette.gold[400]);
    expect(vars["--color-navy-950"]).toBe(palette.navy[950]);
  });

  it("DEFAULT vira o nome base (--color-gold)", () => {
    expect(vars["--color-gold"]).toBe(palette.gold.DEFAULT);
    expect(vars["--color-whatsapp"]).toBe(palette.whatsapp.DEFAULT);
    expect(vars).not.toHaveProperty("--color-gold-DEFAULT");
  });

  it("cor solta e grupos com nome (dist.near) também viram variáveis", () => {
    expect(vars["--color-sand"]).toBe(palette.sand);
    expect(vars["--color-dist-near"]).toBe(palette.dist.near);
  });

  it("toda cor da paleta é um hex válido", () => {
    for (const [name, hex] of Object.entries(vars)) expect(hex, name).toMatch(/^#[0-9a-f]{6}$/);
  });
});
