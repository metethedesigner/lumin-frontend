export interface Passenger {
    name: string;
    age: number;
    seatNumber: string;
  }
  
  export interface Reservation {
    id: string;
    flightNumber: string;
    departureTime: { _seconds: number; _nanoseconds: number };
    arrivalTime: { _seconds: number; _nanoseconds: number };
    passengers: Passenger[];
  }