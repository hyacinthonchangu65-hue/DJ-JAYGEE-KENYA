import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? ""
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
const webhookSecret = Deno.env.get("PAYMENT_WEBHOOK_SECRET") ?? ""
const supabase = createClient(supabaseUrl, serviceRoleKey)

async function signPayload(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload))
  return [...new Uint8Array(signature)].map(byte => byte.toString(16).padStart(2, "0")).join("")
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false
  let result = 0
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index)
  return result === 0
}

Deno.serve(async request => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 })
  if (!supabaseUrl || !serviceRoleKey || !webhookSecret) return new Response("Payment webhook is not configured", { status: 503 })

  const payload = await request.text()
  const signature = request.headers.get("x-payment-signature") ?? ""
  const expectedSignature = await signPayload(payload)
  if (!constantTimeEqual(signature, expectedSignature)) return new Response("Invalid signature", { status: 401 })

  let body: { idempotencyKey?: string; providerReference?: string; status?: "succeeded" | "failed" | "refunded" }
  try {
    body = JSON.parse(payload)
  } catch {
    return new Response("Invalid JSON", { status: 400 })
  }

  if (!body.idempotencyKey || !body.status) return new Response("Missing payment fields", { status: 400 })

  const { data: payment, error: paymentLookupError } = await supabase
    .from("payments")
    .select("id,live_request_id")
    .eq("idempotency_key", body.idempotencyKey)
    .maybeSingle()
  if (paymentLookupError) return new Response(paymentLookupError.message, { status: 500 })
  if (!payment) return new Response("Payment not found", { status: 404 })

  const { error: paymentError } = await supabase
    .from("payments")
    .update({ status: body.status, provider_reference: body.providerReference ?? null, updated_at: new Date().toISOString() })
    .eq("id", payment.id)
  if (paymentError) return new Response(paymentError.message, { status: 500 })

  if (payment.live_request_id) {
    const requestPaymentStatus = body.status === "succeeded" ? "paid" : body.status
    const { error: requestError } = await supabase
      .from("live_requests")
      .update({ payment_status: requestPaymentStatus, updated_at: new Date().toISOString() })
      .eq("id", payment.live_request_id)
    if (requestError) return new Response(requestError.message, { status: 500 })
  }

  return Response.json({ ok: true })
})
