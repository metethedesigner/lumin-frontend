import { AppDispatch } from '../store/store';
import api from '../utils/api';
import { setUser } from '../features/usersSlice';

export const handleLogin = async (username: string, password: string, dispatch: AppDispatch) => {
  try {
    const response = await api.post('/users/login', { username, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch(setUser(response.data)); 
      return response.data.user; 
    }
    return 'Bir hata oluştu.'; 
  } catch (error: any) {
    return error || 'Bir hata oluştu.';
  }
}