import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import officersSlice from "./officersSlice";
import caseSlice from "./caseSlice";

export const store = configureStore({
    reducer:
    {
        auth: authSlice,
        officersList: officersSlice,
        caseData: caseSlice,
    }
});