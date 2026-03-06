import { useMemo, useState, type RefObject } from 'react'
import type { Category, Client, Template } from '../types'
import { InlineSelect } from './InlineSelect'

interface ActivityComposerProps {
  clients: Client[]
  categories: Category[]
  templates: Template[]
  recentDescriptions: string[]
  onStart: (input: { description: string; clientId: string | null; categoryId: string | null }) => void
  inputRef: RefObject<HTMLInputElement>
}

export function ActivityComposer({
  clients,
  categories,
  templates,
  recentDescriptions,
  onStart,
  inputRef,
}: ActivityComposerProps) {
  const [description, setDescription] = useState('')
  const [clientId, setClientId] = useState<string | null>(null)
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const suggestions = useMemo(
    () => [...new Set([...templates.map((t) => t.text), ...recentDescriptions])].slice(0, 8),
    [templates, recentDescriptions],
  )

  const submit = () => {
    const text = description.trim()
    if (!text) return
    onStart({ description: text, clientId, categoryId })
    setDescription('')
  }

  return (
    <section className="composer lined">
      <label className="composer__primary">
        <span className="meta-label">Quick log</span>
        <input
          ref={inputRef}
          placeholder="What are you working on?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit()
          }}
        />
      </label>

      <div className="composer__meta-row">
        <InlineSelect label="Client" value={clientId} options={clients} onChange={setClientId} />
        <InlineSelect label="Category" value={categoryId} options={categories} onChange={setCategoryId} />
      </div>

      <div className="composer__actions">
        <button type="button" className="primary-button" onClick={submit}>
          Start now
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((item) => (
            <button key={item} type="button" className="chip" onClick={() => setDescription(item)}>
              {item}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
