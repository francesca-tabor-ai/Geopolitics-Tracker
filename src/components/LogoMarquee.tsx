'use client'

const logos = [
  'Global Finance Corp',
  'Pacific Logistics',
  'Nordic Holdings',
  'Summit Capital',
  'Horizon Energy',
  'Apex Industries',
  'Cascade Analytics',
  'Vertex Group',
]

export default function LogoMarquee() {
  return (
    <div className="overflow-hidden border-y border-slate-200 py-12 bg-white">
      <div className="flex animate-marquee w-max">
        {[...logos, ...logos].map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="shrink-0 px-12 text-slate-400 font-semibold text-lg tracking-tight whitespace-nowrap"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}
