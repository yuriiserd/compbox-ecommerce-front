import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./slices/filtersSlice";

export const store = configureStore({
  reducer: {
    filtersSelect: filtersSlice,
  }
})