import { supabase } from "@/lib/supabase"

export type LiveRequestStatus = "Pending" | "Accepted" | "Playing" | "Played" | "Declined" | "Cancelled"
export type RequestTier = "Free" | "Standard" | "Priority" | "VIP"

export type LiveRequestRecord = {
  id: string
  request_number: number
  session_id: string
  venue_id: string
  table_id: string | null
  user_id: string | null
  song_title: string
  artist: string
  message: string | null
  tier: RequestTier
  amount: number
  status: LiveRequestStatus
  payment_status: "unpaid" | "pending" | "paid" | "failed" | "refunded"
  created_at: string
  updated_at: string
}

export type LiveSessionRecord = {
  id: string
  venue_id: string
  dj_id: string
  event_id: string | null
  status: "scheduled" | "live" | "paused" | "ended"
  started_at: string | null
  ended_at: string | null
  request_prices: Record<RequestTier, number>
}

export async function getVenueByQrToken(qrToken: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from("venue_tables")
    .select("id,label,section,floor,venue:venues(id,slug,name,city,cover_image_url,status)")
    .eq("qr_token", qrToken)
    .eq("active", true)
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getLiveSession(venueId: string) {
  if (!supabase) return null
  const { data, error } = await supabase
    .from("dj_sessions")
    .select("id,venue_id,dj_id,event_id,status,started_at,ended_at,request_prices")
    .eq("venue_id", venueId)
    .in("status", ["live", "paused"])
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  return data as LiveSessionRecord | null
}

export async function getLiveRequests(sessionId: string) {
  if (!supabase) return []
  const { data, error } = await supabase
    .from("live_requests")
    .select("id,request_number,session_id,venue_id,table_id,user_id,song_title,artist,message,tier,amount,status,payment_status,created_at,updated_at")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data as LiveRequestRecord[]
}

export async function createLiveRequest(input: {
  sessionId: string
  venueId: string
  tableId?: string | null
  songTitle: string
  artist: string
  message?: string
  tier: RequestTier
  amount: number
  idempotencyKey: string
}) {
  if (!supabase) throw new Error("Supabase is not configured")
  const { data, error } = await supabase.rpc("create_live_request", {
    p_session_id: input.sessionId,
    p_venue_id: input.venueId,
    p_table_id: input.tableId ?? null,
    p_song_title: input.songTitle,
    p_artist: input.artist,
    p_message: input.message ?? "",
    p_tier: input.tier,
    p_amount: input.amount,
    p_idempotency_key: input.idempotencyKey,
  })
  if (error) throw error
  return data as LiveRequestRecord
}

export async function advanceLiveRequest(requestId: string, status: Exclude<LiveRequestStatus, "Pending" | "Cancelled">) {
  if (!supabase) throw new Error("Supabase is not configured")
  const { data, error } = await supabase.rpc("advance_live_request", {
    p_request_id: requestId,
    p_status: status,
  })
  if (error) throw error
  return data as LiveRequestRecord
}

export function subscribeToLiveSession(sessionId: string, onRequestChanged: (request: LiveRequestRecord) => void) {
  if (!supabase) return () => undefined
  const channel = supabase
    .channel(`session:${sessionId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "live_requests", filter: `session_id=eq.${sessionId}` }, payload => {
      if (payload.new && typeof payload.new === "object" && "id" in payload.new) onRequestChanged(payload.new as LiveRequestRecord)
    })
    .subscribe()
  return () => {
    void supabase.removeChannel(channel)
  }
}
