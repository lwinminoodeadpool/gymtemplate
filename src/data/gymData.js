export const gymInfo = {
  name: 'Iron Pulse Fitness',
  tagline: 'Train hard. Stay consistent. Build your strongest self.',
  description:
    'Modern gym equipment, certified trainers, and flexible classes for beginners and advanced members.',
  phone: '+95 9 123 456 789',
  email: 'hello@ironpulsefitness.com',
  address: 'No. 221, Bogyoke Road, Yangon, Myanmar',
}

export const homeGallery = [
  'https://picsum.photos/id/1040/1200/700',
  'https://picsum.photos/id/1050/1200/700',
  'https://picsum.photos/id/1062/1200/700',
]

export const offerings = [
  {
    title: 'Gym Subscriptions',
    description: 'Monthly and yearly plans with full gym access and member benefits.',
  },
  {
    title: 'Personal Trainers',
    description: 'Hire certified trainers in part-time sessions or monthly coaching plans.',
  },
  {
    title: 'Fitness Classes',
    description: 'Join yoga, zumba, and weight training classes by schedule.',
  },
  {
    title: 'Accessories Shop',
    description: 'Buy protein supplements, workout bottles, and essential gym gear.',
  },
]

export const subscriptions = [
  {
    id: 'monthly',
    title: 'Monthly Membership',
    price: 120000,
    period: '/month',
    image: 'https://picsum.photos/id/1018/600/400',
    perks: ['Unlimited gym access', 'Locker access', '1 free body scan'],
  },
  {
    id: 'yearly',
    title: 'Yearly Membership',
    price: 1200000,
    period: '/year',
    image: 'https://picsum.photos/id/1031/600/400',
    perks: ['2 months free', 'Priority class booking', 'Nutrition starter guide'],
  },
]

export const trainers = [
  {
    id: 'emma',
    name: 'Emma Blake',
    specialty: 'Strength & Fat Loss',
    partTimePrice: 50000,
    monthlyPrice: 350000,
    image: 'https://picsum.photos/id/1005/600/400',
  },
  {
    id: 'jordan',
    name: 'Jordan Lee',
    specialty: 'Athletic Performance',
    partTimePrice: 65000,
    monthlyPrice: 450000,
    image: 'https://picsum.photos/id/1027/600/400',
  },
  {
    id: 'sofia',
    name: 'Sofia Khan',
    specialty: 'Rehab & Mobility',
    partTimePrice: 45000,
    monthlyPrice: 320000,
    image: 'https://picsum.photos/id/1011/600/400',
  },
]

export const classes = [
  {
    id: 'yoga',
    name: 'Yoga Flow',
    coach: 'Maya',
    date: 'March 03, 2026',
    time: '7:00 AM',
    price: 30000,
    image: 'https://picsum.photos/id/1039/600/400',
  },
  {
    id: 'zumba',
    name: 'Zumba Blast',
    coach: 'Carla',
    date: 'March 04, 2026',
    time: '6:00 PM',
    price: 35000,
    image: 'https://picsum.photos/id/1059/600/400',
  },
  {
    id: 'weights',
    name: 'Weight Training Basics',
    coach: 'Noah',
    date: 'March 06, 2026',
    time: '5:30 PM',
    price: 40000,
    image: 'https://picsum.photos/id/1044/600/400',
  },
]

export const accessories = [
  {
    id: 'whey',
    name: 'Whey Protein (2lb)',
    price: 85000,
    category: 'Nutrition',
    image: 'https://picsum.photos/id/1060/600/400',
  },
  {
    id: 'preworkout',
    name: 'Pre-Workout Mix',
    price: 60000,
    category: 'Nutrition',
    image: 'https://picsum.photos/id/1080/600/400',
  },
  {
    id: 'shaker',
    name: 'Steel Shaker Bottle',
    price: 25000,
    category: 'Gear',
    image: 'https://picsum.photos/id/1074/600/400',
  },
  {
    id: 'resistance-bands',
    name: 'Resistance Bands Set',
    price: 35000,
    category: 'Gear',
    image: 'https://picsum.photos/id/109/600/400',
  },
]

export const formatMMK = (amount) => `${amount.toLocaleString()} MMK`
