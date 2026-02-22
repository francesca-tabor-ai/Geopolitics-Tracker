import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const featuredApps = [
  {
    name: 'Slack Intelligence',
    developer: 'Stratosphere Labs',
    description: 'Push critical alerts and digests directly to Slack. Configure channels, severity filters, and quiet hours.',
    category: 'Alerts & Notifications',
    icon: '🔔',
  },
  {
    name: 'Excel Connector',
    developer: 'DataFlow Inc',
    description: 'Sync regional stability indices and alert counts into Excel. Pre-built templates for risk dashboards.',
    category: 'Data & Analytics',
    icon: '📊',
  },
  {
    name: 'Salesforce Risk Module',
    developer: 'Enterprise Integrations Co',
    description: 'Embed Stratosphere threat data into Account and Opportunity records. Automated risk scoring for deals.',
    category: 'CRM & Sales',
    icon: '☁️',
  },
  {
    name: 'Tableau Extension',
    developer: 'Visualytics',
    description: 'Visualize geopolitical data in Tableau. Maps, trend lines, and custom drill-downs.',
    category: 'Data & Analytics',
    icon: '📈',
  },
  {
    name: 'Zapier Integration',
    developer: 'Stratosphere',
    description: 'Connect Stratosphere to 5,000+ apps. Trigger workflows when alerts fire or regions change risk level.',
    category: 'Automation',
    icon: '⚡',
  },
  {
    name: 'Microsoft Teams Bot',
    developer: 'Stratosphere Labs',
    description: 'Intelligence bot for Teams. Query regions, subscribe to alerts, and share digests with your team.',
    category: 'Alerts & Notifications',
    icon: '💬',
  },
]

const categories = ['All', 'Alerts & Notifications', 'Data & Analytics', 'CRM & Sales', 'Automation']

export default function MarketplacePage() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-semibold text-slate-900 text-4xl md:text-5xl mb-4">
            App Marketplace
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Extend Stratosphere with integrations for Slack, Excel, Salesforce, and more. Build
            advanced workflows and connect intelligence to your stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/marketplace/build"
              className="px-8 py-4 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200"
            >
              Build an App
            </Link>
            <Link
              href="/api-docs"
              className="px-8 py-4 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white transition-all duration-200"
            >
              API Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-6 border-y border-slate-200 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-slate-900 text-xl mb-8 text-center">
            Why integrate?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-blue/10 flex items-center justify-center mx-auto mb-4 text-2xl">
                ⚡
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Automate workflows</h3>
              <p className="text-slate-600 text-sm">
                Trigger actions in your tools when alerts fire or risk levels change.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-4 text-2xl">
                📊
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Unified dashboards</h3>
              <p className="text-slate-600 text-sm">
                Surface Stratosphere data in BI tools, CRMs, and custom dashboards.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center mx-auto mb-4 text-2xl">
                🤝
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Collaborate better</h3>
              <p className="text-slate-600 text-sm">
                Push intelligence to Slack, Teams, and email so teams stay aligned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredApps.map((app) => (
              <Link
                key={app.name}
                href="#"
                className="card card-interactive p-6 block group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:bg-slate-200 transition-colors">
                    {app.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 group-hover:text-accent-blue transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">{app.developer}</p>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 mb-3">
                      {app.category}
                    </span>
                    <p className="text-slate-600 text-sm line-clamp-3">{app.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Build an app */}
      <section className="py-20 px-6 bg-slate-50 clip-diagonal">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold text-slate-900 text-3xl mb-4">
            Have an idea for an integration?
          </h2>
          <p className="text-slate-600 mb-8">
            Apply to build an app and list it in our marketplace. Get technical support, API
            access, and reach thousands of Stratosphere users.
          </p>
          <Link
            href="/marketplace/build"
            className="inline-block px-8 py-4 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200"
          >
            Apply to Build an App
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
