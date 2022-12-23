import { configureStore } from "@reduxjs/toolkit";
import api from "../utils/api";
import productsReducer from './products/productSlice'
import userReducer from './user/userSlice'
import singleProductReducer from './singleProduct/singleProdSlice'


const store = configureStore({
    reducer: {
        products: productsReducer,
        user:userReducer,
        singleProduct: singleProductReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: api,
            }
        })
})

export default store