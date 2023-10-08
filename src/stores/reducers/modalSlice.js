import { createSlice } from "@reduxjs/toolkit";
import { noop } from "lodash";

const initialModalState = {
  recordModalDelete: false,
  contentModalDelete: "",
  onOk: noop,
  onCancel: noop,
};

export const modalReducer = createSlice({
  name: "modal",
  initialState: initialModalState,

  reducers: {
    onOpenModalDelete: (state, action) => {
      state.recordModalDelete = !!action.payload.recordModalDelete;
      state.contentModalDelete = action.payload.contentModalDelete;
      state.onOk = action.payload.onOk;
      state.onCancel = action.payload.onCancel;
    },

    onModalCancel: (state) => {
      state.recordModalDelete = false;
      state.contentModalDelete = "";
      state.onOk = noop;
      state.onCancel = noop;
    },
  },
});

export const { onOpenModalDelete, onModalCancel } = modalReducer.actions;
export const modalSelector = (state) => state.modal;

export default modalReducer.reducer;
