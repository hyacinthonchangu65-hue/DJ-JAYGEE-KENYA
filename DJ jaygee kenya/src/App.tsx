import { useState, useEffect } from "react"
import djPerformingImg from "@/imports/WhatsApp_Image_2026-09-04_at_6.45.25_PM.jpeg"
import djPortraitImg from "@/imports/IMG_20260905_101444_202.jpg.jpeg"
import djFullBodyImg from "@/imports/WhatsApp_Image_2026-09-05_at_10.21.22_AM.jpeg"
import logoImg from "@/imports/WhatsApp_Image_2026-09-04_at_6.45.26_PM.jpeg"

const U = {
  wedding:    "https://images.unsplash.com/photo-1761110787206-2cc164e4913c?w=900&h=650&fit=crop&auto=format",
  weddingTab: "https://images.unsplash.com/photo-1768851142314-c4ebf49ad45b?w=900&h=650&fit=crop&auto=format",
  corporate:  "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&h=650&fit=crop&auto=format",
  conference: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&h=650&fit=crop&auto=format",
  equipment:  "https://images.unsplash.com/photo-1629124985795-896afbb07d7b?w=900&h=650&fit=crop&auto=format",
  ceremony:   "https://images.unsplash.com/photo-1769812343385-8048c47d9667?w=900&h=650&fit=crop&auto=format",
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────

const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)
const XIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)
const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)
const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)
const QuoteIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

// Service icons
const RingsIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="8" cy="12" r="5" /><circle cx="16" cy="12" r="5" />
  </svg>
)
const BriefcaseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
)
const MicIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
  </svg>
)
const CelebIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
  </svg>
)
const MedalIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="15" r="6" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
  </svg>
)
const HeadphonesIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path d="M3 18v-6a9 9 0 0118 0v6" />
    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
)

// Social icons
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.41a8.16 8.16 0 004.77 1.52V7.48a4.85 4.85 0 01-1-.79z" />
  </svg>
)
const YouTubeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
)
const DownloadIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)
const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5M5 9v11h14V9M9 20v-6h6v6" />
  </svg>
)
const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm6 2a4 4 0 014 4v2m-4-10a4 4 0 100-8" />
  </svg>
)
const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
  </svg>
)
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <rect x="3" y="4" width="18" height="17" rx="2" /><path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

// ── Data ──────────────────────────────────────────────────────────────────────

const services = [
  { title: "Weddings", desc: "Elegant music and professional DJ services for wedding ceremonies and receptions.", img: U.wedding, icon: <RingsIcon /> },
  { title: "Corporate Events", desc: "Professional music and sound services for company functions and corporate events.", img: U.corporate, icon: <BriefcaseIcon /> },
  { title: "Conferences & Seminars", desc: "Reliable sound, microphones and music support for professional gatherings.", img: U.conference, icon: <MicIcon /> },
  { title: "Private Events", desc: "Professional DJ entertainment for birthdays, anniversaries and private celebrations.", img: U.weddingTab, icon: <CelebIcon /> },
  { title: "Formal Ceremonies", desc: "Professional music and sound support for official and institutional functions.", img: U.ceremony, icon: <MedalIcon /> },
  { title: "Event Sound & DJ Setup", desc: "Professional DJ equipment, sound setup and music management for any occasion.", img: U.equipment, icon: <HeadphonesIcon /> },
]

const whyUs = [
  { title: "Professional Service", desc: "Reliable, well-organized event entertainment that reflects your occasion's importance.", icon: <CheckIcon /> },
  { title: "Quality Sound", desc: "Professional equipment carefully maintained and managed for clear, balanced audio.", icon: <HeadphonesIcon /> },
  { title: "Music for Every Occasion", desc: "Carefully curated music selection tailored to the type and audience of each event.", icon: <MicIcon /> },
  { title: "Reliable & Experienced", desc: "Thorough preparation and dependable on-the-day service you can count on.", icon: <StarIcon /> },
]

const testimonials = [
  { quote: "DJ Jaygee provided excellent service at our wedding. The music selection was perfect and everything was handled professionally from start to finish.", client: "Sarah & James M.", event: "Wedding Reception" },
  { quote: "Professional, punctual and very well organized. DJ Jaygee made our corporate event run smoothly. Guests were impressed with the sound quality.", client: "Corporate Client", event: "Company Annual Dinner" },
  { quote: "We hired DJ Jaygee for our private function and the experience was outstanding. He read the room perfectly and kept the energy just right all evening.", client: "Private Client", event: "Private Celebration" },
]

const eventTypes = [
  { label: "Weddings", img: U.wedding },
  { label: "Corporate Events", img: U.corporate },
  { label: "Conferences", img: U.conference },
  { label: "Private Functions", img: U.weddingTab },
  { label: "Formal Ceremonies", img: U.ceremony },
  { label: "Special Events", img: U.equipment },
]

type AppTab = "home" | "fans" | "conversations" | "booking"

function StandaloneApp({ onInstall, isInstalled }: { onInstall: () => void; isInstalled: boolean }) {
  const [activeTab, setActiveTab] = useState<AppTab>("home")
  const [signedIn, setSignedIn] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [fanName, setFanName] = useState("")
  const [draftMessage, setDraftMessage] = useState("")
  const [messages, setMessages] = useState([
    { from: "DJ Jaygee", text: "Welcome to the DJ Jaygee fan space. What are you planning?", mine: false },
  ])

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault()
    if (!fanName.trim()) return
    setSignedIn(true)
    setShowSignIn(false)
  }

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault()
    if (!draftMessage.trim()) return
    setMessages(current => [...current, { from: "You", text: draftMessage.trim(), mine: true }])
    setDraftMessage("")
  }

  const navItems: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <HomeIcon /> },
    { id: "fans", label: "Fans", icon: <UsersIcon /> },
    { id: "conversations", label: "Chat", icon: <ChatIcon /> },
    { id: "booking", label: "Book", icon: <CalendarIcon /> },
  ]

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#111111] pb-24">
      <header className="sticky top-0 z-40 bg-[#111111] text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => setActiveTab("home")} className="flex items-center gap-2.5 text-left">
            <img src={logoImg} alt="DJ Jaygee Kenya" className="h-10 w-10 rounded-lg object-cover" />
            <span className="leading-tight">
              <strong className="block text-sm tracking-wide">DJ JAYGEE</strong>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C96B6B]">Kenya</span>
            </span>
          </button>
          <div className="flex items-center gap-2">
            {!isInstalled && (
              <button onClick={onInstall} className="rounded-full border border-white/25 px-3 py-2 text-[10px] font-semibold tracking-wide">
                INSTALL
              </button>
            )}
            <button
              onClick={() => signedIn ? setSignedIn(false) : setShowSignIn(true)}
              className="rounded-full bg-[#A41E14] px-3 py-2 text-[10px] font-semibold tracking-wide"
            >
              {signedIn ? "SIGN OUT" : "SIGN IN"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-5">
        {activeTab === "home" && (
          <div className="space-y-5">
            <section className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-[#111111] text-white shadow-xl">
              <img src={djPerformingImg} alt="DJ Jaygee performing" className="absolute inset-0 h-full w-full object-cover opacity-45" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/95" />
              <div className="relative flex min-h-[30rem] flex-col justify-end p-6">
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C96B6B]">The official fan app</span>
                <h1 className="text-4xl font-bold leading-tight">Professional Sound.<br /><span className="text-[#C96B6B]">Perfect Moments.</span></h1>
                <p className="mt-4 text-sm leading-relaxed text-white/70">Follow the music, meet other fans, and get your next event moving.</p>
                <button onClick={() => setActiveTab("fans")} className="mt-6 flex w-full items-center justify-between rounded-2xl bg-[#A41E14] px-5 py-4 text-left text-sm font-semibold">
                  Explore the fan page
                  <ChevronDownIcon />
                </button>
              </div>
            </section>
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div><p className="text-xs font-semibold uppercase tracking-widest text-[#A63A3A]">Next move</p><h2 className="mt-1 text-xl font-bold">Plan your perfect event</h2></div>
                <CalendarIcon />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">Book DJ Jaygee for weddings, corporate events, ceremonies, and private celebrations across Kenya.</p>
              <button onClick={() => setActiveTab("booking")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#111111] px-4 py-3 text-sm font-semibold">Start a booking <ChevronDownIcon /></button>
            </section>
          </div>
        )}

        {activeTab === "fans" && (
          <div className="space-y-5">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A41E14]">Community</p><h1 className="mt-1 text-3xl font-bold">Fan page</h1><p className="mt-2 text-sm text-gray-500">Stay close to the sound and share the moments.</p></div>
            <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src={djPortraitImg} alt="DJ Jaygee" className="h-56 w-full object-cover object-top" />
              <div className="p-5"><div className="flex items-center justify-between"><h2 className="font-bold">DJ Jaygee Kenya</h2><span className="text-xs text-[#A41E14]">Official</span></div><p className="mt-2 text-sm leading-relaxed text-gray-500">Professional DJ, event entertainer, and the sound behind unforgettable Kenyan celebrations.</p></div>
            </article>
            <div className="grid grid-cols-2 gap-3">
              {eventTypes.slice(0, 4).map(event => <div key={event.label} className="relative h-32 overflow-hidden rounded-2xl"><img src={event.img} alt={event.label} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-black/45" /><span className="absolute bottom-3 left-3 right-3 text-sm font-semibold text-white">{event.label}</span></div>)}
            </div>
            <button onClick={() => setActiveTab("conversations")} className="flex w-full items-center justify-between rounded-2xl bg-[#111111] px-5 py-4 text-sm font-semibold text-white">Join the conversation <ChevronDownIcon /></button>
          </div>
        )}

        {activeTab === "conversations" && (
          <div className="flex min-h-[calc(100vh-9rem)] flex-col">
            <div className="mb-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A41E14]">Fan community</p><h1 className="mt-1 text-3xl font-bold">Conversations</h1><p className="mt-2 text-sm text-gray-500">Talk music, events, and bookings with DJ Jaygee.</p></div>
            <div className="flex-1 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
              {messages.map((message, index) => <div key={index} className={`flex ${message.mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${message.mine ? "rounded-br-md bg-[#A41E14] text-white" : "rounded-bl-md bg-[#F5F5F5] text-[#111111]"}`}><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide opacity-60">{message.from}</span>{message.text}</div></div>)}
            </div>
            <form onSubmit={sendMessage} className="mt-4 flex gap-2"><input value={draftMessage} onChange={event => setDraftMessage(event.target.value)} placeholder={signedIn ? "Write a message..." : "Sign in to chat"} disabled={!signedIn} className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#A41E14]" /><button type="submit" disabled={!signedIn} className="rounded-xl bg-[#111111] px-4 text-sm font-semibold text-white disabled:opacity-40">Send</button></form>
            {!signedIn && <button onClick={() => setShowSignIn(true)} className="mt-3 text-center text-xs font-semibold text-[#A41E14]">Sign in to join the conversation</button>}
          </div>
        )}

        {activeTab === "booking" && (
          <div className="space-y-5">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A41E14]">Bookings</p><h1 className="mt-1 text-3xl font-bold">Make it memorable</h1><p className="mt-2 text-sm leading-relaxed text-gray-500">Tell DJ Jaygee about your event and continue the conversation on WhatsApp.</p></div>
            <div className="rounded-2xl bg-[#111111] p-6 text-white shadow-xl"><h2 className="text-2xl font-bold">DJ Jaygee Kenya</h2><p className="mt-2 text-sm leading-relaxed text-white/65">Professional sound for weddings, corporate events, conferences, ceremonies, and private celebrations.</p><a href="https://wa.me/254703372346?text=Hello%20DJ%20Jaygee%20Kenya%2C%20I%20would%20like%20to%20make%20a%20booking." className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#A41E14] px-4 py-4 text-sm font-semibold">Continue on WhatsApp</a><a href="tel:+254703372346" className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/20 px-4 py-4 text-sm font-semibold">Call 0703 372 346</a></div>
            <button onClick={() => setActiveTab("home")} className="mx-auto flex items-center gap-2 text-sm font-semibold text-[#A41E14]">Back to home <ChevronDownIcon /></button>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-black/10 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur">
        <div className="mx-auto flex max-w-xl justify-around">
          {navItems.map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex min-w-[4.5rem] flex-col items-center gap-1 px-3 py-2 text-[10px] font-semibold ${activeTab === item.id ? "text-[#A41E14]" : "text-gray-400"}`}>{item.icon}<span>{item.label}</span></button>)}
        </div>
      </nav>

      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={() => setShowSignIn(false)}>
          <form onSubmit={handleSignIn} onClick={event => event.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-widest text-[#A41E14]">Fan access</p><h2 className="mt-1 text-2xl font-bold">Sign in</h2></div><button type="button" onClick={() => setShowSignIn(false)} className="rounded-full bg-[#F5F5F5] p-2"><XIcon /></button></div><label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your name</label><input autoFocus value={fanName} onChange={event => setFanName(event.target.value)} placeholder="Enter your name" className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#A41E14]" /><button type="submit" className="mt-4 w-full rounded-xl bg-[#A41E14] px-4 py-3 text-sm font-semibold text-white">Continue</button></form>
        </div>
      )}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [standaloneMode, setStandaloneMode] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", eventType: "", date: "", location: "", guests: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches)
    const updateStandaloneMode = () => setStandaloneMode(window.matchMedia("(display-mode: standalone)").matches || Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
    updateStandaloneMode()

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }
    const onAppInstalled = () => {
      setIsInstalled(true)
      setInstallPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt)
    window.addEventListener("appinstalled", onAppInstalled)
    window.addEventListener("resize", updateStandaloneMode)
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt)
      window.removeEventListener("appinstalled", onAppInstalled)
      window.removeEventListener("resize", updateStandaloneMode)
    }
  }, [])

  useEffect(() => {
    if (lightbox) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [lightbox])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const handleInstall = async () => {
    if (isInstalled) return

    if (installPrompt) {
      await installPrompt.prompt()
      await installPrompt.userChoice
      setInstallPrompt(null)
      return
    }

    window.alert("To install DJ Jaygee Kenya, open your browser menu and choose 'Add to Home Screen' or 'Install app'.")
  }

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Events", id: "events" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "contact" },
  ]

  const galleryItems = [
    { src: djPerformingImg, alt: "DJ Jaygee performing at an elegant outdoor wedding event", tall: true },
    { src: U.wedding, alt: "Elegant wedding reception venue with chandeliers" },
    { src: djPortraitImg, alt: "DJ Jaygee close-up portrait" },
    { src: U.corporate, alt: "Speaker on stage at a corporate conference" },
    { src: djFullBodyImg, alt: "DJ Jaygee full portrait" },
    { src: U.equipment, alt: "Professional DJ controller and mixer equipment" },
    { src: U.conference, alt: "Professional conference audience" },
    { src: U.weddingTab, alt: "Elegant event table setting with gold chairs" },
  ]

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = [
      "Hello DJ Jaygee Kenya, I would like to request a booking.",
      "",
      `Full Name: ${formData.name || "Not provided"}`,
      `Phone Number: ${formData.phone || "Not provided"}`,
      `Email Address: ${formData.email || "Not provided"}`,
      `Event Type: ${formData.eventType || "Not provided"}`,
      `Event Date: ${formData.date || "Not provided"}`,
      `Event Location: ${formData.location || "Not provided"}`,
      `Number of Guests: ${formData.guests || "Not provided"}`,
      `Additional Message: ${formData.message || "Not provided"}`,
    ].join("\n")

    window.location.assign(`https://wa.me/254703372346?text=${encodeURIComponent(whatsappMessage)}`)
  }

  if (standaloneMode) {
    return <StandaloneApp onInstall={handleInstall} isInstalled={isInstalled} />
  }

  return (
    <div className="min-h-screen bg-white text-[#111111]">

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#111111] shadow-xl" : "bg-[#111111]/95 backdrop-blur"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => scrollTo("home")} className="flex items-center gap-3 flex-shrink-0">
              <img src={logoImg} alt="DJ Jaygee Kenya Logo" className="h-14 w-14 object-contain" />
              <div className="hidden sm:block leading-tight">
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="text-white font-bold text-lg tracking-wide">
                  DJ JAYGEE
                </div>
                <div className="text-[#D71920] text-[10px] font-semibold tracking-[0.25em] uppercase">Kenya</div>
              </div>
            </button>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D71920] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+254703372346"
                className="hidden md:flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
              >
                <PhoneIcon />
                <span>0703 372 346</span>
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="hidden md:block bg-[#D71920] text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-red-700 transition-all duration-200 tracking-wider shadow"
              >
                BOOK NOW
              </button>
              {!isInstalled && (
                <button
                  onClick={handleInstall}
                  className="hidden sm:flex items-center gap-1.5 border border-white/25 text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200 tracking-wider"
                  aria-label="Install DJ Jaygee Kenya app"
                >
                  <DownloadIcon />
                  INSTALL APP
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(v => !v)}
                className="lg:hidden text-white p-1.5"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111111] border-t border-white/10 anim-fade-in">
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map(l => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-gray-300 hover:text-white text-left text-sm font-medium py-3 border-b border-white/5 last:border-0 transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <a href="tel:+254703372346" className="flex items-center gap-2 text-[#D71920] font-semibold text-sm pt-4 pb-1">
                <PhoneIcon className="w-4 h-4" />
                0703 372 346
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 bg-[#D71920] text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-red-700 transition-colors w-full tracking-wide"
              >
                BOOK DJ JAYGEE
              </button>
              {!isInstalled && (
                <button
                  onClick={handleInstall}
                  className="mt-2 flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-white/10 transition-colors w-full tracking-wide"
                >
                  <DownloadIcon />
                  INSTALL APP
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={djPerformingImg}
            alt="DJ Jaygee performing at a professional wedding event"
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(110deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.45) 100%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-7 anim-fade-up">
              <div className="w-10 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Professional Event Services</span>
            </div>

            <h1
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-5 anim-fade-up delay-1"
            >
              DJ Jaygee<br />
              <span className="text-[#D71920]">Kenya</span>
            </h1>

            <p
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xl sm:text-2xl text-gray-200 font-light italic mb-5 anim-fade-up delay-2"
            >
              Professional Sound. Perfect Moments.
            </p>

            <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-10 max-w-lg anim-fade-up delay-3">
              Professional DJ and event entertainment services for weddings, corporate events, conferences,
              ceremonies, private functions and special occasions across Kenya.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14 anim-fade-up delay-4">
              <button
                onClick={() => scrollTo("contact")}
                className="bg-[#D71920] text-white font-semibold px-8 py-4 rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105 text-sm tracking-wider shadow-lg"
              >
                BOOK DJ JAYGEE
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200 text-sm tracking-wider"
              >
                VIEW SERVICES
              </button>
            </div>

            <div className="flex flex-wrap gap-8 anim-fade-up delay-5">
              {["PROFESSIONAL", "RELIABLE", "EXPERIENCED"].map(b => (
                <div key={b} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D71920]" />
                  <span className="text-gray-400 text-[11px] font-semibold tracking-[0.15em]">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-[10px] tracking-widest font-medium">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <div className="bg-[#D71920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "200+", label: "Events Served" },
              { value: "6+", label: "Event Categories" },
              { value: "100%", label: "Professionalism" },
            ].map(s => (
              <div key={s.label}>
                <div
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-white font-bold text-2xl sm:text-3xl"
                >
                  {s.value}
                </div>
                <div className="text-red-100 text-xs sm:text-sm font-medium mt-0.5 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#D71920]" />
                <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">About</span>
              </div>
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-4xl sm:text-5xl font-bold text-[#111111] leading-tight mb-6"
              >
                Meet DJ Jaygee
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                DJ Jaygee Kenya provides professional DJ and event entertainment services designed to make every
                occasion truly memorable. From elegant weddings and corporate functions to conferences, ceremonies
                and private celebrations, DJ Jaygee delivers carefully selected music, professional equipment and
                dependable event service.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                With a strong focus on professionalism, reliability and quality sound, DJ Jaygee Kenya has become
                a trusted name for events across Kenya — from intimate private gatherings to large-scale corporate
                conferences and formal ceremonies.
              </p>

              <div className="grid grid-cols-2 gap-5 mb-10">
                {[
                  { label: "Weddings", sub: "Elegant & Memorable" },
                  { label: "Corporate", sub: "Polished & Professional" },
                  { label: "Conferences", sub: "Reliable Sound Support" },
                  { label: "Ceremonies", sub: "Organized & Precise" },
                ].map(i => (
                  <div key={i.label} className="flex gap-3 items-start">
                    <div className="w-0.5 h-full min-h-[40px] bg-[#D71920] flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-[#111111] text-sm">{i.label}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{i.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+254703372346"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#111111] text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#D71920] transition-colors duration-300 text-sm"
                >
                  <PhoneIcon />
                  0703 372 346
                </a>
                <button
                  onClick={() => scrollTo("services")}
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#111111] text-[#111111] font-semibold px-7 py-3.5 rounded-full hover:bg-[#111111] hover:text-white transition-all duration-300 text-sm"
                >
                  View Services
                  <ArrowIcon />
                </button>
              </div>
            </div>

            {/* Photos */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/5" }}>
                <img
                  src={djPerformingImg}
                  alt="DJ Jaygee performing professionally at a wedding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-lg">
                    <img
                      src={djPortraitImg}
                      alt="DJ Jaygee"
                      className="w-12 h-12 rounded-full object-cover object-top flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-[#111111] text-sm">DJ Jaygee</div>
                      <div className="text-[#D71920] text-xs font-medium mt-0.5">Professional DJ & Event Entertainer</div>
                      <div className="text-gray-400 text-[10px] mt-0.5">Nairobi, Kenya</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent card */}
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#D71920] rounded-2xl shadow-xl flex flex-col items-center justify-center text-white hidden sm:flex">
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif" }} className="font-bold text-2xl leading-none">6+</div>
                <div className="text-[10px] font-medium tracking-widest mt-1 text-red-200">EVENT<br />TYPES</div>
              </div>

              {/* Full-body portrait thumbnail */}
              <div className="absolute -top-4 -right-4 w-24 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img src={djFullBodyImg} alt="DJ Jaygee" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">What We Offer</span>
              <div className="w-8 h-px bg-[#D71920]" />
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#111111]"
            >
              Our Services
            </h2>
            <a
              href="https://youtube.com/@djaygeekenya-c6q7i?si=AyMkSD7aNdAg5me2"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-5 bg-[#D71920] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-red-700 transition-colors duration-200 tracking-wide"
            >
              <YouTubeIcon className="w-5 h-5 flex-shrink-0 text-white" />
              Watch on YouTube
            </a>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base leading-relaxed">
              Professional DJ and event entertainment services tailored to every occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div
                key={s.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 group cursor-default"
              >
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 w-11 h-11 bg-[#D71920] rounded-xl flex items-center justify-center text-white shadow-lg">
                    {s.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#111111] text-lg mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <button
                    onClick={() => scrollTo("contact")}
                    className="flex items-center gap-1.5 text-[#D71920] text-sm font-semibold hover:gap-2.5 transition-all duration-200 group/btn"
                  >
                    Book This Service
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Why Choose Us</span>
              <div className="w-8 h-px bg-[#D71920]" />
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-white"
            >
              The DJ Jaygee Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="bg-[#242424] rounded-2xl p-7 hover:bg-[#1a1a1a] transition-colors duration-300 border border-white/5 hover:border-[#D71920]/30"
              >
                <div className="w-12 h-12 bg-[#D71920]/10 rounded-xl flex items-center justify-center text-[#D71920] mb-5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-base mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS ─────────────────────────────────────────────────────────── */}
      <section id="events" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Event Types</span>
              <div className="w-8 h-px bg-[#D71920]" />
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#111111]"
            >
              Events We Cover
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {eventTypes.map(e => (
              <div key={e.label} className="relative rounded-2xl overflow-hidden group cursor-default" style={{ aspectRatio: "4/3" }}>
                <div className="bg-gray-200 w-full h-full">
                  <img
                    src={e.img}
                    alt={e.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-white font-semibold text-base sm:text-lg"
                  >
                    {e.label}
                  </div>
                  <div className="w-8 h-0.5 bg-[#D71920] mt-2 group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPMENT HIGHLIGHT ────────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#242424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "16/10" }}>
              <div className="bg-gray-800 w-full h-full">
                <img
                  src={U.equipment}
                  alt="Professional DJ controller and mixer equipment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#D71920]/10" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-[#D71920]" />
                <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Equipment</span>
              </div>
              <h2
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6"
              >
                Professional Equipment.<br />
                <span className="text-[#D71920]">Professional Sound.</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every event deserves equipment that performs reliably. DJ Jaygee Kenya uses professional-grade
                DJ controllers, mixers, laptops, microphones and speaker systems — all carefully maintained and
                set up with attention to detail for every event.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Professional DJ Controller", "High-Quality Mixer", "Wireless Microphones", "Professional Speakers", "Reliable Laptop Setup", "Clean Cable Management"].map(item => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="text-[#D71920] flex-shrink-0 mt-0.5"><CheckIcon /></div>
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────────────────────── */}
      <section id="gallery" className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Gallery</span>
              <div className="w-8 h-px bg-[#D71920]" />
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#111111]"
            >
              Our Work
            </h2>
            <p className="text-gray-500 mt-4 text-sm">Click any image to view full size</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden group cursor-zoom-in bg-gray-200 ${item.tall ? "row-span-2" : ""}`}
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow">
                    <svg className="w-5 h-5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 anim-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 p-2.5 rounded-full transition-colors"
          >
            <XIcon />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl anim-scale-in"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── TESTIMONIALS ───────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Testimonials</span>
              <div className="w-8 h-px bg-[#D71920]" />
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#111111]"
            >
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-[#F5F5F5] rounded-2xl p-7 relative">
                <div className="text-[#D71920]/20 absolute top-6 right-6">
                  <QuoteIcon />
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-[#D71920]"><StarIcon /></span>
                  ))}
                </div>
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-[#242424] text-base leading-relaxed italic mb-6"
                >
                  "{t.quote}"
                </p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-[#111111] text-sm">{t.client}</div>
                  <div className="text-[#D71920] text-xs mt-0.5 font-medium">{t.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-[#111111]">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${djPerformingImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-[#111111]/85" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#D71920]" />
            <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Book Now</span>
            <div className="w-8 h-px bg-[#D71920]" />
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Make Your Event<br />
            <span className="text-[#D71920]">Memorable</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Looking for a professional DJ for your next event? Get in touch with DJ Jaygee Kenya and let's
            create the right atmosphere for your occasion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-[#D71920] text-white font-semibold px-10 py-4 rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105 text-sm tracking-wider shadow-lg"
            >
              BOOK DJ JAYGEE
            </button>
            <a
              href="tel:+254703372346"
              className="flex items-center gap-2.5 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200 text-sm tracking-wide"
            >
              <PhoneIcon />
              0703 372 346
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 lg:py-28 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#D71920]" />
              <span className="text-[#D71920] text-xs font-semibold tracking-[0.2em] uppercase">Contact</span>
              <div className="w-8 h-px bg-[#D71920]" />
            </div>
            <h2
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#111111]"
            >
              Request a Booking
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-base">
              Fill in your details below and we'll get back to you promptly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {formSubmitted ? (
                <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                  <div className="w-16 h-16 bg-[#D71920]/10 rounded-full flex items-center justify-center mx-auto mb-5 text-[#D71920]">
                    <CheckIcon />
                  </div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-2xl font-bold text-[#111111] mb-3"
                  >
                    Request Received
                  </h3>
                  <p className="text-gray-500 leading-relaxed">
                    Thank you for reaching out to DJ Jaygee Kenya. We will review your booking request and
                    get back to you as soon as possible.
                  </p>
                  <a
                    href="tel:+254703372346"
                    className="mt-6 inline-flex items-center gap-2 text-[#D71920] font-semibold text-sm"
                  >
                    <PhoneIcon />
                    Call us directly: 0703 372 346
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {[
                      { name: "name", label: "Full Name", type: "text", required: true },
                      { name: "phone", label: "Phone Number", type: "tel", required: true },
                      { name: "email", label: "Email Address", type: "email", required: false },
                      { name: "location", label: "Event Location", type: "text", required: false },
                      { name: "date", label: "Event Date", type: "date", required: false },
                      { name: "guests", label: "Number of Guests", type: "number", required: false },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-xs font-semibold text-[#242424] mb-1.5 tracking-wide uppercase">
                          {f.label}{f.required && <span className="text-[#D71920] ml-1">*</span>}
                        </label>
                        <input
                          type={f.type}
                          name={f.name}
                          required={f.required}
                          value={formData[f.name as keyof typeof formData]}
                          onChange={handleFormChange}
                          className="w-full bg-[#F5F5F5] border border-gray-200 rounded-xl px-4 py-3 text-[#111111] text-sm placeholder-gray-400 focus:outline-none focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-[#242424] mb-1.5 tracking-wide uppercase">
                      Event Type <span className="text-[#D71920]">*</span>
                    </label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleFormChange}
                      className="w-full bg-[#F5F5F5] border border-gray-200 rounded-xl px-4 py-3 text-[#111111] text-sm focus:outline-none focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] transition-colors"
                    >
                      <option value="">Select event type</option>
                      <option>Wedding</option>
                      <option>Corporate Event</option>
                      <option>Conference / Seminar</option>
                      <option>Private Event</option>
                      <option>Formal Ceremony</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-[#242424] mb-1.5 tracking-wide uppercase">
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us more about your event..."
                      className="w-full bg-[#F5F5F5] border border-gray-200 rounded-xl px-4 py-3 text-[#111111] text-sm placeholder-gray-400 focus:outline-none focus:border-[#D71920] focus:ring-1 focus:ring-[#D71920] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D71920] text-white font-semibold py-4 rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-[1.01] text-sm tracking-wider shadow"
                  >
                    REQUEST A BOOKING
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#111111] rounded-2xl p-7 text-white">
                <h3
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-xl font-bold mb-1"
                >
                  DJ Jaygee Kenya
                </h3>
                <p className="text-[#D71920] text-xs font-medium tracking-wide mb-6">Professional DJ & Event Entertainment Services</p>

                <div className="flex flex-col gap-5">
                  <a href="tel:+254703372346" className="flex items-start gap-3 group">
                    <div className="w-9 h-9 bg-[#D71920]/10 rounded-lg flex items-center justify-center text-[#D71920] flex-shrink-0 group-hover:bg-[#D71920] group-hover:text-white transition-colors">
                      <PhoneIcon />
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase tracking-widest mb-0.5">Phone</div>
                      <div className="text-white font-semibold text-sm">0703 372 346</div>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[#D71920]/10 rounded-lg flex items-center justify-center text-[#D71920] flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-400 text-[10px] uppercase tracking-widest mb-0.5">Location</div>
                      <div className="text-white font-semibold text-sm">Nairobi, Kenya</div>
                      <div className="text-gray-400 text-xs">Available nationwide</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-7 shadow-sm">
                <h4 className="font-bold text-[#111111] text-sm mb-4 tracking-wide">FOLLOW US</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Instagram", icon: <InstagramIcon />, color: "hover:bg-pink-500" },
                    { label: "Facebook", icon: <FacebookIcon />, color: "hover:bg-blue-600" },
                    { label: "TikTok", icon: <TikTokIcon />, color: "hover:bg-black" },
                    { label: "YouTube", icon: <YouTubeIcon />, color: "hover:bg-red-600" },
                  ].map(s => (
                    <button
                      key={s.label}
                      className={`flex items-center gap-2.5 bg-[#F5F5F5] ${s.color} hover:text-white text-[#242424] text-xs font-medium px-3 py-2.5 rounded-xl transition-all duration-200`}
                    >
                      {s.icon}
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#D71920] rounded-2xl p-6 text-white text-center">
                <p
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="text-lg font-semibold italic mb-3"
                >
                  "Professional Sound.<br />Perfect Moments."
                </p>
                <img src={logoImg} alt="DJ Jaygee Kenya" className="w-16 h-16 object-contain mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#111111] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="DJ Jaygee Kenya Logo" className="h-16 w-16 object-contain" />
                <div>
                  <div
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-white font-bold text-xl"
                  >
                    DJ JAYGEE
                  </div>
                  <div className="text-[#D71920] text-[11px] font-semibold tracking-[0.2em]">KENYA</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Professional DJ and event entertainment services for weddings, corporate events, conferences
                and special occasions across Kenya.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-5">NAVIGATION</h4>
              <div className="flex flex-col gap-3">
                {navLinks.map(l => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className="text-gray-500 hover:text-white text-sm text-left transition-colors duration-200"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider mb-5">GET IN TOUCH</h4>
              <div className="flex flex-col gap-4">
                <a href="tel:+254703372346" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors text-sm">
                  <PhoneIcon />
                  0703 372 346
                </a>
                <div className="flex gap-3 mt-2">
                  {[
                    { icon: <InstagramIcon />, label: "Instagram" },
                    { icon: <FacebookIcon />, label: "Facebook" },
                    { icon: <TikTokIcon />, label: "TikTok" },
                    { icon: <YouTubeIcon />, label: "YouTube" },
                  ].map(s => (
                    <button
                      key={s.label}
                      aria-label={s.label}
                      className="w-9 h-9 bg-white/5 hover:bg-[#D71920] text-gray-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">
              &copy; 2026 DJ Jaygee Kenya. All Rights Reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Professional DJ & Event Entertainment Services
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
