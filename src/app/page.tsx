import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SectionSkeleton from '@/components/SectionSkeleton'
import CommandCenterSkeleton from '@/components/CommandCenterSkeleton'

const DashboardSection = dynamic(() => import('@/components/DashboardSection'), {
  loading: () => <SectionSkeleton />,
})

const CommandCenterSection = dynamic(() => import('@/components/CommandCenterSection'), {
  loading: () => <CommandCenterSkeleton />,
})

export default function Home() {
  return (
    <main className="bg-white">
      <Navigation />

      <Hero />

      <DashboardSection />

      <CommandCenterSection />

      <footer className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-semibold text-slate-900">Stratosphere</span>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="footer-link">
              Privacy
            </a>
            <a href="#" className="footer-link">
              Terms
            </a>
            <a href="#" className="footer-link">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
