import SectionTitle from '../components/SectionTitle'
import { classes, formatMMK } from '../data/gymData'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function ClassesPage({ addToCart, getQuantity, removeFromCart }) {
  const toggleClass = (gymClass) => {
    const cartId = `class-${gymClass.id}`
    const active = getQuantity(cartId) > 0

    if (active) {
      removeFromCart(cartId)
      return
    }

    addToCart(
      {
        id: cartId,
        type: 'class',
        name: gymClass.name,
        details: `${gymClass.date} at ${gymClass.time}`,
        price: gymClass.price,
        image: gymClass.image,
      },
      { mode: 'set', quantity: 1 },
    )
  }

  return (
    <section className={cardStyles}>
      <SectionTitle
        title="Gym Classes"
        subtitle="Book yoga, zumba, and weight training classes by date and time."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {classes.map((gymClass) => {
          const cartId = `class-${gymClass.id}`
          const active = getQuantity(cartId) > 0

          return (
            <div
              key={gymClass.id}
              className={`rounded-xl border p-4 text-left transition ${
                active ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <img
                src={gymClass.image}
                alt={`${gymClass.name} class photo`}
                className="h-44 w-full rounded-lg object-cover"
                loading="lazy"
              />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{gymClass.name}</h3>
              <p className="text-sm text-slate-600">Coach: {gymClass.coach}</p>
              <p className="mt-3 text-sm text-slate-700">Date: {gymClass.date}</p>
              <p className="text-sm text-slate-700">Time: {gymClass.time}</p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">{formatMMK(gymClass.price)}</p>
              <button
                type="button"
                onClick={() => toggleClass(gymClass)}
                className={`mt-4 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                  active ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                {active ? 'Remove from Bucket' : 'Reserve Spot'}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ClassesPage
