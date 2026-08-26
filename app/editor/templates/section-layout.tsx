import type { ReactNode, ReactElement } from "react";
import { Children, isValidElement } from "react";
import type { CVData } from "@/lib/cv";
import {
    resolveCvSectionLayout,
    type CvBodySectionId,
} from "@/lib/cv-sections";

type Lane = "main" | "sidebar";

interface OrderedSectionContainerProps {
    data: CVData;
    templateId: string;
    lane: Lane;
    children: ReactNode;
    className?: string;
}

/**
 * Reorders only marked body-section children. Fixed header/contact content is
 * left in its authored position, while the marked section blocks follow the
 * canonical resolver. This component owns no visual styling.
 */
export function OrderedSectionContainer({
    data,
    templateId,
    lane,
    children,
    className,
}: OrderedSectionContainerProps) {
    const resolved = resolveCvSectionLayout(data, templateId);
    const orderedIds = lane === "sidebar" ? resolved.sidebar : resolved.main;
    const rank = new Map(orderedIds.map((id, index) => [id, index]));
    const items = Children.toArray(children);
    const marked = items.filter((child): child is ReactElement<{ "data-cv-section"?: CvBodySectionId }> => {
        if (!isValidElement(child)) return false;
        const props = child.props as { "data-cv-section"?: unknown } | null;
        const id = props?.["data-cv-section"];
        return typeof id === "string" && rank.has(id as CvBodySectionId);
    });

    if (marked.length < 2) {
        return <div className={className}>{children}</div>;
    }

    const firstMarked = items.indexOf(marked[0]);
    const lastMarked = items.lastIndexOf(marked[marked.length - 1]);
    const sorted = [...marked].sort((left, right) => {
        const leftId = left.props["data-cv-section"] as CvBodySectionId;
        const rightId = right.props["data-cv-section"] as CvBodySectionId;
        return (rank.get(leftId) ?? 0) - (rank.get(rightId) ?? 0);
    });
    const reordered = [
        ...items.slice(0, firstMarked),
        ...sorted,
        ...items.slice(lastMarked + 1),
    ];

    return <div className={className}>{reordered}</div>;
}
