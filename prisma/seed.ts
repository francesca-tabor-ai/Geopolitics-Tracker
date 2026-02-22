import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user (password: Admin123!)
  const hashedPassword = await bcrypt.hash('Admin123!', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stratosphere.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@stratosphere.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  })
  console.log('Created admin:', admin.email)

  // Seed case studies
  await prisma.caseStudy.deleteMany({})
  const caseStudies = [
    {
      company: 'Global Finance Corp',
      industry: 'Financial Services',
      headline: 'Cut threat detection time from days to minutes',
      result: '47% faster response to geopolitical events',
      excerpt: "Global Finance Corp's risk team was drowning in fragmented news feeds and analyst reports. After adopting Stratosphere, they reduced time-to-alert from 72 hours to under 4 hours—enabling proactive portfolio adjustments before markets reacted.",
      sortOrder: 0,
    },
    {
      company: 'Pacific Logistics',
      industry: 'Supply Chain',
      headline: 'Avoided $12M in disruption costs',
      result: 'Early warning on 3 critical corridors',
      excerpt: "Pacific Logistics monitors 40+ trade corridors across Asia-Pacific. Stratosphere's supply chain module surfaced port disruptions and regional instability signals 5 days ahead of impact, allowing rerouting that saved an estimated $12M in delays.",
      sortOrder: 1,
    },
    {
      company: 'Nordic Holdings',
      industry: 'Private Equity',
      headline: 'Informed 18 deal decisions with real-time intel',
      result: 'Higher conviction, faster diligence',
      excerpt: "Nordic Holdings uses Stratosphere to contextualize M&A targets in volatile regions. Their deal team now incorporates threat landscape and stability indices into diligence—reducing surprise risks and accelerating closing timelines.",
      sortOrder: 2,
    },
    {
      company: 'Summit Capital',
      industry: 'Asset Management',
      headline: 'Replaced 3 point solutions with one platform',
      result: '60% reduction in analyst hours spent gathering intel',
      excerpt: "Summit Capital consolidated news aggregators, regional reports, and custom feeds into Stratosphere. Analysts now spend more time on analysis and less on curation—with institutional-grade alerts replacing manual monitoring.",
      sortOrder: 3,
    },
  ]
  await prisma.caseStudy.createMany({ data: caseStudies })
  console.log('Seeded', caseStudies.length, 'case studies')

  // Seed pricing tiers
  await prisma.pricingTier.deleteMany({})
  const tiers = [
    {
      name: 'Individual',
      description: 'For analysts and solo operators who need real-time intelligence.',
      monthlyPrice: 49,
      annualPrice: 39,
      isCustom: false,
      popular: false,
      cta: 'Start free trial',
      href: '#',
      limits: 'Up to 50 monitored regions',
      features: JSON.stringify([
        '1 user',
        'Threat Landscape alerts',
        'Regional Stability Index',
        '50 countries tracked',
        'Daily intelligence digest',
        'Email support',
      ]),
      sortOrder: 0,
    },
    {
      name: 'Team',
      description: 'For risk teams that need shared visibility and collaboration.',
      monthlyPrice: 199,
      annualPrice: 159,
      isCustom: false,
      popular: true,
      cta: 'Start free trial',
      href: '#',
      limits: 'Up to 10 seats, scale as you grow',
      features: JSON.stringify([
        'Up to 10 users',
        'Everything in Individual',
        'Supply Chain disruptions',
        '150+ countries tracked',
        'Real-time dashboard',
        'Custom watchlists',
        'API access',
        'Priority support',
      ]),
      sortOrder: 1,
    },
    {
      name: 'Enterprise',
      description: 'For institutions requiring full-scale intelligence and compliance.',
      monthlyPrice: null,
      annualPrice: null,
      isCustom: true,
      popular: false,
      cta: 'Contact sales',
      href: '#',
      limits: 'Unlimited scale, custom contracts',
      features: JSON.stringify([
        'Unlimited users',
        'Everything in Team',
        'Dedicated analyst',
        'SLA guarantee (99.9%)',
        'SSO / SAML',
        'On-premise deployment option',
        'Custom integrations',
        'Dedicated success manager',
      ]),
      sortOrder: 2,
    },
  ]
  await prisma.pricingTier.createMany({ data: tiers })
  console.log('Seeded', tiers.length, 'pricing tiers')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
