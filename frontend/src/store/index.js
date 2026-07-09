import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import propertyReducer from '@/features/properties/propertySlice';
import bookingReducer from '@/features/bookings/bookingSlice';
import reviewReducer from '@/features/reviews/reviewSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertyReducer,
    bookings: bookingReducer,
    reviews: reviewReducer,
  },
  devTools: import.meta.env.DEV,
});
