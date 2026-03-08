import SectionTitle from '../components/SectionTitle'
import { formatMMK, trainers } from '../data/gymData'

const cardStyles = 'rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'

function TrainersPage({ addToCart, getQuantity }) {
  const selectTrainerOffer = (trainer, planType) => {
    const isPartTime = planType === 'part-time'
    const offerId = `trainer-${trainer.id}-${planType}`

    addToCart(
      {
        id: offerId,
        type: 'trainer',
        name: `${trainer.name} (${isPartTime ? 'Part-time' : 'Monthly'})`,
        details: trainer.specialty,
        price: isPartTime ? trainer.partTimePrice : trainer.monthlyPrice,
        image: trainer.image,
      },
      { mode: 'set', quantity: 1, replaceType: 'trainer' },
    )
  }

  return (
    <section className={cardStyles}>
      <SectionTitle
        title="Hire a Personal Trainer"
        subtitle="Compare part-time session rates and monthly coaching packages."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {trainers.map((trainer) => {
          const partTimeId = `trainer-${trainer.id}-part-time`
          const monthlyId = `trainer-${trainer.id}-monthly`
          const isPartTimeActive = getQuantity(partTimeId) > 0
          const isMonthlyActive = getQuantity(monthlyId) > 0

          return (
            <div
              key={trainer.id}
              className={`rounded-xl border p-4 text-left transition ${
                isPartTimeActive || isMonthlyActive
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              <img
                src={trainer.image}
                alt={`${trainer.name} photo`}
                className="h-44 w-full rounded-lg object-cover"
                loading="lazy"
              />
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{trainer.name}</h3>
              <p className="text-sm text-slate-600">{trainer.specialty}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <p>
                  Part-time session:{' '}
                  <span className="font-semibold text-blue-700">{formatMMK(trainer.partTimePrice)}</span>
                </p>
                <p>
                  Monthly package:{' '}
                  <span className="font-semibold text-blue-700">{formatMMK(trainer.monthlyPrice)}</span>
                </p>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => selectTrainerOffer(trainer, 'part-time')}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                    isPartTimeActive ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {isPartTimeActive ? 'Added to Bucket' : 'Hire Part-time'}
                </button>
                <button
                  type="button"
                  onClick={() => selectTrainerOffer(trainer, 'monthly')}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold text-white transition ${
                    isMonthlyActive ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-500'
                  }`}
                >
                  {isMonthlyActive ? 'Added to Bucket' : 'Hire Monthly'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TrainersPage
