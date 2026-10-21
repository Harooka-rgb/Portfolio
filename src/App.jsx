import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sky from './components/Sky.jsx'
import Intro from './components/Intro.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Skills from './pages/Skills.jsx'
import Projects from './pages/Projects.jsx'
import Journey from './pages/Journey.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const location = useLocation()

  const onReveal = useCallback(() => setRevealed(true), [])
  const onDone = useCallback(() => setIntroDone(true), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Sky revealed={revealed} />
      {!introDone && <Intro onReveal={onReveal} onDone={onDone} />}

      {revealed && (
        <div className="shell">
          <Nav />
          <main key={location.pathname} className="page">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
