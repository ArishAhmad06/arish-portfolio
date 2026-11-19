import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cx } from '@/lib/classNames';

interface DiagramNode {
  label: string;
  detail: string;
  x: number;
  y: number;
}

/** The request path shown in the hero: client -> API -> validation -> service/database -> ML model. */
const nodes: DiagramNode[] = [
  { label: 'Client', detail: 'POST /predict', x: 200, y: 30 },
  { label: 'API Gateway', detail: 'Express · routing, rate limits', x: 200, y: 100 },
  { label: 'Auth + Validation', detail: 'JWT · Zod / Pydantic', x: 200, y: 170 },
  { label: 'Service layer', detail: 'Business logic', x: 90, y: 240 },
  { label: 'PostgreSQL', detail: 'Prisma · persistent data', x: 310, y: 240 },
  { label: 'ML model', detail: 'FastAPI · Scikit-learn', x: 200, y: 310 },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

/** Order in which the animated packet visits the nodes. */
const route = [0, 1, 2, 3, 5, 4, 5, 0];

export function HeroDiagram() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % route.length), 900);
    return () => window.clearInterval(id);
  }, [reduced]);

  const current = nodes[route[step]];

  return (
    <div className="framed hero__diagram">
      <svg
        viewBox="0 0 400 360"
        role="img"
        aria-label="Diagram: a client request passes through an API gateway, validation, a service layer, PostgreSQL and an ML model, then returns a prediction."
      >
        {edges.map(([from, to]) => (
          <line
            key={`${from}-${to}`}
            className="diagram__line"
            x1={nodes[from].x}
            y1={nodes[from].y + 14}
            x2={nodes[to].x}
            y2={nodes[to].y - 14}
          />
        ))}

        {nodes.map((node, index) => {
          const lit = reduced || route[step] === index;
          return (
            <g
              key={node.label}
              className={cx('diagram__node', lit && 'is-on')}
              tabIndex={0}
              onMouseEnter={() => setTip(`${node.label} · ${node.detail}`)}
              onFocus={() => setTip(`${node.label} · ${node.detail}`)}
            >
              <rect x={node.x - 75} y={node.y - 15} width="150" height="30" rx="2" />
              <text x={node.x} y={node.y + 5} textAnchor="middle">
                {node.label}
              </text>
            </g>
          );
        })}

        {!reduced && <circle className="diagram__packet" r="5" cx={current.x} cy={current.y} />}
      </svg>
      <p className="mono hero__tip" aria-live="polite">
        {tip ?? 'Hover or focus a node.'}
      </p>
    </div>
  );
}
