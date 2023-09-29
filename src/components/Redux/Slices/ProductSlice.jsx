import {createSlice} from '@reduxjs/toolkit'


const ProductSlice=createSlice({
    name:'product',
    initialState:[],
    reducers:{
       addproduct:(state,action)=>{
        state[0]=action.payload
       }
    }
})

export const {addproduct}=ProductSlice.actions
export default ProductSlice.reducer
