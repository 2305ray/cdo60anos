export type SectionPosition = { id: string; top: number };

/**
 * Qual seção do menu está "ativa" para quem está lendo.
 * É a última seção cujo topo já passou da linha de referência (`scrollY + offset`),
 * onde `offset` desconta o cabeçalho fixo. Antes da primeira seção (no hero), nenhuma.
 * No fim da página, a última seção ganha, mesmo que seja curta demais para chegar à linha.
 */
export function pickActiveSection(
  sections: SectionPosition[],
  scrollY: number,
  offset: number,
  atBottom = false,
): string | null {
  if (!sections.length) return null;
  const ordered = [...sections].sort((a, b) => a.top - b.top);
  if (atBottom) return ordered[ordered.length - 1].id;
  const line = scrollY + offset;
  let active: string | null = null;
  for (const s of ordered) {
    if (s.top <= line) active = s.id;
    else break;
  }
  return active;
}
