import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getPricingTiers() {
  try {
    return await prisma.pricingTier.findMany({ orderBy: { sortOrder: 'asc' } })
  } catch {
    return []
  }
}

const FALLBACK_TIERS = [
  { name: 'Individual', description: 'For analysts and solo operators.', monthlyPrice: 49, annualPrice: 39, isCustom: false, popular: false, cta: 'Start free trial', href: '#', limits: 'Up to 50 monitored regions', features: '["1 user","Threat Landscape alerts","50 countries tracked","Email support"]' },
  { name: 'Team', description: 'For risk teams that need shared visibility.', monthlyPrice: 199, annualPrice: 159, isCustom: false, popular: true, cta: 'Start free trial', href: '#', limits: 'Up to 10 seats', features: '["Up to 10 users","Everything in Individual","API access","Priority support"]' },
  { name: 'Enterprise', description: 'For institutions requiring full-scale intelligence.', monthlyPrice: null, annualPrice: null, isCustom: true, popular: false, cta: 'Contact sales', href: '#', limits: 'Unlimited scale', features: '["Unlimited users","Dedicated analyst","SSO / SAML","Custom integrations"]' },
]

export default async function PricingPage() {
  const tiers = await getPricingTiers()
  const displayTiers = tiers.length > 0 ? tiers : FALLBACK_TIERS

  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-semibold text-slate-900 text-4xl md:text-5xl mb-4">
              Simple pricing that scales with you
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From solo analysts to global institutions—choose the plan that fits. All plans include
              a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayTiers.map((tier) => {
              const features = typeof tier.features === 'string' ? JSON.parse(tier.features) : tier.features
              return (
                <div
                  key={tier.name}
                  className={`
                    relative rounded-2xl border p-8 flex flex-col
                    ${tier.popular 
                      ? 'border-accent-blue bg-slate-50 shadow-lg shadow-slate-200/50' 
                      : 'border-slate-200 bg-white hover:border-slate-300'}
                  `}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 text-sm font-medium bg-accent-blue text-white rounded-full">
                        Most popular
                      </span>
                    </div>
                  )}

                  <h2 className="font-semibold text-xl text-slate-900 mb-2">{tier.name}</h2>
                  <p className="text-slate-600 text-sm mb-6">{tier.description}</p>

                  <div className="mb-6">
                    {tier.isCustom ? (
                      <span className="font-semibold text-3xl text-slate-900">Custom</span>
                    ) : (
                      <>
                        <span className="font-semibold text-3xl text-slate-900">${tier.monthlyPrice}</span>
                        <span className="text-slate-500">/mo</span>
                        {tier.annualPrice && (
                          <p className="text-sm text-slate-500 mt-1">
                            ${tier.annualPrice}/mo when billed annually
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 mb-6">{tier.limits}</p>

                  <Link
                    href={tier.href}
                    className={`
                      w-full py-3.5 rounded-xl font-medium text-center transition-all duration-200
                      ${tier.popular
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}
                    `}
                  >
                    {tier.cta}
                  </Link>

                  <ul className="mt-8 space-y-4 flex-1">
                    {Array.isArray(features) && features.map((f: string) => (
                      <li key={f} className="flex items-center gap-3 text-slate-600 text-sm">
                        <span className="w-2 h-2 rounded-full bg-accent-blue shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-semibold text-slate-900 text-2xl mb-4">
            Need a custom plan?
          </h2>
          <p className="text-slate-600 mb-6">
            Volume discounts, nonprofit pricing, and bespoke deployments available. Our team will
            work with you to design the right solution.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 bg-white transition-all duration-200"
          >
            Talk to sales
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
