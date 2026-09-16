import { describe, expect, it } from "vitest"

function buildAuthFormState(email: string, password: string, mode: "signin" | "signup") {
  const normalizedEmail = email.trim()
  const normalizedPassword = password.trim()

  if (!normalizedEmail || !normalizedPassword) {
    return { valid: false, error: "Email and password are required." }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { valid: false, error: "Enter a valid email address." }
  }

  if (normalizedPassword.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters long." }
  }

  if (mode === "signup" && normalizedPassword.toLowerCase() === normalizedEmail.split("@")[0].toLowerCase()) {
    return { valid: false, error: "Choose a stronger password." }
  }

  return { valid: true, error: "" }
}

describe("auth form validation", () => {
  it("accepts a valid sign-in payload", () => {
    expect(buildAuthFormState("fan@example.com", "secret123", "signin")).toEqual({ valid: true, error: "" })
  })

  it("rejects bad email addresses", () => {
    expect(buildAuthFormState("bad-email", "secret123", "signin")).toEqual({
      valid: false,
      error: "Enter a valid email address.",
    })
  })

  it("requires a stronger password on signup", () => {
    expect(buildAuthFormState("fan@example.com", "fan", "signup")).toEqual({
      valid: false,
      error: "Password must be at least 6 characters long.",
    })
  })
})
