import SectionTitle from '../components/SectionTitle'
import { formatMMK, gymInfo, homeGallery, offerings, subscriptions } from '../data/gymData'
import heroImage from '../assets/bigGuy1.png'

import { Phone, Mail, MapPin, Zap, HeartPulse, Activity, Dumbbell, Instagram, Facebook, Star } from 'lucide-react'

const cardStyles =
'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-blue-200 transition'

function HomePage({ addToCart, getQuantity }) {

const scrollToSubscriptions = () => {
const section = document.getElementById('home-subscriptions')
if (!section) return
section.scrollIntoView({ behavior: 'smooth' })
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
{ mode: 'set', quantity: 1, replaceType: 'subscription' }
)
}

return (
<div className="space-y-12">

{/* HERO */}
<section className="relative overflow-hidden rounded-3xl px-10 shadow-lg bg-gradient-to-r from-blue-700 via-blue-500 to-white">

<div className="grid md:grid-cols-2 items-center gap-8">

<div className="text-white">

<p className="uppercase tracking-widest text-blue-200 text-sm">
Welcome to
</p>

<h1 className="mt-2 text-4xl md:text-6xl font-bold">
{gymInfo.name}
</h1>

<p className="mt-4 text-blue-100 max-w-xl">
{gymInfo.tagline}
</p>

<p className="mt-2 text-blue-200 text-sm max-w-xl">
{gymInfo.description}
</p>

<button
onClick={scrollToSubscriptions}
className="mt-6 rounded-lg bg-white px-6 py-3 text-blue-700 font-semibold hover:bg-blue-100 transition"
>
View Membership Plans
</button>

</div>

<div className="fflex items-end justify-center h-full w-full">
<img
src={heroImage}
className="h-[470px] w-auto object-cover drop-shadow-2xl"
/>
</div>

</div>
</section>


{/* SUBSCRIPTIONS */}
<section id="home-subscriptions" className={cardStyles}>

<SectionTitle
title="Gym Subscriptions"
subtitle="Choose your membership plan."
/>

<div className="grid gap-6 md:grid-cols-2">

{subscriptions.map((plan) => {

const cartId = `subscription-${plan.id}`
const active = getQuantity(cartId) > 0

return (
<div
key={plan.id}
className="rounded-xl border border-slate-200 bg-blue-100 p-6 text-center
transition transform hover:scale-105
hover:border-grey-500 hover:shadow-blue-300 hover:shadow-lg"
>

<img
src={plan.image}
alt={plan.title}
className="h-44 w-full object-cover rounded-lg"
/>

<h3 className="mt-3 text-lg font-semibold">
{plan.title}
</h3>

<p className="text-blue-600 text-xl font-bold">
{formatMMK(plan.price)} {plan.period}
</p>

<ul className="mt-2 text-sm text-slate-600">
{plan.perks.map((perk) => (
<li key={perk}>• {perk}</li>
))}
</ul>

<button
onClick={() => handleSubscribe(plan)}
className="mt-4 w-full rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-500"
>
{active ? 'Added' : 'Subscribe'}
</button>

</div>
)
})}

</div>
</section>


{/* GALLERY */}
<section className={cardStyles}>

<SectionTitle
title="Gym Gallery"
subtitle="Our training environment."
/>

<div className="grid gap-4 md:grid-cols-3">

{homeGallery.map((photo, index) => (

<div key={index} className="overflow-hidden rounded-xl">

<img
src="hero.png"
className="h-52 w-full object-cover transition duration-700 ease-in-out hover:scale-110"
/>

</div>

))}

</div>
</section>


{/* TRAINERS */}
<section className={cardStyles}>

<SectionTitle
title="Meet Our Trainers"
subtitle="Professional trainers ready to guide you."
/>

<div className="grid gap-6 md:grid-cols-3">

<div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white rounded-2xl p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-blue-400 hover:shadow-xl">

<img
src="https://randomuser.me/api/portraits/men/32.jpg"
className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
/>

<h3 className="mt-4 font-bold text-lg">Coach Aung</h3>
<p className="text-blue-200 text-sm">Strength Coach</p>

<div className="flex justify-center gap-4 mt-4">

<div className="bg-white/20 p-2 rounded-full">
<Facebook size={18}/>
</div>

<div className="bg-white/20 p-2 rounded-full">
<Instagram size={18}/>
</div>

</div>

</div>


<div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white rounded-2xl p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-blue-400 hover:shadow-xl">

<img
src="https://randomuser.me/api/portraits/women/44.jpg"
className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
/>

<h3 className="mt-4 font-bold text-lg">Coach May</h3>
<p className="text-blue-200 text-sm">Yoga Instructor</p>

<div className="flex justify-center gap-4 mt-4">

<div className="bg-white/20 p-2 rounded-full">
<Facebook size={18}/>
</div>

<div className="bg-white/20 p-2 rounded-full">
<Instagram size={18}/>
</div>

</div>

</div>


<div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white rounded-2xl p-6 text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-blue-400 hover:shadow-xl">

<img
src="https://randomuser.me/api/portraits/men/52.jpg"
className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white shadow-lg"
/>

<h3 className="mt-4 font-bold text-lg">Coach Min</h3>
<p className="text-blue-200 text-sm">Fitness Trainer</p>

<div className="flex justify-center gap-4 mt-4">

<div className="bg-white/20 p-2 rounded-full">
<Facebook size={18}/>
</div>

<div className="bg-white/20 p-2 rounded-full">
<Instagram size={18}/>
</div>

</div>

</div>

</div>
</section>


{/* OFFERINGS */}
<section className={cardStyles}>

<SectionTitle
title="What We Offer"
subtitle="Everything you need for fitness."
/>

<div className="grid gap-6 md:grid-cols-2">

{offerings.map((item, index) => {

const icons = [
<Zap size={28}/>,
<HeartPulse size={28}/>,
<Activity size={28}/>,
<Dumbbell size={28}/>
]

return (

<div
key={item.title}
className="rounded-2xl p-6 text-white shadow-lg
bg-gradient-to-br from-blue-700 to-blue-500
border border-blue-400
transition duration-300
hover:scale-105 hover:shadow-blue-400 hover:shadow-xl"
>

<div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
{icons[index % icons.length]}
</div>

<h3 className="font-bold text-lg mb-2">
{item.title}
</h3>

<p className="text-blue-100 text-sm mb-4">
{item.description}
</p>

<button className="text-sm font-semibold text-white hover:underline">
Learn More →
</button>

</div>

)
})}

</div>
</section>


{/* TESTIMONIALS */}
<section className={cardStyles}>

<SectionTitle
title="What Our Members Say"
subtitle="Real feedback from our community."
/>

<div className="grid gap-6 md:grid-cols-2">

{/* Feedback 1 */}
<div className="rounded-xl border border-slate-200 bg-blue-100 p-6 text-center
transition transform hover:scale-105
hover:border-grey-500 hover:shadow-blue-300 hover:shadow-lg">

{/* Stars */}
<div className="flex gap-1 text-yellow-400 mb-3">
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
</div>

<p className="text-sm text-slate-700 italic">
"This gym completely changed my fitness journey! The trainers are amazing and the equipment is top quality."
</p>

<p className="mt-3 font-semibold text-blue-600">
– Ko Aung
</p>

</div>


{/* Feedback 2 */}
<div className="rounded-xl border border-slate-200 bg-blue-100 p-6 text-center
transition transform hover:scale-105
hover:border-grey-500 hover:shadow-blue-300 hover:shadow-lg" >

{/* Stars */}
<div className="flex gap-1 text-yellow-400 mb-3">
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18}/>
</div>

<p className="text-sm text-slate-700 italic">
"Great equipment and friendly trainers. The environment is motivating and very clean."
</p>

<p className="mt-3 font-semibold text-blue-600">
– Ma Su
</p>

</div>

</div>
</section>


{/* CONTACT + MAP */}
<section className="grid gap-6 lg:grid-cols-3">

<div className={cardStyles}>

<SectionTitle
title="Contact Us"
subtitle="Reach our gym."
/>

<div className="space-y-4">

<div className="flex items-center gap-3">
<Phone className="text-blue-600" size={20}/>
<span>{gymInfo.phone}</span>
</div>

<div className="flex items-center gap-3">
<Mail className="text-blue-600" size={20}/>
<span>{gymInfo.email}</span>
</div>

<div className="flex items-center gap-3">
<MapPin className="text-blue-600" size={20}/>
<span>{gymInfo.address}</span>
</div>

</div>
</div>


<div className={`${cardStyles} lg:col-span-2`}>

<SectionTitle
title="Location Map"
subtitle="Find us easily."
/>

<iframe
title="gym-map"
src="https://www.google.com/maps?q=Yangon+Myanmar&output=embed"
className="w-full h-72 rounded-xl"
/>

</div>

</section>

</div>
)
}

export default HomePage