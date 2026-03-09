/**
 * Mock dashboard data for the GrowthHub platform.
 * Uses deterministic generation for consistent data across renders.
 */

import { services } from './mockServices'

// --- Deterministic pseudo-random number generator (mulberry32) ---

function createRng(seed) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// --- German name pools ---

const FIRST_NAMES = [
  'Anna', 'Max', 'Sophie', 'Lukas', 'Emma', 'Leon', 'Mia', 'Felix',
  'Lena', 'Paul', 'Marie', 'Jonas', 'Laura', 'Tim', 'Sarah', 'Niklas',
  'Julia', 'Moritz', 'Lea', 'David', 'Hannah', 'Finn', 'Lisa', 'Ben',
  'Katharina', 'Jan', 'Johanna', 'Tom', 'Clara', 'Erik',
]

const LAST_NAMES = [
  'Mueller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer',
  'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Koch', 'Richter',
  'Klein', 'Wolf', 'Schroeder', 'Neumann', 'Schwarz', 'Braun',
  'Zimmermann', 'Hartmann', 'Krueger', 'Lange', 'Werner', 'Krause',
  'Lehmann', 'Schmitt', 'Huber', 'Baumann', 'Franke', 'Albrecht',
]

// --- Action texts per service ---

const ACTION_MAP = {
  'community-wachstum': [
    'Neues Mitglied vermittelt',
    'Profil-Qualitaetspruefung abgeschlossen',
    'Zielgruppen-Match hergestellt',
    'Beitrittsanfrage bearbeitet',
  ],
  'onboarding-automatisierung': [
    'Willkommensnachricht gesendet',
    'Freebie zugestellt',
    'Onboarding-Template aktiviert',
    'Follow-up Nachricht gesendet',
  ],
  'content-distribution': [
    'Inhalt an Mitglied versendet',
    'Beitrag beantwortet',
    'Content-Stream gestartet',
    'Empfaenger-Liste aktualisiert',
  ],
  'launch-kampagnen': [
    'Launch-Info versendet',
    'Kampagne gestartet',
    'Erinnerung zugestellt',
    'Launch-Statistik erstellt',
  ],
  'social-amplification': [
    'Inhalt promotet',
    'Event geteilt',
    'Netzwerk-Reichweite erweitert',
    'Interaktion generiert',
  ],
  'auszaehlung': [
    'Einladung versendet',
    'Beitritt bestaetigt',
    'Einladung erneuert',
    'Profil geprueft',
  ],
  'direkt-kommunikation': [
    'Direktnachricht gesendet',
    'Event-Info zugestellt',
    'Massen-Nachricht versendet',
    'Zustellung bestaetigt',
  ],
}

// --- Status distribution (weighted) ---

const STATUS_POOL = [
  'delivered', 'delivered', 'delivered', 'delivered',
  'opened', 'opened', 'opened',
  'sent', 'sent',
  'pending',
  'failed',
]

// --- Record generator ---

function generateMockRecords(count) {
  const rng = createRng(42)
  const serviceIds = services.map((s) => s.id)
  const now = Date.now()
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000

  const records = Array.from({ length: count }, (_, i) => {
    const serviceId = serviceIds[Math.floor(rng() * serviceIds.length)]
    const actions = ACTION_MAP[serviceId]
    const action = actions[Math.floor(rng() * actions.length)]
    const status = STATUS_POOL[Math.floor(rng() * STATUS_POOL.length)]
    const firstName = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)]
    const timestamp = new Date(
      now - Math.floor(rng() * thirtyDaysMs)
    ).toISOString()

    const id = `rec-${String(i + 1).padStart(4, '0')}-${Math.floor(rng() * 9000 + 1000)}`

    const metadata =
      serviceId === 'social-amplification'
        ? {
            views: Math.floor(rng() * 5000 + 200),
            reactions: Math.floor(rng() * 300 + 10),
          }
        : status === 'opened'
          ? { openedAt: new Date(now - Math.floor(rng() * thirtyDaysMs)).toISOString() }
          : {}

    return {
      id,
      serviceId,
      recipientName: `${firstName} ${lastName}`,
      action,
      status,
      timestamp,
      metadata,
    }
  })

  return records
}

// --- KPIs ---

const mockKPIs = {
  totalMessagesSent: 12847,
  membersAcquired: 3542,
  openRate: 78.5,
  engagementRate: 42.3,
}

// --- Daily trends (30 days) ---

const mockTrends = (() => {
  const rng = createRng(99)
  const baseDate = new Date('2026-02-05')

  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(baseDate)
    date.setDate(date.getDate() + i)
    const dateStr = date.toISOString().slice(0, 10)

    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const weekendFactor = isWeekend ? 0.6 : 1

    const messages = Math.floor((rng() * 200 + 300) * weekendFactor)
    const members = Math.floor((rng() * 80 + 80) * weekendFactor)

    return { date: dateStr, messages, members }
  })
})()

// --- Service breakdown ---

const mockServiceBreakdown = [
  { serviceId: 'community-wachstum', serviceName: 'Community-Wachstum', count: 3542, percentage: 27.6 },
  { serviceId: 'onboarding-automatisierung', serviceName: 'Onboarding-Automatisierung', count: 2891, percentage: 22.5 },
  { serviceId: 'content-distribution', serviceName: 'Content-Distribution', count: 2134, percentage: 16.6 },
  { serviceId: 'launch-kampagnen', serviceName: 'Launch-Kampagnen', count: 1756, percentage: 13.7 },
  { serviceId: 'social-amplification', serviceName: 'Social Amplification', count: 1387, percentage: 10.8 },
  { serviceId: 'direkt-kommunikation', serviceName: 'Direkt-Kommunikation', count: 1137, percentage: 8.8 },
]

// --- Recent activity (20 items, sorted desc) ---

const mockRecentActivity = generateMockRecords(20).sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
)

export {
  generateMockRecords,
  mockKPIs,
  mockTrends,
  mockServiceBreakdown,
  mockRecentActivity,
}
