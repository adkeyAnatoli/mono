import { configureStore } from "@reduxjs/toolkit";
import { dataAPI } from "./slice/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [dataAPI.reducerPath]: dataAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataAPI.middleware),
});
setupListeners(store.dispatch);
