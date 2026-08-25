import { describe, expect, it } from "vitest";
import { filterQuotations } from "./quotationSearch";

describe("filterQuotations", () => {
  const quotations = [
    { quotationNumber: "QT-129", estimationNumber: 129, clientName: "Greenfield Academy", clientEmail: "accounts@greenfield.edu", clientContact: "9876543210" },
    { quotationNumber: "QT-130", estimationNumber: 130, clientName: "Sunrise School", clientEmail: "admin@sunrise.edu", clientContact: "9123456780" },
  ];

  it("returns all quotations for an empty or whitespace query", () => {
    expect(filterQuotations(quotations, "  ")).toEqual(quotations);
  });

  it("matches quotation and estimation numbers", () => {
    expect(filterQuotations(quotations, "qt-130").map((quotation) => quotation.clientName)).toEqual(["Sunrise School"]);
    expect(filterQuotations(quotations, "129").map((quotation) => quotation.clientName)).toEqual(["Greenfield Academy"]);
  });

  it("matches client name, email, and contact number case-insensitively", () => {
    expect(filterQuotations(quotations, "GREENFIELD")).toHaveLength(1);
    expect(filterQuotations(quotations, "ADMIN@SUNRISE.EDU")).toHaveLength(1);
    expect(filterQuotations(quotations, "9123456780")).toHaveLength(1);
  });
});
