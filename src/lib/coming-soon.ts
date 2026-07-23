import { headers } from "next/headers";

export function isComingSoonEnvEnabled() {
  const value = process.env.COMING_SOON?.trim().toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

export async function isComingSoonActive() {
  if (isComingSoonEnvEnabled()) return true;
  const headerStore = await headers();
  return headerStore.get("x-coming-soon") === "1";
}
