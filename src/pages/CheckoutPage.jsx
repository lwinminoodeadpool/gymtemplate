import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { formatMMK } from '../data/gymData'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function CheckoutPage({ cartEntries, cartTotal, updateItemQuantity, removeFromCart }) {
  if (cartEntries.length === 0) {
    return (
      <section className={cardStyles}>
        <SectionTitle title="Checkout" subtitle="Your bucket is empty. Add items from gym pages first." />
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm text-slate-600">Go to subscriptions, trainers, classes, or accessories and add items.</p>
          <Link
            to="/subscriptions"
            className="mt-4 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            Browse Subscriptions
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className={cardStyles}>
      <SectionTitle title="Checkout" subtitle="Review your bucket and update quantities before payment." />

      <div className="space-y-4">
        {cartEntries.map((item) => (
          <article
            key={item.id}
            className="grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[110px_1fr_auto] sm:items-center"
          >
            <img
              src={item.image || 'https://picsum.photos/seed/gym-default/300/300'}
              alt={`${item.name} photo`}
              className="h-24 w-full rounded-lg object-cover"
              loading="lazy"
            />

            <div>
              <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.details}</p>
              <p className="mt-2 text-sm font-semibold text-orange-700">{formatMMK(item.price)} each</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                  className="h-8 w-8 rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold text-slate-800">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8 rounded-md border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <p className="text-sm font-semibold text-slate-900">{formatMMK(item.price * item.quantity)}</p>

              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">Grand Total</p>
          <p className="text-2xl font-bold text-orange-700">{formatMMK(cartTotal)}</p>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 sm:w-auto"
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  )
}

export default CheckoutPage
