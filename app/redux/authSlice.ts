import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AuthSlice{
    loggedIn:boolean,
    userEmail:string|null
}
const initialState:AuthSlice={
    loggedIn:false,
    userEmail:null
}
export const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{email:string}>)=>{
            state.loggedIn=true,
            state.userEmail=action.payload.email

        },
        logout:(state)=>{
            state.loggedIn=false,
            state.userEmail=null
        }

    }
})
export const {login,logout}=authSlice.actions
export default authSlice.reducer