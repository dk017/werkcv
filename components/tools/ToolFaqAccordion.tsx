export type ToolFaqItem = {
  question: string;
  answer: string;
};

export function ToolFaqAccordion({ items }: { items: ToolFaqItem[] }) {
  return (
    <div className="border-2 border-black bg-white">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-slate-200 last:border-b-0">
          <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-black text-slate-900">
            <span>{item.question}</span>
            <span className="text-lg text-slate-500 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
