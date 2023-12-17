export const validateAndGetInt = (value: string | null, defaultValue: number) =>
  (value != null && /^[0-9]+$/.test(value))
    ? parseInt(value)
    : defaultValue
