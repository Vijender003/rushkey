import api from '@/lib/axios';

export const createBookingAPI = (data) => api.post('/bookings', data);

export const getMyBookingsAPI = () => api.get('/bookings');

export const getBookingByIdAPI = (id) => api.get(`/bookings/${id}`);

export const updateBookingStatusAPI = (id, status) => api.put(`/bookings/${id}/status`, { status });
