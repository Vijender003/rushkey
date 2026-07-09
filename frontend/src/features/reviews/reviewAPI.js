import api from '@/lib/axios';

export const getPropertyReviewsAPI = (propertyId, params) =>
  api.get(`/reviews/property/${propertyId}`, { params });

export const createReviewAPI = (data) => api.post('/reviews', data);

export const deleteReviewAPI = (id) => api.delete(`/reviews/${id}`);
