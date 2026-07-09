import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPropertyReviewsAPI, createReviewAPI, deleteReviewAPI } from './reviewAPI';

export const fetchPropertyReviews = createAsyncThunk(
  'reviews/fetchPropertyReviews',
  async ({ propertyId, params }, { rejectWithValue }) => {
    try {
      const response = await getPropertyReviewsAPI(propertyId, params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reviews');
    }
  }
);

export const addReview = createAsyncThunk(
  'reviews/addReview',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createReviewAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

export const removeReview = createAsyncThunk(
  'reviews/removeReview',
  async (id, { rejectWithValue }) => {
    try {
      await deleteReviewAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete review');
    }
  }
);

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReviewError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews || action.payload.data || [];
      })
      .addCase(fetchPropertyReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        const review = action.payload.review || action.payload.data || action.payload;
        state.reviews.unshift(review);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter((r) => r._id !== action.payload);
      })
      .addCase(removeReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;
