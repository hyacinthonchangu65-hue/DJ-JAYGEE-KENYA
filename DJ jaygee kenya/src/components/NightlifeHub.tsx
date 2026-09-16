import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

type HubSection = "discover" | "reservations" | "orders" | "wallet" | "tickets" | "safety"

type NightlifeHubProps = {
  user: User | null
  onSignIn: () => void
}

const offers = [
  { title: "Free entry before 10 PM", venue: "Club X", detail: "Tonight · 42 spots left", tone: "bg-[#111111] text-white" },
  { title: "VIP table discount", venue: "The Waterfront", detail: "20% off · Ends Sunday", tone: "bg-[#A41E14] text-white" },
  { title: "Two-for-one cocktails", venue: "The Alchemist", detail: "Show this offer at the bar", tone: "bg-[#C96B6B] text-[#111111]" },
]

const venues = [
  { name: "Club X", location: "Westlands, Nairobi", genre: "Afrobeats · Amapiano", status: "Live tonight", image: "https://images.unsplash.com/photo-1571266028243-d220c9c3b2b2?w=700&h=500&fit=crop&auto=format" },
  { name: "The Waterfront", location: "Karen, Nairobi", genre: "House · R&B", status: "Opening at 8 PM", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700&h=500&fit=crop&auto=format" },
]

export function NightlifeHub({ user, onSignIn }: NightlifeHubProps) {
  const [section, setSection] = useState<HubSection>("discover")
  const [notice, setNotice] = useState("")
  const [reservation, setReservation] = useState({ date: "", guests: "2", notes: "" })
  const [order, setOrder] = useState({ item: "Sparkling water", quantity: "1" })
  const [driver, setDriver] = useState({ pickup: "Club X", destination: "", passengers: "2" })
  const [lostItem, setLostItem] = useState({ type: "Phone", description: "" })
  const [karaoke, setKaraoke] = useState({ song: "", performer: "" })

  const requireUser = () => {
    if (!user) {
      onSignIn()
      return false
    }
    return true
  }

  const saveReservation = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!requireUser()) return
    if (!reservation.date) return setNotice("Choose a date for your reservation.")
    const venueId = new URLSearchParams(window.location.search).get("venue")
    if (supabase && user && venueId) {
      const { error } = await supabase.from("reservations").insert({ user_id: user.id, venue_id: venueId, reservation_date: reservation.date, guests: Number(reservation.guests), notes: reservation.notes || null })
      if (error) return setNotice(error.message)
    }
    setNotice("Reservation request sent. The venue will confirm your table shortly.")
  }

  const placeOrder = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!requireUser()) return
    if (supabase && user) {
      const { data: savedOrder, error } = await supabase.from("orders").insert({ user_id: user.id, total_amount: 0 }).select("id").single()
      if (error) return setNotice(error.message)
      if (savedOrder) await supabase.from("order_items").insert({ order_id: savedOrder.id, name: order.item, quantity: Number(order.quantity), unit_amount: 0 })
    }
    setNotice("Order placed. The venue team will confirm it in the Orders tab.")
  }

  const requestDriver = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!requireUser()) return
    if (!driver.destination.trim()) return setNotice("Add your destination first.")
    if (supabase && user) {
      const { error } = await supabase.from("driver_requests").insert({ user_id: user.id, pickup_location: driver.pickup, destination: driver.destination, passengers: Number(driver.passengers) })
      if (error) return setNotice(error.message)
    }
    setNotice("Driver request received. A transport partner will be assigned.")
  }

  const submitLostFound = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!requireUser()) return
    if (!lostItem.description.trim()) return setNotice("Describe the item so the venue team can identify it.")
    if (supabase && user) {
      const { error } = await supabase.from("lost_found_reports").insert({ user_id: user.id, item_type: lostItem.type, description: lostItem.description })
      if (error) return setNotice(error.message)
    }
    setNotice("Lost-and-found report submitted to the venue team.")
  }

  const joinKaraoke = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!requireUser()) return
    if (!karaoke.song.trim() || !karaoke.performer.trim()) return setNotice("Add the song and performer name.")
    const venueId = new URLSearchParams(window.location.search).get("venue")
    if (supabase && user && venueId) {
      const { error } = await supabase.from("karaoke_queue").insert({ user_id: user.id, venue_id: venueId, song_title: karaoke.song, performer_name: karaoke.performer, position: 1 })
      if (error) return setNotice(error.message)
    }
    setNotice("You are in the karaoke queue. Watch the venue display for your turn.")
  }

  const sectionButton = (value: HubSection, label: string) => <button onClick={() => { setSection(value); setNotice("") }} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${section === value ? "bg-[#111111] text-white" : "bg-white text-gray-500"}`}>{label}</button>
  const fieldClass = "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#A41E14]"

  return <div className="space-y-5">
    <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A41E14]">Your night</p><h1 className="mt-1 text-3xl font-bold">Nightlife hub</h1><p className="mt-2 text-sm text-gray-500">Discover, reserve, order, and get home safely.</p></div>
    <div className="flex gap-2 overflow-x-auto pb-1">{sectionButton("discover", "Explore")}{sectionButton("reservations", "Tables")}{sectionButton("orders", "Orders")}{sectionButton("wallet", "Wallet")}{sectionButton("tickets", "Tickets")}{sectionButton("safety", "Safety")}</div>
    {notice && <div className="rounded-xl border border-[#C96B6B]/40 bg-[#A41E14]/5 px-4 py-3 text-sm text-[#7C1D24]">{notice}</div>}

    {section === "discover" && <div className="space-y-5">
      <section><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Nearby tonight</h2><span className="text-xs text-gray-400">Nairobi</span></div><div className="space-y-3">{venues.map(venue => <article key={venue.name} className="overflow-hidden rounded-2xl bg-white shadow-sm"><div className="flex gap-3 p-3"><img src={venue.image} alt={venue.name} className="h-24 w-24 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><h3 className="font-bold">{venue.name}</h3><span className="rounded-full bg-green-100 px-2 py-1 text-[9px] font-bold text-green-700">{venue.status}</span></div><p className="mt-1 text-xs text-gray-500">{venue.location}</p><p className="mt-2 text-xs font-semibold text-[#A41E14]">{venue.genre}</p><button onClick={() => setSection("reservations")} className="mt-2 text-xs font-bold text-[#111111]">Reserve a table →</button></div></div></article>)}</div></section>
      <section><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Live offers</h2><span className="text-xs text-gray-400">Limited time</span></div><div className="space-y-3">{offers.map(offer => <article key={offer.title} className={`rounded-2xl p-4 shadow-sm ${offer.tone}`}><p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{offer.venue}</p><h3 className="mt-2 text-xl font-bold">{offer.title}</h3><p className="mt-1 text-xs opacity-70">{offer.detail}</p><button onClick={() => setNotice(`Offer saved: ${offer.title}`)} className="mt-4 rounded-lg border border-current/20 px-3 py-2 text-xs font-bold">Save offer</button></article>)}</div></section>
      <section className="rounded-2xl bg-[#111111] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-[#C96B6B]">Artist discovery</p><h2 className="mt-2 text-xl font-bold">Find your next sound</h2><p className="mt-1 text-sm text-white/60">Follow DJs and artists, save mixes, and get event reminders.</p><button onClick={() => setNotice("Artist directory is ready for profiles from your Supabase catalog.")} className="mt-4 rounded-xl bg-[#C96B6B] px-4 py-3 text-sm font-bold text-[#111111]">Explore artists</button></section>
    </div>}

    {section === "reservations" && <section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#A41E14]">Table service</p><h2 className="mt-1 text-2xl font-bold">Reserve your night</h2><p className="mt-2 text-sm text-gray-500">Choose your date and the venue team will confirm availability.</p><form onSubmit={saveReservation} className="mt-5 space-y-4"><label className="block text-sm font-semibold">Date<input required type="date" value={reservation.date} onChange={event => setReservation(current => ({ ...current, date: event.target.value }))} className={fieldClass} /></label><label className="block text-sm font-semibold">Guests<input min="1" type="number" value={reservation.guests} onChange={event => setReservation(current => ({ ...current, guests: event.target.value }))} className={fieldClass} /></label><label className="block text-sm font-semibold">Notes<textarea value={reservation.notes} onChange={event => setReservation(current => ({ ...current, notes: event.target.value }))} rows={3} placeholder="VIP booth, birthday, accessibility..." className={fieldClass} /></label><button className="w-full rounded-xl bg-[#A41E14] px-4 py-4 text-sm font-bold text-white">Request reservation</button></form></section>}

    {section === "orders" && <section className="space-y-4"><div className="rounded-2xl bg-[#111111] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-[#C96B6B]">Venue service</p><h2 className="mt-1 text-2xl font-bold">Order to your table</h2><p className="mt-2 text-sm text-white/60">Drinks, food, bottle service, and experiences with live status updates.</p></div><form onSubmit={placeOrder} className="space-y-4 rounded-2xl bg-white p-5 shadow-sm"><label className="block text-sm font-semibold">Item<select value={order.item} onChange={event => setOrder(current => ({ ...current, item: event.target.value }))} className={fieldClass}><option>Sparkling water</option><option>Signature cocktail</option><option>Food platter</option><option>VIP bottle service</option></select></label><label className="block text-sm font-semibold">Quantity<input min="1" type="number" value={order.quantity} onChange={event => setOrder(current => ({ ...current, quantity: event.target.value }))} className={fieldClass} /></label><button className="w-full rounded-xl bg-[#A41E14] px-4 py-4 text-sm font-bold text-white">Place order</button></form><div className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="font-bold">Order status</h3><div className="mt-4 flex items-center justify-between text-xs text-gray-500"><span className="font-bold text-[#A41E14]">Placed</span><span>Confirmed</span><span>Preparing</span><span>Delivered</span></div><div className="mt-3 h-2 rounded-full bg-gray-100"><div className="h-full w-1/4 rounded-full bg-[#A41E14]" /></div></div></section>}

    {section === "wallet" && <div className="space-y-4"><section className="rounded-2xl bg-[#111111] p-6 text-white shadow-xl"><p className="text-xs font-bold uppercase tracking-widest text-[#C96B6B]">DJ JayGee wallet</p><p className="mt-3 text-4xl font-bold">KES 0</p><p className="mt-1 text-sm text-white/50">Available balance</p><div className="mt-6 grid grid-cols-2 gap-3"><button onClick={() => setNotice("Top-up is ready for your configured M-Pesa or card provider.")} className="rounded-xl bg-[#C96B6B] px-3 py-3 text-sm font-bold text-[#111111]">Top up</button><button onClick={() => setNotice("Withdrawals require an approved payout account.")} className="rounded-xl border border-white/20 px-3 py-3 text-sm font-semibold">Withdraw</button></div></section><section className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="font-bold">Referral rewards</h2><span className="rounded-full bg-[#A41E14]/10 px-3 py-1 text-xs font-bold text-[#A41E14]">JAYGEE-FAN</span></div><p className="mt-2 text-sm text-gray-500">Invite friends and earn rewards after their first verified purchase.</p><button onClick={() => setNotice("Referral link copied: djjaygee.co.ke/join/JAYGEE-FAN")} className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold">Copy referral link</button></section><section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold">Transactions</h2><p className="mt-3 text-sm text-gray-500">Your verified payments, refunds, earnings, and rewards will appear here.</p></section></div>}

    {section === "tickets" && <div className="space-y-4"><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#A41E14]">My tickets</p><h2 className="mt-1 text-2xl font-bold">Your next event</h2><div className="mt-4 flex items-center gap-3 rounded-xl bg-[#111111] p-4 text-white"><div className="h-14 w-14 rounded-lg border-4 border-dashed border-[#C96B6B]" /><div><p className="font-bold">DJ JayGee Live</p><p className="mt-1 text-xs text-white/60">18 OCT 2026 · The Waterfront</p></div></div><button onClick={() => setNotice("Ticket checkout will issue a unique QR ticket after verified payment.")} className="mt-4 w-full rounded-xl bg-[#A41E14] px-4 py-3 text-sm font-bold text-white">Browse ticket types</button></section><section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="font-bold">Check-in</h2><p className="mt-2 text-sm text-gray-500">Venue staff scan your ticket QR and mark it checked in securely.</p></section></div>}

    {section === "safety" && <div className="space-y-4"><section className="rounded-2xl bg-[#111111] p-5 text-white"><p className="text-xs font-bold uppercase tracking-widest text-[#C96B6B]">Get home safe</p><h2 className="mt-1 text-2xl font-bold">Request a driver</h2><form onSubmit={requestDriver} className="mt-4 space-y-3"><input value={driver.destination} onChange={event => setDriver(current => ({ ...current, destination: event.target.value }))} placeholder="Destination" className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40" /><input min="1" type="number" value={driver.passengers} onChange={event => setDriver(current => ({ ...current, passengers: event.target.value }))} className="w-full rounded-xl bg-white/10 px-4 py-3 text-sm text-white outline-none" /><button className="w-full rounded-xl bg-[#C96B6B] px-4 py-3 text-sm font-bold text-[#111111]">Request driver</button></form></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#A41E14]">Lost and found</p><h2 className="mt-1 text-xl font-bold">Report an item</h2><form onSubmit={submitLostFound} className="mt-4 space-y-3"><select value={lostItem.type} onChange={event => setLostItem(current => ({ ...current, type: event.target.value }))} className={fieldClass}><option>Phone</option><option>Wallet</option><option>ID</option><option>Bag</option><option>Keys</option><option>Other</option></select><textarea value={lostItem.description} onChange={event => setLostItem(current => ({ ...current, description: event.target.value }))} rows={3} placeholder="What happened?" className={fieldClass} /><button className="w-full rounded-xl bg-[#111111] px-4 py-3 text-sm font-bold text-white">Submit report</button></form></section><section className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#A41E14]">Karaoke</p><h2 className="mt-1 text-xl font-bold">Join the queue</h2><form onSubmit={joinKaraoke} className="mt-4 space-y-3"><input value={karaoke.song} onChange={event => setKaraoke(current => ({ ...current, song: event.target.value }))} placeholder="Song title" className={fieldClass} /><input value={karaoke.performer} onChange={event => setKaraoke(current => ({ ...current, performer: event.target.value }))} placeholder="Performer name" className={fieldClass} /><button className="w-full rounded-xl bg-[#A41E14] px-4 py-3 text-sm font-bold text-white">Join karaoke</button></form></section></div>}
  </div>
}
