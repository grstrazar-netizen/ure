interface InlineSelectOption {
  id: string
  name: string
}

interface InlineSelectProps {
  label: string
  value: string | null
  options: InlineSelectOption[]
  onChange: (value: string | null) => void
}

export function InlineSelect({ label, value, options, onChange }: InlineSelectProps) {
  return (
    <label className="inline-field">
      <span>{label}</span>
      <select value={value ?? ''} onChange={(e) => onChange(e.target.value || null)}>
        <option value="">—</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  )
}
