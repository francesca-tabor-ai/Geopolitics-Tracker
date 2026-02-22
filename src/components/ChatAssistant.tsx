'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const PROMPT_PROBES = [
  'What does Stratosphere offer?',
  'How much does it cost?',
  'Where can I see case studies?',
  'What is the Command Center?',
  'How do I get started?',
  'What features are included?',
  'Who is Stratosphere for?',
  'How does the free trial work?',
]

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

function getPlatformResponse(query: string): string {
  const q = query.toLowerCase().trim()

  // Greetings and general
  if (/^(hi|hello|hey|howdy)\b/.test(q))
    return "Hello! I'm your Stratosphere assistant. I can answer questions about our geopolitics intelligence platform—features, pricing, case studies, and how to get started. What would you like to know?"
  if (/^(thanks|thank you|thx)\b/.test(q))
    return "You're welcome! Is there anything else I can help you with?"

  // Platform overview
  if (
    /what (does|is) stratosphere|stratosphere offer|tell me about|platform|overview/.test(q)
  ) {
    return "Stratosphere is a cutting-edge geopolitics intelligence platform. We provide a unified Command Center with real-time data, predictive analytics, and professional-grade security. You get threat landscape alerts, regional stability indices, and supply chain disruption monitoring—all in one glanceable view. It's built for risk officers who can't afford to fly blind. Want to know about pricing or features?"
  }

  // Command Center
  if (/command center|dashboard|intelligence/.test(q)) {
    return "The Command Center is our core offering—a unified dashboard that surfaces critical alerts before they hit headlines. It includes: real-time threat landscape monitoring, regional stability indices, supply chain disruption tracking, predictive analytics, and institutional-grade security. Check out our home page for more details!"
  }

  // Pricing
  if (/price|cost|pricing|how much|plans?|tiers?/.test(q)) {
    return "We have three plans: Individual ($49/mo or $39/mo annual) for solo analysts, Team ($199/mo or $159/mo annual, most popular) for risk teams, and Enterprise (custom pricing) for institutions. All plans include a 14-day free trial. You can view full details on our Pricing page."
  }

  // Features
  if (/feature|include|what (do|does) (i|you) get|capabilit/.test(q)) {
    return "Key features include: Threat Landscape alerts, Regional Stability Index, Supply Chain monitoring, real-time dashboard, custom watchlists, API access (Team+), and more. Individual tracks 50 countries; Team tracks 150+ with collaboration tools. Enterprise adds dedicated analysts, SLA guarantees, and SSO. Check the pricing page for a full breakdown."
  }

  // Case studies
  if (/case stud|example|customer|who use|success/.test(q)) {
    return "We have case studies from Global Finance Corp, Pacific Logistics, Nordic Holdings, and Summit Capital—showing results like 47% faster threat response, $12M in avoided disruption costs, and 60% reduction in analyst hours. Visit our Case Studies page to read the full stories."
  }

  // Getting started
  if (/get started|start|sign up|trial|demo/.test(q)) {
    return "Getting started is easy: 1) Click 'Get Access' or 'Start free trial' on our site. 2) All plans include a 14-day free trial—no credit card required. 3) For Enterprise, reach out via 'Contact sales' or 'Talk to sales'. You can also request a demo from the Case Studies page."
  }

  // Target audience
  if (/who (is|for)|audience|analyst|risk|institution/.test(q)) {
    return "Stratosphere serves risk officers, supply chain leaders, analysts, and C-suite executives. Individual is for solo analysts; Team is for risk teams needing collaboration; Enterprise is for institutions requiring full-scale intelligence, compliance, and dedicated support."
  }

  // Fallback
  return "I'm here to help you learn about Stratosphere—our geopolitics intelligence platform. Try asking about our features, pricing, case studies, or how to get started. You can also click one of the suggested questions above!"
}

function simulateTypingDelay(callback: () => void, minMs = 400, maxMs = 800) {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs
  setTimeout(callback, delay)
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    simulateTypingDelay(() => {
      const response = getPlatformResponse(text)
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleProbeClick = (probe: string) => {
    sendMessage(probe)
  }

  return (
    <>
      {/* Chat panel */}
      <div
        className={`
          fixed bottom-0 right-0 z-[100]
          w-full max-w-md sm:max-w-[420px]
          bg-white border border-slate-200 rounded-t-2xl shadow-2xl shadow-slate-900/10
          transition-all duration-300 ease-out
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 rounded-t-2xl bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Stratosphere Assistant</h3>
              <p className="text-xs text-slate-500">Ask me anything about the platform</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-[380px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 text-slate-700 text-sm max-w-[85%]">
                    Hi! I&apos;m your Stratosphere guide. I can answer questions about our geopolitics intelligence platform, pricing, features, and how to get started. What would you like to know?
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
                    Suggested questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROMPT_PROBES.map((probe) => (
                      <button
                        key={probe}
                        onClick={() => handleProbeClick(probe)}
                        className="
                          px-3 py-2 text-sm text-slate-600 bg-slate-100
                          hover:bg-slate-200 hover:text-slate-900
                          rounded-xl transition-colors duration-200
                          border border-slate-200/60
                        "
                      >
                        {probe}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                    )}
                    <div
                      className={`
                        max-w-[85%] rounded-2xl px-4 py-3 text-sm
                        ${msg.role === 'user'
                          ? 'bg-slate-900 text-white rounded-tr-sm'
                          : 'bg-slate-100 text-slate-700 rounded-tl-sm'
                        }
                      `}
                    >
                      {msg.content}
                      {msg.role === 'assistant' &&
                        (msg.content.includes('Pricing') ||
                          msg.content.includes('Case Studies') ||
                          msg.content.includes('home page')) && (
                          <div className="mt-3 pt-3 border-t border-slate-200/50 flex flex-wrap gap-3">
                            {msg.content.includes('Pricing') && (
                              <Link
                                href="/pricing"
                                className="text-xs font-medium text-accent-blue hover:underline"
                              >
                                View Pricing →
                              </Link>
                            )}
                            {msg.content.includes('Case Studies') && (
                              <Link
                                href="/case-studies"
                                className="text-xs font-medium text-accent-blue hover:underline"
                              >
                                View Case Studies →
                              </Link>
                            )}
                            {msg.content.includes('home page') && (
                              <Link
                                href="/"
                                className="text-xs font-medium text-accent-blue hover:underline"
                              >
                                Go to Home →
                              </Link>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length > 0 && (
            <div className="p-2 border-t border-slate-200/60">
              <div className="flex flex-wrap gap-2 overflow-x-auto">
                {PROMPT_PROBES.slice(0, 4).map((probe) => (
                  <button
                    key={probe}
                    onClick={() => handleProbeClick(probe)}
                    className="
                      px-2.5 py-1.5 text-xs text-slate-500 bg-slate-50
                      hover:bg-slate-200 hover:text-slate-700
                      rounded-lg transition-colors shrink-0
                    "
                  >
                    {probe}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Stratosphere..."
                className="
                  flex-1 px-4 py-3 rounded-xl border border-slate-200
                  text-slate-900 placeholder:text-slate-400
                  focus:outline-none focus:ring-2 focus:ring-accent-blue/30 focus:border-accent-blue
                  transition-all
                "
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="
                  px-4 py-3 rounded-xl font-medium
                  bg-slate-900 text-white
                  hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors
                "
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Floating chat button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          fixed bottom-6 right-6 z-[99]
          w-14 h-14 rounded-2xl
          bg-gradient-to-br from-accent-purple to-accent-blue
          text-white shadow-lg shadow-accent-purple/30
          hover:shadow-xl hover:shadow-accent-purple/40 hover:scale-105
          transition-all duration-300 ease-out
          flex items-center justify-center
        "
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </>
  )
}
