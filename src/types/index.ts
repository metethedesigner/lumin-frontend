export interface Reservation {
    id: string;
    flightNumber: string;
    passengers: Passenger[];
  }
  
  export interface Passenger {
    name: string;
    age: number;
  }
  
  export interface User {
    id: string;
    role: string;
  }