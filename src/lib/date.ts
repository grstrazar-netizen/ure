import type { Activity } from '../types'

export const toDateInputValue = (isoDate: string): string => {
  const d = new Date(isoDate)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const toTimeInputValue = (isoDate: string): string => {
  const d = new Date(isoDate)
  const hours = String(d.getHours()).padStart(2, '0')
  const mins = String(d.getMinutes()).padStart(2, '0')
  return `${hours}:${mins}`
}

export const formatTime = (isoDate: string): string =>
  new Date(isoDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export const formatDateLong = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const sameDay = (a: string, b: Date): boolean => {
  const da = new Date(a)
  return (
    da.getFullYear() === b.getFullYear() &&
    da.getMonth() === b.getMonth() &&
    da.getDate() === b.getDate()
  )
}

export const formatDuration = (start: string, end: string | null): string => {
  const startMs = new Date(start).getTime()
  const endMs = end ? new Date(end).getTime() : Date.now()
  const totalMin = Math.max(0, Math.round((endMs - startMs) / 60000))
  const h = Math.floor(totalMin / 60)
  const m = totalMin % 60
  if (h === 0) return `${m} min`
  if (m === 0) return `${h} h`
  return `${h} h ${m} min`
}

export const monthLabel = (year: number, month: number): string =>
  new Date(year, month, 1).toLocaleDateString([], { month: 'long', year: 'numeric' })

export const buildDateTimeFromInput = (date: string, time: string): string =>
  new Date(`${date}T${time}:00`).toISOString()

export const sortActivitiesByStart = (activities: Activity[]): Activity[] =>
  [...activities].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
