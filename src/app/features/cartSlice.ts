import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../interfaces";
export interface CartState {
  items: IProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (state, action: PayloadAction<IProduct>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { addToCartAction } = cartSlice.actions;

export default cartSlice.reducer;
