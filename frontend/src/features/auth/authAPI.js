import api from '@/lib/axios';

export const loginUserAPI = (data) => api.post('/auth/login', data);

export const registerUserAPI = (data) => api.post('/auth/register', data);

export const logoutUserAPI = () => api.get('/auth/logout');

export const getCurrentUserAPI = () => api.get('/auth/me');

export const updateUserProfileAPI = (data) => api.put('/auth/me', data);
