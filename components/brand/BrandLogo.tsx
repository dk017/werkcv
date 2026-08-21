import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  context?: string;
};

export function BrandLogo({ href = "/", context }: BrandLogoProps) {
  return (
    <Link href={href} className="wk-logo" aria-label={context ? `WerkCV ${context}` : "WerkCV home"}>
      <span>Werk</span>
      <span className="wk-logo-mark">CV</span>
      <span>.nl</span>
      {context ? <span className="wk-logo-context">{context}</span> : null}
    </Link>
  );
}
