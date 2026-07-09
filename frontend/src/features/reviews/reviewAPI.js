import api from '@/lib/axios';

const mockReviews = [
  { _id: 'r1', user: { name: 'Rohit Malhotra', avatar: 'RM' }, rating: 5, comment: 'Great PG, clean rooms and amazing food. Close to the university. Highly recommended for anyone looking near North Campus.', createdAt: '2026-06-15T10:00:00Z' },
  { _id: 'r2', user: { name: 'Priya Sharma', avatar: 'PS' }, rating: 4, comment: 'Good location and the staff is very cooperative. Rooms could be slightly bigger but overall a solid choice.', createdAt: '2026-06-20T14:30:00Z' },
  { _id: 'r3', user: { name: 'Arun Verma', avatar: 'AV' }, rating: 5, comment: 'Best PG I have stayed in. WiFi is super fast, food is home-like. The caretaker is available 24/7.', createdAt: '2026-07-01T09:15:00Z' },
  { _id: 'r4', user: { name: 'Sneha Patel', avatar: 'SP' }, rating: 4, comment: 'Safe and secure girls PG. The landlady is very understanding. Weekly cleaning keeps everything tidy.', createdAt: '2026-07-05T16:45:00Z' },
  { _id: 'r5', user: { name: 'Deepak Joshi', avatar: 'DJ' }, rating: 3, comment: 'Decent place for the price. AC works well. Food could be better but quantity is good.', createdAt: '2026-07-08T11:20:00Z' },
];

export const getPropertyReviewsAPI = async (propertyId, params) => {
  try {
    return await api.get(`/reviews/property/${propertyId}`, { params });
  } catch {
    await new Promise((r) => setTimeout(r, 400));
    const count = 2 + Math.floor(Math.random() * 4);
    return { data: { reviews: mockReviews.slice(0, count), total: count } };
  }
};

export const createReviewAPI = async (data) => {
  try {
    return await api.post('/reviews', data);
  } catch {
    await new Promise((r) => setTimeout(r, 500));
    return { data: { review: { _id: `mr-${Date.now()}`, user: { name: 'You', avatar: 'U' }, ...data, createdAt: new Date().toISOString() } } };
  }
};

export const deleteReviewAPI = async (id) => {
  try {
    return await api.delete(`/reviews/${id}`);
  } catch {
    await new Promise((r) => setTimeout(r, 300));
    return { data: { success: true } };
  }
};
