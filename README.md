# Lab Test Booking App

A small mobile app built with React Native (Expo Router) where a patient can browse lab tests, book one, and see their bookings.

## Features

- Test list with name, price and short description (loaded from a local JSON file)
- Loading state while data loads, and an error message if loading fails
- Test detail screen with a Book button
- Booking form with validation:
  - Name is required
  - Phone number must be 11 digits
  - Date cannot be in the past
- My Bookings screen. Bookings are saved with AsyncStorage, so they stay after the app is closed and reopened

## Tech Stack

- React Native with Expo and Expo Router
- TypeScript
- AsyncStorage for local storage

## Project Structure

```
src/
├── app/        # screens and navigation (test list, details, booking form, my bookings)
├── services/   # testService.ts (loads the tests data)
├── types/      # TypeScript types (test.ts)
└── data/       # tests.json (local lab test data)
```

## How to Run

1. Clone the repo:
   ```
   git clone https://github.com/sadiaUsman-123/lab-test-booking-app.git
   cd lab-test-booking-app
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the app:
   ```
   npx expo start
   ```
4. Scan the QR code with the Expo Go app on your phone, or press `a` to open an Android emulator.

## Assumptions

- Phone number is checked only for length (exactly 11 digits).
- Tests data is read from a local JSON file, not from an API.
- The same test can be booked more than once.

## What I Would Add Next

- Search and filter on the test list
- Cancel or edit a booking
- A proper login and authentication system
- A proper date picker and time slots
- Unit tests for the validation logic
- A retry button when loading fails
