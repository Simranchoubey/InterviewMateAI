import api from './api';

const interviewService = {
  async startInterview(role, difficulty) {
    const response = await api.post('/interview/start', { role, difficulty });
    return response.data;
  },

  async submitAnswers(interviewId, answers) {
    const response = await api.post('/interview/answer', { interviewId, answers });
    return response.data;
  },

  async getResult(interviewId) {
    const response = await api.get('/interview/result', {
      params: { interviewId }
    });
    return response.data;
  }
};

export default interviewService;