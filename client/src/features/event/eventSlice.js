import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  fetchDataById,
  fetchSubDataById,
  fetchRandomData,
} from "../fetchAPI";

const initialState = {
  status: {
    general: "idle",
    characters: "idle",
    creators: "idle",
    comics: "idle",
    series: "idle",
  },
  headboard: [],
  results: {},
  current: {},
  errorMsg: [],
};

export const getData = createAsyncThunk("events/getData", async (data) => {
  const response = await fetchData(data);
  return response;
});

export const getDataById = createAsyncThunk(
  "events/getDataById",
  async (data) => {
    const response = await fetchDataById(data);
    return response;
  }
);

export const getSubdata = createAsyncThunk(
  "events/getSubdata",
  async (data) => {
    const response = await fetchSubDataById(data);
    return response;
  }
);

export const getRandomData = createAsyncThunk(
  "events/getRandomData",
  async (data) => {
    const response = await fetchRandomData(data);
    return response;
  }
);

export const creatorSlice = createSlice({
  name: "events",
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
          state.results = action.payload;
        } else {
          state.errorMsg = [...state.errorMsg, action.payload.error];
        }
      });
    builder
      .addCase(getRandomData.pending, (state) => {
        state.status.general = "loading";
      })
      .addCase(getRandomData.fulfilled, (state, action) => {
        state.status.general = "idle";
        if (action.payload.success) {
          state.headboard = action.payload.data;
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
