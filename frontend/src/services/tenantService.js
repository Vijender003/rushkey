import api from '@/lib/axios';

export const getAdminUsers = (params) => api.get('/admin/users', { params });
