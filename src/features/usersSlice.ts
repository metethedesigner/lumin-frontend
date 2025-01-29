import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  username: string | null;
  isAdmin: boolean;
}

const initialState: UserState = {
  id: null,
  username: null,
  isAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload)
      state.id = action.payload.user.id;
      state.username = action.payload.user.username;
      state.isAdmin = action.payload.user.is_admin;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.isAdmin = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;