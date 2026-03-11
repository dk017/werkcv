import Link from "next/link";

export type RelatedToolCard = {
    href: string;
    title: string;
    description: string;
    badge?: string;
};

interface RelatedToolsSectionProps {
    title?: string;
    description?: string;
    tools: RelatedToolCard[];
}

export function RelatedToolsSection({
    title = "Gerelateerde tools",
    description,
    tools,
}: RelatedToolsSectionProps) {
    return (
        <section className="mt-12">
            <div className="mb-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Slimme vervolgstappen
                </p>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                    {title}
                </h2>
                {description ? (
                    <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {tools.map((tool) => (
                    <Link
                        key={tool.href}
                        href={tool.href}
                        className="group bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-5 block"
                    >
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-black text-slate-900 text-sm leading-tight group-hover:text-teal-700 transition-colors">
                                {tool.title}
                            </h3>
                            {tool.badge ? (
                                <span className="flex-shrink-0 text-[10px] font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full">
                                    {tool.badge}
                                </span>
                            ) : null}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
