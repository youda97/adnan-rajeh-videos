import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/videos";

const initialState = {
    loading: false,
    items: [],
    error: {},
};

export const fetchVideo = createAsyncThunk("video/fetchVideo", (video: any) => {
    return axios
        .get(
            `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&id=${video}&part=contentDetails,id,snippet,statistics,status,topicDetails`
        )
        .then((response) => {
            let data: any = [];
            response.data.items.forEach((item: any) => {
                const id = item.id;
                const title = item.snippet.title;
                const description = item.snippet.description;
                const publishedAt = item.snippet.publishedAt;
                const thumbnails = item.snippet.thumbnails;
                const status = item.status.privacyStatus;
                const duration = item.contentDetails.duration;
                const viewCount = item.statistics.viewCount;
                const likeCount = item.statistics.likeCount;

                if (status === "public") {
                    data.push({
                        id,
                        title,
                        description,
                        publishedAt,
                        thumbnails,
                        status,
                        duration,
                        viewCount,
                        likeCount,
                    });
                }
            });
            return data;
        });
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
                state.items = action.payload;
                state.error = "";
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.loading = false;
                state.items = [];
                state.error = action.error;
            });
    },
});

export default videoSlice.reducer;
