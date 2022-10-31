import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";
const RESULTS = 4;

const initialState = {
    loading: false,
    recentVideos: [],
    error: "",
};

export const fetchRecentVideos = createAsyncThunk(
    "recentVideo/fetchVideos",
    () => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg&part=snippet,id&order=date&maxResults=${RESULTS}`
            )
            .then((response) => response.data);
    }
);

const recentVideoSlice = createSlice({
    name: "recentVideo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecentVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.recentVideos = action.payload;
                state.error = "";
            })
            .addCase(fetchRecentVideos.rejected, (state, action) => {
                state.loading = false;
                state.recentVideos = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default recentVideoSlice.reducer;
