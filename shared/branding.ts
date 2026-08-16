export const DEFAULT_BRANDING = {
  companyLogoUrl: "/manus-storage/default-logo_ad33257a.png",
  companyName: "Expertaid Technologies Pvt. Ltd.",
  serviceCaption: "ERP Solutions • Software Development • IT Support",
  footerCompanyName: "Expertaid Technologies Pvt Ltd",
} as const;

export type CompanyBranding = {
  companyLogoUrl: string;
  companyName: string;
  serviceCaption: string;
  footerCompanyName: string;
};

export function normalizeBranding(input?: Partial<Record<keyof CompanyBranding, string | null>> | null): CompanyBranding {
  return {
    companyLogoUrl: input?.companyLogoUrl?.trim() || DEFAULT_BRANDING.companyLogoUrl,
    companyName: input?.companyName?.trim() || DEFAULT_BRANDING.companyName,
    serviceCaption: input?.serviceCaption?.trim() || DEFAULT_BRANDING.serviceCaption,
    footerCompanyName: input?.footerCompanyName?.trim() || DEFAULT_BRANDING.footerCompanyName,
  };
}
