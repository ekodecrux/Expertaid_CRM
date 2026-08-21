import { describe, expect, it } from "vitest";
import { buildQuotationExportRows } from "./quotationExport";

describe("quotation export rows", () => {
  it("includes quotation metadata, product values, GST, and grand total", () => {
    const rows = buildQuotationExportRows({
      quotationNumber: "QT-129",
      estimationNumber: 129,
      clientName: "Normal high school",
      clientAddress: "Hyderabad",
      clientContact: "928111807",
      clientEmail: "school@example.com",
      clientGst: "GST123",
      quotationDate: "2026-08-21",
      validityDays: 15,
      gstRate: 18,
      gstMode: "exclusive",
      companyGst: "COMPANYGST",
      companyAddress: "Company address",
      status: "Awaiting",
      terms: "Goods once sold",
      items: [
        { product: "ERP", productName: "ERP", itemName: "ERP License", quantity: 2, unitPrice: 1000 },
        { product: "Biometric", productName: "Biometric", itemName: "Device", quantity: 1, unitPrice: 500 },
      ],
    });

    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({ "Quotation No": "QT-129", "Client GSTIN": "GST123", Product: "ERP", Quantity: 2, "Amount Before GST": 2000, "Product GST Amount": 360, "Grand Total": 2950 });
    expect(rows[1]["Product Total Amount"]).toBe(590);
  });
});
