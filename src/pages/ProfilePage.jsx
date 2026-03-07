import { useState, useEffect } from "react"
import SectionTitle from "../components/SectionTitle"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

// Professional neutral card style
const cardStyles = "rounded-xl border border-gray-200 bg-white p-6 shadow-sm"

function ProfilePage() {
  const [weight, setWeight] = useState(65)
  const [height, setHeight] = useState(170)
  const [weightHistory, setWeightHistory] = useState([])

  const [foodName, setFoodName] = useState("")
  const [foodCalories, setFoodCalories] = useState("")
  const [foods, setFoods] = useState([])

  const dailyGoal = 2000
  const calories = foods.reduce((total, food) => total + Number(food.calories), 0)
  const progress = Math.min((calories / dailyGoal) * 100, 100)
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1)

  useEffect(() => {
    const savedWeight = localStorage.getItem("weight")
    const savedHeight = localStorage.getItem("height")
    const savedHistory = localStorage.getItem("weightHistory")
    const savedFoods = localStorage.getItem("foods")

    if (savedWeight) setWeight(Number(savedWeight))
    if (savedHeight) setHeight(Number(savedHeight))
    if (savedHistory) setWeightHistory(JSON.parse(savedHistory))
    if (savedFoods) setFoods(JSON.parse(savedFoods))
  }, [])

  useEffect(() => {
    localStorage.setItem("weight", weight)
    localStorage.setItem("height", height)
    localStorage.setItem("weightHistory", JSON.stringify(weightHistory))
    localStorage.setItem("foods", JSON.stringify(foods))
  }, [weight, height, weightHistory, foods])

  const saveWeight = () => {
    const newEntry = { weight: Number(weight), date: new Date().toLocaleDateString() }
    setWeightHistory([newEntry, ...weightHistory])
  }

  const addFood = () => {
    if (!foodName || !foodCalories) return
    setFoods([...foods, { name: foodName, calories: Number(foodCalories) }])
    setFoodName("")
    setFoodCalories("")
  }

  const chartData = {
    labels: weightHistory.map((w) => w.date).reverse(),
    datasets: [
      {
        label: "Weight (kg)",
        data: weightHistory.map((w) => w.weight).reverse(),
        borderColor: "#2563eb", // professional blue
        backgroundColor: "rgba(37, 99, 235, 0.1)",
        borderWidth: 2,
        tension: 0.2
      }
    ]
  }

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16 py-8 max-w-5xl mx-auto font-sans">


{/* PROFILE SECTION */}
<section className={cardStyles}>

  <div className="flex flex-col items-center gap-4 mt-4">
    {/* Avatar */}
    <div className="relative">
      <img
        src="https://i.pravatar.cc/150"
        alt="Profile"
        className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
      />
      {/* Premium Glow Effect */}
    </div>

    {/* Profile Info */}
    <div className="text-center space-y-2">
      <h3 className="text-2xl font-semibold text-gray-900">Aung Aung</h3>
      
      {/* Membership & Subscription */}
      <div className="flex justify-center gap-3 mt-1">
        <span className="px-4 py-1 rounded-lg font-medium bg-yellow-400 text-white shadow-lg animate-pulse">
          Premium Member
        </span>
        <span className="px-4 py-1 rounded-lg font-medium bg-gray-200 text-gray-700">
          Yearly Plan
        </span>
      </div>

      {/* Optional Premium Badge */}
      <div className="mt-2 inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
        PREMIUM
      </div>
    </div>
  </div>
</section>

      {/* BMI CALCULATOR */}
      <section className={cardStyles}>
        <SectionTitle title="BMI Calculator" subtitle="Based on your height and weight." />
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight (kg)"
            className="bg-blue-100 border rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height (cm)"
            className="bg-blue-100 border rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="flex items-center justify-center bg-gray-100 rounded-md font-semibold text-gray-800">
            BMI: {bmi}
          </div>
        </div>
      </section>

      {/* WEIGHT TRACKER */}
      <section className={cardStyles}>
        <SectionTitle title="Weight Tracker" subtitle="Monitor your weight over time." />
        <button
          onClick={saveWeight}
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500 transition"
        >
          Save Current Weight
        </button>
        {weightHistory.length > 0 && (
          <div className="mt-6 h-64">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        )}
      </section>

      {/* FOOD TRACKER */}
      <section className={cardStyles}>
        <SectionTitle title="Daily Food Tracker" subtitle="Track your calories intake." />
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <input
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Food Name"
            className="bg-blue-100 border rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            value={foodCalories}
            onChange={(e) => setFoodCalories(e.target.value)}
            placeholder="Calories"
            className="bg-blue-100 border rounded-md p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            onClick={addFood}
            className="bg-blue-600 text-white rounded-md px-3 py-2 hover:bg-blue-500 transition"
          >
            Add Food
          </button>
        </div>

        <div className="mt-6 space-y-2">
          {foods.map((food, idx) => (
            <div key={idx} className="flex justify-between bg-gray-50 border rounded-md p-3">
              <span className="text-gray-900">{food.name}</span>
              <span className="font-semibold text-gray-900">{food.calories} kcal</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-gray-900 font-semibold mb-1">{calories} / {dailyGoal} kcal</p>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-blue-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage