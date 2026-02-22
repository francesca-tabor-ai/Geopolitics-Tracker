'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            'linear-gradient(135deg, rgba(139, 92, 246, 0.06) 0%, rgba(59, 130, 246, 0.04) 30%, rgba(236, 72, 153, 0.03) 60%, rgba(249, 115, 22, 0.02) 100%)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4 animate-[fade-up_0.5s_ease-out_forwards] opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
          Built for risk officers, strategic planners & C-suite leaders
        </p>

        <h1 className="font-semibold text-slate-900 mb-6 animate-[fade-up_0.5s_ease-out_forwards] opacity-0 leading-tight [animation-delay:50ms] [animation-fill-mode:forwards]">
          <span className="block">Stop flying blind.</span>
          <span className="block bg-gradient-signature bg-clip-text text-transparent">
            See threats before they hit.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed animate-[fade-up_0.5s_ease-out_forwards] opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          Fragmented intel, delayed alerts, hours of manual monitoring—you deserve better. Stratosphere
          unifies threat landscape, regional stability, and supply chain signals in one Command Center.
          Real-time. Predictive. Institutional-grade.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-up_0.5s_ease-out_forwards] opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
          <Link
            href="/pricing"
            className="px-8 py-4 rounded-xl font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-200 hover:shadow-soft-lg"
          >
            View Plans
          </Link>
          <Link
            href="/case-studies"
            className="px-8 py-4 rounded-xl font-medium border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
          >
            See Case Studies
          </Link>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-16 animate-[fade-up_0.5s_ease-out_forwards] opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
          {[
            { value: '150+', label: 'Countries Tracked' },
            { value: 'Real-time', label: 'Intelligence Updates' },
            { value: '24/7', label: 'Monitoring' },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="font-semibold text-2xl md:text-3xl text-slate-900 tabular-nums">
                {metric.value}
              </div>
              <div className="text-sm text-slate-500 mt-1">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
