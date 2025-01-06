import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


export const place_deal = createAsyncThunk(
  "deal/place_deal",
  async ({price, listing, shipping_fee, shippingInfo, userId, navigate,items}, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post("/home/deal/place-deal", {
        price, 
        listing, 
        shipping_fee, 
        shippingInfo, 
        userId, 
        navigate, 
        items
      });
      console.log(data)

      navigate('/payment', {
        state:{
          price : price + shipping_fee,
          items,
          orderId: data.orderId


        }
      })

      // return true
     
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
);



export const get_deals = createAsyncThunk(
    'deals/get_deals',
    async({traderId, status},{rejectWithValue, fulfillWithValue}) =>{
      try {
        const {data} = await api.get(`/home/trader/get-deals/${traderId}/${status}`)
        console.log(data)
        return fulfillWithValue(data);
      } catch (error) {
        console.log(error.response)
        return rejectWithValue(error.response.data)
        
      }
    }
)



export const dealReducer = createSlice({
  name: "order",
  initialState: {
    myDeals: [],
    orders: {},
    errorMessage: '',
    successMessage: '',
    myDeal: {}
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },


  extraReducers: (builder) => {
    builder.addCase(place_deal.pending, (state,_) => {
      state.loader = true;
      });
    builder.addCase(place_deal.rejected, (state,payload) => {
      state.errorMessage= payload.payload.error;
      });
    builder.addCase(place_deal.fulfilled, (state,payload) => {
      state.successMessage= payload.payload.message;
      });
    builder.addCase(get_deals.fulfilled, (state,payload) => {
      state.orders= payload.payload.orders;
      });
    // builder.addCase(add_to_card.pending, (state,_) => {
    //   state.loader= true;
    //   });
    // builder.addCase(add_to_card.fulfilled, (state,payload) => {
    //   state.loader= false;
    //   state.successMessage= payload.payload.message;
    //   state.card_listings_count = state.card_listings_count + 1;
    //   });




   
},
  //   extraReducers: {},
});

export const { messageClear } =  dealReducer.actions;
export default  dealReducer.reducer;
