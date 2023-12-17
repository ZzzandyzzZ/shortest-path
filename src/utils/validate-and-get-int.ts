export const validateAndGetInt = (value: string | null, defaultValue: number) =>
  (Number.isInteger(value) && value != null)
    ? parseInt(value)
    : defaultValue
