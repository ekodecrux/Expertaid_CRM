import { ENV } from "./_core/env";

export function validateCredentialLogin(email: string, password: string): boolean {
  return email.trim().toLowerCase() === ENV.crmLoginEmail.trim().toLowerCase() && password.trim() === ENV.crmLoginPassword.trim();
}
