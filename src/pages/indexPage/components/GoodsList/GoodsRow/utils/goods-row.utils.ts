
export function splitNumberToParts(value: number | string): [string, string] {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const formatted = numValue.toFixed(2);
  const parts = formatted.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const fractionalPart = parts[1];
  return [integerPart, fractionalPart];
}
