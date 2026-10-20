import Image from "next/image";
import { notFound } from "next/navigation";
import { Countdown } from "@/components/Countdown";
import { Faq } from "@/components/Faq";
import { HotelMap } from "@/components/HotelMap";
import { Nav } from "@/components/Nav";
import {
  CalendarIcon,
  InstagramIcon,
  ParkingIcon,
  PinIcon,
  ShieldIcon,
  TentIcon,
} from "@/components/icons";
import { hasLocale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import {
  EVENT_START,
  FORM_URL,
  INSTAGRAM_URL,
  LOTES,
  MAPS_URL,
  SECTION_IDS,
} from "@/lib/event-data";
import { cn } from "@/lib/cn";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Nav lang={lang} t={t.nav} />
      <main>
        <Hero t={t.hero} />
        <Sobre t={t.sobre} />
        <Programacao t={t.programa} />
        <Inscricoes t={t.inscricoes} />
        <Local t={t.local} />
        <section className="section hospedagem" id="hospedagem">
          <div className="container">
            <SectionHead eyebrow={t.hospedagem.eyebrow} title={t.hospedagem.title}>
              <p style={{ marginTop: ".8rem", color: "var(--text-mid)", maxWidth: 560, lineHeight: 1.7 }}>
                {t.hospedagem.intro}
              </p>
            </SectionHead>
            <HotelMap t={t.hospedagem} />
          </div>
        </section>
        <section className="section faq" id="faq">
          <div className="container">
            <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <Faq items={t.faq.items} />
          </div>
        </section>
      </main>
      <Footer t={t.footer} navLinks={t.nav.links} />
    </>
  );
}

function SectionHead({
  eyebrow,
  title,
  light,
  children,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="section-head">
      <div className={cn("eyebrow", light && "light")}>{eyebrow}</div>
      <h2 className={cn("section-title", light && "t-gold")}>{title}</h2>
      {children}
    </div>
  );
}

function Hero({ t }: { t: Dictionary["hero"] }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-texture" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-col-text">
          <div className="hero-tag">{t.tag}</div>
          <div className="hero-title-row">
            <div className="hero-nums">
              <span className="hero-num">60</span>
              <span className="hero-anos">{t.anos}</span>
            </div>
            <div className="hero-title-right">
              <h1 className="hero-subtitle-main">
                {t.titleLine1}
                <br />
                {t.titleLine2}
              </h1>
              <Countdown target={EVENT_START} label={t.countdown.label} units={t.countdown.units} />
            </div>
          </div>
          <p className="hero-desc">{t.desc}</p>
          <div className="hero-ctas">
            <a className="btn btn-gold" href={FORM_URL} target="_blank" rel="noopener">
              {t.ctaPrimary}
            </a>
            <a className="btn btn-outline-gold" href="#inscricoes">
              {t.ctaSecondary}
            </a>
          </div>
          <div className="hero-highlights">
            <div className="hero-highlight-item">
              <span className="hi-icon">
                <CalendarIcon size={21} />
              </span>
              <p>
                <strong className="hi-label">{t.when}</strong>
                <span className="hi-value">{t.whenValue}</span>
              </p>
            </div>
            <div className="hero-highlight-item">
              <span className="hi-icon">
                <PinIcon size={21} />
              </span>
              <p>
                <strong className="hi-label">{t.where}</strong>
                <span className="hi-value">{t.whereValue}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sobre({ t }: { t: Dictionary["sobre"] }) {
  return (
    <section className="section sobre" id="sobre">
      <div className="container">
        <div className="sobre-grid">
          <div>
            <SectionHead eyebrow={t.eyebrow} title={t.title} />
            <p className="sobre-p">
              {t.textBefore}
              <strong>Mestre Suassuna</strong>
              {t.textAfter}
            </p>
          </div>
          <div className="pillar-cards">
            {t.pilares.map((p, i) => (
              <div className="pillar-card" key={p.titulo}>
                <div className="pillar-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="pillar-content">
                  <div className="pillar-title">{p.titulo}</div>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Programacao({ t }: { t: Dictionary["programa"] }) {
  return (
    <section className="section programa" id="programa">
      <div className="container">
        <SectionHead eyebrow={t.eyebrow} title={t.title} light />
        <div className="dias-grid">
          {t.dias.map((d) => (
            <div className="dia-card" key={d.dia}>
              <div className="dia-header">
                <div className="dia-num">{d.dia}</div>
                <div className="dia-weekday">{d.semana}</div>
              </div>
              <div className="dia-body">
                {d.atividades.map((a) => (
                  <div className="atividade" key={a.nome}>
                    <span className="a-hora">{a.hora}</span>
                    <div className="a-info">
                      <div className="a-nome">{a.nome}</div>
                      <div className="a-desc">{a.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Inscricoes({ t }: { t: Dictionary["inscricoes"] }) {
  return (
    <section className="section investimento" id="inscricoes">
      <div className="container">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="invest-tag">
          <ShieldIcon />
          <p>
            <strong>{t.shirtTitle}</strong> {t.shirtText}
          </p>
        </div>

        <div className="lotes-grid">
          {LOTES.map((l) => {
            const texto = t.lotes[l.id];
            return (
              <div
                key={l.id}
                className={cn(
                  "lote-card",
                  l.status === "esgotado" && "dimmed",
                  l.status === "disponivel" && "featured",
                  l.status === "em-breve" && "upcoming",
                )}
              >
                <div className={cn("lote-tag", l.status === "esgotado" && "done", l.status === "em-breve" && "soon")}>
                  {t.status[l.status]}
                </div>
                <div className="lote-nome">{texto.nome}</div>
                <div className="lote-preco">
                  <span className="cur">R$</span>
                  {l.preco}
                </div>
                <div className="lote-prazo">{texto.prazo}</div>
                <div className="lote-extra">{texto.extra}</div>
                {l.status === "disponivel" ? (
                  <a className="btn btn-gold lote-btn" href={FORM_URL} target="_blank" rel="noopener">
                    {t.lotCta}
                  </a>
                ) : (
                  <span
                    className={cn("btn lote-btn", l.status === "esgotado" ? "btn-navy" : "btn-outline-gold")}
                    style={l.status === "esgotado" ? { opacity: 0.5 } : { borderColor: "rgba(255,255,255,.5)", color: "rgba(255,255,255,.8)" }}
                  >
                    {l.status === "esgotado" ? t.closed : t.soon}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            className="btn btn-gold"
            href={FORM_URL}
            target="_blank"
            rel="noopener"
            style={{ fontSize: "1.25rem", padding: ".8em 2em", letterSpacing: ".12em", whiteSpace: "nowrap" }}
          >
            {t.mainCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Local({ t }: { t: Dictionary["local"] }) {
  return (
    <section className="section local" id="local">
      <div className="container">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="local-main-grid">
          <div>
            <p className="local-venue">ADC ELETROPAULO</p>
            <p className="local-text" style={{ marginBottom: "1.5rem" }}>
              {t.address}
            </p>
            <a className="btn btn-gold" href={MAPS_URL} target="_blank" rel="noopener">
              <PinIcon size={13} strokeWidth={2.5} />
              {t.mapsCta}
            </a>
            <p className="local-text" style={{ marginTop: "1.5rem" }}>
              {t.structure}
            </p>
          </div>
          <div className="local-cards-grid">
            <article className="local-card">
              <header className="local-card-head">
                <span className="local-card-icon">
                  <TentIcon size={22} />
                </span>
                <h3>{t.camping.title}</h3>
              </header>
              <p className="local-price">
                <span className="cur">R$</span>50<small>{t.camping.unit}</small>
              </p>
              <ul className="local-features">
                {t.camping.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="local-card-note">{t.camping.note}</p>
            </article>
            <article className="local-card">
              <header className="local-card-head">
                <span className="local-card-icon">
                  <ParkingIcon size={22} />
                </span>
                <h3>{t.parking.title}</h3>
              </header>
              <div className="local-rates">
                <div>
                  <span className="local-rate-label">{t.parking.car}</span>
                  <p className="local-price">
                    <span className="cur">R$</span>25<small>{t.parking.unit}</small>
                  </p>
                </div>
                <div>
                  <span className="local-rate-label">{t.parking.bus}</span>
                  <p className="local-price">
                    <span className="cur">R$</span>50<small>{t.parking.unit}</small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <p className="local-text" style={{ marginTop: "2.5rem", opacity: 0.8 }}>
          {t.notIncluded}
        </p>
      </div>
    </section>
  );
}

function Footer({ t, navLinks }: { t: Dictionary["footer"]; navLinks: Dictionary["nav"]["links"] }) {
  return (
    <footer>
      <Image className="footer-logo" src="/logo.png" alt="Cordão de Ouro" width={200} height={124} />
      <blockquote className="footer-quote">
        &ldquo;{t.quoteBefore}
        <span className="t-gold">{t.quoteHighlight}</span>&rdquo;
      </blockquote>
      <a
        className="btn btn-gold"
        href={FORM_URL}
        target="_blank"
        rel="noopener"
        style={{ fontSize: "1.25rem", padding: ".8em 3em", marginBottom: "2.5rem", letterSpacing: ".12em" }}
      >
        {t.cta}
      </a>
      <ul className="footer-nav">
        {SECTION_IDS.map((id) => (
          <li key={id}>
            <a href={`#${id}`}>{navLinks[id]}</a>
          </li>
        ))}
      </ul>
      <a className="footer-ig" href={INSTAGRAM_URL} target="_blank" rel="noopener">
        <InstagramIcon />
        @CDO60ANOS
      </a>
      <p className="footer-copy">{t.copy}</p>
    </footer>
  );
}
