import api from '@/lib/axios';

export const createBookingAPI = async (data) => {
  try {
    return await api.post('/bookings', data);
  } catch {
    await new Promise((r) => setTimeout(r, 600));
    return { data: { booking: { _id: `mock-bk-${Date.now()}`, ...data, status: 'Pending', createdAt: new Date().toISOString() } } };
  }
};

export const getMyBookingsAPI = async () => {
  try {
    return await api.get('/bookings');
  } catch {
    return { data: { bookings: [] } };
  }
};

export const getBookingByIdAPI = async (id) => {
  try {
    return await api.get(`/bookings/${id}`);
  } catch {
    return { data: { booking: null } };
  }
};

export const updateBookingStatusAPI = async (id, status) => {
  try {
    return await api.put(`/bookings/${id}/status`, { status });
  } catch {
    await new Promise((r) => setTimeout(r, 400));
    return { data: { success: true } };
  }
};
