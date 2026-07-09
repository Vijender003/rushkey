import api from '@/lib/axios';

export const getAdminReviews = (params) => api.get('/admin/reviews', { params });
export const deleteReview = (id) => api.delete(`/reviews/${id}`);
