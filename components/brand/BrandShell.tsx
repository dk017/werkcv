import type { ReactNode } from "react";

type BrandShellProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Opt-in brand boundary for the prototype. Keeping the boundary explicit lets
 * the rest of the site retain its current visual language until the system has
 * been reviewed and approved for a wider migration.
 */
export function BrandShell({ children, className = "" }: BrandShellProps) {
  return (
    <div className={`werkcv-brand ${className}`.trim()}>
      {children}
    </div>
  );
}
