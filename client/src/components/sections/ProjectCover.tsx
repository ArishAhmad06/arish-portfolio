import type { CoverKind } from '@/config';

interface ProjectCoverProps {
  kind: CoverKind;
  accent: string;
}

/**
 * Original abstract artwork, one composition per project. These are illustrations only
 * and do not represent real data. To add a cover: add a kind in config/types.ts and a case here.
 */
export function ProjectCover({ kind, accent }: ProjectCoverProps) {
  return (
    <svg viewBox="0 0 400 240" aria-hidden="true" className="cover">
      <g stroke="currentColor" fill="none" strokeOpacity="0.5" vectorEffect="non-scaling-stroke">
        {kind === 'print' && (
          <>
            <path className="cover__move" stroke={accent} d="M120 60l30-20h100l30 20 30 30-30 30-20-15v95H140v-95l-20 15-30-30z" />
            <path stroke="#22d3ee" d="M130 70l30-20h100l30 20 30 30-30 30-20-15v95H150v-95l-20 15-30-30z" />
            <path d="M120 60l30-20h100l30 20 30 30-30 30-20-15v95H140v-95l-20 15-30-30z" />
          </>
        )}
        {kind === 'forecast' && (
          <>
            <path d="M30 200h340M30 30v170" />
            <path d="M40 160l40-20 40 10 40-40 40 20 40-50" strokeWidth="2" />
            <path d="M280 90l50-30" stroke={accent} strokeDasharray="5 4" strokeWidth="2" />
            <path d="M40 150l40-20 40 10 40-40 40 20 40-50v50l-40 20-40-20-40 40-40-10-40 20z" fill={accent} fillOpacity="0.12" stroke="none" />
          </>
        )}
        {kind === 'roc' && (
          <>
            <path d="M40 200C60 60 200 30 360 30" stroke={accent} strokeWidth="2" />
            <path d="M40 200h320M40 200V30" />
            <rect className="cover__move" x="250" y="100" width="50" height="50" fill={accent} fillOpacity="0.25" />
            <rect x="300" y="100" width="50" height="50" />
            <rect x="250" y="150" width="50" height="50" />
            <rect x="300" y="150" width="50" height="50" fill={accent} fillOpacity="0.12" />
          </>
        )}
        {kind === 'tokens' && (
          <>
            <circle cx="150" cy="110" r="55" stroke={accent} strokeWidth="2" />
            <circle cx="220" cy="110" r="55" />
            <path className="cover__move" d="M60 40h120M60 52h90M60 64h110" stroke="#f87171" />
            <path d="M230 200h120M230 190h90M230 180h110" stroke="#4ade80" />
            <path d="M60 200h110" stroke="#facc15" />
          </>
        )}
        {kind === 'map' && (
          <>
            <circle className="cover__move" cx="200" cy="120" r="70" stroke={accent} strokeDasharray="4 4" />
            <path d="M20 90c60-50 120 30 200-10s120 30 160-10M20 130c60-50 120 30 200-10s120 30 160-10M20 170c60-50 120 30 200-10s120 30 160-10" />
            <path d="M200 95a14 14 0 1 1 .1 0l-.1 30z" fill={accent} stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
}
