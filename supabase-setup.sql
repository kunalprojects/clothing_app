-- ============================================================
-- VIBE Store — Run this once in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → paste → Run
-- ============================================================

-- 1. Products table
create table if not exists products (
  id             text primary key,
  name           text not null,
  price          integer not null,
  original_price integer,
  image          text not null,
  category       text not null default 'T-Shirts',
  sizes          text[] not null default array['S','M','L','XL'],
  colors         text[] not null default array['Black','White'],
  inventory      integer not null default 0,
  sold           integer not null default 0,
  is_new         boolean not null default false,
  is_best_seller boolean not null default false,
  rating         numeric(3,1),
  reviews        integer default 0,
  created_at     timestamptz default now()
);

-- 2. Orders table
create table if not exists orders (
  id               text primary key default gen_random_uuid()::text,
  order_number     text not null unique,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text not null,
  shipping_address text not null,
  items            jsonb not null default '[]'::jsonb,
  subtotal         integer not null default 0,
  shipping         integer not null default 0,
  cashback         integer not null default 0,
  total            integer not null default 0,
  payment_method   text not null default 'UPI',
  status           text not null default 'Pending',
  expected_delivery date,
  status_history   jsonb not null default '[]'::jsonb,
  created_at       timestamptz default now()
);

-- 3. Customers table
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

-- 4. Disable RLS so API routes can read/write freely
--    (fine for a demo — add proper RLS policies before going fully public)
alter table products  disable row level security;
alter table orders    disable row level security;
alter table customers disable row level security;

-- 5. Seed all 12 products
insert into products (id, name, price, original_price, image, category, sizes, colors, inventory, sold, is_new, is_best_seller, rating, reviews) values
('1',  'Oversized Graphic Tee',      1299, 1999, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL','XXL'], array['Black','White','Navy'],              10, 5,  true,  true,  4.8, 156),
('2',  'Classic Crew Neck Tee',       899, 1499, 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['White','Black','Grey'],              5,  8,  false, true,  4.7, 203),
('3',  'Vintage Band Tee',           1499, null, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['Black','Charcoal'],                 15, 3,  true,  false, 4.9, 142),
('4',  'Striped Rugby Tee',          1799, 2299, 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['Navy-White','Red-White'],            8,  12, false, false, 4.6, 89),
('5',  'Pocket Tee - Essential',      999, null, 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL','XXL'], array['Olive','Navy','Black','White'],      20, 2,  false, true,  4.8, 267),
('6',  'Oversized Drop Shoulder Tee',1399, 1899, 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['Beige','Sage','Dusty Pink'],         3,  15, true,  false, 4.9, 178),
('7',  'Minimalist Logo Tee',        1199, null, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL','XXL'], array['Black','White','Grey'],             12, 4,  false, false, 4.7, 134),
('8',  'Tie Dye Oversized Tee',      1599, 2199, 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['Multi','Purple Mix','Blue Mix'],     2,  18, true,  false, 4.8, 95),
('9',  'V-Neck Basic Tee',            799, null, 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['White','Black','Navy','Grey'],      18, 6,  false, true,  4.6, 312),
('10', 'Longline Curved Hem Tee',    1299, null, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['Black','White','Khaki'],             0,  10, false, false, 4.7, 156),
('11', 'Ringer Tee - Retro',         1099, null, 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL'],       array['White-Navy','White-Red','Grey-Black'],14,2,  false, false, 4.5, 87),
('12', 'Heavyweight Box Tee',        1699, 2299, 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=700&fit=crop', 'T-Shirts', array['S','M','L','XL','XXL'], array['Sand','Charcoal','Olive'],           4,  14, true,  true,  4.9, 124)
on conflict (id) do nothing;

-- Done! You should see "Success. No rows returned" 
select 'Setup complete! ' || count(*) || ' products loaded.' as result from products;
