import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap, TrendingUp, AlertCircle, Network } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * STRATOSPHERE Home Page
 * Neo-Futuristic Intelligence Dashboard Design
 * 
 * Design Philosophy:
 * - Dark navy/black foundation (#0f1419) with neon accents
 * - Glassmorphic cards with semi-transparent backgrounds
 * - Kinetic energy through animations and gradients
 * - Space Grotesk for headings, Inter for body, Space Mono for data
 * - Glow effects and neon borders for interactive elements
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold font-['Space_Grotesk']">STRATOSPHERE</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm hover:text-accent transition-colors">Features</a>
            <a href="#pillars" className="text-sm hover:text-accent transition-colors">Product</a>
            <a href="#roadmap" className="text-sm hover:text-accent transition-colors">Roadmap</a>
            <Button className="bg-accent hover:bg-accent/90 text-background">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/6aj4I2bNKBbe0eiVJSuKZe/sandbox/ugC5WE0bwUrfcND2zljVzX-img-1_1771779516000_na1fn_aGVyby1nZW9wb2xpdGljcy1ncmlk.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNmFqNEkyYk5LQmJlMGVpVkpTdUtaZS9zYW5kYm94L3VnQzVXRTBid1VyZmNORDJ6bGpWelgtaW1nLTFfMTc3MTc3OTUxNjAwMF9uYTFmbl9hR1Z5YnkxblpXOXdiMnhwZEdsamN5MW5jbWxrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RmdIVgBkeBLu30AB9IEvLgKst0~T0eyA7p67kRmq-O1~XLB5O9qyFpitF8pLW8bRH2TVf518wJIKlvWfdABGJvNHTmlkA2-RlRslzxCTQ7yhUJyK3FqjqjOuZzlM7E17tZ1r5w6WStVzKVuabLkFoeMT1APYbUmGRH2sI2VIUCGPBV1bWq0UthXvGyc5Uz56jTGuCRhbq6MWnthtVtJn24YJY-7Mj9CQAiQsvbdz1n9NjDGgYYZ-VQFPMbUIR2l0x-1LUdW5~HejUTLKxlhiUsUPpQ73u9SKIh4JsatfiHfdsjqOpZz~WfqxCp0E5PLS1CVwFcPGIZ3h2J2Uuq7gdg__')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.7,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />

        {/* Hero Content */}
        <div className="relative z-20 container max-w-4xl text-center fade-in-up">
          <h1 className="text-6xl md:text-7xl font-bold font-['Space_Grotesk'] mb-6 leading-tight">
            The Operating System for <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">Geopolitics</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform global political, economic, military, and technological signals into structured, transparent scoring systems. Intelligence for institutional investors, governments, and strategic planners.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-background gap-2 glow-purple">
              Explore Platform <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10">
              View Demo
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">Core Capabilities</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Structured intelligence that separates raw data from derived metrics to actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Feature 1 */}
            <div className="glass-effect p-8 rounded-lg neon-border-purple group hover:neon-border-cyan transition-all duration-300 fade-in-up">
              <div className="flex items-start gap-4">
                <Globe className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">National Power Dashboard</h3>
                  <p className="text-muted-foreground">
                    Comprehensive country scoring across economic, military, diplomatic, and technological dimensions with real-time updates.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-effect p-8 rounded-lg neon-border-cyan group hover:neon-border-purple transition-all duration-300 fade-in-up">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-lime-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">Crisis Early Warning</h3>
                  <p className="text-muted-foreground">
                    Detect commodity volatility, currency stress, troop mobilization, and protest patterns before they escalate.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-effect p-8 rounded-lg neon-border-cyan group hover:neon-border-purple transition-all duration-300 fade-in-up">
              <div className="flex items-start gap-4">
                <Network className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">Alliance Network Mapping</h3>
                  <p className="text-muted-foreground">
                    Visualize treaty networks, UN voting patterns, and defense cooperation scoring across all nations.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass-effect p-8 rounded-lg neon-border-purple group hover:neon-border-cyan transition-all duration-300 fade-in-up">
              <div className="flex items-start gap-4">
                <Zap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">Scenario Simulation Lab</h3>
                  <p className="text-muted-foreground">
                    Model sanctions, oil shocks, regime changes, and military escalations with probabilistic forecasts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Integrity Section */}
          <div className="mt-16 glass-effect p-12 rounded-lg neon-border-cyan">
            <h3 className="text-2xl font-bold font-['Space_Grotesk'] mb-6 text-center">Transparent Intelligence Architecture</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Raw Data</div>
                <p className="text-sm text-muted-foreground">Verifiable facts from authoritative sources</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">Derived Metrics</div>
                <p className="text-sm text-muted-foreground">Normalized measurements and indices</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-lime-400 mb-2">Scoring Models</div>
                <p className="text-sm text-muted-foreground">Transparent weighting and logic</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">Forecasts</div>
                <p className="text-sm text-muted-foreground">Probabilistic scenario outputs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Pillars */}
      <section id="pillars" className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">Core Product Pillars</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Five interconnected intelligence systems powering geopolitical analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "National Power Dashboard", desc: "Multi-dimensional power modeling with real-time metrics", icon: "📊" },
              { title: "Risk & Stability Engine", desc: "Quantified risk assessment and regime stability scoring", icon: "⚖️" },
              { title: "Alliance & Influence Mapping", desc: "Network analysis of international relationships", icon: "🌐" },
              { title: "Crisis Early Warning System", desc: "Real-time signal integration and detection", icon: "🚨" },
              { title: "Scenario Simulation Lab", desc: "Forward-looking probabilistic modeling", icon: "🔮" },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="glass-effect p-8 rounded-lg neon-border-purple hover:neon-border-cyan transition-all duration-300 fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold font-['Space_Grotesk'] mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section id="roadmap" className="py-24 bg-gradient-to-b from-background/50 to-background relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">24-Month Roadmap</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From foundation to institutional dominance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { phase: "Phase 1", months: "0–6", title: "Foundation", desc: "Core intelligence platform with initial indices and dashboard" },
              { phase: "Phase 2", months: "6–12", title: "Intelligence Layer", desc: "Real-time risk detection and alliance network mapping" },
              { phase: "Phase 3", months: "12–18", title: "Forecasting", desc: "Predictive models and strategic balance engine" },
              { phase: "Phase 4", months: "18–24", title: "Enterprise", desc: "Specialized modules and institutional expansion" },
            ].map((phase, idx) => (
              <div
                key={idx}
                className="glass-effect p-6 rounded-lg border border-border hover:neon-border-cyan transition-all duration-300 fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-sm text-cyan-400 font-mono mb-2">{phase.months}</div>
                <h3 className="text-lg font-bold font-['Space_Grotesk'] mb-2">{phase.title}</h3>
                <p className="text-sm text-muted-foreground">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-24 relative overflow-hidden">
        <div className="container">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">Built for Decision Makers</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trusted by institutions that shape global strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "Institutional Investors", icon: "💼" },
              { name: "Government Analysts", icon: "🏛️" },
              { name: "Defence Planners", icon: "🛡️" },
              { name: "Corporate Strategy", icon: "🏢" },
              { name: "Academic & Policy", icon: "📚" },
            ].map((audience, idx) => (
              <div
                key={idx}
                className="glass-effect p-6 rounded-lg text-center hover:neon-border-purple transition-all duration-300 fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-3xl mb-3">{audience.icon}</div>
                <p className="font-['Space_Grotesk'] font-semibold text-sm">{audience.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container max-w-3xl text-center fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            Intelligence for the <span className="text-accent">Connected World</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            STRATOSPHERE is the Bloomberg Terminal for geopolitics—transforming raw signals into structured, actionable intelligence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-background gap-2 glow-purple">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500/50 hover:bg-cyan-500/10">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background/50">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold font-['Space_Grotesk'] mb-4">STRATOSPHERE</h4>
              <p className="text-sm text-muted-foreground">The operating system for geopolitics</p>
            </div>
            <div>
              <h4 className="font-bold font-['Space_Grotesk'] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-['Space_Grotesk'] mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold font-['Space_Grotesk'] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">© 2026 STRATOSPHERE. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
