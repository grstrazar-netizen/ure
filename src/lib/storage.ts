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

const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const activityOps = {
  create(input: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Activity {
    const now = new Date().toISOString()
    return { ...input, id: uid(), createdAt: now, updatedAt: now }
  },
  update(activity: Activity, patch: Partial<Activity>): Activity {
    return { ...activity, ...patch, updatedAt: new Date().toISOString() }
  },
}

export const listOps = {
  createClient(name: string): Client {
    return { id: uid(), name }
  },
  createCategory(name: string): Category {
    return { id: uid(), name }
  },
  createTemplate(label: string, text: string): Template {
    return { id: uid(), label, text }
  },
}
