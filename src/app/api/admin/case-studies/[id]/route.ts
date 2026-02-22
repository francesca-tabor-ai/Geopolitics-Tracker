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

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    const item = await prisma.caseStudy.findUnique({ where: { id: params.id } })
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(item)
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin()
    const body = await req.json()
    const item = await prisma.caseStudy.update({
      where: { id: params.id },
      data: {
        company: body.company,
        industry: body.industry,
        headline: body.headline,
        result: body.result,
        excerpt: body.excerpt,
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
    await prisma.caseStudy.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    if ((e as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
