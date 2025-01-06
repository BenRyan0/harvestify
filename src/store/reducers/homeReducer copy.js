import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'





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
// export const yield_range_listing = createAsyncThunk(
//     'listing/yield_range_listing',
//     async (unit, { fulfillWithValue, rejectWithValue }) => {
//         console.log(unit);
//         try {
//             // Correctly passing unit as a query parameter using the params object
//             const { data } = await api.get('/home/yield-range-latest-listings', {
//                 params: { unit } // unit will now be appended as a query parameter
//             });
//             console.log(data);
//             return fulfillWithValue(data);
//         } catch (error) {
//             console.log(error.response || error.message);
//             return rejectWithValue(error.response || error.message);
//         }
//     }
// );


// export const yield_range_listing = createAsyncThunk(
//     'listing/yield_range_listing',
//     async (unit, { fulfillWithValue, rejectWithValue }) => {
//       console.log(unit);
//       try {
//         // Assuming you want to pass `unit` as a query parameter in the GET request
//         const { data } = await api.get('/home/yield-range-latest-listings', {
//           params: { unit },  // Correct way to pass query params
//         });
  
//         console.log(data);
//         return fulfillWithValue(data);
//       } catch (error) {
//         console.log(error.response);
//         return rejectWithValue(error.response?.data || 'An error occurred');
//       }
//     }
//   );
  
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
// export const query_listings = createAsyncThunk(
//     'listing/query-listings',
//     async (query, { fulfillWithValue, rejectWithValue }) => {
//         console.log(query)
//         try {
//             const { data } = await api.get(`/home/query-listings?category=${query.category}&rating=${query.rating}&lowPrice=${query.low}&highPrice=${query.high}&sortPrice=${query.sortPrice}&pageNumber=${query.pageNumber}`);
//             console.log("________________________")
//             console.log(data)
//             return fulfillWithValue(data);
//         } catch (error) {
//             console.error(error.response);
//             return rejectWithValue(error.response?.data || "An error occurred while fetching listings.");
//         }
//     }
// );
// export const query_listings = createAsyncThunk(
//     'listing/query-listings',
//     async (query, { fulfillWithValue, rejectWithValue }) => {
//         console.log(query);
//         try {
//             // Make sure lowYield and highYield are passed
//             const { data } = await api.get(`/home/query-listings`, {
//                 params: {
//                     category: query.category,
//                     rating: query.rating,
//                     lowPrice: query.lowPrice,
//                     highPrice: query.highPrice,
//                     lowYield: query.lowYield,  // Passing lowYield
//                     highYield: query.highYield, // Passing highYield
//                     sortPrice: query.sortPrice,
//                     sortYield:query.sortYield,
//                     pageNumber: query.pageNumber,
//                     perPage: query.perPage,
//                     sortYieldUnit: query.sortYieldUnit,
//                     searchValue: query.searchValue

                   

//                 },
//             });
//             console.log("________________________");
//             console.log(data);
//             return fulfillWithValue(data);
//         } catch (error) {
//             console.error(error.response);
//             return rejectWithValue(error.response?.data || "An error occurred while fetching listings.");
//         }
//     }
// );

export const query_listings = createAsyncThunk(
    'listing/query-listings',
    async (query, { fulfillWithValue, rejectWithValue }) => {
   

        // Set searchValue to an empty string if it's not provided
        const searchValue = query.searchValue || "";

        try {
            const { data } = await api.get(`/home/query-listings`, {
                params: {
                    category: query.category,
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
          
            return fulfillWithValue(data);
        } catch (error) {
            console.error(error.response);
            return rejectWithValue(error.response?.data || "An error occurred while fetching listings.");
        }
    }
);




export const homeReducer = createSlice({
    name: 'home',
    initialState : {
        categories: [],
        allListings: [],
        listings: [],
        totalListing: 0,
        parPage : 4,
        featuredListings: [],
        latestListings: [],
        topRatedListings: [],
        discounted_listings: [],
        allYieldUnits:[],
        priceRange : {
            low : 0,
            high : 100
          },
        yieldRange : {
            low : 0,
            high : 100
          }
        
    },
    reducers:{

    },

    extraReducers: (builder) => {
        builder.addCase(get_categories.fulfilled, (state, payload) => {
            // state.category = payload.payload.message;
            // state.totalCategory = payload.payload.totalCategory;
            state.categories = payload.payload.categories;
          });




        builder.addCase(get_listings.fulfilled, (state, payload) => {
            // state.category = payload.payload.message;
            // state.totalCategory = payload.payload.totalCategory;
            state.allListings = payload.payload.allListings;
            state.featuredListings = payload.payload.featuredListings;
            state.latestListings = payload.payload.latestListings;
            state.topRatedListings = payload.payload.topRatedListings;
            state.discounted_listings = payload.payload.discounted_listings;
          });
        
        builder.addCase(price_range_listing.fulfilled, (state, payload) => {
            state.latestListings = payload.payload.latestListings;
            state.priceRange = payload.payload.priceRange;
         });
        builder.addCase(yield_range_listing.fulfilled, (state, payload) => {
            state.latestListings = payload.payload.latestListings;
            state.yieldRange = payload.payload.yieldRange;
         });
         
        builder.addCase(query_listings.fulfilled, (state, payload) => {
            state.listings = payload.payload.listings;
            state.totalListing = payload.payload.totalListing;
            state.parPage = payload.payload.parPage;
         });


        builder.addCase(expected_yields_units.fulfilled, (state, payload) => {
            state.allYieldUnits = payload.payload.yieldUnits;
         });
       
    },
})


export default homeReducer.reducer