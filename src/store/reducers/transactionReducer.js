import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import api from '../../api/api'


export const cancel_transaction_due_to_dispute_by_trader = createAsyncThunk(
  'transaction/cancel_transaction_due_to_dispute_by_trader',
  async ({ transactionId, traderId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/cancel-by-trader/${transactionId}/${traderId}`);
      console.log("Cancelled transaction due to dispute:", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error");
    }
  }
);


export const resend_deposit_proof = createAsyncThunk(
  'transaction/resend_deposit_proof',
  async ({ transactionId, imageFile, proofMessage }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('transactionId', transactionId);
      formData.append('message', proofMessage);
      formData.append('image', imageFile); // `imageFile` should be a File or Blob object

      console.log(formData)
      console.log("formData")

      const { data } = await api.post(`/resend-payment-proof/${transactionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Resent deposit proof successfully:", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error");
    }
  }
);




export const get_transaction_by_deal = createAsyncThunk(
    'transaction/get_transaction_by_deal',
    async (traderDealId, { rejectWithValue, fulfillWithValue}) => {
      console.log("-------------------------- >>")
      console.log("dealID" + traderDealId)
  
        try {
            const { data } = await api.get(`/trader/transaction-get/${traderDealId}`)
            console.log("GET TRADER DEAL TRANSACTION _______________________________ <")
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
  )
  

  export const paymentAdd = createAsyncThunk(
    "transaction/paymentAdd",
    async ({ message, image,transactionId,paymentType }, { rejectWithValue, fulfillWithValue}) => {
      try {
        console.log("message " + message)
        console.log("transactionId " + transactionId)
        console.log("image " + image)
        const formData = new FormData();
        formData.append("message", message);
        formData.append("image", image);
        formData.append("transactionId",transactionId);
        formData.append("paymentType",paymentType);
  
        const { data } = await api.post("/trader/payment-add", formData);
        // const { data } = await api.post("/trader/final-payment-add", formData);

        console.log("----------------------------------- PAYMENT ADD")
        console.log(data)
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const deleteTraderDeal = createAsyncThunk(
    "traderDeal/deleteTraderDeal",
    async (traderDealId, { rejectWithValue, fulfillWithValue }) => {
      console.log("Deleting Trader Deal ID:", traderDealId);
      try {
        const response = await api.delete(`/trader/traderDeal-delete/${traderDealId}`);
        return fulfillWithValue(response.data); // Return the server response on success
      } catch (error) {
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );
  
  
  export const paymentAdd2 = createAsyncThunk(
    "transaction/paymentAdd2",
    async ({ message, image,transactionId,paymentType }, { rejectWithValue, fulfillWithValue}) => {
      try {
        console.log("message " + message)
        console.log("transactionId " + transactionId)
        console.log("image " + image)
        const formData = new FormData();
        formData.append("message", message);
        formData.append("image", image);
        formData.append("transactionId",transactionId);
        formData.append("paymentType",paymentType);
        const { data } = await api.post("/trader/final-payment-add", formData);
    
        // const { data } = await api.post("/trader/payment-add", formData);
        console.log(data)
        return fulfillWithValue(data);
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  export const trader_handoff_confirm = createAsyncThunk(
    'transaction/trader_handoff_confirm',
    async (transactionId, { rejectWithValue, fulfillWithValue, getState }) => {
        console.log("transactionId ---------------->", transactionId); // Check transactionId value
        try {
            // Send transactionId as part of the body in an object
            const { data } = await api.post(`/trader/trader-handoff-confirm`, { transactionId });
            console.log("trader_handoff_confirm:", data);
            return fulfillWithValue(data);
        } catch (error) {
            console.error("Transaction failed:", error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

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
        console.log("01 __________________________________ REVIEW");
        try {
            const { data } = await api.post('/home/trader/submit-review', info);
            console.log("02 __________________________________ REVIEW");
            console.log(data);
            return fulfillWithValue(data); // Successful action dispatch with data
        } catch (error) {
            console.log(error)
            // Adding more detailed error handling
            const errorMsg = error.response?.data || error.message || "An error occurred";
            return rejectWithValue(errorMsg); // Dispatch failed action with error message
        }
    }
);


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
        proof: {},
        currentTransactions: {},
        DeliveryHandoffProof : {},
        currentProduct : {},
        loaderS1 : false,
        myCurrentTransactionSTEP : 1,
        resendSuccess : false
        
    },
    reducers:{
        messageClear: (state, _) => {
            state.errorMessage = "";
            state.successMessage = "";
          },
        resendReset: (state, _) => {
            state.resendSuccess = false;
            
          },

    },

    extraReducers: (builder) => {
       
        builder.addCase(get_transaction_by_deal.pending, (state, _) => {
            state.loader = true;
        });
       
        builder.addCase(get_transaction_by_deal.rejected, (state, payload) => {
            state.loader = false;
            state.currentProduct = "none";
        });
       
        builder.addCase(get_transaction_by_deal.fulfilled, (state, payload) => {
            state.loader = false;
            state.currentTransactions = payload.payload.transactions;
            state.currentProduct = payload.payload.deal;
            state.myCurrentTransactionSTEP = payload.payload.transactions[0].buyerStep
        });
       
        builder.addCase(trader_handoff_confirm.pending, (state, payload) => {
            state.loader = true;
        });
       
        builder.addCase(trader_handoff_confirm.rejected, (state, payload) => {
            state.loader = false;
        });
       
        builder.addCase(trader_handoff_confirm.fulfilled, (state, payload) => {
            state.loader = false;    
            state.currentTransactions = payload.payload.transaction;
            state.currentProduct = payload.payload.deal;
            state.myCurrentTransactionSTEP = payload.payload.transaction.buyerStep 
            window.location.reload();  
        });

        builder.addCase(paymentAdd2.pending, (state, payload) => {
            state.loader = true;
        });
       
        builder.addCase(paymentAdd2.rejected, (state, payload) => {
            state.loader = false;
        });
       
        builder.addCase(paymentAdd2.fulfilled, (state, payload) => {
            state.loader = false;   
            state.currentTransactions = payload.payload.updatedTransaction;
            // state.currentProduct = payload.payload.deal;
            state.myCurrentTransactionSTEP = payload.payload.updatedTransaction.buyerStep;
            window.location.reload();          
        });


        builder.addCase(paymentAdd.pending, (state, payload) => {
            state.loader = true       
            state.loaderS1 = true       
        });

        builder.addCase(paymentAdd.rejected, (state, payload) => {
            state.loader = false;
            state.loaderS1 = false;
            state.errorMessage = payload.payload.error;        
        });
        builder.addCase(paymentAdd.fulfilled, (state, payload) => {
            state.loader = false;
            state.loaderS1 = false;
            state.successMessage = payload.payload.message;        
            state.proof = payload.payload.proof;      
            state.currentTransactions = payload.payload.updatedTransaction;  
            window.location.reload();
        });



        builder.addCase(trader_review.rejected, (state, payload) => {
            state.loader = false;
            state.errorMessage = payload.payload.error;        
        });
        builder.addCase(trader_review.fulfilled, (state, payload) => {
            state.loader = false;
            state.successMessage = payload.payload.message;  
            window.location.reload();          
            // state.proof = payload.payload.proof;      
            // state.currentTransactions = payload.payload.updatedTransaction;  
        });
        


        builder.addCase(deleteTraderDeal.pending, (state, payload) => {
            state.loader = true;     
        });

        builder.addCase(deleteTraderDeal.rejected, (state, payload) => {
            state.loader = false;
            state.errorMessage = payload.payload.error;        
        });
        builder.addCase(deleteTraderDeal.fulfilled, (state, payload) => {
            state.loader = false;
            state.successMessage = payload.payload.message;        
        });

        builder.addCase(cancel_transaction_due_to_dispute_by_trader.pending, (state, payload) => {
            state.loader = true;     
        });

        builder.addCase(cancel_transaction_due_to_dispute_by_trader.rejected, (state, payload) => {
            state.loader = false;
            state.errorMessage = payload.payload.error;        
        });
        builder.addCase(cancel_transaction_due_to_dispute_by_trader.fulfilled, (state, payload) => {
            state.loader = false;
            state.successMessage = payload.payload.message;        
            state.currentTransactions = [payload.payload.transaction];        
            state.transaction = [payload.payload.transaction];        
        });


        builder.addCase(resend_deposit_proof.pending, (state, payload) => {
            state.loader = true;    
             
        });

        builder.addCase(resend_deposit_proof.rejected, (state, payload) => {
            state.loader = false;
            state.errorMessage = payload.payload.error;   
            state.resendSuccess = false;       
        });
        builder.addCase(resend_deposit_proof.fulfilled, (state, payload) => {
            state.loader = false;
            state.successMessage = payload.payload.message;        
            state.currentTransactions = [payload.payload.updatedTransaction];        
            state.transaction = [payload.payload.updatedTransaction];   
            state.resendSuccess = true;     
        });
        
       
    },
})

export const {messageClear,resendReset} = transactionReducer.actions
export default transactionReducer.reducer