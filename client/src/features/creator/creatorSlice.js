import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, fetchDataById, fetchSubDataById } from "../fetchAPI";

const initialState = {
  status: {
    general: "idle",
    comics: "idle",
    events: "idle",
    series: "idle",
  },
  results: [],
  current: {},
  errorMsg: [],
};

export const getData = createAsyncThunk("creators/getData", async (data) => {
  const response = await fetchData(data);
  return response;
});

export const getDataById = createAsyncThunk(
  "creators/getDataById",
  async (data) => {
    const response = await fetchDataById(data);
    return response;
  }
);

export const getSubdata = createAsyncThunk(
  "creators/getSubdata",
  async (data) => {
    const response = await fetchSubDataById(data);
    return response;
  }
);

export const creatorSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status.general = "loading";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status.general = "idle";
        if (action.payload.success) {
          state.results = action.payload.data;
        } else {
          state.errorMsg = [...state.errorMsg, action.payload.error];
        }
      });
    builder
      .addCase(getDataById.pending, (state) => {
        state.status.general = "loading";
      })
      .addCase(getDataById.fulfilled, (state, action) => {
        state.status.general = "idle";
        if (action.payload.success) {
          state.current = action.payload;
        } else {
          state.errorMsg = [...state.errorMsg, action.payload.error];
        }
      });
    builder
      .addCase(getSubdata.pending, (state, action) => {
        let datatype = action.meta.arg.datatype;
        state.status[datatype] = "loading";
      })
      .addCase(getSubdata.fulfilled, (state, action) => {
        let success = action.payload.data.success;
        let datatype = action.payload.datatype;
        state.status[datatype] = "idle";

        if (success) {
          state.current.data[datatype] = action.payload.data;
        } else {
          state.errorMsg = [...state.errorMsg, action.payload.error];
        }
      });
  },
});

export default creatorSlice.reducer;
