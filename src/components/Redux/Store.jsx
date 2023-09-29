import {configureStore} from '@reduxjs/toolkit'
import ProductReducer from './Slices/ProductSlice'
import CartReducer from './Slices/CartSlice'

export const Store=configureStore({
    reducer:{
        'Product':ProductReducer,
        'Cart':CartReducer
    }
})