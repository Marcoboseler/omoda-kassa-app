// Validates and formats monetary input: max 9 digits, max 2 decimals
export const validateInput = (value: string): string => {
  let cleaned = value.replace(/[^\d.]/g, '');

  const parts = cleaned.split('.');
  if (parts.length > 2) {
    cleaned = parts[0] + '.' + parts.slice(1).join('');
  }

  const [integerPart, decimalPart] = cleaned.split('.');
  let validatedInteger = integerPart?.slice(0, 9) || '';
  let validatedDecimal = decimalPart?.slice(0, 2) || '';

  if (cleaned.includes('.')) return validatedInteger + '.' + validatedDecimal;

  return validatedInteger;
};
