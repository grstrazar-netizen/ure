import { formatDateLong } from '../lib/date'
import type { Activity } from '../types'

interface DayHeaderProps {
  now: Date
  runningActivity: Activity | null
  onStop: () => void
}

export function DayHeader({ now, runningActivity, onStop }: DayHeaderProps) {
  return (
    <header className="day-header lined">
      <p className="meta-label">Today</p>
      <h1>{formatDateLong(now.toISOString())}</h1>
      <div className="running-state">
        {runningActivity ? (
          <>
            <p>
              Running: <strong>{runningActivity.description}</strong>
            </p>
            <button type="button" className="text-button" onClick={onStop}>
              Stop current activity
            </button>
          </>
        ) : (
          <p className="muted">No activity currently running.</p>
        )}
      </div>
    </header>
  )
}
