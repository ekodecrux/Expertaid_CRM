export function completedServiceMonths(startDate: string, endDate: string, today: string) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  const current = new Date(`${today}T00:00:00Z`);
  if (![start, end, current].every((value) => Number.isFinite(value.getTime())) || end < start || current < start) return 0;
  const effective = current > end ? end : current;
  let months = (effective.getUTCFullYear() - start.getUTCFullYear()) * 12 + effective.getUTCMonth() - start.getUTCMonth();
  if (effective.getUTCDate() < start.getUTCDate()) months -= 1;
  return Math.max(0, months);
}

export function completedServiceDuration(startDate: string, endDate: string, today = new Date().toISOString().slice(0, 10)) {
  const months = completedServiceMonths(startDate, endDate, today);
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years) return `${years}y${remainder ? ` ${remainder}m` : ""}`;
  return `${months} months completed`;
}
