import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface NetworkState {
  isOnline: boolean;
}

const initialState: NetworkState = {
  isOnline: navigator.onLine,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
  },
});

export const { setNetworkStatus } = networkSlice.actions;

export default networkSlice.reducer;
