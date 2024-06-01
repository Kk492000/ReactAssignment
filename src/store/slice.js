import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "kk",
  initialState: { counter: 0 },
  reducers: {
    incrementHandler(state) {
      state.counter++;
    },
  },
});

export const { incrementHandler } = counterSlice.actions;
export default counterSlice.reducer;
