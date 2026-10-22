"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/lib/content";
import { countdownParts } from "@/lib/countdown";

function Digit({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = ref.current;
    if (!el) return;
    el.classList.remove("animate-flip");
    void el.offsetWidth; // reinicia a animação
    el.classList.add("animate-flip");
  }, [value]);
  return (
    <span ref={ref} className="inline-block">
      {value}
    </span>
  );
}

export function Countdown({ target }: { target: string }) {
  const { label, units, done } = CONTENT.countdown;
  // undefined = ainda no servidor ("--"); null = o evento começou
  const [values, setValues] = useState<string[] | null | undefined>(undefined);

  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setValues(countdownParts(t, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="relative z-[2] mt-[26px] pb-[60px] md:mt-[30px] md:pb-20">
      <div className="rope-bg rounded-[28px] p-1.5 shadow-[0_30px_70px_rgb(0_0_0/0.45)]">
        <div className="grid items-center gap-x-[30px] gap-y-3 rounded-[22px] bg-linear-to-b from-navy-800 to-navy-950 px-[clamp(14px,3vw,34px)] py-[22px] md:grid-cols-[auto_1fr]">
          <div className="text-[clamp(18px,2.2vw,26px)] leading-tight font-extrabold text-gold md:max-w-[9em]">{label}</div>
          <div role="timer" aria-label={label} className="grid grid-cols-[1.35fr_1fr_1fr_1fr] gap-[clamp(8px,1.6vw,18px)]">
            {values === null ? (
              <div className="col-span-full text-center text-5xl font-black text-gold">{done}</div>
            ) : (
              units.map((unit, i) => (
                <div key={unit} className="text-center">
                  <b
                    translate="no"
                    className={`notranslate cd-digit block overflow-hidden rounded-2xl bg-white/5 pt-2.5 pb-3 text-[clamp(46px,9vw,118px)] leading-none font-black tabular-nums ${i === 0 ? "text-gold" : "text-white"}`}
                  >
                    <Digit value={values?.[i] ?? "--"} />
                  </b>
                  <i className="mt-2 block text-[clamp(12px,1.3vw,15px)] font-bold text-navy-200 not-italic">{unit}</i>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
