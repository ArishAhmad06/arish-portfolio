interface LogoProps {
  /** Rendered width and height in pixels. */
  size?: number;
}

/**
 * "AA" monogram: two interlocking A's with blueprint corner marks.
 * The first A follows the text colour, the second uses the accent colour,
 * so it adapts to both light and dark themes.
 */
export function Logo({ size = 40 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="aa-logo-clip">
          <rect x="0" y="11" width="64" height="38" />
        </clipPath>
      </defs>
      <path
        d="M5 13V5h8M51 5h8v8M59 51v8h-8M13 59H5v-8"
        stroke="currentColor"
        strokeOpacity=".45"
        strokeWidth="1.5"
      />
      <g clipPath="url(#aa-logo-clip)" strokeWidth="5" strokeMiterlimit="10">
        <path d="M10 52 22 16 34 52M14 38H30" stroke="currentColor" />
        <path d="M30 52 42 16 54 52M34 38H50" stroke="var(--ac)" />
      </g>
      <path d="M10 55h44" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" />
    </svg>
  );
}