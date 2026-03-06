import type { WorkJournalData } from '../types'

const now = new Date()
const currentYear = now.getFullYear()
const currentMonth = now.getMonth()
const pad = (n: number) => String(n).padStart(2, '0')
const iso = (day: number, hour: number, minute: number) =>
  `${currentYear}-${pad(currentMonth + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}:00.000Z`

export const seedData: WorkJournalData = {
  clients: [
    { id: 'client-center-rog', name: 'Center Rog' },
    { id: 'client-spoifab', name: 'Spoifab' },
    { id: 'client-other', name: 'Other' },
  ],
  categories: [
    { id: 'category-production', name: 'Production' },
    { id: 'category-meetings', name: 'Meetings' },
    { id: 'category-admin', name: 'Admin' },
    { id: 'category-design', name: 'Design' },
    { id: 'category-prep', name: 'Preparation' },
  ],
  templates: [
    { id: 'template-1', label: 'Daily standup', text: 'Daily standup with team' },
    { id: 'template-2', label: 'Client call', text: 'Phone call with client' },
    { id: 'template-3', label: 'Prep', text: 'Preparing workshop material' },
  ],
  activities: [
    {
      id: 'activity-1',
      description: 'Preparing workshop material',
      clientId: 'client-center-rog',
      categoryId: 'category-prep',
      start: iso(2, 9, 0),
      end: iso(2, 10, 30),
      createdAt: iso(2, 9, 0),
      updatedAt: iso(2, 10, 30),
    },
    {
      id: 'activity-2',
      description: 'Phone call with supplier',
      clientId: 'client-spoifab',
      categoryId: 'category-admin',
      start: iso(2, 10, 30),
      end: iso(2, 11, 15),
      createdAt: iso(2, 10, 30),
      updatedAt: iso(2, 11, 15),
    },
    {
      id: 'activity-3',
      description: 'Design review for campaign assets',
      clientId: 'client-other',
      categoryId: 'category-design',
      start: iso(3, 13, 0),
      end: iso(3, 15, 0),
      createdAt: iso(3, 13, 0),
      updatedAt: iso(3, 15, 0),
    },
  ],
}
