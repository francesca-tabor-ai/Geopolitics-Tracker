import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LogoMarquee from '@/components/LogoMarquee'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({ orderBy: { sortOrder: 'asc' } })
  } catch {
    return []
  }
}

const FALLBACK_STUDIES = [
  { company: 'Global Finance Corp', industry: 'Financial Services', headline: 'Cut threat detection time from days to minutes', result: '47% faster response to geopolitical events', excerpt: "Global Finance Corp's risk team was drowning in fragmented news feeds." },
  { company: 'Pacific Logistics', industry: 'Supply Chain', headline: 'Avoided $12M in disruption costs', result: 'Early warning on 3 critical corridors', excerpt: "Pacific Logistics monitors 40+ trade corridors across Asia-Pacific." },
  { company: 'Nordic Holdings', industry: 'Private Equity', headline: 'Informed 18 deal decisions with real-time intel', result: 'Higher conviction, faster diligence', excerpt: "Nordic Holdings uses Stratosphere to contextualize M&A targets." },
  { company: 'Summit Capital', industry: 'Asset Management', headline: 'Replaced 3 point solutions with one platform', result: '60% reduction in analyst hours', excerpt: "Summit Capital consolidated news aggregators into Stratosphere." },
]

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()
  const studies = caseStudies.length > 0 ? caseStudies : FALLBACK_STUDIES

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-semibold text-slate-900 text-4xl md:text-5xl mb-4">
            Trusted by institutional decision-makers
          </h1>
          <p className="text-lg text-slate-600">
            See how risk officers, supply chain leaders, and C-suite executives use Stratosphere to
            navigate global complexity with confidence.
          </p>
        </div>
      </section>

      <LogoMarquee />

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {studies.map((study) => (
              <article
                key={study.company}
                className="group grid md:grid-cols-5 gap-8 items-start"
              >
                <div className="md:col-span-2">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    {study.industry}
                  </span>
                  <h2 className="font-semibold text-xl text-slate-900 mt-2">{study.company}</h2>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">{study.headline}</h3>
                  <p className="text-accent-blue font-medium text-sm mb-4">{study.result}</p>
                  <p className="text-slate-600 leading-relaxed">{study.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-50 clip-diagonal">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold text-slate-900 text-3xl mb-4">
            Ready to see threats before they hit?
          </h2>
          <p className="text-slate-600 mb-8">
            Join institutional leaders who have made Stratosphere their Command Center for
            geopolitical intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200"
            >
              View Plans
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 bg-white transition-all duration-200"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
