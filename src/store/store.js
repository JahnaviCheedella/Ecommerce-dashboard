import { configureStore } from "@reduxjs/toolkit";
import { ecommerceReducer } from "./ecommerceSlice";

export const store = configureStore({
  reducer: {
    ecommerce: ecommerceReducer,
  },
});
