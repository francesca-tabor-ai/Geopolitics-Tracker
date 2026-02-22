import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import GlassCard from '@/components/GlassCard'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-white">
      <Navigation />

      <Hero />

      {/* Problem → Solution framing */}
      <section className="relative py-24 px-6 -mt-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-semibold text-slate-900 text-3xl md:text-4xl mb-4 text-center">
            The problem: fragmented intel, reactive decisions
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
            You cobble together news, analyst notes, and open-source data—often learning about critical
            threats <em>after</em> markets move or supply chains break. Static reports go stale. Manual
            monitoring can&apos;t scale.
          </p>
          <h2 className="font-semibold text-slate-900 text-3xl md:text-4xl mb-4 text-center mt-16">
            Our solution: one Command Center
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
            A unified dashboard with real-time data, predictive analytics, and professional-grade security.
            Spend less time searching. More time deciding.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Threat Landscape',
                value: '12',
                unit: 'Active Alerts',
                accent: 'purple' as const,
                desc: 'Critical signals requiring attention',
              },
              {
                title: 'Regional Stability',
                value: '89%',
                unit: 'Index Score',
                accent: 'blue' as const,
                desc: 'Global stability composite',
              },
              {
                title: 'Supply Chain',
                value: '7',
                unit: 'Disruptions',
                accent: 'orange' as const,
                desc: 'Monitoring trade corridors',
              },
            ].map((card, i) => (
              <GlassCard
                key={card.title}
                glow={card.accent}
                className="animate-[fade-up_0.5s_ease-out_forwards] opacity-0"
                style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                  {card.title}
                </div>
                <div className={`font-semibold text-3xl md:text-4xl mb-1 tabular-nums ${
                  card.accent === 'purple' ? 'text-accent-purple' :
                  card.accent === 'blue' ? 'text-accent-blue' : 'text-accent-orange'
                }`}>
                  {card.value}
                </div>
                <div className="text-sm text-slate-500 mb-4">{card.unit}</div>
                <div className="text-sm text-slate-500 border-t border-slate-200 pt-4">
                  {card.desc}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Diagonal section – featured capability */}
      <section className="relative py-24 clip-diagonal bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-semibold text-slate-900 text-3xl md:text-4xl mb-6 leading-tight">
                How we solve it
                <span className="block bg-gradient-signature bg-clip-text text-transparent">
                  Command Center Intelligence
                </span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Stratosphere surfaces critical alerts before they hit headlines. Get threat landscape,
                regional stability indices, and supply chain disruptions in one glanceable view—built
                for risk officers who can&apos;t afford to fly blind.
              </p>
              <ul className="space-y-4">
                {['Real-time monitoring', 'Predictive analytics', 'Institutional-grade security'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-accent-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <GlassCard glow="blue" className="p-8">
                <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                  <span className="text-slate-500 text-sm">Dashboard Preview</span>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-semibold text-slate-900">Stratosphere</Link>
          <div className="flex gap-8 text-sm text-slate-500">
            <Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
            <Link href="/case-studies" className="hover:text-slate-900 transition-colors">Case Studies</Link>
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
