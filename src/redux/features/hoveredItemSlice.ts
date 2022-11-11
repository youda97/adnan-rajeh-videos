import { createAction, createSlice } from "@reduxjs/toolkit";

export const setHoveredItem = createAction<any>("SET_FAVORITE_ITEM");
export const removeHoveredItem = createAction<any>("REMOVE_FAVORITE_ITEM");

const initialState = {
    row: [],
    item: {},
    positionLeft: 0,
    positionTop: 0,
    width: 0,
    rowIndex: 0,
    columnIndex: 0,
    isHovered: false,
    isVideoOpen: false,
    itemsInRow: 0,
    videoPrev: {},
    videoNext: {},
};

const HoveredItemSlice = createSlice({
    name: "hoveredItem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(setHoveredItem, (state, action) => {
            if ("row" in action.payload) state.row = action.payload.row;
            if ("item" in action.payload)
                state.item = { ...action.payload.item };
            if ("positionLeft" in action.payload)
                state.positionLeft = action.payload.positionLeft;
            if ("positionTop" in action.payload)
                state.positionTop = action.payload.positionTop;
            if ("width" in action.payload) state.width = action.payload.width;
            if ("i" in action.payload) state.rowIndex = action.payload.i;
            if ("j" in action.payload) state.columnIndex = action.payload.j;
            if ("isHovered" in action.payload)
                state.isHovered = action.payload.isHovered;
            if ("isVideoOpen" in action.payload)
                state.isVideoOpen = action.payload.isVideoOpen;
            if ("itemsInRow" in action.payload)
                state.itemsInRow = action.payload.itemsInRow;
            if ("videoPrev" in action.payload)
                state.videoPrev = { ...action.payload.videoPrev };
            if ("videoNext" in action.payload)
                state.videoNext = { ...action.payload.videoNext };
        });
    },
});

export default HoveredItemSlice.reducer;
