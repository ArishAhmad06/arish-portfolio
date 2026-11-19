import type { ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cx } from '@/lib/classNames';

interface RevealProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Fades its children in once, the first time they scroll into view. */
export function Reveal({ as: Tag = 'div', className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={cx('reveal', inView && 'is-visible', className)}>
      {children}
    </Tag>
  );
}
