import { describe, expect, it } from "vitest";
import { HOTELS, LOTES, hotelLinks, loteStatuses, type LoteId } from "./event-data";

const at = (iso: string) => new Date(iso).getTime();
const statusAt = (iso: string) => loteStatuses(LOTES, at(iso));
// cópia dos lotes com alguns fechados à mão (sem mexer nos dados reais)
const closing = (...ids: LoteId[]) => LOTES.map((l) => ({ ...l, fechado: ids.includes(l.id) }));
const OUT_20 = at("2026-10-20T12:00:00-03:00");

describe("loteStatuses por data", () => {
  it("nenhum lote vem fechado à mão nos dados publicados", () => {
    expect(LOTES.every((l) => !l.fechado)).toBe(true);
  });

  it("hoje (out/2026): 1º lote e pacote abertos, 2º e 3º em breve", () => {
    expect(statusAt("2026-10-20T12:00:00-03:00")).toEqual({
      lote1: "disponivel",
      pacote: "disponivel",
      lote2: "em-breve",
      lote3: "em-breve",
    });
  });

  it("vira do 1º para o 2º lote exatamente à meia-noite de 01/12", () => {
    expect(statusAt("2026-11-30T23:59:59-03:00").lote1).toBe("disponivel");
    expect(statusAt("2026-12-01T00:00:00-03:00")).toEqual({
      lote1: "encerrado",
      pacote: "encerrado",
      lote2: "disponivel",
      lote3: "em-breve",
    });
  });

  it("janeiro: só o 3º lote aberto", () => {
    expect(statusAt("2027-01-10T12:00:00-03:00")).toEqual({
      lote1: "encerrado",
      pacote: "encerrado",
      lote2: "encerrado",
      lote3: "disponivel",
    });
  });

  it("depois do evento, tudo encerrado", () => {
    expect(Object.values(statusAt("2027-01-25T00:00:00-03:00"))).toEqual(Array(4).fill("encerrado"));
  });

  it("os lotes não se sobrepõem e não deixam buraco entre eles", () => {
    const sequencia = LOTES.filter((l) => l.id !== "pacote");
    for (let i = 1; i < sequencia.length; i++) {
      const fimAnterior = at(sequencia[i - 1].fim);
      const inicio = at(sequencia[i].inicio!);
      expect(inicio - fimAnterior).toBe(1000);
    }
  });
});

describe("loteStatuses com lote fechado à mão", () => {
  it("fechar o 1º lote marca como esgotado e já abre o 2º", () => {
    expect(loteStatuses(closing("lote1"), OUT_20)).toEqual({
      lote1: "esgotado",
      pacote: "disponivel",
      lote2: "disponivel",
      lote3: "em-breve",
    });
  });

  it("fechar só o pacote não mexe nos outros lotes", () => {
    expect(loteStatuses(closing("pacote"), OUT_20)).toEqual({
      lote1: "disponivel",
      pacote: "esgotado",
      lote2: "em-breve",
      lote3: "em-breve",
    });
  });

  it("fechar o 1º e o 2º abre o 3º em cadeia", () => {
    expect(loteStatuses(closing("lote1", "lote2"), OUT_20)).toMatchObject({
      lote1: "esgotado",
      lote2: "esgotado",
      lote3: "disponivel",
    });
  });

  it("fechar o 2º antes de ele começar não abre o 3º enquanto o 1º está valendo", () => {
    expect(loteStatuses(closing("lote2"), OUT_20)).toMatchObject({
      lote1: "disponivel",
      lote2: "esgotado",
      lote3: "em-breve",
    });
  });

  it("lote fechado continua esgotado mesmo depois do prazo (não vira 'encerrado')", () => {
    expect(loteStatuses(closing("lote1"), at("2027-01-10T12:00:00-03:00")).lote1).toBe("esgotado");
  });

  it("o lote aberto antes da hora ainda respeita o próprio fim", () => {
    expect(loteStatuses(closing("lote1"), at("2027-01-02T12:00:00-03:00")).lote2).toBe("encerrado");
  });
});

describe("hotéis", () => {
  it("cor do grupo bate com a faixa de distância da legenda", () => {
    for (const h of HOTELS) {
      const km = Number(h.dist.replace(",", "."));
      const esperado = km <= 3.5 ? "green" : km <= 5 ? "orange" : "red";
      expect(h.group, h.nome).toBe(esperado);
    }
  });

  it("estão em ordem de distância (o número no mapa segue essa ordem)", () => {
    const kms = HOTELS.map((h) => Number(h.dist.replace(",", ".")));
    expect(kms).toEqual([...kms].sort((a, b) => a - b));
  });

  it("monta o link de telefone com DDI e só dígitos", () => {
    expect(hotelLinks(HOTELS[0]).tel).toBe("tel:+5511974454068");
  });

  it("codifica o endereço nos links de rota e Booking", () => {
    const links = hotelLinks(HOTELS[1]); // Hotel Faf's, com apóstrofo e acento
    expect(links.rota).toContain("destination=Hotel%20Faf's%2C%20Av.%20Atl%C3%A2ntica");
    expect(links.booking).toContain("ss=Hotel%20Faf's%20S%C3%A3o%20Paulo");
    expect(links.rota).not.toMatch(/\s/);
  });
});
