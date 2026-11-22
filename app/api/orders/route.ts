import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

function toOrder(row: Record<string, unknown>) {
  return {
    id:              String(row.id),
    orderNumber:     String(row.order_number),
    customer: {
      name:  String(row.customer_name),
      email: String(row.customer_email),
      phone: String(row.customer_phone),
    },
    shippingAddress: String(row.shipping_address),
    items:           row.items as unknown[],
    subtotal:        Number(row.subtotal),
    shipping:        Number(row.shipping),
    cashback:        Number(row.cashback),
    total:           Number(row.total),
    paymentMethod:   String(row.payment_method),
    status:          String(row.status),
    expectedDelivery: row.expected_delivery ? String(row.expected_delivery) : '',
    statusHistory:   row.status_history as unknown[],
    date:            String(row.created_at).split('T')[0],
  }
}

// GET /api/orders
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data.map(toOrder))
}

// POST /api/orders — place new order from checkout
export async function POST(req: NextRequest) {
  const body = await req.json()

  const orderNumber = `#ORD-${Date.now()}`
  const cashback    = Math.round(body.subtotal * 0.05)
  const today       = new Date()
  const delivery    = new Date(today.setDate(today.getDate() + 5))
    .toISOString().split('T')[0]

  const row = {
    order_number:     orderNumber,
    customer_name:    `${body.firstName} ${body.lastName}`,
    customer_email:   body.email,
    customer_phone:   body.phone,
    shipping_address: `${body.address}, ${body.city}, ${body.state} - ${body.pincode}`,
    items:            body.items,
    subtotal:         body.subtotal,
    shipping:         body.shipping ?? 0,
    cashback,
    total:            body.total,
    payment_method:   body.paymentMethod,
    status:           'Pending',
    expected_delivery: delivery,
    status_history:   [{ status: 'Pending', date: new Date().toISOString().split('T')[0], time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }],
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .insert(row)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Upsert customer record
  await supabaseAdmin.from('customers').upsert({
    email:          body.email,
    name:           `${body.firstName} ${body.lastName}`,
    phone:          body.phone,
    address:        `${body.address}, ${body.city}, ${body.state} - ${body.pincode}`,
    total_orders:   1,
    total_spent:    body.total,
    cashback_earned: cashback,
  }, {
    onConflict: 'email',
    ignoreDuplicates: false,
  })

  return NextResponse.json(toOrder(data))
}

// PATCH /api/orders — update status or delivery date
export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, status, expectedDelivery, statusHistory } = body

  const row: Record<string, unknown> = {}
  if (status           !== undefined) row.status            = status
  if (expectedDelivery !== undefined) row.expected_delivery = expectedDelivery
  if (statusHistory    !== undefined) row.status_history    = statusHistory

  const { data, error } = await supabaseAdmin
    .from('orders')
    .update(row)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(toOrder(data))
}
