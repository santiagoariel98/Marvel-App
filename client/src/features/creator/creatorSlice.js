import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: {
    general: "idle",
    comics: "idle",
    events: "idle",
    series: "idle",
  },
  creators: [],
  currentCreator: {},
  errorMsg: [],
};
export const creatorSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {},
});

export default creatorSlice.reducer;
