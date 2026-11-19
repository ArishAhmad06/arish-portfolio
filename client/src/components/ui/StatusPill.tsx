import { availabilityLabels, site } from '@/config';
import { cx } from '@/lib/classNames';

export function StatusPill() {
  return (
    <span className={cx('pill', site.availability === 'busy' && 'pill--busy')}>
      <i className="pill__dot" aria-hidden="true" />
      {availabilityLabels[site.availability]}
    </span>
  );
}
