export type RenewalPlanLike = { clientId: string | null; clientStatus?: string | null };

export function groupPlansByClientId<T extends RenewalPlanLike>(items: T[]) {
  const groups = new Map<string, T[]>();
  const withoutClientId: T[] = [];
  for (const item of items) {
    if (!item.clientId) {
      withoutClientId.push(item);
      continue;
    }
    const group = groups.get(item.clientId) ?? [];
    group.push(item);
    groups.set(item.clientId, group);
  }
  const current = Array.from(groups.values()).map((group) => {
    const active = group.find((item) => item.clientStatus !== "Renewal") ?? group[0];
    return { current: active, history: group.filter((item) => item !== active) };
  });
  return { current, withoutClientId };
}
