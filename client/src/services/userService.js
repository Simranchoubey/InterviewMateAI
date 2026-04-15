import api from './api';

const userService = {
  async getHistory() {
    const response = await api.get('/user/history');
    return response.data;
  }
};

export default userService;