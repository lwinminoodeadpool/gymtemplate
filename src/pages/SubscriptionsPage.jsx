import SectionTitle from '../components/SectionTitle'
import { formatMMK, subscriptions } from '../data/gymData'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function SubscriptionsPage({ addToCart, getQuantity }) {
  const handleSubscribe = (plan) => {
    addToCart(
      {
        id: `subscription-${plan.id}`,
        type: 'subscription',
        name: plan.title,
        details: plan.period,
        price: plan.price,
        image: plan.image,
      },
      { mode: 'set', quantity: 1, replaceType: 'subscription' },
    )
  }

  return (
    <section className={cardStyles}>
      <SectionTitle title="Choose a Subscription" subtitle="Pick your monthly or yearly gym plan." />
      <div className="grid gap-4 md:grid-cols-2">
        {subscriptions.map((plan) => {
          const cartId = `subscription-${plan.id}`
          const active = getQuantity(cartId) > 0

          return (
            <div
              key={plan.id}
              className={`rounded-xl border p-4 text-left transition ${
                active ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <img
                src={plan.image}
                alt={`${plan.title} photo`}
                className="h-44 w-full rounded-lg object-cover"
                loading="lazy"
              />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{plan.title}</h3>
              <p className="mt-1 text-2xl font-bold text-blue-600">
                {formatMMK(plan.price)} <span className="text-sm text-slate-600">{plan.period}</span>
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {plan.perks.map((perk) => (
                  <li key={perk}>- {perk}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleSubscribe(plan)}
                className={`mt-4 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                  active ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'
                }`}
              >
                {active ? 'Added to Bucket' : `Subscribe ${plan.title.includes('Monthly') ? 'Monthly' : 'Yearly'}`}
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default SubscriptionsPage
