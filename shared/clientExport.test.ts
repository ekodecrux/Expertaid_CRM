import { describe, expect, it } from "vitest";
import { buildClientExportRecord } from "./clientExport";

describe("client export records", () => {
  it("includes complete profile, project, plan, GST, payment, and status details", () => {
    const record = buildClientExportRecord({
      id: 12,
      clientId: "ERP26003",
      clientName: "Add client ERP",
      clientOwnerName: "Principal Owner",
      contactNumber: "2472047247",
      email: "client@example.com",
      address: "Hyderabad",
      noOfStudents: 100,
      pricingMode: "perStudent",
      perStudentPrice: "10000",
      packagePrice: null,
      price: "1000000",
      gstRate: "18",
      gstMode: "exclusive",
      gstAmount: "180000",
      session: "2026-2027",
      startDate: "2026-08-21",
      endDate: "2027-08-20",
      totalPrice: "1180000",
      description: "ERP plan",
      instituteType: "School",
      branchCoverage: "multiple",
      branchCount: 3,
    }, { projectName: "ERP", projectType: "ERP", status: "Active", approvedOn: "21 Aug 2026", paid: 100000, pending: 1080000 });

    expect(record).toMatchObject({ "Client ID": "ERP26003", Address: "Hyderabad", Project: "ERP", "GST Amount": 180000, "Paid Amount": 100000, "Pending Amount": 1080000 });
    expect(Object.keys(record)).toContain("Description / Note");
  });
});
