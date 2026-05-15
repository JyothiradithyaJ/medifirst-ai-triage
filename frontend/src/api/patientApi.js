import apiClient from './apiClient';

export const createPatient = async (patient) => {
  const response = await apiClient.post('/api/patients/', patient);
  return response.data.patient;
};

export const getPatients = async () => {
  const response = await apiClient.get('/api/patients/');
  return response.data.patients;
};

export const getPatient = async (patientId) => {
  const response = await apiClient.get(`/api/patients/${patientId}`);
  return response.data.patient;
};
