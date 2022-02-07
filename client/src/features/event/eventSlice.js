import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: {
    general: "idle",
    characters: "idle",
    creators: "idle",
    comics: "idle",
    series: "idle",
  },
  events: [],
  currentEvent: {},
  errorMsg: [],
};
export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
});

export default eventSlice.reducer;
