import { useState } from 'react'
import { buildDateTimeFromInput, formatDuration, formatTime, toDateInputValue, toTimeInputValue } from '../lib/date'
import type { Activity, Category, Client } from '../types'
import { InlineSelect } from './InlineSelect'

interface ActivityRowProps {
  activity: Activity
  clients: Client[]
  categories: Category[]
  onUpdate: (id: string, patch: Partial<Activity>) => void
  onDelete: (id: string) => void
}

export function ActivityRow({ activity, clients, categories, onUpdate, onDelete }: ActivityRowProps) {
  const [editing, setEditing] = useState(false)
  const [description, setDescription] = useState(activity.description)
  const [clientId, setClientId] = useState<string | null>(activity.clientId)
  const [categoryId, setCategoryId] = useState<string | null>(activity.categoryId)
  const [startDate, setStartDate] = useState(toDateInputValue(activity.start))
  const [startTime, setStartTime] = useState(toTimeInputValue(activity.start))
  const [endDate, setEndDate] = useState(activity.end ? toDateInputValue(activity.end) : startDate)
  const [endTime, setEndTime] = useState(activity.end ? toTimeInputValue(activity.end) : '')

  const clientName = clients.find((item) => item.id === activity.clientId)?.name
  const categoryName = categories.find((item) => item.id === activity.categoryId)?.name

  const save = () => {
    onUpdate(activity.id, {
      description: description.trim() || 'Untitled activity',
      clientId,
      categoryId,
      start: buildDateTimeFromInput(startDate, startTime),
      end: endTime ? buildDateTimeFromInput(endDate, endTime) : null,
    })
    setEditing(false)
  }

  return (
    <article className="activity-row lined">
      {!editing ? (
        <>
          <div className="activity-row__time">
            {formatTime(activity.start)}—{activity.end ? formatTime(activity.end) : '…'}
          </div>
          <p className="activity-row__title">{activity.description}</p>
          <p className="activity-row__meta muted">Client: {clientName ?? '—'}</p>
          <p className="activity-row__meta muted">Category: {categoryName ?? '—'}</p>
          <p className="activity-row__duration">{formatDuration(activity.start, activity.end)}</p>
          <div className="activity-row__actions">
            <button type="button" className="text-button" onClick={() => setEditing(true)}>
              Edit
            </button>
            <button type="button" className="text-button danger" onClick={() => onDelete(activity.id)}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <div className="edit-sheet">
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="time-grid">
            <label>
              <span>Start date</span>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
              <span>Start time</span>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </label>
            <label>
              <span>End date</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
            <label>
              <span>End time</span>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </label>
          </div>
          <div className="composer__meta-row">
            <InlineSelect label="Client" value={clientId} options={clients} onChange={setClientId} />
            <InlineSelect label="Category" value={categoryId} options={categories} onChange={setCategoryId} />
          </div>
          <div className="activity-row__actions">
            <button type="button" className="text-button" onClick={save}>
              Save
            </button>
            <button type="button" className="text-button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
