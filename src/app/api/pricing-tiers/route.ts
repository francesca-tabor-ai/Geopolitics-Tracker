import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await prisma.pricingTier.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(items)
  } catch (e) {
    console.error('Pricing tiers API error:', e)
    return NextResponse.json([], { status: 200 })
  }
}
