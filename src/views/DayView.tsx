import { useMemo, type RefObject } from 'react'
import { ActivityComposer } from '../components/ActivityComposer'
import { ActivityRow } from '../components/ActivityRow'
import { DayHeader } from '../components/DayHeader'
import { sortActivitiesByStart, sameDay } from '../lib/date'
import type { Activity, Category, Client, Template } from '../types'

interface DayViewProps {
  activities: Activity[]
  clients: Client[]
  categories: Category[]
  templates: Template[]
  runningActivity: Activity | null
  onStartActivity: (input: { description: string; clientId: string | null; categoryId: string | null }) => void
  onStopActivity: () => void
  onUpdateActivity: (id: string, patch: Partial<Activity>) => void
  onDeleteActivity: (id: string) => void
  composerInputRef: RefObject<HTMLInputElement>
}

export function DayView({
  activities,
  clients,
  categories,
  templates,
  runningActivity,
  onStartActivity,
  onStopActivity,
  onUpdateActivity,
  onDeleteActivity,
  composerInputRef,
}: DayViewProps) {
  const today = new Date()
  const todayActivities = useMemo(
    () => sortActivitiesByStart(activities).filter((activity) => sameDay(activity.start, today)),
    [activities],
  )
  const recentDescriptions = useMemo(
    () => sortActivitiesByStart(activities).map((a) => a.description).reverse(),
    [activities],
  )

  return (
    <section className="page page-day">
      <DayHeader now={today} runningActivity={runningActivity} onStop={onStopActivity} />
      <ActivityComposer
        clients={clients}
        categories={categories}
        templates={templates}
        recentDescriptions={recentDescriptions}
        onStart={onStartActivity}
        inputRef={composerInputRef}
      />
      <section className="timeline">
        {todayActivities.length === 0 ? (
          <p className="muted empty">No entries yet today.</p>
        ) : (
          todayActivities.map((activity) => (
            <ActivityRow
              key={activity.id}
              activity={activity}
              clients={clients}
              categories={categories}
              onUpdate={onUpdateActivity}
              onDelete={onDeleteActivity}
            />
          ))
        )}
      </section>
    </section>
  )
}
