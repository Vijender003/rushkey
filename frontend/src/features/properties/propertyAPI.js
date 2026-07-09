import api from '@/lib/axios';

export const listPropertiesAPI = (params) => api.get('/properties', { params });

export const getPropertyByIdAPI = (id) => api.get(`/properties/${id}`);

export const createPropertyAPI = (data) =>
  api.post('/properties', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updatePropertyAPI = (id, data) =>
  api.put(`/properties/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deletePropertyAPI = (id) => api.delete(`/properties/${id}`);

export const getMyPropertiesAPI = () => api.get('/properties/owner/me');
