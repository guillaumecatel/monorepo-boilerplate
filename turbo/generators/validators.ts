export const validateName = (input: string, fieldName: string) => {
  if (!input) return `${fieldName} is required`
  if (!/^[a-z0-9-]+$/.test(input)) {
    return `${fieldName} must be lowercase, alphanumeric, and hyphenated`
  }
  return true
}
