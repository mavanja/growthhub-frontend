/**
 * Service definitions for the GrowthHub platform.
 * Icon names reference lucide-react icon components.
 */

const services = [
  {
    id: 'community-wachstum',
    title: 'Community-Wachstum',
    description:
      'Gezielte Vermittlung qualifizierter Mitglieder in deine Online-Communities. Echtzeit-Statistiken und detaillierte Auswertungen in deinem Dashboard.',
    features: [
      'Zielgruppen-genaues Matching',
      'Qualitaetskontrolle jedes Profils',
      'Organisches Wachstum',
      'Echtzeit-Reporting',
    ],
    iconName: 'Users',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    color: 'blue',
    kpiLabels: [
      'Neue Mitglieder',
      'Beitrittsrate',
      'Aktive Mitglieder',
      'Wachstumsrate',
    ],
  },
  {
    id: 'onboarding-automatisierung',
    title: 'Onboarding-Automatisierung',
    description:
      'Personalisierte Willkommensnachrichten fuer neue Mitglieder - mit optionalen Freebies oder als reiner Text. Vollstaendiges Tracking.',
    features: [
      'Personalisierte Nachrichten',
      'Automatischer Freebie-Versand',
      'Individuelle Templates',
      'Engagement-Tracking',
    ],
    iconName: 'MessageSquareHeart',
    gradient: 'from-purple-500/20 to-pink-500/20',
    color: 'purple',
    kpiLabels: [
      'Nachrichten gesendet',
      'Oeffnungsrate',
      'Freebies zugestellt',
      'Antwortrate',
    ],
  },
  {
    id: 'content-distribution',
    title: 'Content-Distribution',
    description:
      'Beantwortung von Community-Beitraegen und gezielter Versand relevanter Inhalte an deine Mitglieder. Vollstaendig nachverfolgbar.',
    features: [
      'Intelligente Inhaltszustellung',
      'Beitrags-Interaktion',
      'Stream-Versand',
      'Empfaenger-Tracking',
    ],
    iconName: 'Send',
    gradient: 'from-green-500/20 to-emerald-500/20',
    color: 'green',
    kpiLabels: [
      'Inhalte versendet',
      'Interaktionen',
      'Reichweite',
      'Klickrate',
    ],
  },
  {
    id: 'launch-kampagnen',
    title: 'Launch-Kampagnen',
    description:
      'Information deiner Community ueber anstehende Launches per persoenlicher Nachricht. Vollstaendig trackbar mit detaillierten Statistiken.',
    features: [
      'Personalisierte Launch-Infos',
      'Zeitgesteuerte Zustellung',
      'Versand-Statistiken',
      'Erfolgs-Tracking',
    ],
    iconName: 'Rocket',
    gradient: 'from-orange-500/20 to-red-500/20',
    color: 'orange',
    kpiLabels: [
      'Kampagnen aktiv',
      'Nachrichten zugestellt',
      'Conversion-Rate',
      'Anmeldungen',
    ],
  },
  {
    id: 'social-amplification',
    title: 'Social Amplification',
    description:
      'Promotion deiner Community-Inhalte und Events ueber ein Netzwerk mit 5.000+ Kontakten. Reichweite maximieren.',
    features: [
      '5.000+ Kontakte Netzwerk',
      'Event-Promotion',
      'Reichweiten-Analyse',
      'Interaktions-Statistiken',
    ],
    iconName: 'Megaphone',
    gradient: 'from-pink-500/20 to-rose-500/20',
    color: 'pink',
    kpiLabels: [
      'Reichweite',
      'Impressionen',
      'Interaktionen',
      'Geteilte Inhalte',
    ],
  },
  {
    id: 'direkt-kommunikation',
    title: 'Direkt-Kommunikation',
    description:
      'Persoenliche Ansprache aller Community-Mitglieder zu bevorstehenden Events und Launches. Vollstaendige Nachverfolgbarkeit.',
    features: [
      'Massen-Personalisierung',
      'Zeitgesteuerter Versand',
      'Zustellungs-Garantie',
      'Detaillierte Auswertung',
    ],
    iconName: 'Mail',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    color: 'indigo',
    kpiLabels: [
      'Nachrichten gesendet',
      'Zustellrate',
      'Oeffnungsrate',
      'Antwortrate',
    ],
  },
]

function getServiceById(id) {
  return services.find((service) => service.id === id) ?? null
}

export { services, getServiceById }
