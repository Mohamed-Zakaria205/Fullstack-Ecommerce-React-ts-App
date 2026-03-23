import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
export interface GlobalState {
  isCartDrawerOpen: boolean;
}

const initialState: GlobalState = {
  isCartDrawerOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleCartDrawerAction: (state) => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
    setCartDrawerAction: (state, action: PayloadAction<boolean>) => {
      state.isCartDrawerOpen = action.payload;
    },
  },
});

export const { toggleCartDrawerAction, setCartDrawerAction } =
  globalSlice.actions;

export default globalSlice.reducer;
