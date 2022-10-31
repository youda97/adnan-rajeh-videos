import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/playlists";
const RESULTS = 50;

const initialState = {
    loading: false,
    playlists: [],
    error: "",
};

export const fetchPlaylists = createAsyncThunk(
    "playlist/fetchPlaylists",
    () => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg&part=snippet,contentDetails,id&order=date&maxResults=${RESULTS}`
            )
            .then((response) => response.data);
    }
);

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPlaylists.fulfilled, (state, action) => {
                state.loading = false;
                state.playlists = action.payload;
                state.error = "";
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.playlists = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default playlistSlice.reducer;
