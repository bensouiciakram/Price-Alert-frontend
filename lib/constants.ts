export const FREQUENCY_OPTIONS = [
  { value: "3600", label: "Every hour" },
  { value: "14400", label: "Every 4 hours" },
  { value: "86400", label: "Daily" },
] as const;

export const CHANNEL_OPTIONS = [
  { value: "telegram", label: "Telegram" },
  { value: "gmail", label: "Gmail" },
] as const;

export const LIBRARY_OPTIONS = [
  { value: "playwright", label: "Playwright (JavaScript rendering)" },
  { value: "requests", label: "Requests (Fast, static pages)" },
] as const;

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/products/alerts", label: "Alerts" },
] as const;

export const NOTIFICATION_PREFERENCES = [
  "Email alerts",
  "Slack alerts",
  "Telegram alerts",
] as const;