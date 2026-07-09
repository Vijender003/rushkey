const STORAGE_KEY = 'pg_captured_leads';

function getAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveAll(leads) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function saveLead({ name, phone, pgId, pgTitle }) {
  const leads = getAll();
  const existing = leads.find((l) => l.pgId === pgId && l.phone === phone);
  if (existing) return existing;

  const lead = {
    id: `lead-${Date.now()}`,
    name,
    phone,
    pgId,
    pgTitle,
    date: new Date().toISOString().split('T')[0],
    contacted: false,
    createdAt: new Date().toISOString(),
  };
  leads.unshift(lead);
  saveAll(leads);
  return lead;
}

export function getCapturedLeads() {
  return getAll();
}

export function hasLeadForProperty(pgId) {
  return getAll().some((l) => l.pgId === pgId);
}

export function getLeadForProperty(pgId) {
  return getAll().find((l) => l.pgId === pgId) || null;
}

export function markLeadContacted(id) {
  const leads = getAll().map((l) =>
    l.id === id ? { ...l, contacted: !l.contacted } : l
  );
  saveAll(leads);
}

export function deleteLead(id) {
  saveAll(getAll().filter((l) => l.id !== id));
}

const ownerDatabase = {
  'GTB Nagar, Delhi': { name: 'Mr. Sharma', phone: '+91 98102 33445', address: 'GTB Nagar, Delhi - 110009, Near Metro Gate 2' },
  'Kamla Nagar, Delhi': { name: 'Mrs. Gupta', phone: '+91 98710 22334', address: 'Kamla Nagar, Delhi - 110007, Opposite Aggarwal Sweets' },
  'Vijay Nagar, Delhi': { name: 'Mr. Mehta', phone: '+91 99112 44556', address: 'Vijay Nagar, Delhi - 110009, Lane behind Garg Medical Store' },
  'Mukherjee Nagar, Delhi': { name: 'Mr. Kapoor', phone: '+91 98990 11223', address: 'Mukherjee Nagar, Delhi - 110009, Near Batra Cinema' },
  'Model Town, Delhi': { name: 'Mrs. Arora', phone: '+91 99554 33445', address: 'Model Town, Delhi - 110009, Block C-2' },
  'Roop Nagar, Delhi': { name: 'Mr. Singh', phone: '+91 99775 55667', address: 'Roop Nagar, Delhi - 110007, Near GPO' },
  'Shakti Nagar, Delhi': { name: 'Mrs. Jain', phone: '+91 98880 77889', address: 'Shakti Nagar, Delhi - 110007, Main Road' },
};

export function getOwnerInfo(location) {
  const key = Object.keys(ownerDatabase).find((k) => location?.includes(k));
  return ownerDatabase[key] || { name: 'Property Owner', phone: '+91 99999 88888', address: location || 'Delhi, India' };
}
