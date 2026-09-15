create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

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
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'display_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
