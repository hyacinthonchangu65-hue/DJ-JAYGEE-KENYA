export type Mix = {
  id: string
  title: string
  genre: string
  duration: string
  plays: string
  artwork: string
  audioUrl?: string
  exclusive?: boolean
}

export type Video = {
  id: string
  title: string
  category: string
  duration: string
  views: string
  thumbnail: string
  url: string
}

export type Event = {
  id: string
  title: string
  date: string
  venue: string
  location: string
  artwork: string
  description: string
}

export const demoMixes: Mix[] = [
  { id: "afrobeat-vibes", title: "Afrobeat Vibes Vol. 1", genre: "Afrobeat", duration: "58:32", plays: "12K", artwork: "https://images.unsplash.com/photo-1571266028243-d220c9c3b2b2?w=900&h=900&fit=crop&auto=format" },
  { id: "amapiano-nights", title: "Amapiano Nights", genre: "Amapiano", duration: "46:18", plays: "8.4K", artwork: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=900&h=900&fit=crop&auto=format" },
  { id: "nairobi-weekend", title: "Nairobi Weekend Mix", genre: "Party Mix", duration: "1:02:10", plays: "21K", artwork: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=900&fit=crop&auto=format" },
  { id: "chill-vibes", title: "Chill & Vibes", genre: "House", duration: "42:05", plays: "6.7K", artwork: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&h=900&fit=crop&auto=format" },
]

export const demoVideos: Video[] = [
  { id: "live-set", title: "DJ JayGee Live Set", category: "Live Performances", duration: "12:40", views: "18K", thumbnail: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=900&h=600&fit=crop&auto=format", url: "https://youtube.com/@djaygeekenya-c6q7i" },
  { id: "behind-scenes", title: "Behind the Booth", category: "Behind the Scenes", duration: "06:24", views: "5.2K", thumbnail: "https://images.unsplash.com/photo-1571266028243-d220c9c3b2b2?w=900&h=600&fit=crop&auto=format", url: "https://youtube.com/@djaygeekenya-c6q7i" },
]

export const demoEvents: Event[] = [
  { id: "nairobi-live", title: "DJ JayGee Live - Nairobi", date: "18 OCT 2026", venue: "The Waterfront", location: "Nairobi, Kenya", artwork: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&h=600&fit=crop&auto=format", description: "An all-night celebration of Afrobeat, Amapiano, and the best sounds from Nairobi." },
  { id: "afrobeat-weekend", title: "Afrobeat Weekend", date: "07 NOV 2026", venue: "Safari Park", location: "Nairobi, Kenya", artwork: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&h=600&fit=crop&auto=format", description: "A premium outdoor event with live DJs, food, friends, and perfect moments." },
]
