export type FlagCode = "BR" | "US" | "ES" | "IT" | "RU" | "IL" | "JP";

function Stripes({ colors, vertical }: { colors: string[]; vertical?: boolean }) {
  const n = colors.length;
  return (
    <>
      {colors.map((c, i) =>
        vertical ? (
          <rect key={i} x={(i * 30) / n} width={30 / n + 0.05} height="20" fill={c} />
        ) : (
          <rect key={i} y={(i * 20) / n} width="30" height={20 / n + 0.05} fill={c} />
        ),
      )}
    </>
  );
}

function UsFlag() {
  return (
    <>
      {Array.from({ length: 13 }, (_, i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13 + 0.05} fill={i % 2 ? "#fff" : "#B22234"} />
      ))}
      <rect width="13" height={(20 * 7) / 13} fill="#3C3B6E" />
      {Array.from({ length: 20 }, (_, k) => (
        <circle key={k} cx={1.5 + (k % 5) * 2.5} cy={1.4 + Math.floor(k / 5) * 2.6} r=".55" fill="#fff" />
      ))}
    </>
  );
}

const FLAGS: Record<FlagCode, React.ReactNode> = {
  BR: (
    <>
      <rect width="30" height="20" fill="#009C3B" />
      <path d="M15 2.5 27 10 15 17.5 3 10z" fill="#FFDF00" />
      <circle cx="15" cy="10" r="4.6" fill="#002776" />
      <path d="M10.6 9.2c3-.9 6.3-.4 8.8 1.3" stroke="#fff" strokeWidth=".8" fill="none" />
    </>
  ),
  US: <UsFlag />,
  ES: (
    <>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </>
  ),
  IT: <Stripes colors={["#009246", "#fff", "#CE2B37"]} vertical />,
  RU: <Stripes colors={["#fff", "#0039A6", "#D52B1E"]} />,
  IL: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <rect y="2" width="30" height="3" fill="#0038B8" />
      <rect y="15" width="30" height="3" fill="#0038B8" />
      <path d="M15 6.4 18.2 12H11.8zM15 13.6 11.8 8h6.4z" fill="none" stroke="#0038B8" strokeWidth=".9" />
    </>
  ),
  JP: (
    <>
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </>
  ),
};

export function Flag({ code }: { code: FlagCode }) {
  return (
    <span className="fl">
      <svg viewBox="0 0 30 20" preserveAspectRatio="none" aria-hidden="true">
        {FLAGS[code]}
      </svg>
    </span>
  );
}
