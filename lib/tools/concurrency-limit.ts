type ConcurrencyLease = { release: () => void };

let activeGlobal = 0;
const activeByKey = new Map<string, number>();

export function tryAcquireConcurrencyLease(
  key: string,
  options: { maxGlobal: number; maxPerKey: number },
): ConcurrencyLease | null {
  const safeKey = key.trim() || "unknown";
  const perKey = activeByKey.get(safeKey) || 0;
  if (activeGlobal >= options.maxGlobal || perKey >= options.maxPerKey) return null;

  activeGlobal += 1;
  activeByKey.set(safeKey, perKey + 1);
  let released = false;
  return {
    release() {
      if (released) return;
      released = true;
      activeGlobal = Math.max(0, activeGlobal - 1);
      const remaining = Math.max(0, (activeByKey.get(safeKey) || 1) - 1);
      if (remaining) activeByKey.set(safeKey, remaining);
      else activeByKey.delete(safeKey);
    },
  };
}

export function resetConcurrencyLimitForTests(): void {
  activeGlobal = 0;
  activeByKey.clear();
}
