import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { isLiked } from "../../utils/product";
import { isError } from "../../utils/store-err";
// import api from '../../utils/api';

export const fetchSingleProdSlice = createAsyncThunk(
    'singleProdSlice/fetchSingleProdSlice',
    async function (
        productId,
        { rejectWithValue, fulfillWithValue, extra: api }
    ) {
        try {
            const data = await api.getProductById(productId);
            return fulfillWithValue(data)
        } catch (error) {
            // console.log('error', error)
            return rejectWithValue(error);
        }
    }
);

export const fetchCreateReview = createAsyncThunk(
    'singleProdSlice/fetchCreateReview',
    async function (
        {productId, data: body}, { rejectWithValue, fulfillWithValue, extra: api }
    ) {
        try {
            const data = await api.createReviewProduct(productId, body);
            return fulfillWithValue(data)
        } catch (error) {
            // console.log('error', error)
            return rejectWithValue(error);
        }
    }
);


const initialState = {
    data: {},
    loading: true,
    error: null,
}

const singleProdSlice = createSlice({
    name: 'singleProd',
    initialState,
    reducers: {
        setProductState: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleProdSlice.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSingleProdSlice.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchCreateReview.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })

            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;

            })

    }
})


export const { setProductState } = singleProdSlice.actions;
export default singleProdSlice.reducer;