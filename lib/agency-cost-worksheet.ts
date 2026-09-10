export function monthlyWorkflowCost(volume: number, reviewMinutes: number, transferMinutes: number, hourlyCost: number, softwareCost: number) {
  if ([volume, reviewMinutes, transferMinutes, hourlyCost, softwareCost].some((value) => !Number.isFinite(value) || value < 0) || !Number.isInteger(volume)) return null;
  const hours = volume * (reviewMinutes + transferMinutes) / 60;
  const labour = hours * hourlyCost;
  const total = labour + softwareCost;
  if (![hours, labour, total].every(Number.isFinite)) return null;
  return { hours, labour, total };
}
