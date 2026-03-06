interface SectionTitleProps {
  title: string
  subtitle?: string
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <header className="section-title lined">
      <h2>{title}</h2>
      {subtitle && <p className="muted">{subtitle}</p>}
    </header>
  )
}
