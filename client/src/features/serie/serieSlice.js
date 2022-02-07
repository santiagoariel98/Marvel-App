import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: {
    general: "idle",
    characters: "idle",
    creators: "idle",
    events: "idle",
    comics: "idle",
  },
  series: [],
  currentSerie: {},
  errorMsg: [],
};
export const serieSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
});

export default serieSlice.reducer;
