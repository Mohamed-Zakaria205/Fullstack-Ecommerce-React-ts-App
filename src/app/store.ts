import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./services/api";
import cartReducer from "./features/cart/cartSlice";
import globalReducer from "./features/global/globalSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const storage = {
  getItem(key: string) {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    return Promise.resolve(value);
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistConfig, cartReducer);
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistedCart,
    global: globalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
