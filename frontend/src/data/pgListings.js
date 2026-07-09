const images = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
  'https://images.unsplash.com/photo-1564078516393-cf04bd62a0ad?w=800&q=80',
  'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
];

const img = (i) => images[i % images.length];

const areaInfo = {
  'GTB Nagar, Delhi': { distance: '1.2 km from North Campus', metro: 'Near GTB Nagar Metro Station', tags: ['Near DU', 'Student Friendly'] },
  'Vijay Nagar, Delhi': { distance: '800m from North Campus', metro: 'Near Vishwavidyalaya Metro Station', tags: ['Near DU', 'Walking Distance'] },
  'Kamla Nagar, Delhi': { distance: '500m from North Campus', metro: 'Near Vishwavidyalaya Metro Station', tags: ['Near DU', 'Student Hub'] },
  'Mukherjee Nagar, Delhi': { distance: '1.5 km from North Campus', metro: 'Near GTB Nagar Metro Station', tags: ['Coaching Hub', 'Student Friendly'] },
  'Model Town, Delhi': { distance: '2 km from North Campus', metro: 'Near Model Town Metro Station', tags: ['Peaceful Area', 'Family Neighborhood'] },
  'Roop Nagar, Delhi': { distance: '1.8 km from North Campus', metro: 'Near Civil Lines Metro Station', tags: ['Budget Friendly', 'Near DU'] },
  'Shakti Nagar, Delhi': { distance: '2.5 km from North Campus', metro: 'Near Tis Hazari Metro Station', tags: ['Affordable', 'Well Connected'] },
};

const areaPhones = {
  'GTB Nagar, Delhi': '98102',
  'Vijay Nagar, Delhi': '99112',
  'Kamla Nagar, Delhi': '98710',
  'Mukherjee Nagar, Delhi': '98990',
  'Model Town, Delhi': '99554',
  'Roop Nagar, Delhi': '99775',
  'Shakti Nagar, Delhi': '98880',
};

const descriptions = [
  'Well-maintained PG located just 5 minutes walk from Delhi University North Campus. All meals included with rotating weekly menu. High-speed WiFi perfect for online classes and exam prep.',
  'Premium co-living space in the heart of Vijay Nagar. Walking distance to Mukherjee Nagar and Kamla Nagar markets. Ideal for UPSC aspirants and DU students looking for a focused environment.',
  'Safe and secure girls-only PG with 24/7 security and CCTV. Located in a quiet lane off Kamla Nagar. Home-cooked meals, weekly housekeeping, and supportive staff. Recently renovated.',
  'Popular unisex PG in Mukherjee Nagar known for its community vibe. Rooftop seating area for group study sessions. Close to all major coaching centres. Power backup for uninterrupted study.',
  'Affordable girls PG in Model Town with easy access to North Campus via metro. Clean rooms, nutritious meals, and friendly wardens who treat you like family. Reference from current tenants available.',
  'Premium co-living with gym, rooftop cafe, and community events. Located in GTB Nagar with easy metro access. Fully furnished rooms with memory foam mattresses and blackout curtains.',
  'Well-established PG in Kamla Nagar popular among final-year students. Spacious double rooms with attached balcony. Laundry service included. 2 min walk to the metro station.',
  'Budget-friendly boys PG near Hudson Lane. Known for its mess food and friendly atmosphere. Perfect for students who want to be close to the university without breaking the bank.',
  'Girls PG with AC rooms and attached bathrooms in Mukherjee Nagar. Walking distance to over 20 coaching centres. Evening study hours maintained. Filtered water and daily housekeeping.',
  'Single room PG for girls in the heart of Kamla Nagar. Each room has natural light and good ventilation. Landlady lives on the same floor for added security. No curfew for serious students.',
  'Economical boys PG in Roop Nagar with basic amenities and great food. Popular among B.Com and BA students. Close to the university library and cycling distance to North Campus.',
  'Unisex PG in Shakti Nagar with spacious rooms and parking facility. Good option for students with bikes. Located on the main road with easy auto and bus access to the university.',
  'Elite single-room PG in GTB Nagar for working professionals and senior students. Soundproofed rooms, high-speed internet, and premium furnishings. Limited rooms available.',
  'Budget boys PG in Mukherjee Nagar popular among UPSC aspirants. Close to all major coaching institutes. Simple rooms, good food, and an environment focused on studies.',
  'Girls PG in Model Town with AC double rooms. Close to the Model Town metro station and ICAR. Known for its clean bathrooms and nutritious food. Weekly vegetable market visits by staff.',
];

const raw = [
  { id: 'pg1', title: 'Stanza Living Sheffield House (Boys)', price: '₹16,500', location: 'GTB Nagar, Delhi', gender: 'Boys', roomType: 'Double', amenities: ['WiFi','AC','Food','Laundry','Housekeeping','CCTV','Power Backup'], rating: 4.5, reviews: 120, availability: 'Available' },
  { id: 'pg2', title: 'The Hostel Yard - Bluebell House', price: '₹16,000', location: 'Vijay Nagar, Delhi', gender: 'Boys', roomType: 'Double', amenities: ['WiFi','AC','Meals','Security','Laundry','Geyser'], rating: 4.4, reviews: 98, availability: 'Few Rooms Left' },
  { id: 'pg3', title: 'Hazel by Hyphen (Girls PG)', price: '₹14,500', location: 'Kamla Nagar, Delhi', gender: 'Girls', roomType: 'Single', amenities: ['WiFi','AC','Food','Housekeeping','Security','Attached Bathroom'], rating: 4.6, reviews: 150, availability: 'Available' },
  { id: 'pg4', title: 'Orion Pegasus PG', price: '₹15,000', location: 'Mukherjee Nagar, Delhi', gender: 'Unisex', roomType: 'Double', amenities: ['WiFi','AC','Meals','Laundry','CCTV','Parking'], rating: 4.3, reviews: 85, availability: 'Available' },
  { id: 'pg5', title: 'Vinayak Girls PG', price: '₹12,500', location: 'Model Town, Delhi', gender: 'Girls', roomType: 'Double', amenities: ['WiFi','AC','Food','Security','Laundry'], rating: 4.2, reviews: 70, availability: 'Few Rooms Left' },
  { id: 'pg6', title: 'Boston House Co-living', price: '₹17,000', location: 'GTB Nagar, Delhi', gender: 'Unisex', roomType: 'Single', amenities: ['WiFi','AC','Meals','Gym','Housekeeping','Security'], rating: 4.7, reviews: 180, availability: 'Available' },
  { id: 'pg7', title: 'Montreal House PG', price: '₹15,500', location: 'Kamla Nagar, Delhi', gender: 'Unisex', roomType: 'Double', amenities: ['WiFi','AC','Laundry','Food','CCTV','Geyser'], rating: 4.5, reviews: 110, availability: 'Available' },
  { id: 'pg8', title: 'DU Homes Premium PG', price: '₹13,000', location: 'Vijay Nagar, Delhi', gender: 'Boys', roomType: 'Triple', amenities: ['WiFi','Food','Laundry','Security','Power Backup'], rating: 4.1, reviews: 65, availability: 'Available' },
  { id: 'pg9', title: 'Campus Arena Girls PG', price: '₹14,000', location: 'Mukherjee Nagar, Delhi', gender: 'Girls', roomType: 'Double', amenities: ['WiFi','AC','Meals','Housekeeping','Security'], rating: 4.6, reviews: 140, availability: 'Few Rooms Left' },
  { id: 'pg10', title: 'North Campus Girls PG', price: '₹13,500', location: 'Kamla Nagar, Delhi', gender: 'Girls', roomType: 'Single', amenities: ['WiFi','AC','Food','Laundry','Security'], rating: 4.5, reviews: 100, availability: 'Available' },
  { id: 'pg11', title: 'Comfort Stay PG', price: '₹9,000', location: 'Roop Nagar, Delhi', gender: 'Boys', roomType: 'Triple', amenities: ['WiFi','Food','Laundry','CCTV'], rating: 4.0, reviews: 40, availability: 'Available' },
  { id: 'pg12', title: 'Urban Nest PG', price: '₹11,500', location: 'Shakti Nagar, Delhi', gender: 'Unisex', roomType: 'Double', amenities: ['WiFi','AC','Meals','Laundry','Parking'], rating: 4.2, reviews: 75, availability: 'Available' },
  { id: 'pg13', title: 'Elite Living PG', price: '₹18,000', location: 'GTB Nagar, Delhi', gender: 'Unisex', roomType: 'Single', amenities: ['WiFi','AC','Food','Gym','Housekeeping','Security'], rating: 4.8, reviews: 200, availability: 'Few Rooms Left' },
  { id: 'pg14', title: 'Student Hub PG', price: '₹8,500', location: 'Mukherjee Nagar, Delhi', gender: 'Boys', roomType: 'Triple', amenities: ['WiFi','Food','Laundry','Security'], rating: 4.0, reviews: 55, availability: 'Available' },
  { id: 'pg15', title: 'Prime Stay PG', price: '₹12,000', location: 'Model Town, Delhi', gender: 'Girls', roomType: 'Double', amenities: ['WiFi','AC','Meals','Laundry','CCTV'], rating: 4.3, reviews: 90, availability: 'Available' },
  { id: 'pg16', title: 'Skyline PG', price: '₹14,500', location: 'Vijay Nagar, Delhi', gender: 'Unisex', roomType: 'Single', amenities: ['WiFi','AC','Meals','Housekeeping'], rating: 4.4, reviews: 88, availability: 'Available' },
  { id: 'pg17', title: 'Budget Nest PG', price: '₹7,500', location: 'Kamla Nagar, Delhi', gender: 'Boys', roomType: 'Triple', amenities: ['WiFi','Food','Laundry'], rating: 3.9, reviews: 35, availability: 'Available' },
  { id: 'pg18', title: 'Metro Stay PG', price: '₹13,800', location: 'GTB Nagar, Delhi', gender: 'Unisex', roomType: 'Double', amenities: ['WiFi','AC','Food','CCTV','Geyser'], rating: 4.5, reviews: 120, availability: 'Few Rooms Left' },
  { id: 'pg19', title: 'Green Leaf PG', price: '₹10,500', location: 'Shakti Nagar, Delhi', gender: 'Girls', roomType: 'Double', amenities: ['WiFi','Meals','Laundry','Security'], rating: 4.1, reviews: 60, availability: 'Available' },
  { id: 'pg20', title: 'Royal Comfort PG', price: '₹17,500', location: 'Model Town, Delhi', gender: 'Unisex', roomType: 'Single', amenities: ['WiFi','AC','Meals','Gym','Parking'], rating: 4.7, reviews: 170, availability: 'Available' },
  { id: 'pg21', title: 'Silver Nest PG', price: '₹11,000', location: 'Mukherjee Nagar, Delhi', gender: 'Boys', roomType: 'Double', amenities: ['WiFi','Food','Laundry','Security'], rating: 4.2, reviews: 72, availability: 'Available' },
  { id: 'pg22', title: 'Cozy Corner PG', price: '₹9,800', location: 'Vijay Nagar, Delhi', gender: 'Girls', roomType: 'Triple', amenities: ['WiFi','Meals','Laundry'], rating: 4.0, reviews: 50, availability: 'Available' },
  { id: 'pg23', title: 'Urban Elite PG', price: '₹18,500', location: 'GTB Nagar, Delhi', gender: 'Unisex', roomType: 'Single', amenities: ['WiFi','AC','Meals','Gym','Security'], rating: 4.8, reviews: 210, availability: 'Few Rooms Left' },
  { id: 'pg24', title: 'Comfort Plus PG', price: '₹12,500', location: 'Kamla Nagar, Delhi', gender: 'Unisex', roomType: 'Double', amenities: ['WiFi','AC','Food','Laundry'], rating: 4.3, reviews: 95, availability: 'Available' },
  { id: 'pg25', title: 'Happy Stay PG', price: '₹8,000', location: 'Roop Nagar, Delhi', gender: 'Boys', roomType: 'Triple', amenities: ['WiFi','Food','Laundry'], rating: 3.8, reviews: 30, availability: 'Available' },
  { id: 'pg26', title: 'Student Comfort PG', price: '₹10,800', location: 'Shakti Nagar, Delhi', gender: 'Girls', roomType: 'Double', amenities: ['WiFi','Meals','Laundry','Security'], rating: 4.1, reviews: 60, availability: 'Available' },
  { id: 'pg27', title: 'Blue Sky PG', price: '₹13,200', location: 'Mukherjee Nagar, Delhi', gender: 'Unisex', roomType: 'Single', amenities: ['WiFi','AC','Food','CCTV'], rating: 4.4, reviews: 100, availability: 'Available' },
  { id: 'pg28', title: 'Metro Life PG', price: '₹15,000', location: 'GTB Nagar, Delhi', gender: 'Unisex', roomType: 'Double', amenities: ['WiFi','AC','Meals','Laundry','Security'], rating: 4.5, reviews: 130, availability: 'Few Rooms Left' },
  { id: 'pg29', title: 'Smart Living PG', price: '₹11,200', location: 'Model Town, Delhi', gender: 'Boys', roomType: 'Double', amenities: ['WiFi','Food','Laundry','Geyser'], rating: 4.2, reviews: 80, availability: 'Available' },
  { id: 'pg30', title: 'Elite Student PG', price: '₹16,800', location: 'Kamla Nagar, Delhi', gender: 'Girls', roomType: 'Single', amenities: ['WiFi','AC','Meals','Housekeeping','Security'], rating: 4.7, reviews: 160, availability: 'Available' },
];

export const pgListings = raw.map((p, i) => {
  const area = areaInfo[p.location] || { distance: 'Near North Campus', metro: 'Near Delhi Metro', tags: ['Student Friendly'] };
  const prefix = areaPhones[p.location] || '99999';
  const suffix = String(33000 + i).slice(1);
  return {
    ...p,
    period: '/month',
    image: img(i),
    images: [img(i), img(i + 1), img(i + 2)],
    description: descriptions[i % descriptions.length],
    distance: area.distance,
    metro: area.metro,
    tags: area.tags,
    phone: `+91 ${prefix} ${suffix}`,
    badge: p.rating >= 4.7 ? 'Premium' : p.price < 9000 ? 'Budget' : p.availability === 'Few Rooms Left' ? 'Popular' : undefined,
  };
});
