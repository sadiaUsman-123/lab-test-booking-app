export type LabTest = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Booking = {
  id: string;
  testId: string;
  testName: string;
  price: number;
  patientName: string;
  phone: string;
  date: string; // YYYY-MM-DD
};



