import { pgListings } from '@/data/pgListings';

export const properties = pgListings.map((p) => ({
  ...p,
  type: 'PG',
}));

export const testimonials = [
  {
    id: 1,
    name: "Rohit Malhotra",
    role: "Software Engineer, Google",
    avatar: "RM",
    color: "from-blue-500 to-cyan-400",
    text: "Found my PG in GTB Nagar through Rushkey. The listing was 100% accurate — what I saw online is exactly what I got. Moved in within 6 hours of searching. Unbelievable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Neha Kapoor",
    role: "Product Manager, Paytm",
    avatar: "NK",
    color: "from-purple-500 to-pink-500",
    text: "After wasting 2 weeks with brokers in Kamla Nagar, Rushkey found me a premium PG in one afternoon. Zero brokerage saved me ₹12,000. Absolute game changer.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Student, DU North Campus",
    avatar: "VS",
    color: "from-rushkey-500 to-orange-400",
    text: "Student budget PGs in Mukherjee Nagar are usually terrible, but the one I found is actually clean and well-maintained. ₹8,500 with meals is insane value. Thank you Rushkey!",
    rating: 4,
  },
  {
    id: 4,
    name: "Anjali Mehra",
    role: "MA Student, DU",
    avatar: "AM",
    color: "from-emerald-500 to-teal-400",
    text: "I needed a girls-only PG with good security near North Campus and found exactly that in Model Town. The verification badges gave me peace of mind as a student new to Delhi.",
    rating: 5,
  },
  {
    id: 5,
    name: "Arun Nambiar",
    role: "UPSC Aspirant",
    avatar: "AN",
    color: "from-rose-400 to-orange-300",
    text: "Moved from Kerala for UPSC coaching and needed a place in 2 days near Mukherjee Nagar. Rushkey helped me book 3 visits and finalize one before my train arrived.",
    rating: 5,
  },
];

export const filterCategories = {
  priceRanges: [
    { label: "Under ₹8K", min: 0, max: 8000 },
    { label: "₹8K – ₹12K", min: 8000, max: 12000 },
    { label: "₹12K – ₹15K", min: 12000, max: 15000 },
    { label: "₹15K+", min: 15000, max: null },
  ],
  roomTypes: ["Single", "Double", "Triple"],
  amenities: ["WiFi", "AC", "Food", "Laundry", "Gym", "Housekeeping", "CCTV", "Parking"],
  gender: ["Boys", "Girls", "Unisex"],
  locations: [
    "GTB Nagar, Delhi",
    "Kamla Nagar, Delhi",
    "Vijay Nagar, Delhi",
    "Mukherjee Nagar, Delhi",
    "Model Town, Delhi",
    "Roop Nagar, Delhi",
    "Shakti Nagar, Delhi",
  ],
};
