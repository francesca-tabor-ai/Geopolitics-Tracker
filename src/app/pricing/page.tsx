import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const tiers = [
  {
    name: 'Individual',
    description: 'For analysts and solo operators who need real-time intelligence.',
    price: { monthly: 49, annual: 39 },
    cta: 'Start free trial',
    href: '#',
    popular: false,
    features: [
      '1 user',
      'Threat Landscape alerts',
      'Regional Stability Index',
      '50 countries tracked',
      'Daily intelligence digest',
      'Email support',
    ],
    limits: 'Up to 50 monitored regions',
  },
  {
    name: 'Team',
    description: 'For risk teams that need shared visibility and collaboration.',
    price: { monthly: 199, annual: 159 },
    cta: 'Start free trial',
    href: '#',
    popular: true,
    features: [
      'Up to 10 users',
      'Everything in Individual',
      'Supply Chain disruptions',
      '150+ countries tracked',
      'Real-time dashboard',
      'Custom watchlists',
      'API access',
      'Priority support',
    ],
    limits: 'Up to 10 seats, scale as you grow',
  },
  {
    name: 'Enterprise',
    description: 'For institutions requiring full-scale intelligence and compliance.',
    price: { custom: true },
    cta: 'Contact sales',
    href: '#',
    popular: false,
    features: [
      'Unlimited users',
      'Everything in Team',
      'Dedicated analyst',
      'SLA guarantee (99.9%)',
      'SSO / SAML',
      'On-premise deployment option',
      'Custom integrations',
      'Dedicated success manager',
    ],
    limits: 'Unlimited scale, custom contracts',
  },
]

export default function PricingPage() {
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
            {tiers.map((tier) => (
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
                  {tier.price.custom ? (
                    <div className="flex items-baseline gap-1">
                      <span className="font-semibold text-3xl text-slate-900">Custom</span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="font-semibold text-3xl text-slate-900">
                        ${tier.price.monthly}
                      </span>
                      <span className="text-slate-500">/mo</span>
                    </div>
                  )}
                  {!tier.price.custom && tier.price.annual && (
                    <p className="text-sm text-slate-500 mt-1">
                      ${tier.price.annual}/mo when billed annually
                    </p>
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
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-slate-600 text-sm">
                      <span className="w-2 h-2 rounded-full bg-accent-blue shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            href="#"
            className="inline-block px-6 py-3 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white transition-all duration-200"
          >
            Talk to sales
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
