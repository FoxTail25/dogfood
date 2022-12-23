import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { buildQueries } from "@testing-library/react";
import api from '../../utils/api';
import { isError } from "../../utils/store-err";

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async function (_, { rejectWithValue, fulfillWithValue, dispatch, getState, extra }) {
        try {
            const data = await api.getUserInfo();
            return fulfillWithValue( data )

        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

const initialState = {
    data: {},
    loading: true,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false; 
            })

            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;

            })

    }
})



export default userSlice.reducer;