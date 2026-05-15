import apiClient from './apiClient';

export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  return response.data;
};

export const registerUser = async ({ name, email, password, role = 'patient' }) => {
  const response = await apiClient.post('/api/auth/register', {
    name,
    email,
    password,
    role,
  });

  return response.data;
};
