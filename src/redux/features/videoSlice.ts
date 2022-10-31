import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/videos";

const initialState = {
    loading: false,
    video: [],
    error: "",
};

export const fetchVideo = createAsyncThunk("video/fetchVideo", (video: any) => {
    return axios
        .get(
            `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&id=${video}&part=snippet,contentDetails,statistics,status`
        )
        .then((response) => response.data);
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.video = action.payload;
                state.error = "";
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.loading = false;
                state.video = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default videoSlice.reducer;
