import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import LogoMarquee from '@/components/LogoMarquee'
import Link from 'next/link'

const caseStudies = [
  {
    company: 'Global Finance Corp',
    industry: 'Financial Services',
    headline: 'Cut threat detection time from days to minutes',
    result: '47% faster response to geopolitical events',
    excerpt:
      "Global Finance Corp's risk team was drowning in fragmented news feeds and analyst reports. After adopting Stratosphere, they reduced time-to-alert from 72 hours to under 4 hours—enabling proactive portfolio adjustments before markets reacted.",
  },
  {
    company: 'Pacific Logistics',
    industry: 'Supply Chain',
    headline: 'Avoided $12M in disruption costs',
    result: 'Early warning on 3 critical corridors',
    excerpt:
      "Pacific Logistics monitors 40+ trade corridors across Asia-Pacific. Stratosphere's supply chain module surfaced port disruptions and regional instability signals 5 days ahead of impact, allowing rerouting that saved an estimated $12M in delays.",
  },
  {
    company: 'Nordic Holdings',
    industry: 'Private Equity',
    headline: 'Informed 18 deal decisions with real-time intel',
    result: 'Higher conviction, faster diligence',
    excerpt:
      "Nordic Holdings uses Stratosphere to contextualize M&A targets in volatile regions. Their deal team now incorporates threat landscape and stability indices into diligence—reducing surprise risks and accelerating closing timelines.",
  },
  {
    company: 'Summit Capital',
    industry: 'Asset Management',
    headline: 'Replaced 3 point solutions with one platform',
    result: '60% reduction in analyst hours spent gathering intel',
    excerpt:
      "Summit Capital consolidated news aggregators, regional reports, and custom feeds into Stratosphere. Analysts now spend more time on analysis and less on curation—with institutional-grade alerts replacing manual monitoring.",
  },
]

export default function CaseStudiesPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Hero */}
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

      {/* Scrolling logos */}
      <LogoMarquee />

      {/* Case study cards */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-16">
            {caseStudies.map((study, i) => (
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
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    {study.headline}
                  </h3>
                  <p className="text-accent-blue font-medium text-sm mb-4">{study.result}</p>
                  <p className="text-slate-600 leading-relaxed">{study.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              href="#"
              className="px-8 py-4 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white transition-all duration-200"
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
