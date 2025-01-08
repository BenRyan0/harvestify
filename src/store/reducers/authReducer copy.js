import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
const { jwtDecode } = require('jwt-decode');

export const trader_register = createAsyncThunk(
  "auth/trader_register",
  async (info, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post("/trader/trader-register", info);
      console.log(data);
      localStorage.setItem('traderToken', data.token)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const trader_login = createAsyncThunk(
  "auth/trader_login",
  async (info, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post("/trader/trader-login", info);
      console.log("----------------------------- >")
      console.log(data);
      localStorage.setItem('traderToken', data.token)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const decodedToken = (token) =>{
  if(token){
    const userInfo = jwtDecode(token)
    return userInfo
  }else{
    return ''
  }
}

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    userInfo:decodedToken(localStorage.getItem('traderToken')),
    errorMessage: "",
    successMessage: "",
    redirect: 0
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    redirectClear: (state, _) => {
      state.redirect = 0;
      // state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = ""
   }
  },


  extraReducers: (builder) => {
    builder.addCase(trader_register.pending, (state,_) => {
      state.loader= true;
      });
    builder.addCase(trader_register.rejected, (state, payload) => {
      state.loader= false;
      state.errorMessage = payload.payload.error;
     
      });
    builder.addCase(trader_register.fulfilled, (state, payload) => {
        const user = decodedToken(payload.payload.token)
        state.loader= false;
        state.successMessage = payload.payload.message;
        state.userInfo = user
        
      }); 

    builder.addCase(trader_login.pending, (state,_) => {
      state.loader= true;
      });
    builder.addCase(trader_login.rejected, (state, payload) => {
      state.loader= false;
      state.errorMessage = payload.payload.error;
      state.redirect = payload.payload.redirect;
     
      });
    builder.addCase(trader_login.fulfilled, (state, payload) => {
      const user = decodedToken(payload.payload.token)
      state.loader= false;
        state.successMessage = payload.payload.message;
        state.redirect = payload.payload.redirect;
        state.userInfo = user
      });

   
},
  //   extraReducers: {},
});

export const { messageClear,redirectClear,user_reset } = authReducer.actions;
export default authReducer.reducer;
