import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
    name: "example",
    initialState: {
        test: 1
    },
    reducers: {},
    extraReducers: (builder) => {
    },
});

const { reducer } = exampleSlice;
export { reducer as exampleReducer };

