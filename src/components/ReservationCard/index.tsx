import { Reservation } from '../../types/reservation.type';
import { Card, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

interface ReservationCardProps {
  reservation: Reservation;
  onClick: () => void;
}

const getRandomAirplaneImage = () => {
  const images = [
    '/images/airplanes/flight1.jpg',
    '/images/airplanes/flight2.jpg',
    '/images/airplanes/flight3.jpg',
    '/images/airplanes/flight4.jpg',
    '/images/airplanes/flight5.jpg',
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export const ReservationCard = ({ reservation, onClick }: ReservationCardProps) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const randomImage = getRandomAirplaneImage();
    setImageUrl(randomImage);
  }, []);

  return (
    <Card className="reservation-card" onClick={onClick}>
      {/* Görsel */}
      <Box
        component="img"
        src={imageUrl}
        alt="Airplane"
      />

      {/* Rezervasyon Bilgileri */}
      <Box className="reservation-card-content">
        <Typography variant="h6" component="div">
          {reservation.flightNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Departure:</strong> {new Date(reservation.departureTime._seconds * 1000).toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Arrival:</strong> {new Date(reservation.arrivalTime._seconds * 1000).toLocaleString()}
        </Typography>
        {reservation?.passengers?.length > 0 && (
          <Typography variant="body2" color="text.secondary">
            <strong>Passengers:</strong> {reservation?.passengers?.map((p) => p.name).join(', ')}
          </Typography>
        )}
      </Box>
    </Card>
  );
};