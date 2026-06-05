import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type Role = 'RESIDENT' | 'EMPLOYEE' | 'DEPARTMENT_ADMIN' | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_verified: boolean;
  token: string;
  user_roles: {
    role: {
      id: string;
      name: Role;
    };
  }[];
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || 'Login failed.');

      // ✅ extract from nested structure
      const { user, access_token } = json.data;
      return { ...user, token: access_token } as AuthUser & { token: string };
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Login failed.');
    }
  }
);

export const registerResident = createAsyncThunk(
  'auth/register',
  async (
    payload: { email: string; password: string; phone_number: string;},
    { rejectWithValue }
  ) => {
    try {
      // derive username from email (part before @) so the field is not exposed in the form
      const username = payload.email.split('@')[0].replace(/[^a-z0-9_]/gi, '_');

      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, username }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Registration failed.');
      return data as AuthUser;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Registration failed.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', (action.payload as any).token);
  }
})
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerResident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerResident.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('auth_token', action.payload.token);
        }
      })
      .addCase(registerResident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;