import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../../interfaces";
import { addItemToShoppingCart } from "../../../utils/functions";
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
      state.items = addItemToShoppingCart(state.items, action.payload);
    },

    removeFromCartAction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.documentId !== action.payload,
      );
    },

    clearCartAction: (state) => {
      state.items = [];
    },
  },
});

export const { addToCartAction, removeFromCartAction, clearCartAction } =
  cartSlice.actions;

export default cartSlice.reducer;
