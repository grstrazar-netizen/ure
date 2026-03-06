export type ViewKey = 'day' | 'reports' | 'settings'

export interface Activity {
  id: string
  description: string
  clientId: string | null
  categoryId: string | null
  start: string
  end: string | null
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
}

export interface Category {
  id: string
  name: string
}

export interface Template {
  id: string
  label: string
  text: string
}

export interface WorkJournalData {
  activities: Activity[]
  clients: Client[]
  categories: Category[]
  templates: Template[]
}
