import { supabase } from "@/lib/supabase"

export type PublishedMix = {
  id: string
  title: string
  genre: string | null
  duration_seconds: number | null
  plays: number
  artwork_url: string | null
  audio_url: string | null
  is_exclusive: boolean
}

export type PublishedVideo = {
  id: string
  title: string
  category: string | null
  views: number
  thumbnail_url: string | null
  video_url: string
}

export type UpcomingEvent = {
  id: string
  title: string
  event_date: string
  venue: string | null
  location: string | null
  artwork_url: string | null
  description: string | null
}

export type CommunityMessage = {
  id: string
  user_id: string | null
  display_name: string
  message: string
  created_at: string
}

export async function getPublishedMixes() {
  if (!supabase) return []
  const { data, error } = await supabase.from("mixes").select("id,title,genre,duration_seconds,plays,artwork_url,audio_url,is_exclusive").eq("published", true).order("release_date", { ascending: false })
  if (error) throw error
  return data
}

export async function getPublishedVideos() {
  if (!supabase) return []
  const { data, error } = await supabase.from("videos").select("id,title,category,views,thumbnail_url,video_url").eq("published", true).order("created_at", { ascending: false })
  if (error) throw error
  return data
}

export async function getUpcomingEvents() {
  if (!supabase) return []
  const { data, error } = await supabase.from("events").select("id,title,event_date,venue,location,artwork_url,description").eq("status", "upcoming").order("event_date")
  if (error) throw error
  return data
}

export async function getCommunityMessages() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from("community_messages")
    .select("id,user_id,display_name,message,created_at")
    .eq("approved", true)
    .order("created_at", { ascending: true })
  if (error) throw error
  return data as CommunityMessage[]
}

export async function createCommunityMessage(message: { userId: string; displayName: string; text: string }) {
  if (!supabase) throw new Error("Supabase is not configured")
  const { data, error } = await supabase
    .from("community_messages")
    .insert({ user_id: message.userId, display_name: message.displayName, message: message.text })
    .select("id,user_id,display_name,message,created_at")
    .single()
  if (error) throw error
  return data as CommunityMessage
}

export async function createBooking(booking: Record<string, unknown>) {
  if (!supabase) throw new Error("Supabase is not configured")
  const { data: session } = await supabase.auth.getSession()
  const { data, error } = await supabase.from("bookings").insert({ ...booking, user_id: session.session?.user.id ?? null }).select().single()
  if (error) throw error
  return data
}

export async function createAnonymousBooking(booking: Record<string, unknown>) {
  if (!supabase) return null
  const { data, error } = await supabase.from("bookings").insert({ ...booking, user_id: null }).select().single()
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
