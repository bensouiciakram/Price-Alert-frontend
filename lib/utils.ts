export function extractDomain(url: string): string {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function formatLabel(value: string): string {
  const [date, time] = value.split(" ");
  return `${date}\n${time?.slice(0, 5) || ""}`;
}

export function getChange(
  current: string,
  previous: string | undefined
): { diff: number; percent: string; isUp: boolean } | null {
  if (previous === undefined) return null;
  const curr = Number(current);
  const prev = Number(previous);
  const diff = curr - prev;
  const percent = ((diff / prev) * 100).toFixed(2);
  return { diff, percent, isUp: diff > 0 };
}

export function isActive(href: string, pathname: string): boolean {
  if (href === "/products") {
    return pathname === href || pathname?.startsWith("/products/");
  }
  return pathname === href;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("authToken");
}

export function formatPrice(price: string | number | null | undefined, symbol: string = "$"): string {
  if (price == null) return `${symbol}—`;
  return `${symbol}${Number(price).toFixed(2)}`;
}