import api from '@/lib/axios';

export const getAdminBookings = (params) => api.get('/admin/bookings', { params });
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
