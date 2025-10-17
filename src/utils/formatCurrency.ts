export function formatCurrency(
  value: number | null | undefined,
  locale = "en-US",
  currency = "USD"
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    value
  );
}