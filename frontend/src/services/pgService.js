import { pgListings } from '@/data/pgListings';

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[₹,]/g, ''), 10);
}

export async function getAllPGs() {
  await delay(400);
  return [...pgListings];
}

export async function getPGById(id) {
  await delay(300);
  const pg = pgListings.find((p) => p.id === id);
  if (!pg) throw new Error('Listing not found');
  return { ...pg };
}

export async function searchPGs(query) {
  await delay(300);
  const q = query.toLowerCase().trim();
  if (!q) return [...pgListings];
  return pgListings.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.amenities.some((a) => a.toLowerCase().includes(q))
  );
}

export async function filterPGs(filters = {}) {
  await delay(400);
  let results = [...pgListings];

  if (filters.gender && filters.gender !== 'All') {
    results = results.filter((p) => p.gender.toLowerCase() === filters.gender.toLowerCase());
  }

  if (filters.roomType && filters.roomType !== 'All') {
    results = results.filter((p) => p.roomType.toLowerCase() === filters.roomType.toLowerCase());
  }

  if (filters.minPrice) {
    const min = parseInt(filters.minPrice, 10);
    results = results.filter((p) => parsePrice(p.price) >= min);
  }

  if (filters.maxPrice) {
    const max = parseInt(filters.maxPrice, 10);
    results = results.filter((p) => parsePrice(p.price) <= max);
  }

  if (filters.minRating) {
    const min = parseFloat(filters.minRating);
    results = results.filter((p) => p.rating >= min);
  }

  if (filters.availability && filters.availability !== 'All') {
    results = results.filter((p) => p.availability === filters.availability);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((p) =>
      filters.amenities.every((a) =>
        p.amenities.some((pa) => pa.toLowerCase().includes(a.toLowerCase()))
      )
    );
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.amenities.some((a) => a.toLowerCase().includes(q))
    );
  }

  if (filters.sort) {
    switch (filters.sort) {
      case 'price_low':
        results.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price_high':
        results.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviews - a.reviews);
        break;
    }
  }

  return results;
}

export async function getFeaturedPGs(limit = 6) {
  await delay(300);
  return [...pgListings]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}
