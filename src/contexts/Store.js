import { createSlice, configureStore } from "@reduxjs/toolkit";

const StoreSlice = createSlice({
  name: "store",
  initialState: {
    url: "https://api.it-street.az/api/",
    status: null,
    notification: {
      type: false,
      message: null,
    },
  },
  reducers: {
    changeStatus: (state, action) => {
      const { status } = action.payload;
      state.status = parseInt(status);
    },
    changeNot: (state, action) => {
      const { type, message } = action.payload;
      state.notification.type = type;
      state.notification.message = message;
    },
  },
});

const store = configureStore({
  reducer: {
    store: StoreSlice.reducer,
  },
});

export const { changeStatus, changeNot } = StoreSlice.actions;
export default store;
