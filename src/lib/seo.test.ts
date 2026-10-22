import { describe, expect, it } from "vitest";
import { eventJsonLd, jsonLdScript } from "./seo";

const OUT_20 = new Date("2026-10-20T12:00:00-03:00").getTime();

describe("eventJsonLd", () => {
  const data = eventJsonLd(OUT_20);

  it("descreve um evento presencial com data de início e fim", () => {
    expect(data["@type"]).toBe("Event");
    expect(data.startDate).toBe("2027-01-22T08:00:00-03:00");
    expect(data.endDate).toBe("2027-01-24T23:59:59-03:00");
    expect(data.eventAttendanceMode).toBe("https://schema.org/OfflineEventAttendanceMode");
  });

  it("tem o endereço completo do local", () => {
    expect(data.location.address).toMatchObject({
      streetAddress: "Rua Peixe Vivo, 155",
      addressLocality: "São Paulo",
      postalCode: "04772-100",
      addressCountry: "BR",
    });
  });

  it("lista um preço por lote, em reais e sem ponto de milhar", () => {
    expect(data.offers.map((o) => [o.name, o.price])).toEqual([
      ["1º lote", "280"],
      ["Pacote para 5", "1300"],
      ["2º lote", "330"],
      ["3º lote", "380"],
    ]);
    expect(data.offers.every((o) => o.priceCurrency === "BRL")).toBe(true);
  });

  it("a disponibilidade segue o status do lote na data", () => {
    expect(data.offers.map((o) => o.availability.split("/").pop())).toEqual(["InStock", "InStock", "PreOrder", "PreOrder"]);
    const jan = eventJsonLd(new Date("2027-01-10T12:00:00-03:00").getTime());
    expect(jan.offers.map((o) => o.availability.split("/").pop())).toEqual(["SoldOut", "SoldOut", "SoldOut", "InStock"]);
  });
});

describe("jsonLdScript", () => {
  it("escapa '<' para um texto não conseguir fechar a tag <script>", () => {
    const out = jsonLdScript({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});
