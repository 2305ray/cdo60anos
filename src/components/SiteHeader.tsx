"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { LanguageMenu } from "./LanguageMenu";
import { NoticeBar } from "./NoticeBar";
import { IMG } from "@/assets/images";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CONTENT, NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV_IDS = NAV.map((n) => n.href.slice(1));

/** Topo fixo: faixa do 1º lote + menu (com a seção atual destacada) + idioma. */
export function SiteHeader({ buildTime }: { buildTime: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  return (
    <div className="sticky top-0 z-50">
      <NoticeBar buildTime={buildTime} />

      <header className="border-b-[3px] border-gold bg-navy-900/95 text-white backdrop-blur-md">
        <div className="wrap flex min-h-16 items-center gap-3.5">
          <a href="#conteudo" aria-label="Dia de Ouro: voltar ao início" className="flex items-center gap-2.5 font-black whitespace-nowrap no-underline transition-opacity hover:opacity-85">
            <Image src={IMG.logo} alt="Cordão de Ouro Capoeira" sizes="42px" loading="eager" className="h-auto w-[42px]" />
            <span className="notranslate hidden min-[400px]:inline" translate="no">
              DIA DE OURO
            </span>
          </a>

          <nav aria-label="Menu" className="hidden flex-1 gap-0.5 overflow-x-auto [scrollbar-width:none] min-[961px]:flex">
            {NAV.map((n) => {
              const isActive = active === n.href.slice(1);
              return (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative rounded-lg px-2.5 py-2 text-[15px] font-medium whitespace-nowrap text-navy-100 no-underline transition-colors hover:bg-white/10 hover:text-white",
                    // sublinhado dourado embaixo do item da seção que está na tela
                    "after:absolute after:inset-x-2.5 after:bottom-0.5 after:h-[3px] after:origin-center after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform",
                    isActive && "bg-white/10 font-bold text-white after:scale-x-100",
                  )}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-2.5 min-[961px]:ms-0">
            <LanguageMenu />
            <Button
              render={<a href="#inscricao" />}
              nativeButton={false}
              variant="gold"
              size="cta-sm"
              className="hidden min-[961px]:inline-flex"
            >
              {CONTENT.ctaTop}
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={<Button variant="ghost" size="icon-lg" className="text-white hover:bg-white/15 hover:text-white min-[961px]:hidden" />}
                aria-label="Abrir menu"
              >
                <MenuIcon className="size-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(320px,85vw)] border-gold bg-navy-900 px-5 pt-14 pb-6 text-white">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav aria-label="Menu" className="flex flex-col">
                  {NAV.map((n) => {
                    const isActive = active === n.href.slice(1);
                    return (
                      <a
                        key={n.href}
                        href={n.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "border-b border-s-4 border-b-white/10 border-s-transparent px-3 py-3.5 text-lg font-bold no-underline transition-colors hover:bg-white/5 hover:text-gold",
                          isActive && "border-s-gold bg-white/5 text-gold",
                        )}
                      >
                        {n.label}
                      </a>
                    );
                  })}
                </nav>
                <Button
                  render={<a href="#inscricao" onClick={() => setMenuOpen(false)} />}
                  nativeButton={false}
                  variant="gold"
                  size="cta"
                  className="mt-4"
                >
                  {CONTENT.ctaTop}
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </div>
  );
}
