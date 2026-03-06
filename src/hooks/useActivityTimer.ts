import { useEffect, useMemo, useState } from 'react'
import type { Activity } from '../types'

const HOUR = 60 * 60 * 1000
const MINUTE = 60 * 1000

export function useActivityTimer(activities: Activity[]) {
  const runningActivity = useMemo(
    () => activities.find((activity) => activity.end === null) ?? null,
    [activities],
  )
  const [showReminder, setShowReminder] = useState(false)
  const [reminderBaseMs, setReminderBaseMs] = useState<number | null>(null)

  useEffect(() => {
    if (!runningActivity) {
      setShowReminder(false)
      setReminderBaseMs(null)
      return
    }

    const startedAt = new Date(runningActivity.start).getTime()
    setShowReminder(false)
    setReminderBaseMs(startedAt)
  }, [runningActivity?.id, runningActivity?.start])

  useEffect(() => {
    if (!runningActivity || reminderBaseMs === null) return

    const check = () => {
      if (Date.now() - reminderBaseMs >= HOUR) {
        setShowReminder(true)
      }
    }

    check()
    const id = window.setInterval(check, MINUTE)
    return () => window.clearInterval(id)
  }, [runningActivity, reminderBaseMs])

  const resetReminder = () => {
    setShowReminder(false)
    setReminderBaseMs(Date.now())
  }

  return {
    runningActivity,
    showReminder,
    resetReminder,
  }
}
