import SectionTitle from '../components/SectionTitle'
import { formatMMK, gymInfo, homeGallery, offerings, subscriptions } from '../data/gymData'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function HomePage({ addToCart, getQuantity }) {
  const scrollToSubscriptions = () => {
    const section = document.getElementById('home-subscriptions')
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
    <div className="space-y-8">
      <section className="rounded-3xl border border-orange-200 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-6 text-white md:p-10">
        <p className="text-sm font-medium uppercase tracking-widest text-orange-100">Welcome to</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">{gymInfo.name}</h1>
        <p className="mt-4 max-w-3xl text-sm text-orange-50 md:text-base">{gymInfo.tagline}</p>
        <p className="mt-3 max-w-3xl text-sm text-orange-100 md:text-base">{gymInfo.description}</p>

        <button
          type="button"
          onClick={scrollToSubscriptions}
          className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
        >
          Go to Subscriptions
        </button>
      </section>

      <section id="home-subscriptions" className={cardStyles}>
        <SectionTitle title="Gym Subscriptions" subtitle="Choose monthly or yearly plan directly from Home." />
        <div className="grid gap-4 md:grid-cols-2">
          {subscriptions.map((plan) => {
            const cartId = `subscription-${plan.id}`
            const active = getQuantity(cartId) > 0

            return (
              <div
                key={plan.id}
                className={`rounded-xl border p-4 text-left transition ${
                  active ? 'border-orange-400 bg-orange-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                }`}
              >
                <img
                  src={plan.image}
                  alt={`${plan.title} photo`}
                  className="h-44 w-full rounded-lg object-cover"
                  loading="lazy"
                />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{plan.title}</h3>
                <p className="mt-1 text-2xl font-bold text-orange-600">
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
                    active ? 'bg-orange-600 hover:bg-orange-500' : 'bg-orange-500 hover:bg-orange-400'
                  }`}
                >
                  {active ? 'Added to Bucket' : `Subscribe ${plan.title.includes('Monthly') ? 'Monthly' : 'Yearly'}`}
                </button>
              </div>
            )
          })}
        </div>
      </section>

      <section className={cardStyles}>
        <SectionTitle title="Gym Photos" subtitle="Take a look at our gym environment and training vibe." />
        <div className="grid gap-4 md:grid-cols-3">
          {homeGallery.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              alt={`Gym photo ${index + 1}`}
              className="h-52 w-full rounded-xl object-cover"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className={cardStyles}>
        <SectionTitle title="What We Are Offering" subtitle="Everything you need in one fitness platform." />
        <div className="grid gap-4 md:grid-cols-2">
          {offerings.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className={cardStyles}>
          <SectionTitle title="Contact Us" subtitle="Reach out for membership, class, and trainer support." />
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Phone:</span> {gymInfo.phone}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Email:</span> {gymInfo.email}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Address:</span> {gymInfo.address}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Open:</span> 6:00 AM - 10:00 PM (Daily)
            </p>
          </div>
        </div>

        <div className={cardStyles}>
          <SectionTitle title="Google Maps Location" subtitle="Find us quickly with live map direction." />
          <iframe
            title="Iron Pulse Fitness Location"
            src="https://www.google.com/maps?q=Yangon+Myanmar&output=embed"
            className="h-72 w-full rounded-xl border border-slate-200"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  )
}

export default HomePage
