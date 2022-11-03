import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";
const RESULTS = 10;

const initialState = {
    loading: false,
    items: [],
    error: "",
};

export const fetchRecentVideos = createAsyncThunk(
    "recentVideo/fetchVideos",
    () => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg&part=snippet&order=date&maxResults=${RESULTS}`
            )
            .then((response) => {
                const data: any = [];
                response.data.items.forEach((item: any) => {
                    const videoId = item.id.videoId;
                    const title = item.snippet.title;
                    const description = item.snippet.description;
                    const publishedAt = item.snippet.publishedAt;
                    const thumbnails = item.snippet.thumbnails;

                    data.push({
                        videoId,
                        title,
                        description,
                        publishedAt,
                        thumbnails,
                    });
                });
                return data;
            });
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
                state.items = action.payload;
                state.error = "";
            })
            .addCase(fetchRecentVideos.rejected, (state, action) => {
                state.loading = false;
                state.items = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default recentVideoSlice.reducer;
