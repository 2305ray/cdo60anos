import { CONTENT } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Stats() {
  return (
    <div className="bg-card">
      <ul className="wrap grid grid-cols-2 sm:grid-cols-4">
        {CONTENT.stats.map(([n, label], i) => (
          <li key={label} className={cn("px-2.5 py-[22px] text-center", i % 2 === 1 && "border-s", i === 2 && "sm:border-s")}>
            <b className="block text-[clamp(30px,4vw,44px)] leading-none font-black text-navy-600">{n}</b>
            <span className="text-sm text-muted-foreground">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
