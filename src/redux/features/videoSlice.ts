import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";
const RESULTS = 4;

const initialState = {
    loading: false,
    videos: [],
    error: "",
};

export const fetchVideos = createAsyncThunk("video/fetchVideos", () => {
    console.log(
        `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg`
    );
    return axios
        .get(
            `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg&part=snippet,id&order=date&maxResults=${RESULTS}`
        )
        .then((response) => response.data);
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.videos = action.payload;
                state.error = "";
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.loading = false;
                state.videos = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default videoSlice.reducer;
