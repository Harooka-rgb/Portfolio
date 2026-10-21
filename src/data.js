export const person = {
  fullName: 'Бекжан Кубатбеков Кубатбекович',
  name: 'Бекжан Кубатбеков',
  nickname: 'Бека',
  role: 'Frontend-разработчик',
  city: 'Бишкек, Кыргызстан',
  phone: '+996708057678',
  phoneView: '+996 708 057 678',
  email: 'bekjan.kubatbekov99@gmail.com',
  github: 'https://github.com/Harooka-rgb',
  instagram: 'https://www.instagram.com/kubat.bekovvvv/',
  instagramHandle: '@kubat.bekovvvv',
  telegram: 'https://t.me/bekja_09',
  telegramHandle: '@bekja_09',
}

export const navLinks = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'Обо мне' },
  { to: '/skills', label: 'Навыки' },
  { to: '/projects', label: 'Проекты' },
  { to: '/journey', label: 'Путь' },
  { to: '/contact', label: 'Контакты' },
]

export const projects = [
  {
    id: 'marketplace',
    index: '01',
    title: 'Marketplace',
    kind: 'Интернет-магазин ноутбуков',
    featured: true,
    text:
      'Выпускной проект курсов, за который я получил золотой сертификат. Каталог товаров, корзина, авторизация и хранение данных в облаке: интерфейс на React и Redux Toolkit, бэкенд на Supabase.',
    stack: ['React', 'Redux Toolkit', 'Supabase', 'Vite', 'Vercel'],
    live: 'https://marketplace-three-dun.vercel.app',
    repo: 'https://github.com/Harooka-rgb/Marketplace',
  },
  {
    id: 'portfolio',
    index: '02',
    title: 'Портфолио',
    kind: 'Персональный сайт',
    featured: false,
    text:
      'Этот сайт. Тёмная тема ночного неба, анимация входа, шесть страниц и аккуратная типографика. Сделан на React и Vite.',
    stack: ['React', 'Vite', 'React Router', 'CSS'],
    live: null,
    repo: null,
  },
]
