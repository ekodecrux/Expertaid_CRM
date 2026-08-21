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

    expect(record).toMatchObject({ "Client ID": "ERP26003", Address: "Hyderabad", Project: "ERP", "Project Type": "ERP", "Institute Type": "School", "Pricing Mode": "Per Student", "Per Student / Employee Price": 10000, "Package Price": "", "Base Amount": 1000000, "GST Amount": 180000, "Paid Amount": 100000, "Pending Amount": 1080000 });
    expect(Object.keys(record)).toContain("Description / Note");

    const packageRecord = buildClientExportRecord({ ...({} as any), ...{ id: 13, clientId: "ERP26004", clientName: "Package client", clientOwnerName: "Owner", contactNumber: "1", email: "package@example.com", address: "Hyderabad", noOfStudents: 0, pricingMode: "package", perStudentPrice: null, packagePrice: "10000", price: "0", gstRate: "18", gstMode: "exclusive", gstAmount: "1800", session: "2026-2027", startDate: "2026-08-21", endDate: "2027-08-20", totalPrice: "11800", description: null, instituteType: "School", branchCoverage: "individual", branchCount: 1 } }, { projectName: "Mychool", projectType: "Other", status: "Active", approvedOn: "—", paid: 0, pending: 11800 });
    expect(packageRecord).toMatchObject({ "Pricing Mode": "Package", "Per Student / Employee Price": "", "Package Price": 10000, "Base Amount": 10000, "Institute Type": "Not applicable" });
  });
});
