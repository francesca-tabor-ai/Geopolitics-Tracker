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

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    const body = await req.json()
    const item = await prisma.pricingTier.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        monthlyPrice: body.monthlyPrice ?? null,
        annualPrice: body.annualPrice ?? null,
        isCustom: body.isCustom ?? false,
        popular: body.popular ?? false,
        cta: body.cta,
        href: body.href,
        limits: body.limits,
        features: typeof body.features === 'string' ? body.features : JSON.stringify(body.features ?? []),
        sortOrder: body.sortOrder,
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

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    await prisma.pricingTier.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    if ((e as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
