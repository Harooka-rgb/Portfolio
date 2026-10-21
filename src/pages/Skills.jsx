import { Code2, Palette, Braces, Atom, Workflow, Database, GitBranch, Rocket } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const groups = [
  {
    title: 'Основа',
    items: [
      { icon: Code2, name: 'HTML', text: 'Семантическая разметка и доступная структура страниц.' },
      { icon: Palette, name: 'CSS', text: 'Адаптивная вёрстка, анимации, аккуратная типографика.' },
      { icon: Braces, name: 'JavaScript', text: 'Работа с DOM, асинхронный код, запросы к API.' },
    ],
  },
  {
    title: 'Библиотеки',
    items: [
      { icon: Atom, name: 'React', text: 'Компоненты, хуки, маршрутизация, сборка на Vite.' },
      { icon: Workflow, name: 'Redux Toolkit', text: 'Глобальное состояние: срезы, асинхронные действия.' },
    ],
  },
  {
    title: 'Бэкенд и инструменты',
    items: [
      { icon: Database, name: 'Supabase', text: 'PostgreSQL и авторизация как бэкенд для моих сайтов.' },
      { icon: GitBranch, name: 'Git и GitHub', text: 'Контроль версий и хранение репозиториев.' },
      { icon: Rocket, name: 'Vercel', text: 'Публикация сайтов и автоматический деплой.' },
    ],
  },
]

export default function Skills() {
  return (
    <section className="container section page-head">
      <Reveal>
        <p className="eyebrow mono">Навыки</p>
        <h1 className="h1">Технологии, с которыми я работаю</h1>
      </Reveal>

      {groups.map((g, gi) => (
        <div key={g.title} className="skill-group">
          <Reveal delay={gi * 60}>
            <h2 className="group-title mono">{g.title}</h2>
          </Reveal>
          <div className="grid-3">
            {g.items.map(({ icon: Icon, name, text }, i) => (
              <Reveal key={name} delay={i * 100} className="card">
                <span className="card-icon">
                  <Icon size={22} />
                </span>
                <h3>{name}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
