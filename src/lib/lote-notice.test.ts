import { describe, expect, it } from "vitest";
import { daysLeft, noticeText } from "./lote-notice";

const END = "2026-11-30T23:59:59-03:00";
const at = (iso: string) => new Date(iso).getTime();

describe("daysLeft", () => {
  it("conta dias de calendário em Brasília", () => {
    expect(daysLeft(END, at("2026-10-20T10:00:00-03:00"))).toBe(41);
  });

  it("vira o dia à meia-noite de Brasília, não em UTC", () => {
    // 22h em Brasília já é dia seguinte em UTC, mas ainda é dia 29 aqui
    expect(daysLeft(END, at("2026-11-29T22:00:00-03:00"))).toBe(1);
    expect(daysLeft(END, at("2026-11-30T00:00:00-03:00"))).toBe(0);
  });

  it("retorna 0 durante todo o último dia, até o último segundo", () => {
    expect(daysLeft(END, at("2026-11-30T08:00:00-03:00"))).toBe(0);
    expect(daysLeft(END, at("2026-11-30T23:59:59-03:00"))).toBe(0);
  });

  it("retorna -1 depois do prazo", () => {
    expect(daysLeft(END, at("2026-12-01T00:00:00-03:00"))).toBe(-1);
  });

  it("aceita o prazo em milissegundos", () => {
    expect(daysLeft(at(END), at("2026-11-28T12:00:00-03:00"))).toBe(2);
  });
});

describe("noticeText", () => {
  const copy = { dias: (n: number) => `faltam ${n} dias`, amanha: "acaba amanhã", hoje: "último dia" };

  it("usa o plural com o número de dias", () => {
    expect(noticeText(41, copy)).toBe("faltam 41 dias");
    expect(noticeText(2, copy)).toBe("faltam 2 dias");
  });

  it("tem textos próprios para amanhã e hoje", () => {
    expect(noticeText(1, copy)).toBe("acaba amanhã");
    expect(noticeText(0, copy)).toBe("último dia");
  });

  it("some quando o lote acabou", () => {
    expect(noticeText(-1, copy)).toBeNull();
  });
});
