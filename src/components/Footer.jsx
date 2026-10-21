import { Github, Mail, Instagram, Send } from 'lucide-react'
import { person } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono footer-copy">
          © 2026 {person.fullName}
        </p>
        <div className="footer-links">
          <a href={person.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={person.telegram} target="_blank" rel="noreferrer" aria-label="Telegram">
            <Send size={18} />
          </a>
          <a href={person.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <a href={`mailto:${person.email}`} aria-label="Почта">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
