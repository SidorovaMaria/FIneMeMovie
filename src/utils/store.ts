import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "../components/Films/filmsSlice";
export const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
});
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
