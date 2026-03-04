function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
    </div>
  )
}

export default SectionTitle
