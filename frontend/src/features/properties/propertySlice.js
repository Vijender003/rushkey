import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  listPropertiesAPI,
  getPropertyByIdAPI,
  createPropertyAPI,
  updatePropertyAPI,
  deletePropertyAPI,
  getMyPropertiesAPI,
} from './propertyAPI';

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (params, { rejectWithValue }) => {
    try {
      const response = await listPropertiesAPI(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch properties');
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchPropertyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getPropertyByIdAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch property');
    }
  }
);

export const addProperty = createAsyncThunk(
  'properties/addProperty',
  async (data, { rejectWithValue }) => {
    try {
      const response = await createPropertyAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create property');
    }
  }
);

export const editProperty = createAsyncThunk(
  'properties/editProperty',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updatePropertyAPI(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update property');
    }
  }
);

export const removeProperty = createAsyncThunk(
  'properties/removeProperty',
  async (id, { rejectWithValue }) => {
    try {
      await deletePropertyAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete property');
    }
  }
);

export const fetchMyProperties = createAsyncThunk(
  'properties/fetchMyProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyPropertiesAPI();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch your properties');
    }
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    properties: [],
    property: null,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    clearPropertyError(state) {
      state.error = null;
    },
    clearCurrentProperty(state) {
      state.property = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties || action.payload.data || [];
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || action.payload.page || 1;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.property = action.payload.property || action.payload.data || action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.unshift(action.payload.property || action.payload.data || action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.property || action.payload.data || action.payload;
        const index = state.properties.findIndex((p) => p._id === updated._id);
        if (index !== -1) state.properties[index] = updated;
        if (state.property?._id === updated._id) state.property = updated;
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter((p) => p._id !== action.payload);
      })
      .addCase(removeProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties || action.payload.data || [];
      })
      .addCase(fetchMyProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPropertyError, clearCurrentProperty } = propertySlice.actions;
export default propertySlice.reducer;
