import { useMemo, useState } from 'react'

const sideNavItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'subscriptions', label: 'Subscriptions' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'classes', label: 'Gym Classes' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'orders', label: 'Orders' },
  { id: 'settings', label: 'Gym Settings' },
]

const statusOptions = ['active', 'inactive']

const createId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`
const formatMMK = (value) => `${Number(value || 0).toLocaleString()} MMK`

const initialSettings = {
  gymName: 'Iron Pulse Fitness',
  logoUrl: 'https://picsum.photos/id/1069/120/120',
  email: 'hello@ironpulsefitness.com',
  phone: '+95 9 123 456 789',
  address: 'No. 221, Bogyoke Road, Yangon, Myanmar',
  about: 'Modern gym equipment, expert coaching, and classes for all levels.',
  mapEmbedUrl: 'https://www.google.com/maps?q=Yangon+Myanmar&output=embed',
}

const initialSubscriptions = [
  { id: 'sub-monthly', title: 'Monthly Membership', price: 120000, period: 'month', status: 'active' },
  { id: 'sub-yearly', title: 'Yearly Membership', price: 1200000, period: 'year', status: 'active' },
]

const initialTrainers = [
  {
    id: 'trainer-emma',
    name: 'Emma Blake',
    specialty: 'Strength & Fat Loss',
    partTimePrice: 50000,
    monthlyPrice: 350000,
    status: 'active',
  },
  {
    id: 'trainer-jordan',
    name: 'Jordan Lee',
    specialty: 'Athletic Performance',
    partTimePrice: 65000,
    monthlyPrice: 450000,
    status: 'active',
  },
]

const initialClasses = [
  {
    id: 'class-yoga',
    name: 'Yoga Flow',
    coach: 'Maya',
    date: '2026-03-03',
    time: '07:00',
    capacity: 20,
    price: 30000,
    status: 'active',
  },
  {
    id: 'class-zumba',
    name: 'Zumba Blast',
    coach: 'Carla',
    date: '2026-03-04',
    time: '18:00',
    capacity: 24,
    price: 35000,
    status: 'active',
  },
]

const initialAccessories = [
  {
    id: 'acc-whey',
    name: 'Whey Protein (2lb)',
    category: 'Nutrition',
    stock: 50,
    price: 85000,
    status: 'active',
  },
  {
    id: 'acc-shaker',
    name: 'Steel Shaker Bottle',
    category: 'Gear',
    stock: 120,
    price: 25000,
    status: 'active',
  },
]

const initialOrders = [
  {
    id: 'ord-001',
    customer: 'Aung Ko',
    itemType: 'Subscription',
    total: 120000,
    paymentMethod: 'KBZ Pay',
    status: 'pending',
    createdAt: '2026-02-25',
  },
  {
    id: 'ord-002',
    customer: 'May Thu',
    itemType: 'Accessories',
    total: 110000,
    paymentMethod: 'Cash',
    status: 'paid',
    createdAt: '2026-02-26',
  },
]

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-blue-100">{subtitle}</p>
    </div>
  )
}

function StatCard({ label, value, helper }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </article>
  )
}

function FieldLabel({ children }) {
  return <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">{children}</label>
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const [settings, setSettings] = useState(initialSettings)
  const [settingsForm, setSettingsForm] = useState(initialSettings)

  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [trainers, setTrainers] = useState(initialTrainers)
  const [classes, setClasses] = useState(initialClasses)
  const [accessories, setAccessories] = useState(initialAccessories)
  const [orders, setOrders] = useState(initialOrders)

  const [subscriptionForm, setSubscriptionForm] = useState({
    id: '',
    title: '',
    price: '',
    period: 'month',
    status: 'active',
  })

  const [trainerForm, setTrainerForm] = useState({
    id: '',
    name: '',
    specialty: '',
    partTimePrice: '',
    monthlyPrice: '',
    status: 'active',
  })

  const [classForm, setClassForm] = useState({
    id: '',
    name: '',
    coach: '',
    date: '',
    time: '',
    capacity: '',
    price: '',
    status: 'active',
  })

  const [accessoryForm, setAccessoryForm] = useState({
    id: '',
    name: '',
    category: '',
    stock: '',
    price: '',
    status: 'active',
  })

  const [orderForm, setOrderForm] = useState({
    id: '',
    customer: '',
    itemType: 'Subscription',
    total: '',
    paymentMethod: 'Cash',
    status: 'pending',
    createdAt: '',
  })

  const dashboardStats = useMemo(() => {
    const activeSubscriptions = subscriptions.filter((item) => item.status === 'active').length
    const activeTrainers = trainers.filter((item) => item.status === 'active').length
    const activeClasses = classes.filter((item) => item.status === 'active').length
    const lowStockItems = accessories.filter((item) => Number(item.stock) < 20).length
    const pendingOrders = orders.filter((item) => item.status === 'pending').length

    const estimatedMonthlyRevenue =
      subscriptions.reduce((sum, item) => {
        if (item.status !== 'active') return sum
        if (item.period === 'month') return sum + Number(item.price)
        return sum + Number(item.price) / 12
      }, 0) +
      trainers.reduce((sum, item) => (item.status === 'active' ? sum + Number(item.monthlyPrice) : sum), 0)

    return {
      activeSubscriptions,
      activeTrainers,
      activeClasses,
      lowStockItems,
      pendingOrders,
      estimatedMonthlyRevenue,
    }
  }, [subscriptions, trainers, classes, accessories, orders])

  const resetSubscriptionForm = () =>
    setSubscriptionForm({ id: '', title: '', price: '', period: 'month', status: 'active' })
  const resetTrainerForm = () =>
    setTrainerForm({
      id: '',
      name: '',
      specialty: '',
      partTimePrice: '',
      monthlyPrice: '',
      status: 'active',
    })
  const resetClassForm = () =>
    setClassForm({
      id: '',
      name: '',
      coach: '',
      date: '',
      time: '',
      capacity: '',
      price: '',
      status: 'active',
    })
  const resetAccessoryForm = () =>
    setAccessoryForm({ id: '', name: '', category: '', stock: '', price: '', status: 'active' })
  const resetOrderForm = () =>
    setOrderForm({
      id: '',
      customer: '',
      itemType: 'Subscription',
      total: '',
      paymentMethod: 'Cash',
      status: 'pending',
      createdAt: '',
    })

  const handleSaveSubscription = (event) => {
    event.preventDefault()

    const payload = {
      id: subscriptionForm.id || createId('sub'),
      title: subscriptionForm.title.trim(),
      price: Number(subscriptionForm.price),
      period: subscriptionForm.period,
      status: subscriptionForm.status,
    }

    if (!payload.title || !payload.price) return

    setSubscriptions((prev) => {
      const exists = prev.some((item) => item.id === payload.id)
      if (exists) return prev.map((item) => (item.id === payload.id ? payload : item))
      return [payload, ...prev]
    })

    resetSubscriptionForm()
  }

  const handleDeleteSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((item) => item.id !== id))
    if (subscriptionForm.id === id) resetSubscriptionForm()
  }

  const handleSaveTrainer = (event) => {
    event.preventDefault()

    const payload = {
      id: trainerForm.id || createId('trainer'),
      name: trainerForm.name.trim(),
      specialty: trainerForm.specialty.trim(),
      partTimePrice: Number(trainerForm.partTimePrice),
      monthlyPrice: Number(trainerForm.monthlyPrice),
      status: trainerForm.status,
    }

    if (!payload.name || !payload.specialty || !payload.partTimePrice || !payload.monthlyPrice) return

    setTrainers((prev) => {
      const exists = prev.some((item) => item.id === payload.id)
      if (exists) return prev.map((item) => (item.id === payload.id ? payload : item))
      return [payload, ...prev]
    })

    resetTrainerForm()
  }

  const handleDeleteTrainer = (id) => {
    setTrainers((prev) => prev.filter((item) => item.id !== id))
    if (trainerForm.id === id) resetTrainerForm()
  }

  const handleSaveClass = (event) => {
    event.preventDefault()

    const payload = {
      id: classForm.id || createId('class'),
      name: classForm.name.trim(),
      coach: classForm.coach.trim(),
      date: classForm.date,
      time: classForm.time,
      capacity: Number(classForm.capacity),
      price: Number(classForm.price),
      status: classForm.status,
    }

    if (!payload.name || !payload.coach || !payload.date || !payload.time || !payload.capacity || !payload.price) return

    setClasses((prev) => {
      const exists = prev.some((item) => item.id === payload.id)
      if (exists) return prev.map((item) => (item.id === payload.id ? payload : item))
      return [payload, ...prev]
    })

    resetClassForm()
  }

  const handleDeleteClass = (id) => {
    setClasses((prev) => prev.filter((item) => item.id !== id))
    if (classForm.id === id) resetClassForm()
  }

  const handleSaveAccessory = (event) => {
    event.preventDefault()

    const payload = {
      id: accessoryForm.id || createId('acc'),
      name: accessoryForm.name.trim(),
      category: accessoryForm.category.trim(),
      stock: Number(accessoryForm.stock),
      price: Number(accessoryForm.price),
      status: accessoryForm.status,
    }

    if (!payload.name || !payload.category || Number.isNaN(payload.stock) || !payload.price) return

    setAccessories((prev) => {
      const exists = prev.some((item) => item.id === payload.id)
      if (exists) return prev.map((item) => (item.id === payload.id ? payload : item))
      return [payload, ...prev]
    })

    resetAccessoryForm()
  }

  const handleDeleteAccessory = (id) => {
    setAccessories((prev) => prev.filter((item) => item.id !== id))
    if (accessoryForm.id === id) resetAccessoryForm()
  }

  const handleSaveOrder = (event) => {
    event.preventDefault()

    const payload = {
      id: orderForm.id || createId('ord'),
      customer: orderForm.customer.trim(),
      itemType: orderForm.itemType,
      total: Number(orderForm.total),
      paymentMethod: orderForm.paymentMethod,
      status: orderForm.status,
      createdAt: orderForm.createdAt,
    }

    if (!payload.customer || !payload.total || !payload.createdAt) return

    setOrders((prev) => {
      const exists = prev.some((item) => item.id === payload.id)
      if (exists) return prev.map((item) => (item.id === payload.id ? payload : item))
      return [payload, ...prev]
    })

    resetOrderForm()
  }

  const handleDeleteOrder = (id) => {
    setOrders((prev) => prev.filter((item) => item.id !== id))
    if (orderForm.id === id) resetOrderForm()
  }

  const handleSaveSettings = (event) => {
    event.preventDefault()
    setSettings(settingsForm)
  }

  const renderDashboard = () => (
    <div className="space-y-4">
      <SectionHeader
        title="Dashboard"
        subtitle="Monitor gym operations and quickly jump into management actions."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Active Subscriptions"
          value={dashboardStats.activeSubscriptions}
          helper="Plans currently visible to users"
        />
        <StatCard
          label="Active Trainers"
          value={dashboardStats.activeTrainers}
          helper="Trainers available for booking"
        />
        <StatCard
          label="Active Classes"
          value={dashboardStats.activeClasses}
          helper="Classes open for reservation"
        />
        <StatCard
          label="Pending Orders"
          value={dashboardStats.pendingOrders}
          helper="Orders waiting for confirmation"
        />
        <StatCard
          label="Low Stock Items"
          value={dashboardStats.lowStockItems}
          helper="Accessories under 20 units"
        />
        <StatCard
          label="Estimated Monthly Revenue"
          value={formatMMK(dashboardStats.estimatedMonthlyRevenue)}
          helper="Based on active plans and monthly trainers"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Quick Overview</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gym Profile</p>
            <h4 className="mt-1 text-base font-semibold text-slate-900">{settings.gymName}</h4>
            <p className="mt-1 text-sm text-slate-600">{settings.address}</p>
            <p className="text-sm text-slate-600">{settings.phone}</p>
          </article>

          <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest Order</p>
            {orders[0] ? (
              <>
                <h4 className="mt-1 text-base font-semibold text-slate-900">{orders[0].customer}</h4>
                <p className="mt-1 text-sm text-slate-600">{orders[0].itemType}</p>
                <p className="text-sm font-semibold text-orange-600">{formatMMK(orders[0].total)}</p>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-600">No orders yet.</p>
            )}
          </article>
        </div>
      </div>
    </div>
  )

  ///////////////////

  const renderSubscriptions = () => (
    <div className="space-y-6 bg-[#F8FAFC] p-6 rounded-2xl">

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-6 text-white shadow-md">
        <SectionHeader
          title="Manage Subscriptions"
          subtitle="Create, edit, or disable monthly/yearly membership plans."
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-xs text-[#64748B]">Total Plans</p>
          <h3 className="text-2xl font-semibold text-[#0F172A]">
            {subscriptions.length}
          </h3>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-xs text-[#64748B]">Active Plans</p>
          <h3 className="text-2xl font-semibold text-[#22C55E]">
            {subscriptions.filter(p => p.status === "active").length}
          </h3>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-xs text-[#64748B]">Average Price</p>
          <h3 className="text-2xl font-semibold text-[#2563EB]">
            {formatMMK(
              subscriptions.reduce((sum, p) => sum + Number(p.price), 0) /
              (subscriptions.length || 1)
            )}
          </h3>
        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSaveSubscription}
        className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-4">

          <div className="space-y-1">
            <FieldLabel>Plan Title</FieldLabel>
            <input
              value={subscriptionForm.title}
              onChange={(e) =>
                setSubscriptionForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Monthly Membership"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Price (MMK)</FieldLabel>
            <input
              type="number"
              min="0"
              value={subscriptionForm.price}
              onChange={(e) =>
                setSubscriptionForm((prev) => ({ ...prev, price: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Period</FieldLabel>
            <select
              value={subscriptionForm.period}
              onChange={(e) =>
                setSubscriptionForm((prev) => ({ ...prev, period: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <select
              value={subscriptionForm.status}
              onChange={(e) =>
                setSubscriptionForm((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
          >
            {subscriptionForm.id ? "Update Plan" : "Add Plan"}
          </button>

          <button
            type="button"
            onClick={resetSubscriptionForm}
            className="rounded-lg border border-[#E2E8F0] px-5 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#F1F5F9]"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Search */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search subscription plans..."
          className="w-full max-w-sm rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm text-[#0F172A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      {/* Subscription Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {subscriptions.map((item) => (
          <article
            key={item.id}
            className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]/40"
          >
            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                {/* Plan Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB] font-semibold">
                  {item.title.charAt(0)}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#0F172A]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#64748B]">
                    {item.period === "month" ? "Monthly Plan" : "Yearly Plan"}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-[#64748B]">
                    <span
                      className={`h-2 w-2 rounded-full ${item.status === "active"
                          ? "bg-[#22C55E]"
                          : "bg-gray-400"
                        }`}
                    ></span>
                    {item.status}
                  </div>
                </div>

              </div>

            </div>

            {/* Price Badge */}
            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-lg bg-[#9333EA]/10 px-3 py-1 text-xs font-semibold text-[#9333EA]">
                {formatMMK(item.price)} / {item.period}
              </span>

            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">

              <button
                type="button"
                onClick={() =>
                  setSubscriptionForm({ ...item, price: String(item.price) })
                }
                className="flex-1 rounded-lg bg-[#F1F5F9] px-3 py-2 text-xs font-semibold text-[#0F172A] transition hover:bg-[#E2E8F0]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDeleteSubscription(item.id)}
                className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>

            </div>
          </article>
        ))}

      </div>
    </div>
  )

  //////////////////////

  const renderTrainers = () => (
    <div className="space-y-6 bg-[#F8FAFC] p-6 rounded-2xl">

      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] p-6 shadow-md">
        <SectionHeader
          title="Manage Trainers"
          subtitle="Control trainer pricing, specialties, and availability."
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-xs text-[#64748B]">Total Trainers</p>
          <h3 className="text-2xl font-semibold text-[#0F172A]">
            {trainers.length}
          </h3>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-xs text-[#64748B]">Active Trainers</p>
          <h3 className="text-2xl font-semibold text-[#22C55E]">
            {trainers.filter((t) => t.status === "active").length}
          </h3>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <p className="text-xs text-[#64748B]">Average Monthly Price</p>
          <h3 className="text-2xl font-semibold text-[#2563EB]">
            {formatMMK(
              trainers.reduce((sum, t) => sum + Number(t.monthlyPrice), 0) /
              (trainers.length || 1)
            )}
          </h3>
        </div>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSaveTrainer}
        className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-3">

          <div className="space-y-1">
            <FieldLabel>Trainer Name</FieldLabel>
            <input
              value={trainerForm.name}
              onChange={(e) =>
                setTrainerForm((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Specialty</FieldLabel>
            <input
              value={trainerForm.specialty}
              onChange={(e) =>
                setTrainerForm((prev) => ({ ...prev, specialty: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <select
              value={trainerForm.status}
              onChange={(e) =>
                setTrainerForm((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Part-time Price (MMK)</FieldLabel>
            <input
              type="number"
              min="0"
              value={trainerForm.partTimePrice}
              onChange={(e) =>
                setTrainerForm((prev) => ({
                  ...prev,
                  partTimePrice: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Monthly Price (MMK)</FieldLabel>
            <input
              type="number"
              min="0"
              value={trainerForm.monthlyPrice}
              onChange={(e) =>
                setTrainerForm((prev) => ({
                  ...prev,
                  monthlyPrice: e.target.value,
                }))
              }
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            />
          </div>

        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
          >
            {trainerForm.id ? "Update Trainer" : "Add Trainer"}
          </button>

          <button
            type="button"
            onClick={resetTrainerForm}
            className="rounded-lg border border-[#E2E8F0] px-5 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#F1F5F9]"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search trainers..."
          className="w-full max-w-sm rounded-lg border border-[#E2E8F0] bg-white px-4 py-2 text-sm text-[#0F172A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
      </div>

      {/* Trainer Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trainers.map((item) => (
          <article
            key={item.id}
            className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#2563EB]/40"
          >
            <div className="flex items-start justify-between">

              <div className="flex gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB] font-semibold">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-base font-semibold text-[#0F172A]">
                    {item.name}
                  </h3>

                  <p className="text-xs font-medium text-[#9333EA]">
                    {item.specialty}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-[#64748B]">
                    <span
                      className={`h-2 w-2 rounded-full ${item.status === "active"
                        ? "bg-[#22C55E]"
                        : "bg-gray-400"
                        }`}
                    ></span>
                    {item.status}
                  </div>
                </div>

              </div>

            </div>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="rounded-lg bg-[#2563EB]/10 px-3 py-1 text-xs font-semibold text-[#2563EB]">
                Part-time: {formatMMK(item.partTimePrice)}
              </span>

              <span className="rounded-lg bg-[#9333EA]/10 px-3 py-1 text-xs font-semibold text-[#9333EA]">
                Monthly: {formatMMK(item.monthlyPrice)}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setTrainerForm({
                    ...item,
                    partTimePrice: String(item.partTimePrice),
                    monthlyPrice: String(item.monthlyPrice),
                  })
                }
                className="flex-1 rounded-lg bg-[#F1F5F9] px-3 py-2 text-xs font-semibold text-[#0F172A] transition hover:bg-[#E2E8F0]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDeleteTrainer(item.id)}
                className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  /////////

  const renderClasses = () => (
    <div className="space-y-4">
      <SectionHeader title="Manage Gym Classes" subtitle="Control schedule, capacity, and class pricing." />

      <form onSubmit={handleSaveClass} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <FieldLabel>Class Name</FieldLabel>
            <input
              value={classForm.name}
              onChange={(e) => setClassForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Coach</FieldLabel>
            <input
              value={classForm.coach}
              onChange={(e) => setClassForm((prev) => ({ ...prev, coach: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <select
              value={classForm.status}
              onChange={(e) => setClassForm((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Date</FieldLabel>
            <input
              type="date"
              value={classForm.date}
              onChange={(e) => setClassForm((prev) => ({ ...prev, date: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Time</FieldLabel>
            <input
              type="time"
              value={classForm.time}
              onChange={(e) => setClassForm((prev) => ({ ...prev, time: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Capacity</FieldLabel>
            <input
              type="number"
              min="1"
              value={classForm.capacity}
              onChange={(e) => setClassForm((prev) => ({ ...prev, capacity: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Price (MMK)</FieldLabel>
            <input
              type="number"
              min="0"
              value={classForm.price}
              onChange={(e) => setClassForm((prev) => ({ ...prev, price: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
            {classForm.id ? 'Update Class' : 'Add Class'}
          </button>
          <button type="button" onClick={resetClassForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Reset
          </button>
        </div>
      </form>

      <div className="grid gap-3">
        {classes.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-600">Coach: {item.coach}</p>
                <p className="mt-1 text-sm text-slate-700">
                  {item.date} | {item.time} | Capacity: {item.capacity}
                </p>
                <p className="text-sm font-semibold text-emerald-700">{formatMMK(item.price)}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Status: {item.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setClassForm({
                      ...item,
                      capacity: String(item.capacity),
                      price: String(item.price),
                    })
                  }
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteClass(item.id)}
                  className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderAccessories = () => (
    <div className="space-y-4">
      <SectionHeader
        title="Manage Accessories"
        subtitle="Control inventory, pricing, and status for items sold in the gym shop."
      />

      <form onSubmit={handleSaveAccessory} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <FieldLabel>Item Name</FieldLabel>
            <input
              value={accessoryForm.name}
              onChange={(e) => setAccessoryForm((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Category</FieldLabel>
            <input
              value={accessoryForm.category}
              onChange={(e) => setAccessoryForm((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <select
              value={accessoryForm.status}
              onChange={(e) => setAccessoryForm((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Stock</FieldLabel>
            <input
              type="number"
              min="0"
              value={accessoryForm.stock}
              onChange={(e) => setAccessoryForm((prev) => ({ ...prev, stock: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Price (MMK)</FieldLabel>
            <input
              type="number"
              min="0"
              value={accessoryForm.price}
              onChange={(e) => setAccessoryForm((prev) => ({ ...prev, price: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500">
            {accessoryForm.id ? 'Update Item' : 'Add Item'}
          </button>
          <button type="button" onClick={resetAccessoryForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Reset
          </button>
        </div>
      </form>

      <div className="grid gap-3">
        {accessories.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.name}</h3>
                <p className="text-sm text-slate-600">{item.category}</p>
                <p className="mt-1 text-sm text-slate-700">
                  Stock: {item.stock} | Price: <span className="font-semibold">{formatMMK(item.price)}</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Status: {item.status}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setAccessoryForm({
                      ...item,
                      stock: String(item.stock),
                      price: String(item.price),
                    })
                  }
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteAccessory(item.id)}
                  className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderOrders = () => (
    <div className="space-y-4">
      <SectionHeader
        title="Manage Orders"
        subtitle="Track customer orders, update status, and monitor payment method."
      />

      <form onSubmit={handleSaveOrder} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-1">
            <FieldLabel>Customer Name</FieldLabel>
            <input
              value={orderForm.customer}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, customer: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Item Type</FieldLabel>
            <select
              value={orderForm.itemType}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, itemType: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option>Subscription</option>
              <option>Trainer</option>
              <option>Gym Class</option>
              <option>Accessory</option>
              <option>Mixed</option>
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Total (MMK)</FieldLabel>
            <input
              type="number"
              min="0"
              value={orderForm.total}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, total: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Payment Method</FieldLabel>
            <select
              value={orderForm.paymentMethod}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, paymentMethod: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option>Cash</option>
              <option>KBZ Pay</option>
              <option>AYA Pay</option>
              <option>Card</option>
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Status</FieldLabel>
            <select
              value={orderForm.status}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="cancelled">cancelled</option>
            </select>
          </div>

          <div className="space-y-1">
            <FieldLabel>Created Date</FieldLabel>
            <input
              type="date"
              value={orderForm.createdAt}
              onChange={(e) => setOrderForm((prev) => ({ ...prev, createdAt: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-violet-700 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-600">
            {orderForm.id ? 'Update Order' : 'Add Order'}
          </button>
          <button type="button" onClick={resetOrderForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Reset
          </button>
        </div>
      </form>

      <div className="grid gap-3">
        {orders.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.customer}</h3>
                <p className="text-sm text-slate-600">{item.itemType} | {item.paymentMethod}</p>
                <p className="mt-1 text-sm font-semibold text-violet-700">{formatMMK(item.total)}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  Status: {item.status} | Date: {item.createdAt}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrderForm({ ...item, total: String(item.total) })}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteOrder(item.id)}
                  className="rounded-md bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-4">
      <SectionHeader
        title="Gym Settings"
        subtitle="Control brand identity, contacts, and location details used in the frontend site."
      />

      <form onSubmit={handleSaveSettings} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <FieldLabel>Gym Name</FieldLabel>
            <input
              value={settingsForm.gymName}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, gymName: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Logo URL</FieldLabel>
            <input
              value={settingsForm.logoUrl}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, logoUrl: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Email</FieldLabel>
            <input
              type="email"
              value={settingsForm.email}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <FieldLabel>Phone</FieldLabel>
            <input
              value={settingsForm.phone}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, phone: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <FieldLabel>Address</FieldLabel>
            <input
              value={settingsForm.address}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, address: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <FieldLabel>About</FieldLabel>
            <textarea
              value={settingsForm.about}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, about: e.target.value }))}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <FieldLabel>Google Maps Embed URL</FieldLabel>
            <input
              value={settingsForm.mapEmbedUrl}
              onChange={(e) => setSettingsForm((prev) => ({ ...prev, mapEmbedUrl: e.target.value }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
            Save Settings
          </button>
          <button
            type="button"
            onClick={() => setSettingsForm(settings)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            Reset Changes
          </button>
        </div>
      </form>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Live Preview</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-[120px_1fr] md:items-start">
          <img src={settings.logoUrl} alt="Gym logo preview" className="h-24 w-24 rounded-full border border-slate-200 object-cover" />
          <div>
            <h4 className="text-xl font-semibold text-slate-900">{settings.gymName}</h4>
            <p className="mt-1 text-sm text-slate-600">{settings.about}</p>
            <p className="mt-3 text-sm text-slate-700">{settings.phone} | {settings.email}</p>
            <p className="text-sm text-slate-700">{settings.address}</p>
          </div>
        </div>
      </article>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img src={settings.logoUrl} alt="Gym logo" className="h-10 w-10 rounded-full border border-slate-200 object-cover" />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Gym Admin Portal</h1>
              <p className="text-xs text-slate-500">{settings.gymName}</p>
            </div>
          </div>

          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
            Admin Mode
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
        <aside className="hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:block">
          <nav className="space-y-1">
            {sideNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${activeTab === item.id
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {sideNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${activeTab === item.id
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <main className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:p-5">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'subscriptions' && renderSubscriptions()}
          {activeTab === 'trainers' && renderTrainers()}
          {activeTab === 'classes' && renderClasses()}
          {activeTab === 'accessories' && renderAccessories()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'settings' && renderSettings()}
        </main>
      </div>
    </div>
  )
}

export default App
