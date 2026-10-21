import { useCallback, useEffect, useRef, useState } from 'react'
import { MessageCircle, SendHorizontal, Info } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const TABLE = 'portfolio_messages'
const LOCAL_KEY = 'portfolio_chat_demo'
const MAX_NAME = 30
const MAX_TEXT = 300
const COOLDOWN_MS = 10000

function timeLabel(iso) {
  const d = new Date(iso)
  return d.toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('portfolio_chat_name') || ''
    } catch {
      return ''
    }
  })
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const lastSent = useRef(0)
  const listRef = useRef(null)

  const load = useCallback(async () => {
    if (!supabase) {
      try {
        setMessages(JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'))
      } catch {
        setMessages([])
      }
      return
    }
    const { data, error: err } = await supabase
      .from(TABLE)
      .select('id,name,text,is_owner,created_at')
      .order('created_at', { ascending: false })
      .limit(50)
    if (err) {
      setError('Не удалось загрузить сообщения')
      return
    }
    setMessages((data || []).reverse())
  }, [])

  useEffect(() => {
    load()
    if (!supabase) return
    const channel = supabase
      .channel('portfolio-chat')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: TABLE }, (payload) => {
        setMessages((prev) =>
          prev.some((m) => m.id === payload.new.id) ? prev : [...prev, payload.new].slice(-50)
        )
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [load])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const cleanName = name.trim().slice(0, MAX_NAME)
    const cleanText = text.trim().slice(0, MAX_TEXT)
    if (!cleanName || !cleanText) {
      setError('Укажите имя и напишите сообщение')
      return
    }
    const wait = COOLDOWN_MS - (Date.now() - lastSent.current)
    if (wait > 0) {
      setError(`Подождите ${Math.ceil(wait / 1000)} сек. перед следующим сообщением`)
      return
    }

    setSending(true)
    try {
      localStorage.setItem('portfolio_chat_name', cleanName)
    } catch {
      /* хранилище недоступно */
    }

    if (!supabase) {
      const msg = {
        id: crypto.randomUUID(),
        name: cleanName,
        text: cleanText,
        is_owner: false,
        created_at: new Date().toISOString(),
      }
      const next = [...messages, msg].slice(-50)
      setMessages(next)
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
      } catch {
        /* хранилище недоступно */
      }
      setText('')
      lastSent.current = Date.now()
      setSending(false)
      return
    }

    const { error: err } = await supabase.from(TABLE).insert({ name: cleanName, text: cleanText })
    if (err) {
      setError('Не удалось отправить сообщение, попробуйте позже')
    } else {
      setText('')
      lastSent.current = Date.now()
    }
    setSending(false)
  }

  return (
    <div className="chat">
      <div className="chat-head">
        <span className="card-icon">
          <MessageCircle size={20} />
        </span>
        <div>
          <h2 className="chat-title">Гостевой чат</h2>
          <p className="chat-sub">Оставьте сообщение, я отвечу здесь или в мессенджере</p>
        </div>
      </div>

      {!supabase && (
        <p className="chat-note">
          <Info size={15} />
          <span>Демо-режим: сообщения видны только в этом браузере. Подключите Supabase, чтобы чат стал общим.</span>
        </p>
      )}

      <div className="chat-list" ref={listRef}>
        {messages.length === 0 && <p className="chat-empty mono">Пока нет сообщений. Напишите первым.</p>}
        {messages.map((m) => (
          <div key={m.id} className={`msg ${m.is_owner ? 'is-owner' : ''}`}>
            <div className="msg-meta mono">
              <span className="msg-name">{m.is_owner ? `${m.name} · автор сайта` : m.name}</span>
              <span>{timeLabel(m.created_at)}</span>
            </div>
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={submit}>
        <input
          className="field"
          type="text"
          placeholder="Ваше имя"
          value={name}
          maxLength={MAX_NAME}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="chat-row">
          <textarea
            className="field"
            placeholder="Ваше сообщение"
            value={text}
            maxLength={MAX_TEXT}
            rows={2}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn primary send" type="submit" disabled={sending} aria-label="Отправить">
            <SendHorizontal size={18} />
          </button>
        </div>
        <div className="chat-foot mono">
          <span className="chat-error">{error}</span>
          <span>
            {text.length}/{MAX_TEXT}
          </span>
        </div>
      </form>
    </div>
  )
}
