'use client'

import GlassCard from '@/components/GlassCard'

export default function DashboardSection() {
  const cards = [
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
  ]

  return (
    <section className="relative py-24 px-6 -mt-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-semibold text-slate-900 text-3xl md:text-4xl mb-4 text-center">
          Intelligence at a glance
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Modular cards with real-time data, layered depth, and professional-grade analytics
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <GlassCard
              key={card.title}
              glow={card.accent}
              className="animate-[fade-up_0.5s_ease-out_forwards] opacity-0"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                {card.title}
              </div>
              <div
                className={`font-semibold text-3xl md:text-4xl mb-1 tabular-nums ${
                  card.accent === 'purple'
                    ? 'text-accent-purple'
                    : card.accent === 'blue'
                      ? 'text-accent-blue'
                      : 'text-accent-orange'
                }`}
              >
                {card.value}
              </div>
              <div className="text-sm text-slate-500 mb-4">{card.unit}</div>
              <div className="text-sm text-slate-500 border-t border-slate-200 pt-4">{card.desc}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
