import {
  Users,
  MessageSquareHeart,
  Send,
  Rocket,
  Megaphone,
  Mail,
  ArrowRight,
} from 'lucide-react'
import { services } from '../../data/mockServices'

const iconMap = {
  Users,
  MessageSquareHeart,
  Send,
  Rocket,
  Megaphone,
  Mail,
}

function ServiceCard({ service }) {
  const Icon = iconMap[service.iconName]

  return (
    <div className="bg-white dark:bg-surface-1 border border-gray-200 dark:border-white/[0.04] rounded-2xl p-8 group cursor-pointer hover:border-accent-500/20 transition-all duration-500 hover:translate-y-[-2px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {Icon && (
        <Icon className="w-10 h-10 text-gray-300 dark:text-muted-dark group-hover:text-accent-500 transition-colors duration-500" />
      )}

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5">{service.title}</h3>

      <p className="text-sm text-gray-500 dark:text-muted leading-relaxed mt-3">
        {service.description}
      </p>

      <ul className="mt-5 space-y-2.5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <span className="text-accent-500/60 text-xs select-none">&mdash;</span>
            <span className="text-[13px] text-gray-600 dark:text-muted-light">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-1.5 text-xs text-gray-400 dark:text-muted group-hover:text-accent-500 transition-colors duration-300">
        <span>Mehr erfahren</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-500 font-semibold mb-4 block">
          SERVICES
        </span>

        <h2 className="font-display text-4xl md:text-6xl italic text-gray-900 dark:text-white">
          Sechs Services.
          <br />
          Ein Ziel: Dein Wachstum.
        </h2>

        <p className="text-lg text-gray-500 dark:text-muted-light max-w-2xl mt-6 leading-relaxed">
          Jeder Service ist darauf ausgelegt, deine Community nachhaltig zu staerken
          &mdash; von der Mitgliedergewinnung bis zur persoenlichen Ansprache.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-16 stagger-children">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
