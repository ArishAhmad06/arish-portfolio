import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/classNames';

type Variant = 'primary' | 'ghost';

const variantClass = (variant: Variant) => cx('btn', variant === 'primary' && 'btn--primary');

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant };
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

/** An anchor styled as a button. External links automatically open safely in a new tab. */
export function ButtonLink({ variant = 'ghost', className, href, ...rest }: LinkProps) {
  const external = typeof href === 'string' && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={cx(variantClass(variant), className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    />
  );
}

export function Button({ variant = 'ghost', className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cx(variantClass(variant), className)} {...rest} />;
}
