import api from '@/lib/axios';

export const getAdminProperties = (params) => api.get('/admin/properties', { params });
export const deleteProperty = (id) => api.delete(`/properties/${id}`);
export const updateProperty = (id, data) => api.put(`/properties/${id}`, data);
