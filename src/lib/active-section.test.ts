import { describe, expect, it } from "vitest";
import { pickActiveSection } from "./active-section";

const sections = [
  { id: "historia", top: 900 },
  { id: "evento", top: 1800 },
  { id: "inscricao", top: 3200 },
  { id: "duvidas", top: 6000 },
];
const OFFSET = 140; // altura do aviso + cabeçalho

describe("pickActiveSection", () => {
  it("nenhuma no topo da página (hero)", () => {
    expect(pickActiveSection(sections, 0, OFFSET)).toBeNull();
  });

  it("ativa a seção assim que o topo dela encosta embaixo do cabeçalho", () => {
    expect(pickActiveSection(sections, 900 - OFFSET - 1, OFFSET)).toBeNull();
    expect(pickActiveSection(sections, 900 - OFFSET, OFFSET)).toBe("historia");
  });

  it("continua na seção enquanto a próxima não chega", () => {
    expect(pickActiveSection(sections, 1500, OFFSET)).toBe("historia");
    expect(pickActiveSection(sections, 1700, OFFSET)).toBe("evento");
    expect(pickActiveSection(sections, 4000, OFFSET)).toBe("inscricao");
  });

  it("no fim da página marca a última, mesmo se ela for curta", () => {
    expect(pickActiveSection(sections, 5000, OFFSET, true)).toBe("duvidas");
  });

  it("não depende da ordem em que as seções chegam", () => {
    expect(pickActiveSection([...sections].reverse(), 2000, OFFSET)).toBe("evento");
  });

  it("sem seções, nenhuma ativa", () => {
    expect(pickActiveSection([], 500, OFFSET)).toBeNull();
  });
});
