import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'


export const get_transaction_by_deal = createAsyncThunk(
    'transaction/get_transaction_by_deal',
    async (traderDealId, { rejectWithValue, fulfillWithValue}) => {
      console.log("-------------------------- >>")
      console.log("dealID" + traderDealId)
  
        try {
            const { data } = await api.get(`/trader/transaction-get/${traderDealId}`)
            console.log("GET _______________________________ <")
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
  )
  
// export const get_transaction_by_deal = createAsyncThunk(
//     'transaction/get_transaction_by_deal',
//     async (dealId, { rejectWithValue, fulfillWithValue, getState}) => {
//       console.log("-------------------------- >>")
//       console.log(dealId)
//         const {token} = getState().auth
//     const config = {
//       headers : {
//         Authorization: `Bearer ${token}`
//       }
//     }
  
//         try {
//             const { data } = await api.get(`/transaction-get/${dealId}`,config)
//             console.log("GET _______________________________ <")
//             console.log(data)
//             return fulfillWithValue(data)
//         } catch (error) {
//             return rejectWithValue(error.response.data)
//         }
//     }
//   )
  

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
  


export const get_categories = createAsyncThunk(
    'listing/get_category',
    async(_,{fulfillWithValue}) =>{
        try {
            const {data} = await api.get('/home/get-categories')
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const get_listings = createAsyncThunk(
    'listing/get_listings',
    async(_,{fulfillWithValue}) =>{
        try {
            const {data} = await api.get('/home/get-listings')
            console.log(data)
            return fulfillWithValue(data);

        } catch (error) {
            console.log(error.response)
        }
    }
)

export const price_range_listing = createAsyncThunk(
    'listing/price_range_listing',
    async(_,{fulfillWithValue}) =>{
        try {
            const {data} = await api.get('/home/price-range-latest-listings')
           
        
            return fulfillWithValue(data);

        } catch (error) {
            console.log(error.response)
        }
    }
)
export const yield_range_listing = createAsyncThunk(
    'listing/yield_range_listing',
    async(_,{fulfillWithValue}) =>{
        try {
            const {data} = await api.get('/home/yield-range-latest-listings')
           
         
            return fulfillWithValue(data);

        } catch (error) {
            console.log(error.response)
        }
    }
)

  
export const expected_yields_units = createAsyncThunk(
    'listing/expected_yield_listing',
    async(_,{fulfillWithValue}) =>{
        try {
            const {data} = await api.get('/home/expected-yield-listing')
           
        
            return fulfillWithValue(data);

        } catch (error) {
            console.log(error.response)
        }
    }
)


export const query_listings = createAsyncThunk(
    'listing/query-listings',
    async (query, { fulfillWithValue, rejectWithValue }) => {
   

        // Set searchValue to an empty string if it's not provided
        const searchValue = query.searchValue || "";
        const category = query.category || "";

        console.log("searchVal " + searchValue)

        try {
            const { data } = await api.get(`/home/query-listings`, {
                params: {
                    category: category,
                    rating: query.rating,
                    lowPrice: query.lowPrice,
                    highPrice: query.highPrice,
                    lowYield: query.lowYield,  // Passing lowYield
                    highYield: query.highYield, // Passing highYield
                    sortPrice: query.sortPrice,
                    sortYield: query.sortYield,
                    pageNumber: query.pageNumber,
                    perPage: query.perPage,
                    sortYieldUnit: query.sortYieldUnit,
                    searchValue: searchValue,  // Using the default empty string if searchValue is undefined or null
                },
            });
            
            console.log( data)
          
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error.response);
            return rejectWithValue(error.response?.data || "An error occurred while fetching listings.");
        }
    }
);






export const get_listing = createAsyncThunk(
    'listing/get_listing',
    async (slug, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/get-listing/${slug}`);
            console.log("ngi____")
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            // console.error("Error in get_listing:", error.response);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);





export const trader_review = createAsyncThunk(
    'review/trader_review',
    async (info, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.post('/home/trader/submit-review', info);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            // console.error("Error in get_listing:", error.response);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
)

export const get_reviews = createAsyncThunk(
    'review/get_reviews',
    async ({
        listingId,
        sellerId,
        pageNumber
    }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/trader/get-reviews/${listingId}/${sellerId}?pageNo=${pageNumber}`);
            console.log("AHHHHHHHHHHHHHH_____________")
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            // console.error("Error in get_listing:", error.response);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
)

// export const  = createAsyncThunk(
//     'listing/get_all_sellers',
//     async (slug, { fulfillWithValue, rejectWithValue }) => {
//         try {
//             const { data } = await api.get(`/home/get-listing/${slug}`);
//             console.log(data)
//             return fulfillWithValue(data);
//         } catch (error) {
//             // console.error("Error in get_listing:", error.response);
//             return rejectWithValue(error.response?.data || "An error occurred");
//         }
//     }
// );


export const get_all_sellers = createAsyncThunk(
    'listing/get_all_sellers',
    async(_,{fulfillWithValue}) =>{
        try {
            const {data} = await api.get('/home/get-all-sellers')
            console.log("____________________________ >")
            console.log(data)
            return fulfillWithValue(data);

        } catch (error) {
            console.log(error.response)
        }
    }
)


export const get_cluster_details = createAsyncThunk(
    'listing/get_cluster_details',
    async (clusterId, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await api.get(`/home/get-cluster-details/${clusterId}`);
            console.log(data)
            return fulfillWithValue(data);
        } catch (error) {
            // console.error("Error in get_listing:", error.response);
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


export const transactionReducer = createSlice({
    name: 'transaction',
    initialState : {
        successMessage: "",
        errorMessage: "",
        loader: false,
        vouchers: [],
        totalVouchers: 0,
        transaction: {},
        currentTransactions: {}
        
    },
    reducers:{
        messageClear: (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
          },

    },

    extraReducers: (builder) => {
       
        builder.addCase(get_transaction_by_deal.fulfilled, (state, payload) => {
            state.loader = false;
            state.currentTransactions = payload.payload.transactions;
           
            
        });
        
        
       
    },
})

export const {messageClear} = transactionReducer.actions
export default transactionReducer.reducer