'use client'

export default function SectionSkeleton() {
  return (
    <div className="py-24 px-6 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="h-10 bg-slate-200 rounded-lg w-3/4 max-w-md mx-auto mb-4" />
        <div className="h-5 bg-slate-100 rounded w-1/2 max-w-sm mx-auto mb-16" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
