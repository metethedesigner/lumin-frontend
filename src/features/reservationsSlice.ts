import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../src/utils/api';

interface Passenger {
    name: string;
    age: number;
    seatNumber: string;
  }
  
  interface Reservation {
    id: string;
    flightNumber: string;
    departureTime: { _seconds: number; _nanoseconds: number };
    arrivalTime: { _seconds: number; _nanoseconds: number };
    passengers: Passenger[];
  }

  interface ReservationsState {
    data: Reservation[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    page: number;
    limit: number;
    total: number;
  }

  const initialState: ReservationsState = {
    data: [],
    status: 'idle',
    error: null,
    page: 1,
    limit: 5,
    total: 0,
  };

  export const fetchReservations = createAsyncThunk(
    'reservations/fetchReservations',
    async ({ startDate, endDate, page, limit }: { startDate: string; endDate: string; page: number; limit: number }, { getState }) => {
      const response = await api.get(`/reservations?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`);
      return response.data; // API'den gelen verileri döndür
    }
  );

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data; 
        state.total = action.payload.total; 
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch reservations';
      });
  },
});

export const { setPage } = reservationsSlice.actions;
export default reservationsSlice.reducer;