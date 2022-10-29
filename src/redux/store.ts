import { configureStore } from "@reduxjs/toolkit";
import videoSliceReducer from "./features/videoSlice";

export default configureStore({
    reducer: {
        video: videoSliceReducer,
    },
});
