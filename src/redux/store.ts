import { configureStore } from "@reduxjs/toolkit";
import recentVideoSliceReducer from "./features/recentVideoSlice";
import playlistSliceReducer from "./features/playlistSlice";
import playlistItemSliceReducer from "./features/playlistItemSlice";
import videoSliceReducer from "./features/videoSlice";
import hoveredItemSliceReducer from "./features/hoveredItemSlice";
import settingsliceReducer from "./features/settingsSlice";
import searchSlice from "./features/searchSlice";

export default configureStore({
    reducer: {
        recentVideo: recentVideoSliceReducer,
        playlist: playlistSliceReducer,
        playlistItem: playlistItemSliceReducer,
        video: videoSliceReducer,
        hoveredItem: hoveredItemSliceReducer,
        settings: settingsliceReducer,
        search: searchSlice,
    },
});
