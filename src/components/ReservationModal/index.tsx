import { Modal, Box, Typography, List, ListItem, ListItemText, Button, Paper, ListItemIcon } from '@mui/material';
import { Reservation } from '../../types/reservation.type';
import FlightIcon from '@mui/icons-material/Flight';

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  reservation: Reservation | null;
}

const ReservationModal = ({ open, onClose, reservation }: ReservationModalProps) => {
  if (!reservation) return null;

  const aiComments = [
    'This reservation is likely to be on time.',
    'The passengers have a balanced age distribution.',
    'Consider offering a meal upgrade for this flight.',
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="reservation-modal">
        <Typography variant="h6" className="modal-title">
          Reservation Details
        </Typography>
        <Typography variant="body1">
          <strong>Flight Number:</strong> {reservation.flightNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Departure:</strong>{' '}
          {new Date(reservation.departureTime._seconds * 1000).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          <strong>Arrival:</strong>{' '}
          {new Date(reservation.arrivalTime._seconds * 1000).toLocaleString()}
        </Typography>

        <Typography variant="body1" className="passenger-list">
          <strong>Passengers:</strong>
        </Typography>
        <List>
          {reservation?.passengers?.length > 0 ? (
            reservation.passengers.map((passenger, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <FlightIcon />
                </ListItemIcon>
                <ListItemText
                  primary={passenger.name}
                  secondary={`Age: ${passenger.age}, Seat: ${passenger.seatNumber}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="-Geçersiz yetki" />
            </ListItem>
          )}
        </List>

        <Typography variant="h6" className="ai-comments">
          AI Comments
        </Typography>
        <List>
          {aiComments.map((comment, index) => (
            <ListItem key={index}>
              <Paper elevation={1} className="comment-item">
                <ListItemText primary={comment} />
              </Paper>
            </ListItem>
          ))}
        </List>

        <Box className="close-btn">
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReservationModal;
