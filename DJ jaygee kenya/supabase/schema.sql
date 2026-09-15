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

alter table public.profiles enable row level security;
alter table public.mixes enable row level security;
alter table public.videos enable row level security;
alter table public.events enable row level security;
alter table public.bookings enable row level security;
alter table public.favorites enable row level security;
alter table public.notifications enable row level security;

create policy "Published mixes are public" on public.mixes for select using (published = true);
create policy "Published videos are public" on public.videos for select using (published = true);
create policy "Upcoming events are public" on public.events for select using (status = 'upcoming');
create policy "Users manage their own profile" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "Users create their own bookings" on public.bookings for insert with check (auth.uid() = user_id or user_id is null);
create policy "Users view their own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users manage their favorites" on public.favorites for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users view their notifications" on public.notifications for select using (auth.uid() = user_id);

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
