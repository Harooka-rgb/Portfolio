import { useState } from 'react'
import { Mail, Phone, MapPin, Github, Instagram, Send, Copy, Check, ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Chat from '../components/Chat.jsx'
import { person } from '../data.js'

function CopyButton({ value }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* буфер обмена недоступен */
    }
  }
  return (
    <button className="icon-btn" onClick={copy} aria-label="Скопировать">
      {done ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}

export default function Contact() {
  const items = [
    { icon: Mail, label: 'Почта', value: person.email, href: `mailto:${person.email}`, copy: person.email },
    { icon: Phone, label: 'Телефон', value: person.phoneView, href: `tel:${person.phone}`, copy: person.phone },
    { icon: Send, label: 'Telegram', value: person.telegramHandle, href: person.telegram, external: true },
    { icon: Instagram, label: 'Instagram', value: person.instagramHandle, href: person.instagram, external: true },
    { icon: Github, label: 'GitHub', value: 'Harooka-rgb', href: person.github, external: true },
    { icon: MapPin, label: 'Город', value: person.city },
  ]

  return (
    <section className="container section page-head">
      <Reveal>
        <p className="eyebrow mono">Контакты</p>
        <h1 className="h1">Давайте работать вместе</h1>
        <p className="lead narrow">
          Открыт к предложениям, стажировкам и совместным проектам. Напишите или
          позвоните, отвечу в ближайшее время.
        </p>
      </Reveal>

      <div className="contact-grid">
      <div>
      <div className="contact-list">
        {items.map(({ icon: Icon, label, value, href, copy, external }, i) => (
          <Reveal key={label} delay={i * 90} className="contact-row">
            <span className="card-icon">
              <Icon size={20} />
            </span>
            <div className="contact-text">
              <span className="mono contact-label">{label}</span>
              {href ? (
                <a href={href} target={external ? '_blank' : undefined} rel="noreferrer">
                  {value}
                </a>
              ) : (
                <span>{value}</span>
              )}
            </div>
            {copy && <CopyButton value={copy} />}
            {external && (
              <a className="icon-btn" href={href} target="_blank" rel="noreferrer" aria-label="Открыть">
                <ArrowUpRight size={16} />
              </a>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal delay={400}>
        <a className="btn primary big" href={`mailto:${person.email}`}>
          Написать письмо <ArrowUpRight size={18} />
        </a>
      </Reveal>
      </div>

      <Reveal delay={200}>
        <Chat />
      </Reveal>
      </div>
    </section>
  )
}
