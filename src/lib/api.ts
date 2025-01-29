import axios from 'axios';
import { Reservation } from '../types';

const API_URL = 'http://localhost:3000'; // Nest.js backend URL'si

export const getReservations = async (token: string): Promise<Reservation[]> => {
  const response = await axios.get(`${API_URL}/reservations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};