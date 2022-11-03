import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/playlists";
const RESULTS = 50;

const initialState = {
    loading: false,
    items: [],
    error: "",
};

export const fetchPlaylists = createAsyncThunk(
    "playlist/fetchPlaylists",
    () => {
        return axios
            .get(
                `${YOUTUBE_API}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}&channelId=UCV4_IPy-P9Gbdvxn-FygEOg&part=contentDetails,id,player,snippet,status&order=date&maxResults=${RESULTS}`
            )
            .then((response) => {
                const data: any = [];
                response.data.items.forEach((item: any) => {
                    const id = item.id;
                    const title = item.snippet.title;
                    const description = item.snippet.description;
                    const publishedAt = item.snippet.publishedAt;
                    const thumbnails = item.snippet.thumbnails;
                    const itemCount = item.contentDetails.itemCount;

                    data.push({
                        id,
                        title,
                        description,
                        publishedAt,
                        thumbnails,
                        itemCount,
                    });
                });
                return data;
            });
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
                state.items = action.payload;
                state.error = "";
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.items = [];
                state.error = action.error.message || "Error fetching data.";
            });
    },
});

export default playlistSlice.reducer;
