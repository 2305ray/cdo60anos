"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT } from "@/lib/content";

function parts(target: number) {
  const d = target - Date.now();
  if (d <= 0) return null;
  return [
    String(Math.floor(d / 864e5)),
    String(Math.floor(d / 36e5) % 24).padStart(2, "0"),
    String(Math.floor(d / 6e4) % 60).padStart(2, "0"),
    String(Math.floor(d / 1e3) % 60).padStart(2, "0"),
  ];
}

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
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
  }, [value]);
  return <span ref={ref}>{value}</span>;
}

export function Countdown({ target }: { target: string }) {
  const { label, units, done } = CONTENT.countdown;
  // "--" no servidor; os números entram depois de montar no navegador
  const [values, setValues] = useState<string[] | null | undefined>(undefined);

  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setValues(parts(t));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="cd">
      <div className="cd-box">
        <div className="cd-in">
          <div className="cd-lbl">{label}</div>
          <div className="cells" role="timer" aria-label={label}>
            {values === null ? (
              <div className="cd-done">{done}</div>
            ) : (
              units.map((unit, i) => (
                <div className="cell" key={unit}>
                  <b className="notranslate" translate="no">
                    <Digit value={values?.[i] ?? "--"} />
                  </b>
                  <i>{unit}</i>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
