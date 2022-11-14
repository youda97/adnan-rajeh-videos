import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";
const RESULTS = 50;

const initialState = {
    loading: false,
    items: [],
    error: {},
};

export const fetchSearch = createAsyncThunk(
    "search/fetchVideos",
    (query: any) => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg&part=snippet&order=date&maxResults=${RESULTS}&q=${query}`
            )
            .then((response) => {
                const data: any = [];
                response.data.items.forEach((item: any) => {
                    const videoId = item.id.videoId;
                    const title = item.snippet.title;
                    const description = item.snippet.description;
                    const publishedAt = item.snippet.publishedAt;
                    const thumbnails = item.snippet.thumbnails;

                    if (videoId) {
                        data.push({
                            videoId,
                            title,
                            description,
                            publishedAt,
                            thumbnails,
                        });
                    }
                });
                return data;
            });
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = "";
            })
            .addCase(fetchSearch.rejected, (state, action) => {
                state.loading = false;
                state.items = [];
                state.error = action.error;
            });
    },
});

export default searchSlice.reducer;
