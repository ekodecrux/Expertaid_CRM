export type ClientExportInput = {
  id: number;
  clientId?: string | null;
  clientName: string;
  clientOwnerName: string;
  contactNumber: string;
  email: string;
  address: string;
  noOfStudents: number;
  pricingMode: "perStudent" | "package";
  perStudentPrice: string | null;
  packagePrice: string | null;
  price?: string | null;
  gstRate?: string | null;
  gstMode?: "inclusive" | "exclusive" | null;
  gstAmount?: string | null;
  session: string;
  startDate: string;
  endDate: string;
  totalPrice: string;
  description: string | null;
  instituteType: "School" | "College" | "Academy";
  branchCoverage: "individual" | "multiple";
  branchCount: number;
};

export function buildClientExportRecord(
  client: ClientExportInput,
  extras: { projectName: string; projectType: "ERP" | "Other"; status: string; approvedOn: string; paid: number; pending: number },
) {
  return {
    "Client Name": client.clientName,
    "Client ID": client.clientId ?? `AG-${Math.abs(client.id)}`,
    "Client Owner Name": client.clientOwnerName,
    "Contact Number": client.contactNumber,
    "Email ID": client.email,
    Address: client.address,
    Project: extras.projectName,
    "Project Type": extras.projectType,
    "Institute Type": client.instituteType,
    Session: client.session,
    "Branch Coverage": client.branchCoverage,
    "Number of Branches": client.branchCoverage === "multiple" ? client.branchCount : 1,
    "No. of Students / Employees": client.noOfStudents,
    "Pricing Mode": client.pricingMode,
    "Per Student / Employee Price": Number(client.perStudentPrice ?? 0),
    "Package Price": Number(client.packagePrice ?? 0),
    "Base Amount": Number(client.price ?? 0),
    "GST Rate": Number(client.gstRate ?? 0),
    "GST Mode": client.gstMode ?? "exclusive",
    "GST Amount": Number(client.gstAmount ?? 0),
    "Total Amount": Number(client.totalPrice ?? 0),
    "Paid Amount": extras.paid,
    "Pending Amount": extras.pending,
    "Plan From": client.startDate,
    "Plan To": client.endDate,
    "Description / Note": client.description ?? "",
    Status: extras.status,
    "Approved On": extras.approvedOn,
  };
}
