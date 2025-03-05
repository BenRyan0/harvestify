import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


// price: listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100),
// listing: listings[0],
// listing_: listings[0].listingInfo._id,
// shipping_fee: listings[0].listingInfo.shippingFee,
// shippingInfo: shippingInfo,  // Empty if traderPickup is selected
// shippingChoice:shippingChoice,
// userId: userInfo.id,
// navigate,

export const place_deal = createAsyncThunk(
  "deals/place_deal",
  async ({ price, listing, shipping_fee, shippingInfo, userId, navigate, items,listing_,shippingMethod,mapsLink,distance, voucher,paymentTerm }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/home/deal/place-deal", {
        price, 
        listing, 
        listing_, 
        shipping_fee, 
        shippingInfo, 
        shippingMethod,
        userId, 
        items,
        mapsLink,
        distance,
        voucher,
        paymentTerm
      });

      // console.log(data);

      navigate('/pending-order', {
        state: {
          price: price,
          listing,
          items,
          orderId: data.orderId
        }
      });
      console.log(data)

      return fulfillWithValue(data); // Correctly return the API data
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const place_shipping_info = createAsyncThunk(
  "deals/place_shipping_info",
  async ({ myLocation,listingLocation,pricePerUnit,perYield }, { fulfillWithValue, rejectWithValue }) => {
    try {
      // console.log(myLocation)
      // console.log(listingLocation)
      // console.log(price)
      const { data } = await api.post("/home/deal/place-shipping-info", {
        myLocation,listingLocation,pricePerUnit,perYield
      });

      // console.log(data);

     
     
     
     console.log("_________________________________________ < >")
      console.log(data)

      return fulfillWithValue(data); // Correctly return the API data
      
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
export const submit_voucher_code = createAsyncThunk(
  "deals/submit_voucher_code",
  async ({ code, sellerId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      // console.log(myLocation)
      // console.log(listingLocation)
      // console.log(price)
      const { data } = await api.post("/submit-voucher-code", {
        code, sellerId
      });

      console.log(data)

      return fulfillWithValue(data); // Correctly return the API data
      
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deals = createAsyncThunk(
  'deals/get_deals',
  async ({ traderId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/trader/get-deals/${traderId}/${status}`);
    
      return fulfillWithValue(data); // Correctly return the API data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deal = createAsyncThunk(
  'deals/get_deal',
  async (dealId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/trader/get-deal/${dealId}`);  
      console.log("DEAL__________________________ >") 
      console.log(data) 
      return fulfillWithValue(data); // Correctly return the API data
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);



export const dealReducer = createSlice({
  name: "deal",
  initialState: {
    myDeals: [],
    orders: [], // Ensure compatibility with the API response
    errorMessage: '',
    successMessage: '',
    myDeal: {}, 
    shippingPrice : '',
    distance : '',
    valid : false,
    value: '',
    discountType : '',
    v_id : '',
    vcode : '',
    voucherLoader: false

    // message: 'Voucher is valid',
      //   valid : true,
      //   discountType: voucher.discountType,
      //   value: voucher.value
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(place_deal.pending, (state) => {
    //   state.loader = true;
    // });
    builder.addCase(place_deal.rejected, (state, { payload }) => {
      state.errorMessage = payload.message;
    });
    builder.addCase(place_deal.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(get_deals.fulfilled, (state, payload ) => {
      state.orders = payload.payload.orders; // Access payload directly

    });
    builder.addCase(get_deal.fulfilled, (state, payload ) => {
      state.myDeal = payload.payload.order; // Access payload directly
    });
    builder.addCase(place_shipping_info.fulfilled, (state, payload ) => {
      state.shippingPrice = payload.payload.shippingPrice; // Access payload directly
      state.distance = payload.payload.distance; // Access payload directly
     
      
    });

    builder.addCase(submit_voucher_code.pending, (state,_) => {
      state.voucherLoader = true
      // state.errorMessage = payload.payload.error
        });
    builder.addCase(submit_voucher_code.rejected, (state, payload ) => {
      state.voucherLoader = false
        });

    builder.addCase(submit_voucher_code.fulfilled, (state, payload ) => {
      state.voucherLoader = false
      state.successMessage = payload.payload.message; // Access payload directly
      state.valid = payload.payload.valid; // Access payload directly
      state.discountType = payload.payload.discountType; // Access payload directly
      state.value = payload.payload.value; // Access payload directly
      state.v_id = payload.payload.v_id; // Access payload directly
      state.vcode = payload.payload.code; // Access payload directly

      // message: 'Voucher is valid',
      //   valid : true,
      //   discountType: voucher.discountType,
      //   value: voucher.value
     
      
    });

  },
});

export const { messageClear } = dealReducer.actions;
export default dealReducer.reducer;
