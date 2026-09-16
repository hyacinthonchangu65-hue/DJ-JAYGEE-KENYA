export type AuthMode = "signin" | "signup"

export function validateAuthForm({
  email,
  password,
  confirmPassword,
  mode,
}: {
  email: string
  password: string
  confirmPassword?: string
  mode: AuthMode
}) {
  const normalizedEmail = email.trim()
  const normalizedPassword = password.trim()
  const normalizedConfirmPassword = confirmPassword?.trim() ?? ""

  if (!normalizedEmail || !normalizedPassword) {
    return { valid: false, error: "Email and password are required." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { valid: false, error: "Enter a valid email address." }
  }

  if (normalizedPassword.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters long." }
  }

  if (mode === "signup" && normalizedPassword !== normalizedConfirmPassword) {
    return { valid: false, error: "Passwords do not match." }
  }

  return { valid: true, error: "" }
}
