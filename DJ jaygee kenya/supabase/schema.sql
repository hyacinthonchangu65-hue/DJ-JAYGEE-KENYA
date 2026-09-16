create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists auth_provider text not null default 'email';

create table if not exists public.mixes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  artwork_url text,
  audio_url text,
  duration_seconds integer,
  genre text,
  plays integer not null default 0,
  is_exclusive boolean not null default false,
  published boolean not null default false,
  release_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  video_url text not null,
  category text,
  views integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  artwork_url text,
  event_date date not null,
  event_time time,
  venue text,
  location text,
  ticket_url text,
  status text not null default 'upcoming' check (status in ('upcoming', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  email text,
  event_type text not null,
  event_date date,
  start_time time,
  end_time time,
  venue text,
  guests integer,
  budget_range text,
  sound_system_required boolean not null default false,
  lighting_required boolean not null default false,
  mc_required boolean not null default false,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'deposit_required', 'paid', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  mix_id uuid not null references public.mixes(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, mix_id)
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'announcement',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.community_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  display_name text not null,
  message text not null check (char_length(message) between 1 and 1000),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.song_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  requester_name text not null,
  song_title text not null,
  artist text,
  event text,
  message text,
  status text not null default 'pending' check (status in ('pending', 'fulfilled', 'declined')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.mixes enable row level security;
alter table public.videos enable row level security;
alter table public.events enable row level security;
alter table public.bookings enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;
alter table public.community_messages enable row level security;
alter table public.song_requests enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "Published mixes are public" on public.mixes;
drop policy if exists "Published videos are public" on public.videos;
drop policy if exists "Upcoming events are public" on public.events;
drop policy if exists "Users manage their own profile" on public.profiles;
drop policy if exists "Users create their own bookings" on public.bookings;
drop policy if exists "Users view their own bookings" on public.bookings;
drop policy if exists "Users manage their favorites" on public.favorites;
drop policy if exists "Users view their notifications" on public.notifications;
drop policy if exists "Approved messages are public" on public.community_messages;
drop policy if exists "Users create messages" on public.community_messages;
drop policy if exists "Users create song requests" on public.song_requests;
drop policy if exists "Admins manage profiles" on public.profiles;
drop policy if exists "Admins manage mixes" on public.mixes;
drop policy if exists "Admins manage videos" on public.videos;
drop policy if exists "Admins manage events" on public.events;
drop policy if exists "Admins manage bookings" on public.bookings;
drop policy if exists "Admins manage notifications" on public.notifications;
drop policy if exists "Admins moderate messages" on public.community_messages;
drop policy if exists "Admins manage song requests" on public.song_requests;

create policy "Published mixes are public" on public.mixes for select using (published = true);
create policy "Published videos are public" on public.videos for select using (published = true);
create policy "Upcoming events are public" on public.events for select using (status = 'upcoming');
create policy "Users manage their own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users create their own bookings" on public.bookings for insert with check (auth.uid() = user_id or user_id is null);
create policy "Users view their own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users manage their favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users view their notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Approved messages are public" on public.community_messages for select using (approved = true);
create policy "Users create messages" on public.community_messages for insert with check (auth.uid() = user_id or user_id is null);
create policy "Users create song requests" on public.song_requests for insert with check (auth.uid() = user_id or user_id is null);

create policy "Admins manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage mixes" on public.mixes for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage videos" on public.videos for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage events" on public.events for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage bookings" on public.bookings for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage notifications" on public.notifications for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins moderate messages" on public.community_messages for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage song requests" on public.song_requests for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, email, auth_provider, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_app_meta_data ->> 'provider', 'email'),
    case when lower(new.email) = 'hyacinthonchangu@gmail.com' then 'admin' else 'user' end
  )
  on conflict (id) do update set
    display_name = coalesce(excluded.display_name, public.profiles.display_name),
    email = excluded.email,
    auth_provider = excluded.auth_provider;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Promote the designated admin if the account already exists.
update public.profiles
set role = 'admin'
where lower(email) = 'hyacinthonchangu@gmail.com';

-- Nightlife platform foundation. These tables keep the QR-to-DJ workflow in the
-- database and leave room for events, orders, wallets, and social features.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check (role in ('user', 'patron', 'dj', 'mc', 'artist', 'club_manager', 'event_organizer', 'promoter', 'sponsor', 'admin'));

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  slug text not null unique,
  name text not null,
  description text,
  cover_image_url text,
  city text not null default 'Nairobi',
  address text,
  genres text[] not null default '{}',
  opening_hours jsonb not null default '{}'::jsonb,
  status text not null default 'open' check (status in ('open', 'closed', 'temporarily_closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.venue_tables (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues(id) on delete cascade,
  label text not null,
  section text,
  floor text,
  qr_token text not null unique default encode(gen_random_bytes(18), 'hex'),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (venue_id, label)
);

create table if not exists public.dj_sessions (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues(id) on delete cascade,
  dj_id uuid not null references auth.users(id) on delete restrict,
  event_id uuid references public.events(id) on delete set null,
  status text not null default 'scheduled' check (status in ('scheduled', 'live', 'paused', 'ended')),
  started_at timestamptz,
  ended_at timestamptz,
  request_prices jsonb not null default '{"Free":0,"Standard":150,"Priority":300,"VIP":500}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.song_catalog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  genre text,
  artwork_url text,
  licensed boolean not null default false,
  created_at timestamptz not null default now(),
  unique (title, artist)
);

create table if not exists public.live_requests (
  id uuid primary key default gen_random_uuid(),
  request_number bigint generated always as identity unique,
  session_id uuid not null references public.dj_sessions(id) on delete cascade,
  venue_id uuid not null references public.venues(id) on delete cascade,
  table_id uuid references public.venue_tables(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  song_id uuid references public.song_catalog(id) on delete set null,
  song_title text not null,
  artist text not null,
  message text check (message is null or char_length(message) <= 500),
  tier text not null default 'Standard' check (tier in ('Free', 'Standard', 'Priority', 'VIP')),
  amount integer not null default 0 check (amount >= 0),
  status text not null default 'Pending' check (status in ('Pending', 'Accepted', 'Playing', 'Played', 'Declined', 'Cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'pending', 'paid', 'failed', 'refunded')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  live_request_id uuid references public.live_requests(id) on delete set null,
  order_id uuid,
  provider text not null check (provider in ('demo', 'mpesa', 'card', 'mobile_money')),
  provider_reference text unique,
  amount integer not null check (amount >= 0),
  currency text not null default 'KES',
  status text not null default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  idempotency_key text not null unique,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  pending_balance integer not null default 0 check (pending_balance >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('deposit', 'payment', 'refund', 'earnings', 'withdrawal', 'referral_reward')),
  amount integer not null,
  balance_after integer not null,
  reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues(id) on delete cascade,
  table_id uuid references public.venue_tables(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  reservation_date date not null,
  reservation_time time,
  guests integer not null check (guests > 0),
  package_name text,
  deposit_amount integer not null default 0,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'checked_in', 'completed', 'cancelled', 'no_show')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references public.venues(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  table_id uuid references public.venue_tables(id) on delete set null,
  total_amount integer not null default 0 check (total_amount >= 0),
  status text not null default 'placed' check (status in ('placed', 'confirmed', 'preparing', 'ready', 'delivered', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  name text not null,
  quantity integer not null check (quantity > 0),
  unit_amount integer not null check (unit_amount >= 0)
);

create table if not exists public.tickets (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  ticket_type text not null,
  ticket_number text not null unique default encode(gen_random_bytes(12), 'hex'),
  qr_token text not null unique default encode(gen_random_bytes(18), 'hex'),
  amount integer not null check (amount >= 0),
  status text not null default 'unused' check (status in ('unused', 'checked_in', 'cancelled', 'refunded')),
  created_at timestamptz not null default now()
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references auth.users(id) on delete cascade,
  referred_user_id uuid references auth.users(id) on delete set null,
  code text not null unique,
  reward_amount integer not null default 0,
  status text not null default 'pending' check (status in ('pending', 'successful', 'paid')),
  created_at timestamptz not null default now()
);

create table if not exists public.friendships (
  requester_id uuid not null references auth.users(id) on delete cascade,
  addressee_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'blocked')),
  created_at timestamptz not null default now(),
  primary key (requester_id, addressee_id),
  check (requester_id <> addressee_id)
);

create table if not exists public.driver_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  pickup_location text not null,
  destination text not null,
  passengers integer not null default 1 check (passengers > 0),
  vehicle_type text,
  status text not null default 'requested' check (status in ('requested', 'driver_assigned', 'arriving', 'trip_started', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.lost_found_reports (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references public.venues(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  item_type text not null,
  description text not null,
  image_url text,
  occurred_at timestamptz,
  status text not null default 'reported' check (status in ('reported', 'investigating', 'matched', 'returned', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.karaoke_queue (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references public.venues(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  song_title text not null,
  performer_name text not null,
  position integer not null,
  status text not null default 'queued' check (status in ('queued', 'singing', 'completed', 'skipped')),
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references public.venues(id) on delete cascade,
  title text not null,
  description text,
  image_url text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  quantity integer,
  claimed_count integer not null default 0,
  terms text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  check (ends_at > starts_at),
  check (quantity is null or quantity >= claimed_count)
);

create table if not exists public.artist_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  stage_name text not null,
  bio text,
  profile_image_url text,
  cover_image_url text,
  genres text[] not null default '{}',
  city text,
  verified boolean not null default false,
  booking_email text,
  created_at timestamptz not null default now()
);

create table if not exists public.follows (
  follower_id uuid not null references auth.users(id) on delete cascade,
  artist_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, artist_id),
  check (follower_id <> artist_id)
);

create table if not exists public.chat_rooms (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  room_type text not null check (room_type in ('direct', 'group', 'venue', 'event')),
  name text,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_members (
  room_id uuid not null references public.chat_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.chat_rooms(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  message text not null check (char_length(message) between 1 and 2000),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.split_bills (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references public.venues(id) on delete set null,
  created_by uuid not null references auth.users(id) on delete cascade,
  total_amount integer not null check (total_amount >= 0),
  paid_amount integer not null default 0 check (paid_amount >= 0 and paid_amount <= total_amount),
  status text not null default 'open' check (status in ('open', 'settled', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists public.split_bill_members (
  bill_id uuid not null references public.split_bills(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  assigned_amount integer not null default 0 check (assigned_amount >= 0),
  paid_amount integer not null default 0 check (paid_amount >= 0 and paid_amount <= assigned_amount),
  joined_at timestamptz not null default now(),
  primary key (bill_id, user_id)
);

create table if not exists public.advertisements (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references public.venues(id) on delete cascade,
  sponsor_id uuid references auth.users(id) on delete set null,
  title text not null,
  media_url text,
  message text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'active', 'ended')),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references auth.users(id) on delete set null,
  reported_user_id uuid references auth.users(id) on delete set null,
  content_type text not null,
  content_id uuid,
  reason text not null,
  details text,
  status text not null default 'open' check (status in ('open', 'reviewing', 'resolved', 'dismissed')),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists live_requests_session_status_idx on public.live_requests(session_id, status, created_at);
create index if not exists live_requests_user_idx on public.live_requests(user_id, created_at desc);
create index if not exists venue_tables_token_idx on public.venue_tables(qr_token);
create index if not exists notifications_user_created_idx on public.notifications(user_id, created_at desc);
create index if not exists chat_messages_room_created_idx on public.chat_messages(room_id, created_at);
create index if not exists offers_active_window_idx on public.offers(active, starts_at, ends_at);

alter table public.venues enable row level security;
alter table public.venue_tables enable row level security;
alter table public.dj_sessions enable row level security;
alter table public.song_catalog enable row level security;
alter table public.live_requests enable row level security;
alter table public.payments enable row level security;
alter table public.wallets enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.reservations enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.tickets enable row level security;
alter table public.referrals enable row level security;
alter table public.friendships enable row level security;
alter table public.driver_requests enable row level security;
alter table public.lost_found_reports enable row level security;
alter table public.karaoke_queue enable row level security;
alter table public.offers enable row level security;
alter table public.artist_profiles enable row level security;
alter table public.follows enable row level security;
alter table public.chat_rooms enable row level security;
alter table public.chat_members enable row level security;
alter table public.chat_messages enable row level security;
alter table public.split_bills enable row level security;
alter table public.split_bill_members enable row level security;
alter table public.advertisements enable row level security;
alter table public.reports enable row level security;
alter table public.audit_logs enable row level security;

drop policy if exists "Public venues are readable" on public.venues;
create policy "Public venues are readable" on public.venues for select using (status <> 'temporarily_closed');
drop policy if exists "Public venue tables are readable" on public.venue_tables;
create policy "Public venue tables are readable" on public.venue_tables for select using (active = true);
drop policy if exists "Live sessions are readable" on public.dj_sessions;
create policy "Live sessions are readable" on public.dj_sessions for select using (status in ('scheduled', 'live', 'paused'));
drop policy if exists "Song catalog is readable" on public.song_catalog;
create policy "Song catalog is readable" on public.song_catalog for select using (true);
drop policy if exists "Users create live requests" on public.live_requests;
create policy "Users create live requests" on public.live_requests for insert with check (auth.uid() = user_id or user_id is null);
drop policy if exists "Users view live requests" on public.live_requests;
create policy "Users view live requests" on public.live_requests for select using (auth.uid() = user_id or public.is_admin());
drop policy if exists "DJs view session requests" on public.live_requests;
create policy "DJs view session requests" on public.live_requests for select using (exists (select 1 from public.dj_sessions where dj_sessions.id = live_requests.session_id and dj_sessions.dj_id = auth.uid()));
drop policy if exists "Users create payment ledger rows" on public.payments;
create policy "Users create payment ledger rows" on public.payments for insert with check (auth.uid() = user_id or user_id is null);
drop policy if exists "Users view own payments" on public.payments;
create policy "Users view own payments" on public.payments for select using (auth.uid() = user_id);
drop policy if exists "Users view own wallet" on public.wallets;
create policy "Users view own wallet" on public.wallets for select using (auth.uid() = user_id);
drop policy if exists "Users view own wallet transactions" on public.wallet_transactions;
create policy "Users view own wallet transactions" on public.wallet_transactions for select using (auth.uid() = user_id);
drop policy if exists "Users manage own reservations" on public.reservations;
create policy "Users manage own reservations" on public.reservations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage own orders" on public.orders;
create policy "Users manage own orders" on public.orders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users view own order items" on public.order_items;
create policy "Users view own order items" on public.order_items for select using (exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));
drop policy if exists "Users view own tickets" on public.tickets;
create policy "Users view own tickets" on public.tickets for select using (auth.uid() = user_id);
drop policy if exists "Users manage own referrals" on public.referrals;
create policy "Users manage own referrals" on public.referrals for select using (auth.uid() = referrer_id or auth.uid() = referred_user_id);
drop policy if exists "Users manage friendships" on public.friendships;
create policy "Users manage friendships" on public.friendships for all using (auth.uid() = requester_id or auth.uid() = addressee_id) with check (auth.uid() = requester_id);
drop policy if exists "Users manage driver requests" on public.driver_requests;
create policy "Users manage driver requests" on public.driver_requests for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users manage lost found reports" on public.lost_found_reports;
create policy "Users manage lost found reports" on public.lost_found_reports for all using (auth.uid() = user_id or public.is_admin()) with check (auth.uid() = user_id or public.is_admin());
drop policy if exists "Public karaoke queue is readable" on public.karaoke_queue;
create policy "Public karaoke queue is readable" on public.karaoke_queue for select using (true);
drop policy if exists "Users join karaoke queue" on public.karaoke_queue;
create policy "Users join karaoke queue" on public.karaoke_queue for insert with check (auth.uid() = user_id or user_id is null);
drop policy if exists "Active offers are public" on public.offers;
create policy "Active offers are public" on public.offers for select using (active = true and now() between starts_at and ends_at);
drop policy if exists "Artist profiles are public" on public.artist_profiles;
create policy "Artist profiles are public" on public.artist_profiles for select using (true);
drop policy if exists "Users manage follows" on public.follows;
create policy "Users manage follows" on public.follows for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);
drop policy if exists "Chat members see rooms" on public.chat_members;
create policy "Chat members see rooms" on public.chat_members for select using (auth.uid() = user_id);
drop policy if exists "Chat members see messages" on public.chat_messages;
create policy "Chat members see messages" on public.chat_messages for select using (exists (select 1 from public.chat_members where chat_members.room_id = chat_messages.room_id and chat_members.user_id = auth.uid()));
drop policy if exists "Chat members send messages" on public.chat_messages;
create policy "Chat members send messages" on public.chat_messages for insert with check (auth.uid() = user_id and exists (select 1 from public.chat_members where chat_members.room_id = chat_messages.room_id and chat_members.user_id = auth.uid()));
drop policy if exists "Users manage split bills" on public.split_bills;
create policy "Users manage split bills" on public.split_bills for all using (auth.uid() = created_by) with check (auth.uid() = created_by);
drop policy if exists "Split bill members see bills" on public.split_bill_members;
create policy "Split bill members see bills" on public.split_bill_members for select using (auth.uid() = user_id or exists (select 1 from public.split_bills where split_bills.id = split_bill_members.bill_id and split_bills.created_by = auth.uid()));
drop policy if exists "Users manage reports" on public.reports;
create policy "Users manage reports" on public.reports for insert with check (auth.uid() = reporter_id);
drop policy if exists "Users view own reports" on public.reports;
create policy "Users view own reports" on public.reports for select using (auth.uid() = reporter_id);
drop policy if exists "Users view own audit logs" on public.audit_logs;
create policy "Users view own audit logs" on public.audit_logs for select using (auth.uid() = actor_id);

drop policy if exists "Admins manage nightlife venues" on public.venues;
drop policy if exists "Admins manage nightlife tables" on public.venue_tables;
drop policy if exists "Admins manage nightlife sessions" on public.dj_sessions;
drop policy if exists "Admins manage song catalog" on public.song_catalog;
drop policy if exists "Admins manage live requests" on public.live_requests;
drop policy if exists "Admins manage payments" on public.payments;
drop policy if exists "Admins manage wallets" on public.wallets;
drop policy if exists "Admins manage wallet transactions" on public.wallet_transactions;
drop policy if exists "Admins manage reservations" on public.reservations;
drop policy if exists "Admins manage orders" on public.orders;
drop policy if exists "Admins manage order items" on public.order_items;
drop policy if exists "Admins manage tickets" on public.tickets;
drop policy if exists "Admins manage referrals" on public.referrals;
drop policy if exists "Admins manage friendships" on public.friendships;
drop policy if exists "Admins manage driver requests" on public.driver_requests;
drop policy if exists "Admins manage karaoke queue" on public.karaoke_queue;
drop policy if exists "Admins manage offers" on public.offers;
drop policy if exists "Admins manage artist profiles" on public.artist_profiles;
drop policy if exists "Admins manage follows" on public.follows;
drop policy if exists "Admins manage chat rooms" on public.chat_rooms;
drop policy if exists "Admins manage chat members" on public.chat_members;
drop policy if exists "Admins manage chat messages" on public.chat_messages;
drop policy if exists "Admins manage split bills" on public.split_bills;
drop policy if exists "Admins manage split bill members" on public.split_bill_members;
drop policy if exists "Admins manage advertisements" on public.advertisements;
drop policy if exists "Admins manage reports" on public.reports;
drop policy if exists "Admins manage audit logs" on public.audit_logs;
create policy "Admins manage nightlife venues" on public.venues for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage nightlife tables" on public.venue_tables for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage nightlife sessions" on public.dj_sessions for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage song catalog" on public.song_catalog for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage live requests" on public.live_requests for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage payments" on public.payments for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage wallets" on public.wallets for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage wallet transactions" on public.wallet_transactions for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage reservations" on public.reservations for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage order items" on public.order_items for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage tickets" on public.tickets for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage referrals" on public.referrals for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage friendships" on public.friendships for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage driver requests" on public.driver_requests for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage karaoke queue" on public.karaoke_queue for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage offers" on public.offers for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage artist profiles" on public.artist_profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage follows" on public.follows for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage chat rooms" on public.chat_rooms for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage chat members" on public.chat_members for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage chat messages" on public.chat_messages for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage split bills" on public.split_bills for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage split bill members" on public.split_bill_members for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage advertisements" on public.advertisements for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage reports" on public.reports for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage audit logs" on public.audit_logs for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.create_live_request(
  p_session_id uuid,
  p_venue_id uuid,
  p_table_id uuid,
  p_song_title text,
  p_artist text,
  p_message text,
  p_tier text,
  p_amount integer,
  p_idempotency_key text
)
returns public.live_requests
language plpgsql
security invoker
set search_path = public
as $$
declare
  created_request public.live_requests;
  expected_amount integer;
begin
  select request.* into created_request
  from public.live_requests request
  join public.payments payment on payment.live_request_id = request.id
  where payment.idempotency_key = p_idempotency_key;
  if created_request.id is not null then
    return created_request;
  end if;
  if p_tier not in ('Free', 'Standard', 'Priority', 'VIP') then
    raise exception 'Invalid request tier';
  end if;
  select coalesce((request_prices ->> p_tier)::integer, -1) into expected_amount from public.dj_sessions where id = p_session_id and venue_id = p_venue_id and status = 'live';
  if expected_amount < 0 or expected_amount <> p_amount then
    raise exception 'Request price is not valid for this live session';
  end if;
  insert into public.live_requests (session_id, venue_id, table_id, user_id, song_title, artist, message, tier, amount, payment_status)
  values (p_session_id, p_venue_id, p_table_id, auth.uid(), trim(p_song_title), trim(p_artist), nullif(trim(p_message), ''), p_tier, p_amount, case when p_amount = 0 then 'paid' else 'pending' end)
  returning * into created_request;
  insert into public.payments (user_id, live_request_id, provider, amount, status, idempotency_key)
  values (auth.uid(), created_request.id, 'demo', p_amount, case when p_amount = 0 then 'succeeded' else 'pending' end, p_idempotency_key);
  return created_request;
end;
$$;

create or replace function public.advance_live_request(p_request_id uuid, p_status text)
returns public.live_requests
language plpgsql
security invoker
set search_path = public
as $$
declare
  updated_request public.live_requests;
begin
  if p_status not in ('Accepted', 'Playing', 'Played', 'Declined') then
    raise exception 'Invalid request status';
  end if;
  update public.live_requests request
  set status = p_status, updated_at = now()
  from public.dj_sessions session
  where request.id = p_request_id
    and request.session_id = session.id
    and (session.dj_id = auth.uid() or public.is_admin())
  returning request.* into updated_request;
  if updated_request.id is null then
    raise exception 'Request not found or not authorized';
  end if;
  return updated_request;
end;
$$;
