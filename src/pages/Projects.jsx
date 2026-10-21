import { ExternalLink, Github, Hourglass } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data.js'

export default function Projects() {
  return (
    <section className="container section page-head">
      <Reveal>
        <p className="eyebrow mono">Проекты</p>
        <h1 className="h1">Работы, которыми я горжусь</h1>
      </Reveal>

      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 120} className={`project ${p.featured ? 'is-featured' : ''}`}>
            <div className="project-top">
              <span className="project-index mono">{p.index}</span>
              {p.featured && <span className="badge mono">Золотой сертификат</span>}
            </div>
            <p className="eyebrow mono">{p.kind}</p>
            <h2 className="project-title">{p.title}</h2>
            <p className="body">{p.text}</p>
            <ul className="tags">
              {p.stack.map((s) => (
                <li key={s} className="mono">
                  {s}
                </li>
              ))}
            </ul>
            {(p.live || p.repo) && (
              <div className="project-links">
                {p.live && (
                  <a className="btn primary" href={p.live} target="_blank" rel="noreferrer">
                    Открыть сайт <ExternalLink size={16} />
                  </a>
                )}
                {p.repo && (
                  <a className="btn ghost" href={p.repo} target="_blank" rel="noreferrer">
                    <Github size={16} /> Код
                  </a>
                )}
              </div>
            )}
          </Reveal>
        ))}

        <Reveal delay={240} className="project is-empty">
          <Hourglass size={22} />
          <p className="mono">Новые проекты в разработке</p>
        </Reveal>
      </div>
    </section>
  )
}
