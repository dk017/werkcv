// Plain comparison table used by the long-form CV guides; wide tables scroll inside their own box on phones.
export default function SimpleTable({ head, rows, firstColumnIsHeader = true }: { head: readonly string[]; rows: readonly (readonly string[])[]; firstColumnIsHeader?: boolean }) {
  return (
    <div className="wk-table-scroll-hint mt-6 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--wk-border)]">
            {head.map((column) => (
              <th key={column} className="py-2 pr-4" scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([first, ...rest]) => (
            <tr key={first} className="border-b border-[var(--wk-border)] align-top">
              {firstColumnIsHeader ? (
                <th className="py-2 pr-4 font-semibold text-[var(--wk-ink)]" scope="row">
                  {first}
                </th>
              ) : (
                <td className="py-2 pr-4 text-[var(--wk-ink)]">{first}</td>
              )}
              {rest.map((cell, index) => (
                <td key={index} className={`py-2 pr-4 ${index === 0 ? "text-[var(--wk-ink)]" : "text-[var(--wk-ink-muted)]"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
