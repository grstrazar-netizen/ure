import { useState, type ReactNode } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import type { Category, Client, Template } from '../types'

interface SettingsViewProps {
  clients: Client[]
  categories: Category[]
  templates: Template[]
  onAddClient: (name: string) => void
  onRenameClient: (id: string, name: string) => void
  onDeleteClient: (id: string) => void
  onAddCategory: (name: string) => void
  onRenameCategory: (id: string, name: string) => void
  onDeleteCategory: (id: string) => void
  onAddTemplate: (label: string, text: string) => void
  onRenameTemplate: (id: string, label: string, text: string) => void
  onDeleteTemplate: (id: string) => void
}

interface EditableListProps<T> {
  title: string
  items: T[]
  render: (item: T) => ReactNode
}

function EditableList<T>({ title, items, render }: EditableListProps<T>) {
  return (
    <section className="settings-block lined">
      <h3>{title}</h3>
      <div className="settings-list">{items.map(render)}</div>
    </section>
  )
}

export function SettingsView(props: SettingsViewProps) {
  const [newClient, setNewClient] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newTemplateLabel, setNewTemplateLabel] = useState('')
  const [newTemplateText, setNewTemplateText] = useState('')

  return (
    <section className="page">
      <SectionTitle title="Settings" subtitle="Manage clients, categories and templates." />

      <EditableList
        title="Clients"
        items={props.clients}
        render={(client) => (
          <InlineRenameItem
            key={client.id}
            name={client.name}
            onSave={(name) => props.onRenameClient(client.id, name)}
            onDelete={() => props.onDeleteClient(client.id)}
          />
        )}
      />
      <AddLine
        placeholder="Add client"
        value={newClient}
        onChange={setNewClient}
        onAdd={() => {
          if (!newClient.trim()) return
          props.onAddClient(newClient.trim())
          setNewClient('')
        }}
      />

      <EditableList
        title="Categories"
        items={props.categories}
        render={(category) => (
          <InlineRenameItem
            key={category.id}
            name={category.name}
            onSave={(name) => props.onRenameCategory(category.id, name)}
            onDelete={() => props.onDeleteCategory(category.id)}
          />
        )}
      />
      <AddLine
        placeholder="Add category"
        value={newCategory}
        onChange={setNewCategory}
        onAdd={() => {
          if (!newCategory.trim()) return
          props.onAddCategory(newCategory.trim())
          setNewCategory('')
        }}
      />

      <EditableList
        title="Description templates"
        items={props.templates}
        render={(template) => (
          <InlineTemplateItem
            key={template.id}
            label={template.label}
            text={template.text}
            onSave={(label, text) => props.onRenameTemplate(template.id, label, text)}
            onDelete={() => props.onDeleteTemplate(template.id)}
          />
        )}
      />

      <div className="add-template lined">
        <input
          placeholder="Template label"
          value={newTemplateLabel}
          onChange={(e) => setNewTemplateLabel(e.target.value)}
        />
        <input
          placeholder="Template text"
          value={newTemplateText}
          onChange={(e) => setNewTemplateText(e.target.value)}
        />
        <button
          type="button"
          className="text-button"
          onClick={() => {
            if (!newTemplateLabel.trim() || !newTemplateText.trim()) return
            props.onAddTemplate(newTemplateLabel.trim(), newTemplateText.trim())
            setNewTemplateLabel('')
            setNewTemplateText('')
          }}
        >
          Add
        </button>
      </div>
    </section>
  )
}

function AddLine({
  placeholder,
  value,
  onChange,
  onAdd,
}: {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onAdd: () => void
}) {
  return (
    <div className="add-line lined">
      <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      <button type="button" className="text-button" onClick={onAdd}>
        Add
      </button>
    </div>
  )
}

function InlineRenameItem({
  name,
  onSave,
  onDelete,
}: {
  name: string
  onSave: (name: string) => void
  onDelete: () => void
}) {
  const [value, setValue] = useState(name)
  return (
    <div className="editable-row">
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button type="button" className="text-button" onClick={() => onSave(value.trim() || name)}>
        Save
      </button>
      <button type="button" className="text-button danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}

function InlineTemplateItem({
  label,
  text,
  onSave,
  onDelete,
}: {
  label: string
  text: string
  onSave: (label: string, text: string) => void
  onDelete: () => void
}) {
  const [currentLabel, setCurrentLabel] = useState(label)
  const [currentText, setCurrentText] = useState(text)

  return (
    <div className="editable-row editable-row--template">
      <input value={currentLabel} onChange={(e) => setCurrentLabel(e.target.value)} />
      <input value={currentText} onChange={(e) => setCurrentText(e.target.value)} />
      <button type="button" className="text-button" onClick={() => onSave(currentLabel, currentText)}>
        Save
      </button>
      <button type="button" className="text-button danger" onClick={onDelete}>
        Delete
      </button>
    </div>
  )
}
