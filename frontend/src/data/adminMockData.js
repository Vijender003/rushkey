import { pgListings } from './pgListings';

const STORAGE_KEYS = {
  listings: 'admin_listings',
  users: 'admin_users',
  leads: 'admin_leads',
};

const defaultListings = pgListings.slice(0, 8).map((p, i) => ({
  id: `adm-${i + 1}`,
  title: p.title,
  price: p.price,
  location: p.location,
  gender: p.gender,
  roomType: p.roomType,
  amenities: p.amenities,
  description: p.description,
  image: p.image,
  availability: p.availability,
  status: 'Active',
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

const defaultUsers = [
  { id: 'usr-1', name: 'Rohit Malhotra', email: 'rohit.m@email.com', phone: '+91-9876543210', joined: '2026-06-15', blocked: false },
  { id: 'usr-2', name: 'Neha Kapoor', email: 'neha.k@email.com', phone: '+91-9876543211', joined: '2026-06-18', blocked: false },
  { id: 'usr-3', name: 'Vikram Singh', email: 'vikram.s@email.com', phone: '+91-9876543212', joined: '2026-06-20', blocked: false },
  { id: 'usr-4', name: 'Anjali Mehra', email: 'anjali.m@email.com', phone: '+91-9876543213', joined: '2026-06-22', blocked: true },
  { id: 'usr-5', name: 'Arun Nambiar', email: 'arun.n@email.com', phone: '+91-9876543214', joined: '2026-06-25', blocked: false },
  { id: 'usr-6', name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+91-9876543215', joined: '2026-07-01', blocked: false },
  { id: 'usr-7', name: 'Suresh Reddy', email: 'suresh.r@email.com', phone: '+91-9876543216', joined: '2026-07-02', blocked: false },
  { id: 'usr-8', name: 'Kiran Desai', email: 'kiran.d@email.com', phone: '+91-9876543217', joined: '2026-07-04', blocked: false },
];

const defaultLeads = [
  { id: 'lead-1', name: 'Amit Verma', phone: '+91-9988776655', listing: 'Fully Furnished Boys PG near Cyber City', budget: '₹8,000 - ₹10,000', message: 'Need immediate move-in. Working at Google Cyber City.', date: '2026-07-05', contacted: false },
  { id: 'lead-2', name: 'Pooja Iyer', phone: '+91-9988776644', listing: 'Budget Friendly Girls PG with Meals', budget: '₹5,000 - ₹7,000', message: 'Looking for a safe girls PG near Sector 15 market.', date: '2026-07-06', contacted: false },
  { id: 'lead-3', name: 'Deepak Joshi', phone: '+91-9988776633', listing: 'Premium Co-Living Studio near MG Road Metro', budget: '₹12,000 - ₹15,000', message: 'Interested in premium co-living. Want to visit this weekend.', date: '2026-07-06', contacted: true },
  { id: 'lead-4', name: 'Sneha Patel', phone: '+91-9988776622', listing: 'Executive Single Room in DLF Phase 2', budget: '₹10,000 - ₹13,000', message: 'Relocating from Mumbai. Need a single room urgently.', date: '2026-07-07', contacted: false },
  { id: 'lead-5', name: 'Rahul Gupta', phone: '+91-9988776611', listing: 'Modern Unisex PG near Sohna Road', budget: '₹7,000 - ₹9,000', message: 'Starting job at Deloitte Sohna Road. Looking for sharing.', date: '2026-07-08', contacted: false },
];

function seedStorage(key, defaults) {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(defaults));
  }
}

export function seedMockData() {
  seedStorage(STORAGE_KEYS.listings, defaultListings);
  seedStorage(STORAGE_KEYS.users, defaultUsers);
  seedStorage(STORAGE_KEYS.leads, defaultLeads);
}

export function getListings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.listings) || '[]');
}

export function getListingById(id) {
  return getListings().find((l) => l.id === id) || null;
}

export function saveListing(listing) {
  const listings = getListings();
  if (listing.id) {
    const idx = listings.findIndex((l) => l.id === listing.id);
    if (idx !== -1) {
      listings[idx] = { ...listings[idx], ...listing };
    }
  } else {
    listing.id = `adm-${Date.now()}`;
    listing.createdAt = new Date().toISOString();
    listing.status = 'Active';
    listings.unshift(listing);
  }
  localStorage.setItem(STORAGE_KEYS.listings, JSON.stringify(listings));
  return listing;
}

export function deleteListing(id) {
  const listings = getListings().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEYS.listings, JSON.stringify(listings));
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
}

export function toggleBlockUser(id) {
  const users = getUsers().map((u) =>
    u.id === id ? { ...u, blocked: !u.blocked } : u
  );
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

export function deleteUser(id) {
  const users = getUsers().filter((u) => u.id !== id);
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

export function getLeads() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.leads) || '[]');
}

export function markLeadContacted(id) {
  const leads = getLeads().map((l) =>
    l.id === id ? { ...l, contacted: !l.contacted } : l
  );
  localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));
}

export function deleteLead(id) {
  const leads = getLeads().filter((l) => l.id !== id);
  localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));
}
