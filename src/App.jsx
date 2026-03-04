import { useMemo, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import AccessoriesPage from './pages/AccessoriesPage'
import CheckoutPage from './pages/CheckoutPage'
import ClassesPage from './pages/ClassesPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import TrainersPage from './pages/TrainersPage'

function App() {
  const [cartItems, setCartItems] = useState({})

  const addToCart = (item, options = {}) => {
    const { quantity = 1, mode = 'increment', replaceType } = options

    setCartItems((prev) => {
      const next = { ...prev }

      if (replaceType) {
        Object.keys(next).forEach((key) => {
          if (next[key].type === replaceType && key !== item.id) {
            delete next[key]
          }
        })
      }

      const existingQty = next[item.id]?.quantity || 0
      const nextQty = mode === 'set' ? quantity : existingQty + quantity

      if (nextQty <= 0) {
        delete next[item.id]
      } else {
        next[item.id] = {
          ...item,
          quantity: nextQty,
        }
      }

      return next
    })
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev
      const next = { ...prev }
      delete next[itemId]
      return next
    })
  }

  const updateItemQuantity = (itemId, nextQuantity) => {
    setCartItems((prev) => {
      const current = prev[itemId]
      if (!current) return prev

      if (nextQuantity <= 0) {
        const next = { ...prev }
        delete next[itemId]
        return next
      }

      return {
        ...prev,
        [itemId]: {
          ...current,
          quantity: nextQuantity,
        },
      }
    })
  }

  const getQuantity = (itemId) => cartItems[itemId]?.quantity || 0

  const cartEntries = useMemo(() => Object.values(cartItems), [cartItems])

  const cartCount = useMemo(
    () => cartEntries.reduce((sum, item) => sum + item.quantity, 0),
    [cartEntries],
  )

  const cartTotal = useMemo(
    () => cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartEntries],
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout cartCount={cartCount} />}>
          <Route index element={<HomePage addToCart={addToCart} getQuantity={getQuantity} />} />
          <Route path="subscriptions" element={<Navigate to="/" replace />} />
          <Route
            path="trainers"
            element={<TrainersPage addToCart={addToCart} getQuantity={getQuantity} />}
          />
          <Route
            path="classes"
            element={
              <ClassesPage
                addToCart={addToCart}
                getQuantity={getQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="accessories"
            element={<AccessoriesPage addToCart={addToCart} getQuantity={getQuantity} />}
          />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="checkout"
            element={
              <CheckoutPage
                cartEntries={cartEntries}
                cartTotal={cartTotal}
                updateItemQuantity={updateItemQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
