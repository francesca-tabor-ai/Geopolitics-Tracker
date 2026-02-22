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
    const item = await prisma.user.update({
      where: { id: params.id },
      data: {
        name: body.name,
        role: body.role,
      },
    })
    return NextResponse.json({ id: item.id, email: item.email, name: item.name, role: item.role })
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
    const session = await getServerSession(authOptions)
    if ((session?.user as { id?: string })?.id === params.id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 })
    }
    await prisma.user.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    if ((e as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
