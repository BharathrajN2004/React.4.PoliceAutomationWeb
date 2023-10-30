import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    accessLevel: null,
};

const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: initialState,
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload;
        },
        addAccessLevel: (state, action) => {
            state.accessLevel = action.payload;
        }
    },
})

export const { addUserData, addAccessLevel } = AuthSlice.actions;

export default AuthSlice.reducer;
