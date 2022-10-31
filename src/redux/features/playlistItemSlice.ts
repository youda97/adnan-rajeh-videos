import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/playlistItems";
const RESULTS = 50;

const initialState = {
    loading: false,
    playlistItems: [],
    error: "",
};

export const fetchPlaylistItems = createAsyncThunk(
    "playlistItem/fetchPlaylistItems",
    (playlistId: any) => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&playlistId=${playlistId}&part=snippet,id&order=date&maxResults=${RESULTS}`
            )
            .then((response) => {
                let data: any = [];
                response.data.items.forEach((item: any) => {
                    if (Object.keys(item.snippet.thumbnails).length) {
                        const id = item.snippet.resourceId.videoId;
                        if (item.snippet.thumbnails.standard) {
                            const url = item.snippet.thumbnails.standard.url;
                            data.push({ id, url });
                        } else if (item.snippet.thumbnails.medium) {
                            const url = item.snippet.thumbnails.medium.url;
                            data.push({ id, url });
                        } else {
                            const url = item.snippet.thumbnails.default.url;
                            data.push({ id, url });
                        }
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
                state.playlistItems = action.payload;
                state.error = "";
            })
            .addCase(fetchPlaylistItems.rejected, (state, action) => {
                state.loading = false;
                state.playlistItems = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default playlistItemSlice.reducer;
