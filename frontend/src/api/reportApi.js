import apiClient from './apiClient';

export const saveReport = async (report) => {
  const response = await apiClient.post('/api/reports/', report);
  return response.data.report;
};

export const getReports = async () => {
  const response = await apiClient.get('/api/reports/');
  return response.data.reports;
};

export const downloadReportPdf = async (reportId) => {
  const response = await apiClient.get(`/api/reports/${reportId}/download`, {
    responseType: 'blob',
  });

  return response.data;
};
