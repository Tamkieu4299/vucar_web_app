import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
