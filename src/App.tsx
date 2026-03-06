import { useMemo, useRef, useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { useActivityTimer } from './hooks/useActivityTimer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { activityOps, listOps, loadData, saveData } from './lib/storage'
import type { Activity, ViewKey } from './types'
import { DayView } from './views/DayView'
import { ReportsView } from './views/ReportsView'
import { SettingsView } from './views/SettingsView'

function App() {
  const [view, setView] = useState<ViewKey>('day')
  const [data, setData] = useLocalStorage(loadData, saveData)
  const composerInputRef = useRef<HTMLInputElement>(null)

  const { runningActivity, showReminder, resetReminder } = useActivityTimer(data.activities)

  const stopCurrentActivity = () => {
    if (!runningActivity) return
    setData((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === runningActivity.id
          ? activityOps.update(activity, { end: new Date().toISOString() })
          : activity,
      ),
    }))
  }

  const startActivity = (input: { description: string; clientId: string | null; categoryId: string | null }) => {
    const now = new Date().toISOString()
    setData((prev) => ({
      ...prev,
      activities: [
        ...prev.activities.map((activity) =>
          activity.end === null ? activityOps.update(activity, { end: now }) : activity,
        ),
        activityOps.create({
          description: input.description,
          clientId: input.clientId,
          categoryId: input.categoryId,
          start: now,
          end: null,
        }),
      ],
    }))
  }

  const updateActivity = (id: string, patch: Partial<Activity>) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === id ? activityOps.update(activity, patch) : activity,
      ),
    }))
  }

  const deleteActivity = (id: string) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.filter((activity) => activity.id !== id),
    }))
  }

  const content = useMemo(() => {
    if (view === 'reports') {
      return <ReportsView activities={data.activities} clients={data.clients} categories={data.categories} />
    }

    if (view === 'settings') {
      return (
        <SettingsView
          clients={data.clients}
          categories={data.categories}
          templates={data.templates}
          onAddClient={(name) => setData((prev) => ({ ...prev, clients: [...prev.clients, listOps.createClient(name)] }))}
          onRenameClient={(id, name) =>
            setData((prev) => ({
              ...prev,
              clients: prev.clients.map((item) => (item.id === id ? { ...item, name } : item)),
            }))
          }
          onDeleteClient={(id) =>
            setData((prev) => ({
              ...prev,
              clients: prev.clients.filter((item) => item.id !== id),
              activities: prev.activities.map((activity) =>
                activity.clientId === id ? { ...activity, clientId: null } : activity,
              ),
            }))
          }
          onAddCategory={(name) =>
            setData((prev) => ({ ...prev, categories: [...prev.categories, listOps.createCategory(name)] }))
          }
          onRenameCategory={(id, name) =>
            setData((prev) => ({
              ...prev,
              categories: prev.categories.map((item) => (item.id === id ? { ...item, name } : item)),
            }))
          }
          onDeleteCategory={(id) =>
            setData((prev) => ({
              ...prev,
              categories: prev.categories.filter((item) => item.id !== id),
              activities: prev.activities.map((activity) =>
                activity.categoryId === id ? { ...activity, categoryId: null } : activity,
              ),
            }))
          }
          onAddTemplate={(label, text) =>
            setData((prev) => ({ ...prev, templates: [...prev.templates, listOps.createTemplate(label, text)] }))
          }
          onRenameTemplate={(id, label, text) =>
            setData((prev) => ({
              ...prev,
              templates: prev.templates.map((item) => (item.id === id ? { ...item, label, text } : item)),
            }))
          }
          onDeleteTemplate={(id) =>
            setData((prev) => ({
              ...prev,
              templates: prev.templates.filter((item) => item.id !== id),
            }))
          }
        />
      )
    }

    return (
      <DayView
        activities={data.activities}
        clients={data.clients}
        categories={data.categories}
        templates={data.templates}
        runningActivity={runningActivity}
        onStartActivity={startActivity}
        onStopActivity={stopCurrentActivity}
        onUpdateActivity={updateActivity}
        onDeleteActivity={deleteActivity}
        composerInputRef={composerInputRef}
      />
    )
  }, [data, runningActivity, view])

  return (
    <div className="app-shell">
      {showReminder && runningActivity && (
        <div className="reminder-banner">
          <span>Still working on “{runningActivity.description}”?</span>
          <button type="button" className="text-button" onClick={resetReminder}>
            Yes
          </button>
          <button
            type="button"
            className="text-button"
            onClick={() => {
              stopCurrentActivity()
              resetReminder()
              composerInputRef.current?.focus()
            }}
          >
            No, stop
          </button>
        </div>
      )}

      <main>{content}</main>
      <BottomNav current={view} onChange={setView} />
    </div>
  )
}

export default App
