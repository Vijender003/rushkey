import api from '@/lib/axios';

export const getAdminStats = () => api.get('/admin/stats');
