import api from '@/lib/axios';
import { filterPGs, getPGById } from '@/services/pgService';
import { pgListings } from '@/data/pgListings';

export const listPropertiesAPI = async (params) => {
  try {
    return await api.get('/properties', { params });
  } catch {
    const results = await filterPGs(params || {});
    return { data: { properties: results, totalPages: 1, currentPage: 1, page: 1 } };
  }
};

export const getPropertyByIdAPI = async (id) => {
  try {
    return await api.get(`/properties/${id}`);
  } catch {
    const pg = pgListings.find((p) => p.id === id) || (await getPGById(id));
    return { data: { property: { ...pg, images: pg.images || [pg.image], rules: ['No Smoking', 'No Guests after 10 PM', 'Maintain Silence after 9 PM'] } } };
  }
};

export const createPropertyAPI = async (data) => {
  try {
    return await api.post('/properties', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch {
    await new Promise((r) => setTimeout(r, 500));
    return { data: { property: { id: `mock-${Date.now()}`, ...data } } };
  }
};

export const updatePropertyAPI = async (id, data) => {
  try {
    return await api.put(`/properties/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch {
    await new Promise((r) => setTimeout(r, 500));
    return { data: { property: { _id: id, ...data } } };
  }
};

export const deletePropertyAPI = async (id) => {
  try {
    return await api.delete(`/properties/${id}`);
  } catch {
    await new Promise((r) => setTimeout(r, 300));
    return { data: { success: true } };
  }
};

export const getMyPropertiesAPI = async () => {
  try {
    return await api.get('/properties/owner/me');
  } catch {
    return { data: { properties: [] } };
  }
};
