import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../interfaces";
import { Cookies } from "react-cookie";
export interface AuthState {
  user: IUser | null;
  jwt: string | null;
}

const cookies = new Cookies();
const initialState: AuthState = {
  user: null,
  jwt: cookies.get("token") || null,
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
    },

    logout: (state) => {
      state.user = null;
      state.jwt = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
