import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createBookingAPI,
  getMyBookingsAPI,
  getBookingByIdAPI,
  updateBookingStatusAPI,
} from './bookingAPI';

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createBookingAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Booking failed');
    }
  }
);

export const fetchMyBookings = createAsyncThunk(
  'bookings/fetchMyBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyBookingsAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBookingByIdAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch booking');
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateBookingStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await updateBookingStatusAPI(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update booking');
    }
  }
);

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    booking: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingError(state) {
      state.error = null;
    },
    clearCurrentBooking(state) {
      state.booking = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        const booking = action.payload.booking || action.payload.data || action.payload;
        state.bookings.unshift(booking);
        state.booking = booking;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings || action.payload.data || [];
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.booking || action.payload.data || action.payload;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBookingStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.booking || action.payload.data || action.payload;
        const index = state.bookings.findIndex((b) => b._id === updated._id);
        if (index !== -1) state.bookings[index] = updated;
        if (state.booking?._id === updated._id) state.booking = updated;
      })
      .addCase(updateBookingStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBookingError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
