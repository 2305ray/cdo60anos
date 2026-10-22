import { describe, expect, it } from "vitest";
import { countdownParts } from "./countdown";

const target = new Date("2027-01-22T08:00:00-03:00").getTime();
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

describe("countdownParts", () => {
  it("separa dias, horas, minutos e segundos", () => {
    const now = target - (93 * DAY + 5 * HOUR + 7 * MIN + 9 * SEC);
    expect(countdownParts(target, now)).toEqual(["93", "05", "07", "09"]);
  });

  it("não coloca zero à esquerda nos dias, mas sim no resto", () => {
    expect(countdownParts(target, target - (2 * DAY + 3 * SEC))).toEqual(["2", "00", "00", "03"]);
  });

  it("descarta milissegundos (arredonda para baixo)", () => {
    expect(countdownParts(target, target - 1500)).toEqual(["0", "00", "00", "01"]);
  });

  it("retorna null quando o evento começou", () => {
    expect(countdownParts(target, target)).toBeNull();
    expect(countdownParts(target, target + MIN)).toBeNull();
  });
});
