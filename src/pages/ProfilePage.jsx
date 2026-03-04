import SectionTitle from '../components/SectionTitle'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function ProfilePage() {
  return (
    <section className={cardStyles}>
      <SectionTitle title="Profile" subtitle="Manage your gym account and membership details." />

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <img
            src="https://picsum.photos/id/1001/220/220"
            alt="Member profile"
            className="h-16 w-16 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Aung Gym Member</h3>
            <p className="text-sm text-slate-600">Membership: Yearly Plan</p>
            <p className="text-sm text-slate-600">Current Goal: Strength + Fat Loss</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Manage Profile
        </button>
      </div>
    </section>
  )
}

export default ProfilePage
