import { createAction, createSlice } from "@reduxjs/toolkit";

export const setSettings = createAction<any>("SET_SETTINGS");

const initialState = {
    mute: false,
    autoplay: true,
    theme: true,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setSettings, (state, action) => {
            if ("mute" in action.payload) state.mute = action.payload.mute;
            if ("autoplay" in action.payload)
                state.autoplay = action.payload.autoplay;
            if ("theme" in action.payload) state.theme = action.payload.theme;
        });
    },
});

export default settingsSlice.reducer;
