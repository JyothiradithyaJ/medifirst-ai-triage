import apiClient from './apiClient';

export const analyzeTriage = async ({
  symptomsText,
  selectedSymptoms = [],
  bodyAreas = [],
  ruralMode = false,
}) => {
  const response = await apiClient.post('/api/triage/analyze', {
    symptoms_text: symptomsText,
    selected_symptoms: selectedSymptoms,
    body_areas: bodyAreas,
    rural_mode: ruralMode,
  });

  return response.data.result;
};
