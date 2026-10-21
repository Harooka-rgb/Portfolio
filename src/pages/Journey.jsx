import { Award } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const steps = [
  { title: 'HTML и CSS', text: 'Структура страниц, стилизация и адаптивная вёрстка. Фундамент, на котором держится всё остальное.' },
  { title: 'JavaScript', text: 'Логика, работа с DOM, асинхронность и запросы к серверу.' },
  { title: 'React', text: 'Переход к компонентному подходу, хукам и маршрутизации.' },
  { title: 'Redux Toolkit', text: 'Управление глобальным состоянием в больших интерфейсах.' },
  { title: 'Supabase', text: 'Подключение базы данных и авторизации, чтобы сайты работали с реальными данными.' },
  { title: 'Marketplace', text: 'Итоговый проект: интернет-магазин ноутбуков, собранный от макета до публикации.' },
]

export default function Journey() {
  return (
    <section className="container section page-head">
      <Reveal>
        <p className="eyebrow mono">Путь</p>
        <h1 className="h1">Семь месяцев от основ до готового проекта</h1>
      </Reveal>

      <div className="journey-grid">
        <ol className="timeline">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="step">
              <span className="step-no mono">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200} className="certificate">
          <span className="cert-icon">
            <Award size={34} />
          </span>
          <p className="eyebrow mono">Достижение</p>
          <h2 className="cert-title">Золотой сертификат</h2>
          <p className="body">
            Получен по итогам семимесячных оффлайн-курсов по фронтенд-разработке за
            проект «Marketplace» — сайт по продаже ноутбуков.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
