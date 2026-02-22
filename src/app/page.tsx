import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
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

      <Footer />
    </main>
  )
}
