import { useState } from 'react'
import { User, MapPin, Code2, Signature } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { person } from '../data.js'

function Photo() {
  const [ok, setOk] = useState(true)
  return (
    <div className="photo">
      {ok ? (
        <img src="/photo.jpg" alt={person.name} onError={() => setOk(false)} />
      ) : (
        <div className="photo-ph">
          <span>BK</span>
        </div>
      )}
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </div>
  )
}

const rows = [
  { icon: User, label: 'Полное имя', value: person.fullName },
  { icon: Signature, label: 'Псевдоним', value: person.nickname },
  { icon: MapPin, label: 'Город', value: person.city },
  { icon: Code2, label: 'Направление', value: person.role },
]

export default function About() {
  return (
    <section className="container section page-head">
      <Reveal>
        <p className="eyebrow mono">Обо мне</p>
        <h1 className="h1">Привет, я Бека</h1>
      </Reveal>

      <div className="about-grid">
        <Reveal delay={80}>
          <Photo />
        </Reveal>

        <div>
          <Reveal delay={140}>
            <p className="lead">
              Меня зовут Бекжан, друзья называют меня Бека. Я фронтенд-разработчик из
              Бишкека и занимаюсь тем, что превращаю идеи в аккуратные и удобные сайты.
            </p>
            <p className="body">
              Я прошёл семимесячные оффлайн-курсы по фронтенду и изучил HTML, CSS,
              JavaScript, React и Redux Toolkit. Для своих сайтов использую Supabase как
              бэкенд: базу данных и авторизацию.
            </p>
            <p className="body">
              Итоговым проектом курсов стал интернет-магазин ноутбуков. За него я получил
              золотой сертификат, и сегодня это мой лучший проект.
            </p>
          </Reveal>

          <dl className="facts-list">
            {rows.map(({ icon: Icon, label, value }, i) => (
              <Reveal key={label} delay={200 + i * 80} className="facts-row">
                <dt>
                  <Icon size={16} /> {label}
                </dt>
                <dd>{value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
