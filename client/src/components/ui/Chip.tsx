import { cx } from '@/lib/classNames';

interface ChipProps {
  label: string;
  highlighted?: boolean;
}

/** Static technology tag. */
export function Chip({ label, highlighted }: ChipProps) {
  return <span className={cx('chip', highlighted && 'is-hit')}>{label}</span>;
}
