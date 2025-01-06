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


export const homeReducer = createSlice({
    name: 'home',
    initialState : {
        categories: [],
        allListings: [],
        listings: [],
        totalListing: 0,
        parPage : 5,
        featuredListings: [],
        latestListings: [],
        topRatedListings: [],
        discounted_listings: [],
        allYieldUnits:[],
        listing: {},
        totalShippingFee : 0,
        relatedListings : [],
        moreListings: [],
        priceRange : {
            low : 0,
            high : 100
          },
        yieldRange : {
            low : 0,
            high : 100
          } ,
        reviews : [],
        sellers : [],
        seller : {},
        totalReview: 0,
        cluster_listings_count: 0,
        cluster_listings: [],
        rating_review : [],
          successMessage: '',
          errorMessage: '',
          loader : false
        
    },
    reducers:{
        messageClear: (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
          },

    },

    extraReducers: (builder) => {
        builder.addCase(get_categories.fulfilled, (state, payload) => {
            // state.category = payload.payload.message;
            // state.totalCategory = payload.payload.totalCategory;
            state.categories = payload.payload.categories;
          });




        builder.addCase(get_listings.fulfilled, (state, payload) => {
      
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

         builder.addCase(get_listing.pending, (state, payload) => {
            state.loader= true;
            
          });
         builder.addCase(get_listing.rejected, (state, payload) => {
           
            state.loader= false;
          });
        //  builder.addCase(get_listing.fulfilled, (state, payload) => {
        //     state.loader= false;
        //     state.listing = payload.payload.listing;
        //     state.relatedListings = payload.payload.relatedListings;
        //     state.moreListings = payload.payload.moreListings;
            
        //   });
        builder.addCase(get_listing.fulfilled, (state, payload) => {
            // console.log("API Response for get_listing:", payload.payload);
            state.loader = false;
            state.listing = payload.payload.listing;
            state.totalShippingFee = payload.payload.totalShippingFee;
            state.relatedListings = payload.payload.relatedListings;
            state.moreListings = payload.payload.moreListings;
        });



        builder.addCase(trader_review.pending, (state,_) => {
            state.loader = true;
        });
        builder.addCase(trader_review.rejected, (state, payload) => {
            state.loader = false;
            state.errorMessage = payload.payload.error;  
        });
        builder.addCase(trader_review.fulfilled, (state, payload) => {
            state.loader = false;
            state.successMessage = payload.payload.message;
          
        });
        
        builder.addCase(get_reviews.fulfilled, (state, payload) => {
            state.loader = false;
            state.reviews = payload.payload.reviews;
            state.totalReview = payload.payload.totalReview;
            state.rating_review= payload.payload.rating_review;
            
        });
        
        builder.addCase(get_all_sellers.fulfilled, (state, payload) => {
            state.loader = false;
            state.sellers = payload.payload.sellers;
           
            
        });
        
        builder.addCase(get_cluster_details.pending, (state,_) => {
            state.loader = true;
        });
        
        builder.addCase(get_cluster_details.rejected, (state, payload) => {
            state.loader = false;        
        });
        
        builder.addCase(get_cluster_details.fulfilled, (state, payload) => {
            state.loader = false;
            state.seller = payload.payload.seller;
            state.cluster_listings = payload.payload.listings;
            state.cluster_listings_count = payload.payload.listings.length;
           
            
        });
        
        
       
    },
})

export const {messageClear} = homeReducer.actions
export default homeReducer.reducer