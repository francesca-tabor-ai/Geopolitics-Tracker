import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
}

export async function GET() {
  try {
    await requireAdmin()
    const items = await prisma.pricingTier.findMany({ orderBy: { sortOrder: 'asc' } })
    return NextResponse.json(items)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin()
    const body = await req.json()
    const item = await prisma.pricingTier.create({
      data: {
        name: body.name,
        description: body.description,
        monthlyPrice: body.monthlyPrice ?? null,
        annualPrice: body.annualPrice ?? null,
        isCustom: body.isCustom ?? false,
        popular: body.popular ?? false,
        cta: body.cta ?? 'Start free trial',
        href: body.href ?? '#',
        limits: body.limits ?? '',
        features: typeof body.features === 'string' ? body.features : JSON.stringify(body.features ?? []),
        sortOrder: body.sortOrder ?? 0,
      },
    })
    return NextResponse.json(item)
  } catch (e) {
    if ((e as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
