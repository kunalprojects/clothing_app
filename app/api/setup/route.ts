import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const SEED_PRODUCTS = [
  { id:'1',  name:'Oversized Graphic Tee',      price:1299, original_price:1999, image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL','XXL'], colors:['Black','White','Navy'],              inventory:10, sold:5,  is_new:true,  is_best_seller:true,  rating:4.8, reviews:156 },
  { id:'2',  name:'Classic Crew Neck Tee',       price:899,  original_price:1499, image:'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['White','Black','Grey'],             inventory:5,  sold:8,  is_new:false, is_best_seller:true,  rating:4.7, reviews:203 },
  { id:'3',  name:'Vintage Band Tee',            price:1499, original_price:null, image:'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['Black','Charcoal'],                 inventory:15, sold:3,  is_new:true,  is_best_seller:false, rating:4.9, reviews:142 },
  { id:'4',  name:'Striped Rugby Tee',           price:1799, original_price:2299, image:'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['Navy-White','Red-White','Green-White'], inventory:8, sold:12, is_new:false, is_best_seller:false, rating:4.6, reviews:89  },
  { id:'5',  name:'Pocket Tee - Essential',      price:999,  original_price:null, image:'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL','XXL'], colors:['Olive','Navy','Black','White'],     inventory:20, sold:2,  is_new:false, is_best_seller:true,  rating:4.8, reviews:267 },
  { id:'6',  name:'Oversized Drop Shoulder Tee', price:1399, original_price:1899, image:'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['Beige','Sage','Dusty Pink'],        inventory:3,  sold:15, is_new:true,  is_best_seller:false, rating:4.9, reviews:178 },
  { id:'7',  name:'Minimalist Logo Tee',         price:1199, original_price:null, image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL','XXL'], colors:['Black','White','Grey'],             inventory:12, sold:4,  is_new:false, is_best_seller:false, rating:4.7, reviews:134 },
  { id:'8',  name:'Tie Dye Oversized Tee',       price:1599, original_price:2199, image:'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['Multi','Purple Mix','Blue Mix'],    inventory:2,  sold:18, is_new:true,  is_best_seller:false, rating:4.8, reviews:95  },
  { id:'9',  name:'V-Neck Basic Tee',            price:799,  original_price:null, image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['White','Black','Navy','Grey'],      inventory:18, sold:6,  is_new:false, is_best_seller:true,  rating:4.6, reviews:312 },
  { id:'10', name:'Longline Curved Hem Tee',     price:1299, original_price:null, image:'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['Black','White','Khaki'],            inventory:0,  sold:10, is_new:false, is_best_seller:false, rating:4.7, reviews:156 },
  { id:'11', name:'Ringer Tee - Retro',          price:1099, original_price:null, image:'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL'],       colors:['White-Navy','White-Red','Grey-Black'], inventory:14, sold:2, is_new:false, is_best_seller:false, rating:4.5, reviews:87  },
  { id:'12', name:'Heavyweight Box Tee',         price:1699, original_price:2299, image:'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&h=700&fit=crop', category:'T-Shirts', sizes:['S','M','L','XL','XXL'], colors:['Sand','Charcoal','Olive'],          inventory:4,  sold:14, is_new:true,  is_best_seller:true,  rating:4.9, reviews:124 },
]

export async function GET() {
  try {
    // 1. Create tables via raw SQL
    const tableSQL = `
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
    `

    const { error: sqlError } = await supabaseAdmin.rpc('exec_sql', { sql: tableSQL }).single()
    // If exec_sql doesn't exist, tables may already exist — ignore and continue

    // 2. Create storage bucket
    await supabaseAdmin.storage.createBucket('product-images', { public: true })

    // 3. Seed products (upsert so re-running is safe)
    const { error: seedError } = await supabaseAdmin
      .from('products')
      .upsert(SEED_PRODUCTS, { onConflict: 'id' })

    if (seedError) {
      return NextResponse.json({ error: seedError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Database ready, 12 products seeded.' })
  } catch (err: unknown) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
