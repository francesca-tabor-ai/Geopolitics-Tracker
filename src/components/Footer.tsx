import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="font-semibold text-slate-900">
          Stratosphere
        </Link>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-slate-500">
          <Link href="/pricing" className="footer-link">
            Pricing
          </Link>
          <Link href="/case-studies" className="footer-link">
            Case Studies
          </Link>
          <Link href="/contact" className="footer-link">
            Contact
          </Link>
          <Link href="/api-docs" className="footer-link">
            API Docs
          </Link>
          <Link href="/marketplace" className="footer-link">
            App Marketplace
          </Link>
          <a href="#" className="footer-link">
            Privacy
          </a>
          <a href="#" className="footer-link">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
