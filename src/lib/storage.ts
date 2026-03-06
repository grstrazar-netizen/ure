import { seedData } from '../data/seed'
import type { Activity, Category, Client, Template, WorkJournalData } from '../types'

const STORAGE_KEY = 'work-journal:v1'

const cloneSeed = (): WorkJournalData => JSON.parse(JSON.stringify(seedData))

export const loadData = (): WorkJournalData => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return cloneSeed()

  try {
    const parsed = JSON.parse(raw) as WorkJournalData
    return {
      activities: parsed.activities ?? [],
      clients: parsed.clients ?? [],
      categories: parsed.categories ?? [],
      templates: parsed.templates ?? [],
    }
  } catch {
    return cloneSeed()
  }
}

export const saveData = (data: WorkJournalData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const activityOps = {
  create(input: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Activity {
    const now = new Date().toISOString()
    return { ...input, id: uid(), createdAt: now, updatedAt: now }
  },
  update(activity: Activity, patch: Partial<Activity>): Activity {
    return { ...activity, ...patch, updatedAt: new Date().toISOString() }
  },
  stopRunning(activities: Activity[], endedAt: string): Activity[] {
    return activities.map((activity) =>
      activity.end === null ? activityOps.update(activity, { end: endedAt }) : activity,
    )
  },
  delete(activities: Activity[], id: string): Activity[] {
    return activities.filter((activity) => activity.id !== id)
  },
}

export const listOps = {
  createClient(name: string): Client {
    return { id: uid(), name }
  },
  renameClient(clients: Client[], id: string, name: string): Client[] {
    return clients.map((item) => (item.id === id ? { ...item, name } : item))
  },
  deleteClient(clients: Client[], id: string): Client[] {
    return clients.filter((item) => item.id !== id)
  },
  clearClientFromActivities(activities: Activity[], id: string): Activity[] {
    return activities.map((activity) => (activity.clientId === id ? { ...activity, clientId: null } : activity))
  },

  createCategory(name: string): Category {
    return { id: uid(), name }
  },
  renameCategory(categories: Category[], id: string, name: string): Category[] {
    return categories.map((item) => (item.id === id ? { ...item, name } : item))
  },
  deleteCategory(categories: Category[], id: string): Category[] {
    return categories.filter((item) => item.id !== id)
  },
  clearCategoryFromActivities(activities: Activity[], id: string): Activity[] {
    return activities.map((activity) =>
      activity.categoryId === id ? { ...activity, categoryId: null } : activity,
    )
  },

  createTemplate(label: string, text: string): Template {
    return { id: uid(), label, text }
  },
  renameTemplate(templates: Template[], id: string, label: string, text: string): Template[] {
    return templates.map((item) => (item.id === id ? { ...item, label, text } : item))
  },
  deleteTemplate(templates: Template[], id: string): Template[] {
    return templates.filter((item) => item.id !== id)
  },
}
