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
        activity.id === runningActivity.id ? activityOps.update(activity, { end: new Date().toISOString() }) : activity,
      ),
    }))
  }

  const startActivity = (input: { description: string; clientId: string | null; categoryId: string | null }) => {
    const now = new Date().toISOString()
    setData((prev) => ({
      ...prev,
      activities: [
        ...activityOps.stopRunning(prev.activities, now),
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
      activities: activityOps.delete(prev.activities, id),
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
              clients: listOps.renameClient(prev.clients, id, name),
            }))
          }
          onDeleteClient={(id) =>
            setData((prev) => ({
              ...prev,
              clients: listOps.deleteClient(prev.clients, id),
              activities: listOps.clearClientFromActivities(prev.activities, id),
            }))
          }
          onAddCategory={(name) =>
            setData((prev) => ({ ...prev, categories: [...prev.categories, listOps.createCategory(name)] }))
          }
          onRenameCategory={(id, name) =>
            setData((prev) => ({
              ...prev,
              categories: listOps.renameCategory(prev.categories, id, name),
            }))
          }
          onDeleteCategory={(id) =>
            setData((prev) => ({
              ...prev,
              categories: listOps.deleteCategory(prev.categories, id),
              activities: listOps.clearCategoryFromActivities(prev.activities, id),
            }))
          }
          onAddTemplate={(label, text) =>
            setData((prev) => ({ ...prev, templates: [...prev.templates, listOps.createTemplate(label, text)] }))
          }
          onRenameTemplate={(id, label, text) =>
            setData((prev) => ({
              ...prev,
              templates: listOps.renameTemplate(prev.templates, id, label, text),
            }))
          }
          onDeleteTemplate={(id) =>
            setData((prev) => ({
              ...prev,
              templates: listOps.deleteTemplate(prev.templates, id),
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
