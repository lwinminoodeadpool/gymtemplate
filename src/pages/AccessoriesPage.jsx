import SectionTitle from '../components/SectionTitle'
import { accessories, formatMMK } from '../data/gymData'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function AccessoriesPage({ addToCart, getQuantity }) {
  const addAccessory = (item) => {
    addToCart(
      {
        id: `accessory-${item.id}`,
        type: 'accessory',
        name: item.name,
        details: item.category,
        price: item.price,
        image: item.image,
      },
      { quantity: 1 },
    )
  }

  return (
    <section className={cardStyles}>
      <SectionTitle title="Gym Accessories Store" subtitle="Buy protein and other fitness essentials." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {accessories.map((item) => {
          const quantity = getQuantity(`accessory-${item.id}`)

          return (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <img
                src={item.image}
                alt={`${item.name} photo`}
                className="h-36 w-full rounded-lg object-cover"
                loading="lazy"
              />
              <p className="mt-3 text-xs uppercase tracking-wide text-orange-600">{item.category}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-2 text-lg font-bold text-orange-700">{formatMMK(item.price)}</p>
              <button
                type="button"
                onClick={() => addAccessory(item)}
                className="mt-3 w-full rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                Add to Bucket
              </button>
              <p className="mt-2 text-xs text-slate-600">In bucket: {quantity}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AccessoriesPage
