import { describe, expect, it } from "vitest";
import { groupPlansByClientId } from "./clientRenewalHistory";

describe("groupPlansByClientId", () => {
  it("keeps the approved current plan and attaches older renewal plans to the same client", () => {
    const result = groupPlansByClientId([
      { id: 12, clientId: "ERP26001", clientStatus: "Active" },
      { id: 9, clientId: "ERP26001", clientStatus: "Renewal" },
      { id: 4, clientId: "ERP26002", clientStatus: "Renewal" },
    ]);
    expect(result.current).toEqual([
      { current: { id: 12, clientId: "ERP26001", clientStatus: "Active" }, history: [{ id: 9, clientId: "ERP26001", clientStatus: "Renewal" }] },
      { current: { id: 4, clientId: "ERP26002", clientStatus: "Renewal" }, history: [] },
    ]);
  });

  it("does not merge records that have no Client ID", () => {
    const result = groupPlansByClientId([{ id: -1, clientId: null, clientStatus: null }]);
    expect(result.current).toHaveLength(0);
    expect(result.withoutClientId).toHaveLength(1);
  });
});
