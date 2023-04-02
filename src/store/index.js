import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UsersReducers } from "./users";

export const store = configureStore({
  reducer: {
    user: UsersReducers,
  },
});

setupListeners(store.dispatch);
