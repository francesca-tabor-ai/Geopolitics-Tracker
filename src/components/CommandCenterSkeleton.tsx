'use client'

export default function CommandCenterSkeleton() {
  return (
    <div className="py-24 px-6 clip-diagonal bg-slate-50 animate-pulse">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-4">
            <div className="h-12 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-6 bg-slate-100 rounded w-full" />
            <div className="h-6 bg-slate-100 rounded w-5/6" />
            <div className="space-y-2 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-5 bg-slate-100 rounded w-full" />
              ))}
            </div>
          </div>
          <div className="h-64 bg-slate-100 rounded-2xl" />
        </div>
      </div>
    </div>
  )
}
