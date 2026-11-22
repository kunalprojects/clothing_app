import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

// Map DB row → app Product shape
function toProduct(row: Record<string, unknown>) {
  const inventory = Number(row.inventory ?? 0)
  return {
    id:            String(row.id),
    name:          String(row.name),
    price:         Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    image:         String(row.image),
    category:      String(row.category),
    sizes:         row.sizes as string[],
    colors:        row.colors as string[],
    inventory,
    sold:          Number(row.sold ?? 0),
    inStock:       inventory > 0,
    lowStock:      inventory > 0 && inventory <= 5,
    isNew:         Boolean(row.is_new),
    isBestSeller:  Boolean(row.is_best_seller),
    rating:        row.rating ? Number(row.rating) : undefined,
    reviews:       row.reviews ? Number(row.reviews) : undefined,
  }
}

// GET /api/products — fetch all products
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data.map(toProduct))
}

// POST /api/products — add new product
export async function POST(req: NextRequest) {
  const body = await req.json()
  const row = {
    id:             body.id ?? String(Date.now()),
    name:           body.name,
    price:          body.price,
    original_price: body.originalPrice ?? null,
    image:          body.image,
    category:       body.category ?? 'T-Shirts',
    sizes:          body.sizes ?? ['S','M','L','XL'],
    colors:         body.colors ?? ['Black','White'],
    inventory:      body.inventory ?? 0,
    sold:           body.sold ?? 0,
    is_new:         body.isNew ?? false,
    is_best_seller: body.isBestSeller ?? false,
    rating:         body.rating ?? null,
    reviews:        body.reviews ?? 0,
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert(row)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(toProduct(data))
}

// PATCH /api/products — update product
export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, ...rest } = body

  const row: Record<string, unknown> = {}
  if (rest.name          !== undefined) row.name           = rest.name
  if (rest.price         !== undefined) row.price          = rest.price
  if (rest.originalPrice !== undefined) row.original_price = rest.originalPrice ?? null
  if (rest.image         !== undefined) row.image          = rest.image
  if (rest.inventory     !== undefined) row.inventory      = rest.inventory
  if (rest.sold          !== undefined) row.sold           = rest.sold
  if (rest.isNew         !== undefined) row.is_new         = rest.isNew
  if (rest.isBestSeller  !== undefined) row.is_best_seller = rest.isBestSeller

  const { data, error } = await supabaseAdmin
    .from('products')
    .update(row)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(toProduct(data))
}

// DELETE /api/products?id=xxx
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
