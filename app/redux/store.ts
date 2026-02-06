import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import productsReducer from "./products/productSlice";
// import cartButton from "./cart/cartButton"
import cartSlice from "./cart/cartSlice"
export const store=configureStore({
    reducer:{
        products:productsReducer,
        auth:authReducer,
        // cartButtons:cartButton,
        cart:cartSlice

    }
    
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;