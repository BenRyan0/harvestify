import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";


export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post("/home/listing/add-to-card", info);
      console.log(data)
     
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
);

export const get_card_listings = createAsyncThunk(
  "card/get_card_listings",
  async (userId, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.get(`/home/listing/get-card-listings/${userId}`);
      console.log(data)
     
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
);

export const delete_card_listing = createAsyncThunk(
  "card/delete_card_listing",
  async (card_id, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.delete(`/home/listing/delete-card-listings/${card_id}`);
      console.log(data)
     
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
);


export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.post("/home/listing/add-to-wishlist", info);
      console.log(data)
     
      return fulfillWithValue(data);
    } catch (error) {
      
      return rejectWithValue(error.response.data)
    }
  }
);


export const get_wishlist_listings = createAsyncThunk(
  "card/get_wishlist_listings",
  async (userId, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.get(`/home/listing/get-wishlist-listings/${userId}`);
      console.log(data)
     
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
);


export const remove_wishlist = createAsyncThunk(
  "card/remove_wishlist",
  async (wishlist_id, {fulfillWithValue, rejectWithValue}) => {
    try {
      const { data } = await api.delete(`/home/listing/remove-wishlist-listings/${wishlist_id}`);
      console.log(data)
     
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data)
      return rejectWithValue(error.response.data)
    }
  }
);




export const cardReducer = createSlice({
  name: "card",
  initialState: {
    loader: false,
    card_listings: [],
    card_listings_count : 0,
    wishlist_count : 0,
    wishlists :[],
    price: 0,
    totalShippingFee: 0,
    errorMessage: '',
    successMessage: '',
    shipping_fee : 0,
    buy_listing_item : 0,
    unAvailableListings: [],
   
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },


  extraReducers: (builder) => {
    builder.addCase(add_to_card.rejected, (state,payload) => {
      state.errorMessage= payload.payload.error;
      });
    builder.addCase(add_to_card.pending, (state,_) => {
      state.loader= true;
      });
    builder.addCase(add_to_card.fulfilled, (state,payload) => {
      state.loader= false;
      state.successMessage= payload.payload.message;
      state.card_listings_count = state.card_listings_count + 1;
      });

    builder.addCase( add_to_wishlist.rejected, (state,payload) => {
      state.errorMessage= payload.payload.error;
      });
    builder.addCase( add_to_wishlist.pending, (state,_) => {
      state.loader= true;
      });
    builder.addCase( add_to_wishlist.fulfilled, (state,payload) => {
      state.loader= false;
      state.successMessage= payload.payload.message;
      state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
      });


   
    builder.addCase(get_card_listings.fulfilled, (state,payload) => {
      state.loader= false;
      state.card_listings = payload.payload.card_listings;
      state.price = payload.payload.price;
      state.card_listings_count = payload.payload.card_listings_count;
      state.shipping_fee = payload.payload.shipping_fee;
      state.unAvailableListings =  payload.payload.unAvailableListings;
      state.buy_listing_item =  payload.payload.buy_listing_item;
      state.totalShippingFee =  payload.payload.totalShippingFee;
      });

    builder.addCase(get_wishlist_listings.fulfilled, (state,payload) => {
      state.loader= false;
      state.wishlist_count = payload.payload.wishlistCount;
      state.wishlists = payload.payload.wishlists;
      });


      builder.addCase(delete_card_listing.fulfilled, (state,payload) => {
        state.loader= false;
        state.successMessage= payload.payload.message;
        
      });

      builder.addCase(remove_wishlist.fulfilled, (state,payload) => {
        state.loader= false;
        state.successMessage= payload.payload.message;
        state.wishlists= state.wishlists.filter(p=>p._id !== payload.payload.wishlist_id);
        state.wishlistCount = state.wishlist_count - 1
        
      });
   

   
},
  //   extraReducers: {},
});

export const { messageClear } =  cardReducer.actions;
export default  cardReducer.reducer;
