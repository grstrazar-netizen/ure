import { useEffect, useMemo, useState } from 'react'
import type { Activity } from '../types'

const HOUR = 60 * 60 * 1000

export function useActivityTimer(activities: Activity[]) {
  const runningActivity = useMemo(
    () => activities.find((activity) => activity.end === null) ?? null,
    [activities],
  )
  const [showReminder, setShowReminder] = useState(false)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!runningActivity) {
      setShowReminder(false)
      return
    }

    const startedAt = new Date(runningActivity.start).getTime()
    const check = () => {
      if (Date.now() - startedAt >= HOUR) {
        setShowReminder(true)
      }
      setTick((v) => v + 1)
    }

    check()
    const id = window.setInterval(check, 60 * 1000)
    return () => window.clearInterval(id)
  }, [runningActivity])

  const resetReminder = () => {
    setShowReminder(false)
  }

  return {
    runningActivity,
    showReminder,
    resetReminder,
    tick,
  }
}
