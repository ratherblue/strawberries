import type { SVGAttributes } from 'react';

export interface StrawberryProps extends SVGAttributes<SVGSVGElement> {
  /** Pixel size. Default 24 */
  size?: number;
  /** Rotation in degrees — a slight tilt (-15…15) feels carefree */
  tilt?: number;
  /** Single-color (currentColor) version */
  mono?: boolean;
  /** Accessible title; omit for decorative use */
  title?: string;
}

const SEEDS: Array<[number, number]> = [[13, 15], [19, 15], [16, 18.5], [11.5, 20], [20.5, 20], [14, 23.5], [18, 23.5], [23, 15.5]];

export function Strawberry({ size = 24, tilt = 0, mono = false, title, style, ...rest }: StrawberryProps) {
  const body = mono ? 'currentColor' : '#E8434F';
  const leaf = mono ? 'currentColor' : '#3E8E4F';
  const stem = mono ? 'currentColor' : '#2F6B3A';
  const seed = mono ? 'var(--bg-page, #fff)' : '#FFE9A8';
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      style={{ flex: 'none', transform: tilt ? `rotate(${tilt}deg)` : undefined, ...style }}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d="M16 29.5c-6.5-2.8-11.5-9-11-15.2.3-3.6 3.4-5.6 7-5.3 1.5.1 2.8.5 4 .5s2.5-.4 4-.5c3.6-.3 6.7 1.7 7 5.3.5 6.2-4.5 12.4-11 15.2z" fill={body} />
      {mono ? null : <ellipse cx="10.2" cy="13.6" rx="1.6" ry="2.6" transform="rotate(25 10.2 13.6)" fill="#fff" opacity=".35" />}
      <g fill={seed}>{SEEDS.map(([x, y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx=".7" ry="1.1" />)}</g>
      <path d="M16 11.2c-2.6 0-5.6-.7-7.2-2.4 2-.6 4-.4 5.5.3-.6-1.5-1.4-3.1-1.2-4.6 1.4.8 2.4 2.2 2.9 3.6.5-1.4 1.5-2.8 2.9-3.6.2 1.5-.6 3.1-1.2 4.6 1.5-.7 3.5-.9 5.5-.3-1.6 1.7-4.6 2.4-7.2 2.4z" fill={leaf} />
      <path d="M16 7V2.8" stroke={stem} strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}
