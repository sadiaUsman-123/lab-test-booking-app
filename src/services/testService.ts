import AsyncStorage from "@react-native-async-storage/async-storage";
import testsData from "../data/tests.json";
import { Booking, LabTest } from "../types/test";

const BOOKINGS_KEY = "bookings";

export async function getTests(): Promise<LabTest[]> {
  // fake delay taake loading state nazar aaye
  await new Promise((resolve) => setTimeout(resolve, 800));
  return testsData as LabTest[];
}

export async function getTestById(id: string): Promise<LabTest | undefined> {
  const tests = await getTests();
  return tests.find((t) => t.id === id);
}

export async function getBookings(): Promise<Booking[]> {
  const raw = await AsyncStorage.getItem(BOOKINGS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addBooking(data: Omit<Booking, "id">): Promise<void> {
  const bookings = await getBookings();
  const newBooking: Booking = { ...data, id: Date.now().toString() };
  await AsyncStorage.setItem(
    BOOKINGS_KEY,
    JSON.stringify([...bookings, newBooking])
  );
}
