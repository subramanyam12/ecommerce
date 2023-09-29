import {createSlice} from '@reduxjs/toolkit'


const CartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
       addtocart:(state,action)=>{
        state.push(action.payload)
       },
       removeitem:(state,action)=>{
        state=state.splice(action.payload,1)
        //state=state.filter(item=>item.cart.id!==action.payload)
       }
    }
})

export const {addtocart,removeitem}=CartSlice.actions
export default CartSlice.reducer
