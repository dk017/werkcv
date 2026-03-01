'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AgentStatus {
  lastRun: string | null
  status: 'active' | 'standby' | 'error'
  nextRun?: string
}

interface AgentDashboardData {
  lastUpdated: string
  agents: Record<string, AgentStatus>
  metrics: {
    pagesIndexed: number
    monthlyVisitors: number
    monthlyRevenue: number
    backlinks: number
    toolsLive: number
    cvExamplePages: number
    articlesPublished: number
  }
  tasks: {
    completed: string[]
    inProgress: string[]
    pending: string[]
  }
  contentGenerated: {
    cvVoorbeelden: string[]
    cvTips: string[]
    tools: string[]
  }
}

const AGENT_LABELS: Record<string, { name: string; emoji: string; role: string }> = {
  orchestrator: { name: 'De Dirigent', emoji: '🎯', role: 'Weekly workflow driver' },
  researcher: { name: 'De Onderzoeker', emoji: '🔍', role: 'Keyword & competitor research' },
  writer: { name: 'De Schrijver', emoji: '✍️', role: 'Dutch SEO content writing' },
  prioritizer: { name: 'De Strateeg', emoji: '📊', role: 'Task prioritization' },
  toolbuilder: { name: 'De Bouwer', emoji: '🔧', role: 'Tool component builder' },
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    active: 'bg-green-100 text-green-800',
    standby: 'bg-gray-100 text-gray-600',
    error: 'bg-red-100 text-red-800',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[status as keyof typeof colors] ?? colors.standby}`}>
      {status}
    </span>
  )
}

function MetricCard({ label, value, unit, target }: { label: string; value: number; unit?: string; target?: number }) {
  const progress = target ? Math.min((value / target) * 100, 100) : null
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">
        {unit === '€' ? `€${value.toLocaleString('nl-NL')}` : value.toLocaleString('nl-NL')}
        {unit && unit !== '€' && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
      </p>
      {target && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Target: {unit === '€' ? `€${target.toLocaleString('nl-NL')}` : target.toLocaleString('nl-NL')}</span>
            <span>{Math.round(progress!)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full">
            <div
              className="h-1.5 bg-blue-600 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [data, setData] = useState<AgentDashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'klauw2026')) {
      setAuthed(true)
      localStorage.setItem('klauw-admin', '1')
    } else {
      setError('Verkeerd wachtwoord')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('klauw-admin') === '1') setAuthed(true)
  }, [])

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    fetch('/api/admin/status')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setError('Kan status niet laden'))
      .finally(() => setLoading(false))
  }, [authed])

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm shadow-sm">
          <div className="text-center mb-6">
            <span className="text-4xl">🦞</span>
            <h1 className="text-xl font-bold text-gray-900 mt-2">Klauw Dashboard</h1>
            <p className="text-sm text-gray-500">WerkCV.nl agent control center</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Wachtwoord"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Inloggen
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-4xl animate-pulse">🦞</span>
          <p className="text-gray-500 mt-2 text-sm">Loading Klauw status...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Status niet beschikbaar. Is de VPS online?</p>
        </div>
      </div>
    )
  }

  const { metrics, agents, tasks, contentGenerated } = data
  const lastUpdated = new Date(data.lastUpdated).toLocaleString('nl-NL', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🦞</span>
              <h1 className="text-xl font-bold text-gray-900">Klauw Dashboard</h1>
            </div>
            <p className="text-sm text-gray-500">WerkCV.nl · Laatste update: {lastUpdated}</p>
          </div>
          <button
            onClick={() => { localStorage.removeItem('klauw-admin'); setAuthed(false) }}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Uitloggen
          </button>
        </div>

        {/* Mission Banner */}
        <div className="bg-blue-600 text-white rounded-2xl p-5 mb-6">
          <p className="text-sm font-medium opacity-80 mb-1">Missie</p>
          <p className="text-lg font-bold">€{metrics.monthlyRevenue.toLocaleString('nl-NL')} / €5.000 per maand</p>
          <div className="mt-3 h-2 bg-blue-500 rounded-full">
            <div
              className="h-2 bg-white rounded-full transition-all"
              style={{ width: `${Math.min((metrics.monthlyRevenue / 5000) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs opacity-60 mt-1">
            {metrics.monthlyRevenue === 0
              ? 'Pre-revenue — eerste betaling = bewijs dat het model werkt'
              : `${Math.round((metrics.monthlyRevenue / 5000) * 100)}% van het doel bereikt`}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Omzet/maand" value={metrics.monthlyRevenue} unit="€" target={5000} />
          <MetricCard label="Bezoekers/maand" value={metrics.monthlyVisitors} target={10000} />
          <MetricCard label="Google indexed" value={metrics.pagesIndexed} unit="pagina's" target={130} />
          <MetricCard label="Backlinks" value={metrics.backlinks} target={50} />
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <MetricCard label="Gratis tools live" value={metrics.toolsLive} />
          <MetricCard label="CV voorbeelden" value={metrics.cvExamplePages} />
          <MetricCard label="Artikelen" value={metrics.articlesPublished} />
        </div>

        {/* Agents */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Agents</h2>
          <div className="space-y-3">
            {Object.entries(agents).map(([key, agent]) => {
              const label = AGENT_LABELS[key]
              return (
                <div key={key} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{label?.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{label?.name ?? key}</p>
                      <p className="text-xs text-gray-400">{label?.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={agent.status} />
                    {agent.nextRun && (
                      <p className="text-xs text-gray-400 mt-0.5">{agent.nextRun}</p>
                    )}
                    {agent.lastRun && (
                      <p className="text-xs text-gray-400 mt-0.5">
                        {new Date(agent.lastRun).toLocaleDateString('nl-NL', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              📋 Pending <span className="text-gray-400 font-normal">({tasks.pending.length})</span>
            </h2>
            {tasks.pending.length === 0 ? (
              <p className="text-xs text-gray-400">Geen taken in wachtrij</p>
            ) : (
              <ul className="space-y-1.5">
                {tasks.pending.map((t, i) => (
                  <li key={i} className="text-xs text-gray-600 flex gap-2">
                    <span className="text-gray-300 shrink-0">○</span>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              ✅ Afgerond <span className="text-gray-400 font-normal">({tasks.completed.length})</span>
            </h2>
            {tasks.completed.length === 0 ? (
              <p className="text-xs text-gray-400">Nog niets afgerond</p>
            ) : (
              <ul className="space-y-1.5">
                {tasks.completed.slice(-10).reverse().map((t, i) => (
                  <li key={i} className="text-xs text-gray-500 flex gap-2 line-through">
                    <span className="text-green-400 shrink-0 no-underline" style={{ textDecoration: 'none' }}>✓</span>
                    <span className="no-underline" style={{ textDecoration: 'none' }}>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Content Generated */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Content gegenereerd door Klauw</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{contentGenerated.cvVoorbeelden.length}</p>
              <p className="text-xs text-gray-500">CV voorbeelden</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{contentGenerated.cvTips.length}</p>
              <p className="text-xs text-gray-500">Artikelen</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{contentGenerated.tools.length}</p>
              <p className="text-xs text-gray-500">Tools gebouwd</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 mt-6">Klauw v2.0 · WerkCV.nl growth engine 🦞</p>
      </div>
    </div>
  )
}
