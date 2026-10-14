import { memo, useMemo, type ReactNode } from "react";
import type { Artwork } from "../types";

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildShapes(a: Artwork): ReactNode[] {
  const r = rng(hash(a.title + a.artist + a.id));
  const h0 = Math.floor(r() * 360);
  const col = (o: number, s: number, l: number) => `hsl(${(h0 + o) % 360},${s}%,${l}%)`;
  const out: ReactNode[] = [];
  const gid = `g${a.id}`;

  if (a.type === "Скульптура") {
    out.push(<rect key="bg" width="400" height="300" fill={col(0, 45, 22)} />);
    out.push(<rect key="floor" y="220" width="400" height="80" fill={col(30, 20, 14)} />);
    for (let i = 0; i < 4; i++) {
      const w = 40 + r() * 60, x = 40 + r() * 280, y = 60 + r() * 120;
      out.push(<rect key={i} x={x} y={y} width={w} height={220 - y} rx={r() * 30} fill={col(i * 25, 50, 45 + i * 6)} />);
    }
  } else if (a.type === "Графіка") {
    out.push(<rect key="bg" width="400" height="300" fill={col(180, 10, 90)} />);
    for (let i = 0; i < 9; i++) {
      const s = 30 + r() * 110;
      out.push(
        <rect key={i} x={r() * 340} y={r() * 240} width={s} height={s * (0.4 + r())}
          fill={col(i * 40, 70, 40 + r() * 25)} transform={`rotate(${r() * 40 - 20} 200 150)`} />,
      );
    }
  } else if (a.type === "Фотографія" || a.type === "Цифрове мистецтво") {
    out.push(
      <defs key="defs">
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={col(0, 70, 60)} />
          <stop offset="1" stopColor={col(60, 70, 25)} />
        </linearGradient>
      </defs>,
    );
    out.push(<rect key="bg" width="400" height="300" fill={`url(#${gid})`} />);
    for (let i = 0; i < 5; i++) {
      const y = 170 + i * 26;
      out.push(
        <path key={i} d={`M0 ${y} Q 100 ${130 + r() * 80 + i * 20} 200 ${y} T 400 ${y} V300 H0Z`}
          fill={col(i * 20, 50, 18 + i * 8)} opacity={0.85} />,
      );
    }
    out.push(<circle key="sun" cx={80 + r() * 240} cy={50 + r() * 50} r={22 + r() * 20} fill={col(160, 90, 80)} />);
  } else {
    out.push(<rect key="bg" width="400" height="300" fill={col(0, 45, 22)} />);
    for (let i = 0; i < 26; i++) {
      out.push(
        <circle key={i} cx={r() * 400} cy={r() * 300} r={10 + r() * 60}
          fill={col(r() * 200, 75, 35 + r() * 35)} opacity={0.35 + r() * 0.5} />,
      );
    }
  }
  return out;
}

function ArtworkImage({ artwork }: { artwork: Artwork }) {
  const shapes = useMemo(() => buildShapes(artwork), [artwork]);
  return (
    <svg className="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img"
      aria-label={`Ілюстрація: ${artwork.title}`}>
      {shapes}
    </svg>
  );
}

export default memo(ArtworkImage);
