# DJ JayGee

DJ JayGee is a mobile-first nightlife platform for QR venue sessions, song requests, DJ queues, events, reservations, tickets, orders, wallets, referrals, safety services, and artist discovery.

The current backend uses Supabase because the existing app already uses Supabase Auth, Postgres, Row Level Security, and Realtime. The schema is designed so a dedicated payment provider or external API can be added without moving client trust to the browser.

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:8443/?app=1` to preview the patron PWA shell directly in a browser. Installed PWA mode opens the same shell automatically.

## Database setup

1. Create or select a Supabase project.
2. Copy `.env.example` to `.env.local` and set `VITE`/`NEXT_PUBLIC` values used by the frontend.
3. Run `supabase/schema.sql` in the Supabase SQL editor or with the Supabase CLI.
4. Enable Realtime for `public.live_requests` in the Supabase dashboard.
5. Create a user account. The designated admin email in the schema is promoted to `admin`; change that policy before production.

The schema creates the existing content tables plus the nightlife foundation:

- venues, venue_tables, dj_sessions, song_catalog, live_requests
- payments, wallets, wallet_transactions
- reservations, orders, order_items, tickets
- referrals, friendships, driver_requests, lost_found_reports, karaoke_queue

The important server-side functions are:

- `create_live_request`: validates a live session and configured price, writes the request and payment ledger atomically, and is idempotent.
- `advance_live_request`: only the session DJ or an admin can move a request through Accepted, Playing, Played, or Declined.

## QR workflow

A venue table QR code should resolve to a `venue_tables.qr_token`. The client calls `getVenueByQrToken`, resolves the active session with `getLiveSession`, and uses `create_live_request` for submission. Queue updates arrive through the `live_requests` Postgres Realtime channel. The current browser demo uses local fallback data when no live session IDs are supplied.

## Payments

The browser must never mark a paid request as fulfilled. The SQL function records `pending` for paid tiers and `succeeded` only for free/demo requests. A production payment Edge Function should:

1. Create the provider intent using a server-only secret.
2. Store the provider reference and idempotency key.
3. Validate the provider webhook signature.
4. Mark `payments` and `live_requests.payment_status` after server verification.
5. Refund and reconcile through ledger rows, never by directly editing a balance.

M-Pesa variables are documented in `.env.example`; keep them in Supabase Edge Function secrets or another server secret store.

## Verification

```bash
pnpm build
pnpm test
```

## Product phases

The implemented foundation prioritizes the critical workflow: QR context -> live session -> song request -> payment ledger -> DJ queue -> realtime status. Events, tickets, reservations, ordering, wallet, social, driver, lost-and-found, karaoke, moderation, and analytics now have database ownership boundaries ready for their screens and policies. They should be shipped module by module with focused tests rather than as disconnected placeholder buttons.
