import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

type BrandTone = "neutral" | "accent" | "success" | "warning" | "danger";

export function BrandSection({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLElement> & { children: ReactNode }) {
  return (
    <section className={`wk-section ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}

export function BrandCard({
  children,
  className = "",
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode; tone?: BrandTone }) {
  return (
    <div className={`wk-card wk-card-${tone} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function BrandBadge({
  children,
  className = "",
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { children: ReactNode; tone?: BrandTone }) {
  return (
    <span className={`wk-badge wk-badge-${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

export function BrandButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet" | "danger";
}) {
  return (
    <button className={`wk-button wk-button-${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function ProductFrame({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`wk-product-frame ${className}`.trim()}>
      {label ? <p className="wk-product-frame-label">{label}</p> : null}
      {children}
    </div>
  );
}
