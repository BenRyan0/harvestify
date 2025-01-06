import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";



export const get_dashboard_index_data = createAsyncThunk(
    'dashboard/get_dashboard_index_data',
    async(userId,{rejectWithValue, fulfillWithValue}) =>{
      try {
        const {data} = await api.get(`/home/trader/get-dashboard-data/${userId}`)
        console.log(data)
        return fulfillWithValue(data);
      } catch (error) {
        console.log(error.response)
        
      }
    }
)



export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    cancelledOrder: 0,
    pendingOrder: 0,
    recentOrders: [],
    errorMessage: '',
    successMessage: '',
    totalOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },


  extraReducers: (builder) => {

    builder.addCase(get_dashboard_index_data.pending, (state,_) => {
      state.loader= true;
      });
    builder.addCase(get_dashboard_index_data.rejected, (state,payload) => {
      state.loader= false;
      state.errorMessage= payload.payload.error;
      });
    builder.addCase(get_dashboard_index_data.fulfilled, (state,payload) => {
      state.loader= false;
      state.cancelledOrder = payload.payload.cancelledOrder;
      state.pendingOrder = payload.payload.pendingOrder;
      state.recentOrders = payload.payload.recentOrders;
      state.recentOrders = payload.payload.recentOrders;
      state.totalOrder = payload.payload.totalOrder;
      



      });
   



   
},
  //   extraReducers: {},
});

export const { messageClear } =  dashboardReducer.actions;
export default  dashboardReducer.reducer;
