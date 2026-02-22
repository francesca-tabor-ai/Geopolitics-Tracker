'use client'

import GlassCard from '@/components/GlassCard'

export default function CommandCenterSection() {
  return (
    <section className="relative py-24 clip-diagonal bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-semibold text-slate-900 text-3xl md:text-4xl mb-6 leading-tight">
              Command Center
              <span className="block bg-gradient-signature bg-clip-text text-transparent">
                Intelligence
              </span>
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              A forward-looking platform that evokes cutting-edge technology and geopolitical power.
              Layered depth, kinetic energy, and professional credibility.
            </p>
            <ul className="space-y-4">
              {['Real-time monitoring', 'Predictive analytics', 'Institutional-grade security'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-accent-blue" />
                    {item}
                  </li>
                )
              )}
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
  )
}
