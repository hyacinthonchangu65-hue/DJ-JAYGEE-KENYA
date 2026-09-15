import { supabase } from "@/lib/supabase"

export async function getPublishedMixes() {
  if (!supabase) return []
  const { data, error } = await supabase.from("mixes").select("*").eq("published", true).order("release_date", { ascending: false })
  if (error) throw error
  return data
}

export async function getPublishedVideos() {
  if (!supabase) return []
  const { data, error } = await supabase.from("videos").select("*").eq("published", true).order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function getUpcomingEvents() {
  if (!supabase) return []
  const { data, error } = await supabase.from("events").select("*").eq("status", "upcoming").order("event_date")
  if (error) throw error
  return data
}

export async function createBooking(booking: Record<string, unknown>) {
  if (!supabase) throw new Error("Supabase is not configured")
  const { data: session } = await supabase.auth.getSession()
  const { data, error } = await supabase.from("bookings").insert({ ...booking, user_id: session.session?.user.id ?? null }).select().single()
  if (error) throw error
  return data
}

export async function toggleFavorite(mixId: string, userId: string, currentlyFavorite: boolean) {
  if (!supabase) throw new Error("Supabase is not configured")
  const query = supabase.from("favorites")
  const result = currentlyFavorite
    ? await query.delete().eq("mix_id", mixId).eq("user_id", userId)
    : await query.insert({ mix_id: mixId, user_id: userId })
  if (result.error) throw result.error
}
