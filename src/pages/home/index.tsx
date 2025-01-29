import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, setPage } from '../../features/reservationsSlice';
import {
  Container,
  Typography,
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Card,
} from '@mui/material';
import { RootState, AppDispatch } from '../../store/store';
import ReservationModal from '../../components/ReservationModal';
import { Reservation } from '../../types/reservation.type';
import { ReservationCard } from '@/components/ReservationCard';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { setUser } from '@/features/usersSlice';
import DateFilter from '@/components/DateFilter/DateFilter';
import { Hero } from '@/components/Hero/Hero';

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error, page, limit, total } = useSelector((state: RootState) => state.reservations);
  const { username, isAdmin } = useSelector((state: RootState) => state.users);

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Tarih state'leri
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch(setUser({ user: parsedUser }));
    }

    // Rezervasyonları çek
    dispatch(fetchReservations({ startDate, endDate, page, limit })); 
  }, [dispatch, page, startDate, endDate]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  const handleRowClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
    {/* Header */}
    <Header username={username ?? "Guest"} isAdmin={isAdmin} />

    {/* Hero Görseli */}
    <Box sx={{ width: '100%', height: 'auto', position: 'relative' }}>
      <Hero />
    </Box>

    <Container maxWidth="xl" disableGutters sx={{ px: 0 }}> {/* Daha geniş alan için maxWidth="xl" ve padding sıfırlama */}
      <Box sx={{ width: '100%', p: 2 }}>
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </Box>

      {/* Yükleniyor durumu */}
      {status === 'loading' && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Hata durumu */}
      {status === 'failed' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Başarılı durum */}
      {status === 'succeeded' && (
        <>
          {/* Kartlar Şeklinde Rezervasyon Listesi */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            {data.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onClick={() => handleRowClick(reservation)}
              />
            ))}
          </Box>

          {/* Sayfalama */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
            <Pagination
              count={Math.ceil(total / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}

      {/* Modal */}
      <ReservationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        reservation={selectedReservation}
      />
    </Container>

    {/* Footer */}
    <Footer />
    </Box>
  );
}
