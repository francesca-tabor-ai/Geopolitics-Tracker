import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'

const entities = [
  {
    name: 'Alerts',
    description: 'Threat landscape alerts and critical signals requiring attention',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier (UUID)' },
      { name: 'title', type: 'string', description: 'Alert headline' },
      { name: 'severity', type: 'enum', description: 'critical | high | medium | low' },
      { name: 'region_id', type: 'string', description: 'Associated region' },
      { name: 'category', type: 'string', description: 'Threat category' },
      { name: 'body', type: 'string', description: 'Full alert content' },
      { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'datetime', description: 'Last update timestamp' },
    ],
  },
  {
    name: 'Regions',
    description: 'Countries and regions with stability indices and metadata',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier (UUID)' },
      { name: 'name', type: 'string', description: 'Region/country name' },
      { name: 'code', type: 'string', description: 'ISO country/region code' },
      { name: 'stability_index', type: 'number', description: '0–100 stability score' },
      { name: 'risk_level', type: 'enum', description: 'low | medium | high | critical' },
      { name: 'metadata', type: 'object', description: 'Extended regional data' },
      { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'datetime', description: 'Last update timestamp' },
    ],
  },
  {
    name: 'SupplyChainDisruptions',
    description: 'Supply chain and trade corridor disruption events',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier (UUID)' },
      { name: 'corridor', type: 'string', description: 'Trade corridor name' },
      { name: 'type', type: 'string', description: 'Disruption type (port, route, etc.)' },
      { name: 'severity', type: 'enum', description: 'critical | high | medium | low' },
      { name: 'affected_regions', type: 'array', description: 'Region IDs affected' },
      { name: 'description', type: 'string', description: 'Event details' },
      { name: 'resolved', type: 'boolean', description: 'Whether disruption is resolved' },
      { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'datetime', description: 'Last update timestamp' },
    ],
  },
  {
    name: 'Watchlists',
    description: 'User-defined watchlists for monitoring regions and topics',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier (UUID)' },
      { name: 'name', type: 'string', description: 'Watchlist name' },
      { name: 'region_ids', type: 'array', description: 'List of region IDs' },
      { name: 'keywords', type: 'array', description: 'Monitor keywords' },
      { name: 'user_id', type: 'string', description: 'Owner user ID' },
      { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'datetime', description: 'Last update timestamp' },
    ],
  },
  {
    name: 'Digests',
    description: 'Daily or custom intelligence digest summaries',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier (UUID)' },
      { name: 'type', type: 'enum', description: 'daily | weekly | custom' },
      { name: 'summary', type: 'string', description: 'Digest summary text' },
      { name: 'alerts_count', type: 'number', description: 'Number of alerts included' },
      { name: 'regions_covered', type: 'array', description: 'Region IDs covered' },
      { name: 'period_start', type: 'datetime', description: 'Period start' },
      { name: 'period_end', type: 'datetime', description: 'Period end' },
      { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
    ],
  },
  {
    name: 'Users',
    description: 'User accounts and organization membership',
    fields: [
      { name: 'id', type: 'string', description: 'Unique identifier (UUID)' },
      { name: 'email', type: 'string', description: 'User email' },
      { name: 'organization_id', type: 'string', description: 'Organization ID' },
      { name: 'role', type: 'enum', description: 'admin | member | viewer' },
      { name: 'created_at', type: 'datetime', description: 'Creation timestamp' },
      { name: 'updated_at', type: 'datetime', description: 'Last update timestamp' },
    ],
  },
]

const endpoints = [
  { method: 'GET', path: '/v1/alerts', description: 'List alerts (paginated, filterable)' },
  { method: 'POST', path: '/v1/alerts', description: 'Create alert (admin)' },
  { method: 'GET', path: '/v1/alerts/:id', description: 'Get single alert' },
  { method: 'PATCH', path: '/v1/alerts/:id', description: 'Update alert' },
  { method: 'DELETE', path: '/v1/alerts/:id', description: 'Delete alert' },
  { method: 'GET', path: '/v1/regions', description: 'List regions (paginated)' },
  { method: 'POST', path: '/v1/regions', description: 'Create region (admin)' },
  { method: 'GET', path: '/v1/regions/:id', description: 'Get single region' },
  { method: 'PATCH', path: '/v1/regions/:id', description: 'Update region' },
  { method: 'DELETE', path: '/v1/regions/:id', description: 'Delete region' },
  { method: 'GET', path: '/v1/supply-chain-disruptions', description: 'List disruptions' },
  { method: 'POST', path: '/v1/supply-chain-disruptions', description: 'Create disruption (admin)' },
  { method: 'GET', path: '/v1/supply-chain-disruptions/:id', description: 'Get single disruption' },
  { method: 'PATCH', path: '/v1/supply-chain-disruptions/:id', description: 'Update disruption' },
  { method: 'DELETE', path: '/v1/supply-chain-disruptions/:id', description: 'Delete disruption' },
  { method: 'GET', path: '/v1/watchlists', description: 'List current user watchlists' },
  { method: 'POST', path: '/v1/watchlists', description: 'Create watchlist' },
  { method: 'GET', path: '/v1/watchlists/:id', description: 'Get watchlist' },
  { method: 'PATCH', path: '/v1/watchlists/:id', description: 'Update watchlist' },
  { method: 'DELETE', path: '/v1/watchlists/:id', description: 'Delete watchlist' },
  { method: 'GET', path: '/v1/digests', description: 'List digests (filter by type, date)' },
  { method: 'GET', path: '/v1/digests/:id', description: 'Get single digest' },
  { method: 'GET', path: '/v1/me', description: 'Get current authenticated user' },
  { method: 'PATCH', path: '/v1/me', description: 'Update current user profile' },
]

const crudLegend = [
  { method: 'GET', desc: 'Read (List or Retrieve)' },
  { method: 'POST', desc: 'Create' },
  { method: 'PATCH', desc: 'Update (partial)' },
  { method: 'DELETE', desc: 'Delete' },
]

export default function ApiDocsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-semibold text-slate-900 text-4xl md:text-5xl mb-4">
            API Documentation
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Integrate Stratosphere intelligence into your workflows. REST API with full CRUD access
            to entities. Requires Team or Enterprise plan.
          </p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-accent-blue font-medium hover:underline"
          >
            Browse App Marketplace →
          </Link>
        </div>
      </section>

      {/* CRUD Legend */}
      <section className="py-8 px-6 border-y border-slate-200 bg-slate-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-slate-900 text-xl mb-4">HTTP Methods (CRUD)</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {crudLegend.map((item) => (
              <div key={item.method} className="flex items-center gap-3">
                <span
                  className={`font-mono text-sm font-medium px-2 py-1 rounded ${
                    item.method === 'GET'
                      ? 'bg-emerald-100 text-emerald-800'
                      : item.method === 'POST'
                        ? 'bg-blue-100 text-blue-800'
                        : item.method === 'PATCH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.method}
                </span>
                <span className="text-slate-600 text-sm">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entities */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-slate-900 text-3xl mb-2">Entities</h2>
          <p className="text-slate-600 mb-12">
            Core data models exposed via the API. All timestamps are ISO 8601.
          </p>

          <div className="space-y-12">
            {entities.map((entity) => (
              <div key={entity.name} className="card p-6">
                <h3 className="font-semibold text-xl text-slate-900 mb-1">{entity.name}</h3>
                <p className="text-slate-600 text-sm mb-6">{entity.description}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 font-medium text-slate-700">Field</th>
                        <th className="text-left py-3 font-medium text-slate-700">Type</th>
                        <th className="text-left py-3 font-medium text-slate-700">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entity.fields.map((field) => (
                        <tr key={field.name} className="border-b border-slate-100">
                          <td className="py-3 font-mono text-accent-blue">{field.name}</td>
                          <td className="py-3 text-slate-600">{field.type}</td>
                          <td className="py-3 text-slate-600">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-slate-900 text-3xl mb-2">API Endpoints</h2>
          <p className="text-slate-600 mb-12">
            Base URL: <code className="bg-slate-200 px-1 rounded">https://api.stratosphere.io</code>
          </p>

          <div className="space-y-3">
            {endpoints.map((ep) => (
              <div
                key={`${ep.method}-${ep.path}`}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <span
                  className={`font-mono text-sm font-medium px-2 py-1 rounded w-fit ${
                    ep.method === 'GET'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ep.method === 'POST'
                        ? 'bg-blue-100 text-blue-800'
                        : ep.method === 'PATCH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                  }`}
                >
                  {ep.method}
                </span>
                <code className="font-mono text-slate-800 text-sm">{ep.path}</code>
                <span className="text-slate-600 text-sm flex-1">{ep.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth & Rate Limits */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-semibold text-slate-900 text-3xl mb-8">Authentication & Limits</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Bearer Token</h3>
              <p className="text-slate-600 text-sm mb-4">
                Include your API key in the Authorization header. Generate keys in the dashboard.
              </p>
              <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                {`Authorization: Bearer sk_live_xxxx`}
              </pre>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-900 mb-2">Rate Limits</h3>
              <p className="text-slate-600 text-sm mb-4">
                Team: 1,000 req/min. Enterprise: 10,000 req/min. Responses include
                X-RateLimit-* headers.
              </p>
              <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                {`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 997`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t border-slate-200 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold text-slate-900 text-2xl mb-4">Build an app?</h2>
          <p className="text-slate-600 mb-6">
            Create integrations for advanced workflows and list them in our App Marketplace.
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
