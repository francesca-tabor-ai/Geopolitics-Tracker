import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { requestType, name, email, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 })
    }
    const submission = await prisma.contactSubmission.create({
      data: {
        requestType: requestType || 'general',
        name,
        email,
        message,
      },
    })
    return NextResponse.json({ id: submission.id, success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
