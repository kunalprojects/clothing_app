/**
 * Run this once to create all tables and seed products.
 * node -r ts-node/register lib/setup-db.ts  (or via the API route /api/setup)
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://rpakjymyyvcdwrhtxnka.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const SQL = `
-- Products table
create table if not exists products (
  id           text primary key,
  name         text not null,
  price        integer not null,
  original_price integer,
  image        text not null,
  category     text not null default 'T-Shirts',
  sizes        text[] not null default array['S','M','L','XL'],
  colors       text[] not null default array['Black','White'],
  inventory    integer not null default 0,
  sold         integer not null default 0,
  in_stock     boolean generated always as (inventory > 0) stored,
  low_stock    boolean generated always as (inventory > 0 and inventory <= 5) stored,
  is_new       boolean not null default false,
  is_best_seller boolean not null default false,
  rating       numeric(3,1),
  reviews      integer default 0,
  created_at   timestamptz default now()
);

-- Orders table
create table if not exists orders (
  id                text primary key default gen_random_uuid()::text,
  order_number      text not null unique,
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text not null,
  shipping_address  text not null,
  items             jsonb not null,
  subtotal          integer not null,
  shipping          integer not null default 0,
  cashback          integer not null default 0,
  total             integer not null,
  payment_method    text not null default 'UPI',
  status            text not null default 'Pending',
  expected_delivery date,
  status_history    jsonb not null default '[]'::jsonb,
  created_at        timestamptz default now()
);

-- Customers table
create table if not exists customers (
  id              text primary key default gen_random_uuid()::text,
  name            text not null,
  email           text not null unique,
  phone           text,
  address         text,
  total_orders    integer not null default 0,
  total_spent     integer not null default 0,
  cashback_earned integer not null default 0,
  cashback_used   integer not null default 0,
  created_at      timestamptz default now()
);

-- Storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Allow public read on product-images
create policy if not exists "Public read product images"
  on storage.objects for select
  using ( bucket_id = 'product-images' );

-- Allow authenticated inserts (admin uploads)
create policy if not exists "Admin upload product images"
  on storage.objects for insert
  with check ( bucket_id = 'product-images' );

-- Enable RLS but allow public read on products/orders
alter table products enable row level security;
alter table orders   enable row level security;
alter table customers enable row level security;

create policy if not exists "Public read products"
  on products for select using (true);

create policy if not exists "Service role manage products"
  on products for all using (true);

create policy if not exists "Service role manage orders"
  on orders for all using (true);

create policy if not exists "Service role manage customers"
  on customers for all using (true);
`
