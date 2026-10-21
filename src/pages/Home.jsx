import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, GraduationCap, Award, Layers, Atom, Workflow, Database } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { person } from '../data.js'

const facts = [
  { icon: GraduationCap, text: '7 месяцев оффлайн-обучения' },
  { icon: Award, text: 'Золотой сертификат' },
  { icon: Layers, text: 'React · Redux Toolkit · Supabase' },
]

const focus = [
  {
    icon: Atom,
    title: 'Интерфейсы на React',
    text: 'Компонентный подход, чистая структура, адаптивность под любой экран.',
  },
  {
    icon: Workflow,
    title: 'Состояние приложения',
    text: 'Redux Toolkit для предсказуемой работы со сложными данными.',
  },
  {
    icon: Database,
    title: 'Бэкенд на Supabase',
    text: 'PostgreSQL и авторизация для моих сайтов без лишней серверной части.',
  },
]

export default function Home() {
  return (
    <>
      <section className="hero container">
        <p className="eyebrow mono">
          <MapPin size={14} /> {person.city}
        </p>
        <h1 className="display">
          Бекжан
          <br />
          <span className="italic">Кубатбеков</span>
        </h1>
        <p className="lead">
          {person.role}. Проектирую и верстаю интерфейсы на React: строгие по форме и
          продуманные в деталях.
        </p>
        <div className="cta">
          <Link className="btn primary" to="/projects">
            Смотреть проекты <ArrowUpRight size={18} />
          </Link>
          <Link className="btn ghost" to="/contact">
            Связаться
          </Link>
        </div>
        <ul className="facts">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text}>
              <Icon size={18} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section">
        <Reveal>
          <p className="eyebrow mono">Чем занимаюсь</p>
          <h2 className="h2">Фронтенд от макета до рабочего сайта</h2>
        </Reveal>
        <div className="grid-3">
          {focus.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 110} className="card">
              <span className="card-icon">
                <Icon size={22} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container section">
        <Reveal className="strip">
          <div>
            <p className="eyebrow mono">Главный проект</p>
            <h2 className="h2">Marketplace — интернет-магазин ноутбуков</h2>
            <p className="muted">Проект, за который я получил золотой сертификат курсов.</p>
          </div>
          <Link className="btn primary" to="/projects">
            Подробнее <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
