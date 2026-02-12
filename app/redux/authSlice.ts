import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3001/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        return rejectWithValue("Not authenticated");
      }

      return await res.json();
    } catch (err) {
      return rejectWithValue("Network error");
    }
  }
);

interface AuthState {
  loggedIn: boolean;
  userEmail: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
  userEmail: null,
  loading: true, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.userEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedIn = true;
        state.userEmail = action.payload?.user?.email ?? null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.userEmail = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
