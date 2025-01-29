import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'Bir hata oluştu.';

    if (error.response) {
      const { message, errorCode } = error.response.data;

      if (errorCode === 'INVALID_CREDENTIALS') {
        errorMessage = message || 'Kullanıcı adı ya da şifre hatalı.';
      } else {
        errorMessage = message || 'Beklenmedik bir hata oluştu.';
      }
    } else {
      errorMessage = 'Ağ hatası. Lütfen internet bağlantınızı kontrol edin.';
    }

    return Promise.reject(errorMessage);
  }
);

export default api;
