import { configureStore } from "@reduxjs/toolkit";
import recentVideoSliceReducer from "./features/recentVideoSlice";
import playlistSliceReducer from "./features/playlistSlice";
import playlistItemSliceReducer from "./features/playlistItemSlice";
import videoSliceReducer from "./features/videoSlice";
import hoveredItemSliceReducer from "./features/hoveredItemSlice";

export default configureStore({
    reducer: {
        recentVideo: recentVideoSliceReducer,
        playlist: playlistSliceReducer,
        playlistItem: playlistItemSliceReducer,
        video: videoSliceReducer,
        hoveredItem: hoveredItemSliceReducer,
    },
});
