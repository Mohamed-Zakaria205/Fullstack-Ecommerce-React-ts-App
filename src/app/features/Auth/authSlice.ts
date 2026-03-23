import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../interfaces";
import { Cookies } from "react-cookie";
export interface AuthState {
  user: IUser | null;
  jwt: string | null;
  isAuthenticated: boolean;
}

const cookies = new Cookies();
const initialState: AuthState = {
  user: null,
  jwt: cookies.get("token") || null,
  isAuthenticated: cookies.get("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: IUser; jwt: string }>,
    ) => {
      state.user = action.payload.user;
      state.jwt = action.payload.jwt;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
