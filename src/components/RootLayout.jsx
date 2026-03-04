import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'

function LogoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15V9h2.5a2.5 2.5 0 0 1 0 5H8Z" />
      <path d="M13.5 9V15" />
      <path d="M13.5 12H16" />
    </svg>
  )
}

function TrainerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M4 19c0-2.8 2.3-5 5-5s5 2.2 5 5" />
      <path d="M14 19c0-2.2 1.8-4 4-4s4 1.8 4 4" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  )
}

function ClassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="M8 14h3v3H8z" />
    </svg>
  )
}

function AccessoriesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M6 8h12l-1 11H7L6 8z" />
      <path d="M9 8a3 3 0 1 1 6 0" />
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    </svg>
  )
}

function BucketIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
      <path d="M7 10h10l-1.3 10H8.3L7 10Z" />
      <path d="M9 10V7a3 3 0 1 1 6 0v3" />
    </svg>
  )
}

const desktopNavItems = [
  { to: '/', label: 'Home' },
  { to: '/trainers', label: 'Personal Trainer' },
  { to: '/classes', label: 'Gym Class' },
  { to: '/accessories', label: 'Gym Accessories' },
]

const mobileNavItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/trainers', label: 'Trainer', icon: TrainerIcon },
  { to: '/classes', label: 'Class', icon: ClassIcon },
  { to: '/accessories', label: 'Gear', icon: AccessoriesIcon },
]

const buyPages = new Set(['/', '/trainers', '/classes', '/accessories'])

function RootLayout({ cartCount }) {
  const location = useLocation()
  const showFloatingBucket = buyPages.has(location.pathname)

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white">
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2 text-slate-900">
              <span className="rounded-full bg-orange-100 p-1.5 text-orange-700">
                <LogoIcon />
              </span>
              <span className="text-base font-bold sm:text-lg">Iron Pulse Fitness</span>
            </Link>

            <Link
              to="/profile"
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              <ProfileIcon />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </div>
        </div>

        <div className="hidden border-b border-slate-200 bg-white/95 md:block">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-2 sm:px-6 lg:px-8">
            {desktopNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
        <Outlet />
      </main>

      {showFloatingBucket ? (
        <Link
          to="/checkout"
          className="fixed bottom-24 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-500 md:bottom-6"
        >
          <span className="relative">
            <BucketIcon />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 rounded-full bg-slate-900 px-1.5 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            ) : null}
          </span>
          Bucket
        </Link>
      ) : null}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-4">
          {mobileNavItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 px-1 py-3 text-[10px] font-medium transition ${
                    isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-500 hover:bg-slate-100'
                  }`
                }
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

export default RootLayout
