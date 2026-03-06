import { useMemo, useState } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { formatDuration, monthLabel, sortActivitiesByStart } from '../lib/date'
import type { Activity, Category, Client } from '../types'

interface ReportsViewProps {
  activities: Activity[]
  clients: Client[]
  categories: Category[]
}

const totalMinutes = (items: Activity[]) =>
  items.reduce((sum, activity) => {
    const end = activity.end ? new Date(activity.end).getTime() : Date.now()
    const start = new Date(activity.start).getTime()
    return sum + Math.max(0, Math.round((end - start) / 60000))
  }, 0)

const fromMinutes = (min: number): string => {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}

export function ReportsView({ activities, clients, categories }: ReportsViewProps) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())

  const monthlyActivities = useMemo(
    () =>
      sortActivitiesByStart(activities).filter((activity) => {
        const d = new Date(activity.start)
        return d.getFullYear() === year && d.getMonth() === month
      }),
    [activities, month, year],
  )

  const total = totalMinutes(monthlyActivities)

  const byClient = clients
    .map((client) => {
      const items = monthlyActivities.filter((a) => a.clientId === client.id)
      return { name: client.name, minutes: totalMinutes(items) }
    })
    .filter((item) => item.minutes > 0)

  const byCategory = categories
    .map((category) => {
      const items = monthlyActivities.filter((a) => a.categoryId === category.id)
      return { name: category.name, minutes: totalMinutes(items) }
    })
    .filter((item) => item.minutes > 0)

  return (
    <section className="page">
      <SectionTitle title={monthLabel(year, month)} subtitle={`Total: ${fromMinutes(total)}`} />

      <div className="month-controls lined">
        <label>
          Year
          <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />
        </label>
        <label>
          Month
          <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, idx) => (
              <option key={idx} value={idx}>
                {monthLabel(year, idx)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="report-group lined">
        <h3>By client</h3>
        <ul>
          {byClient.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{fromMinutes(item.minutes)}</strong>
            </li>
          ))}
          {byClient.length === 0 && <li className="muted">No client data this month.</li>}
        </ul>
      </section>

      <section className="report-group lined">
        <h3>By category</h3>
        <ul>
          {byCategory.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{fromMinutes(item.minutes)}</strong>
            </li>
          ))}
          {byCategory.length === 0 && <li className="muted">No category data this month.</li>}
        </ul>
      </section>

      <section className="report-group lined">
        <h3>Entries</h3>
        <ul className="report-entries">
          {monthlyActivities.map((activity) => (
            <li key={activity.id}>
              <span>
                {new Date(activity.start).toLocaleDateString()} · {activity.description}
              </span>
              <strong>{formatDuration(activity.start, activity.end)}</strong>
            </li>
          ))}
        </ul>
      </section>

      <button type="button" className="primary-button export-button" onClick={() => window.alert('Export coming soon')}>
        Export monthly report
      </button>
    </section>
  )
}
