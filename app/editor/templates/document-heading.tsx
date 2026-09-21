import { createContext, useContext, type HTMLAttributes, type ReactNode } from "react";

const IllustrativeCvContext = createContext(false);

/** Marketing examples have an accessible HTML equivalent outside the visual preview. */
export function IllustrativeCvProvider({ children }: { children: ReactNode }) {
  return <IllustrativeCvContext.Provider value={true}>{children}</IllustrativeCvContext.Provider>;
}

export function CvDocumentHeading(props: HTMLAttributes<HTMLHeadingElement>) {
  const illustrative = useContext(IllustrativeCvContext);
  return illustrative ? <div {...props} /> : <h1 {...props} />;
}
