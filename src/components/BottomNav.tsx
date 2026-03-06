import type { ViewKey } from '../types'

interface BottomNavProps {
  current: ViewKey
  onChange: (view: ViewKey) => void
}

const items: Array<{ key: ViewKey; label: string }> = [
  { key: 'day', label: 'Day' },
  { key: 'reports', label: 'Reports' },
  { key: 'settings', label: 'Settings' },
]

export function BottomNav({ current, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`bottom-nav__item ${current === item.key ? 'is-active' : ''}`}
          onClick={() => onChange(item.key)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
