import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../interfaces";

export interface AuthState {
  user: IUser | null;
  jwt: string | null;
}

const initialState: AuthState = {
  user: null,
  jwt:
    localStorage.getItem("token") === "undefined"
      ? null
      : localStorage.getItem("token") || null,
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

      localStorage.setItem("token", action.payload.jwt);
    },

    logout: (state) => {
      state.user = null;
      state.jwt = null;

      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
