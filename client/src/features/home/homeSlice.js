import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchGetCharacters,
  fetchGetComicsLast,
  fetchGetComicsNews,
  fetchGetEvents,
  fetchGetSeries,
} from "./homeAPI";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { fetchGetCharacterById, fetchGetCharacters } from "./characterAPI";

const initialState = {
  status: "idle",
  events: [],
  characters: [],
  newsComics: [],
  lastComics: [],
  series: [],
  error: "",
};

export const getEvents = createAsyncThunk("news/events", async () => {
  const response = await fetchGetEvents();
  return response;
});
export const getNewsComics = createAsyncThunk("news/comics", async () => {
  const response = await fetchGetComicsNews();
  return response;
});
export const getLastComics = createAsyncThunk("last/comics", async () => {
  const response = await fetchGetComicsLast();
  return response;
});
export const getSeries = createAsyncThunk("news/series", async () => {
  const response = await fetchGetSeries();
  return response;
});
export const getCharacters = createAsyncThunk("news/characters", async () => {
  const response = await fetchGetCharacters();
  return response;
});
// const initialState = {
//   status: "idle",
//   page: 1,
//   totalPage: 78,
//   currentCharacters: [],
//   currentCharacter: {},
//   errorMsg: "",
// };

// export const getCharactersAsync = createAsyncThunk(
//   "character/getCharacters",
//   async () => {
//     const response = await fetchGetCharacters();
//     return response;
//   }
// );
// export const getCharacterByIdAsync = createAsyncThunk(
//   "character/getCharacterById",
//   async (id) => {
//     const response = await fetchGetCharacterById(id);
//     return response;
//   }
// );

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.characters = action.payload.data.slice(7);
        } else {
          state.error = "Characters not founds";
        }
      });
    builder
      .addCase(getEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.events = action.payload.data.slice(1);
        } else {
          state.error = "Events not founds";
        }
      });
    builder
      .addCase(getNewsComics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewsComics.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.newsComics = action.payload.data.slice(1);
        } else {
          state.error = "Comics not founds";
        }
      });
    builder
      .addCase(getLastComics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLastComics.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.success) {
          state.lastComics = action.payload.data.slice(1);
        } else {
          state.error = "Comics not founds";
        }
      });
  },
});

// export const characterSlice = createSlice({
//   name: "characters",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getCharactersAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getCharactersAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         if (action.payload.success) {
//           state.currentCharacters = action.payload.data;
//         } else {
//           state.errorMsg = "Se ha producido un Problema";
//         }
//       });

//     builder
//       .addCase(getCharacterByIdAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getCharacterByIdAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         if (action.payload.success) {
//           state.currentCharacter = action.payload;
//         } else {
//           state.errorMsg = "Se ha producido un Problema";
//         }
//       });
//   },
// });

// export const selectPageCharacter = (state) => state.characters.page;
// export const selectStatusCharacter = (state) => state.characters.status;
// export const selectCurrentCharacters = (state) =>
//   state.characters.currentCharacters;

// export default characterSlice.reducer;
export default homeSlice.reducer;
