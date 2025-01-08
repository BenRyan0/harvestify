import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import api from "../../api/api";
const { jwtDecode } = require('jwt-decode');


export const add_friend = createAsyncThunk(
  "auth/add_friend",
  async (info, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post("/chat/trader/add-trader-friend", info);
       console.log("________________________________________________ >")
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const send_message = createAsyncThunk(
  "auth/send_message",
  async (info, {fulfillWithValue, rejectWithValue}) => {
    console.log(info)
    try {
      const { data } = await api.post("/chat/trader/send-message-to-seller", info);
      // console.log("________________________________________________ >")
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);
export const get_trader_message = createAsyncThunk(
  "auth/get_trader_message",
  async (traderId, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post(`/chat/trader/get-trader-message/${traderId}`);
      // console.log("________________________________________________ >")
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);



export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    loader: false,
    my_connections : {},
    my_messages : [],
    currentConnection : '',
    successMessage: "",
    errorMessage : ""


    
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.my_messages = [...state.my_messages, payload]
  }
  },


  extraReducers: (builder) => {
    builder.addCase(add_friend.fulfilled, (state, payload) => {
      state.loader= false;
        state.my_connections = payload.payload.myPartners;
        state.currentConnection = payload.payload.currentConnections;
        state.my_messages = payload.payload.messages;       
      });

    builder.addCase(send_message.fulfilled, (state, payload) => {
     let tempConnections = state.my_connections
            let index = tempConnections.findIndex(f => f.fdId === payload.payload.message.receiverId)
            while (index > 0) {
                let temp = tempConnections[index]
                tempConnections[index] = tempConnections[index - 1]
                tempConnections[index - 1] = temp
                index--
      }
      state.my_connections= tempConnections
      state.my_messages = [...state.my_messages, payload.payload.message]
      state.successMessage = "message sent"


             
      });
    // builder.addCase(send_message.fulfilled, (state, payload) => {
    //   let tempConnections = state.my_connections
    //   let index = tempConnections.findIndex(f=>f.fdId === payload.payload.message.receiverId)
    //   while(index > 0){
    //     let temp = tempConnections[index]
    //     tempConnections[index] = tempConnections[index-1]
    //     tempConnections[index-1] = temp
    //     index-- 
    //   }

    //   state.my_connections= tempConnections
    //   state.my_messages = [...state.my_messages, payload.payload.message]
    //   state.successMessage = "message sent"


             
    //   });

   
},
  //   extraReducers: {},
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
