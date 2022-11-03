import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const RESULTS = 50;

const initialState = {
    loading: false,
    items: [],
    error: "",
};

export const fetchPlaylistItems = createAsyncThunk(
    "playlistItem/fetchPlaylistItems",
    (playlistId: any) => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&playlistId=${playlistId}&part=id,snippet,status&order=date&maxResults=${RESULTS}`
            )
            .then((response) => {
                let data: any = [];
                response.data.items.forEach((item: any) => {
                    const id = item.id;
                    const playlistId = item.snippet.playlistId;
                    const title = item.snippet.title;
                    const description = item.snippet.description;
                    const publishedAt = item.snippet.publishedAt;
                    const thumbnails = item.snippet.thumbnails;
                    const videoId = item.snippet.resourceId.videoId;
                    const status = item.status.privacyStatus;

                    if (status === "public") {
                        data.push({
                            id,
                            playlistId,
                            title,
                            description,
                            publishedAt,
                            thumbnails,
                            videoId,
                            status,
                        });
                    }
                });
                return data;
            });
    }
);

const playlistItemSlice = createSlice({
    name: "playlistItem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylistItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPlaylistItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = "";
            })
            .addCase(fetchPlaylistItems.rejected, (state, action) => {
                state.loading = false;
                state.items = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default playlistItemSlice.reducer;
