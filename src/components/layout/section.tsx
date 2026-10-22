import { cn } from "@/lib/utils";

// Blocos de layout repetidos em todas as seções da página

type Props = { children: React.ReactNode; className?: string };

export function Section({ id, className, children }: Props & { id?: string }) {
  return (
    <section id={id} className={cn("py-16 md:py-[88px]", className)}>
      {children}
    </section>
  );
}

export function H2({ children, className }: Props) {
  return (
    <h2 className={cn("mb-[22px] text-[clamp(34px,5vw,58px)] leading-none font-black tracking-[-0.02em]", className)}>
      {children}
    </h2>
  );
}

export function Lead({ children, className }: Props) {
  return <p className={cn("mb-2.5 max-w-[38em] text-[19px] text-muted-foreground", className)}>{children}</p>;
}

/** Etiqueta pequena acima do título, com o losango dourado do primeiro layout. */
export function Eyebrow({ children }: Pick<Props, "children">) {
  return (
    <div className="mb-3 inline-flex items-center gap-3 text-[13px] font-bold tracking-[0.22em] text-gold-600 uppercase before:size-2.5 before:rotate-45 before:bg-gold">
      {children}
    </div>
  );
}

/** Faixa de "cordão dourado" que separa seções. */
export function Rope() {
  return <div className="rope" aria-hidden="true" />;
}

/** Preço com o "R$" pequeno em cima e a unidade ao lado (ex.: R$ 50 por dia). */
export function Price({ value, unit }: { value: string; unit?: string }) {
  return (
    <p className="flex flex-wrap items-baseline gap-1 text-[40px] leading-none font-black">
      <span className="self-start pt-1.5 text-base">R$</span>
      {value}
      {unit && <small className="ms-1 text-sm font-medium text-muted-foreground">{unit}</small>}
    </p>
  );
}
