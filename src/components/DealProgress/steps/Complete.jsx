import React, { useContext, useEffect, useState } from 'react'
import Review from './Review'
import { useDispatch, useSelector } from 'react-redux'
import RatingReact from 'react-rating'
import { BiSolidCheckShield } from "react-icons/bi";
import { BiShield } from "react-icons/bi";
import { trader_review } from '../../../store/reducers/transactionReducer';
import { Link } from 'react-router-dom';
import { StepperContext } from '../../../contexts/StepperContext';
import toast from 'react-hot-toast';



const Complete = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state=>state.auth)
  const [rate, setRate] = useState(1)
  const [rev , setRev] = useState('')
  const { transactionData, setTransactionData } = useContext(StepperContext);
  const { currentStep, setCurrentStep } = useContext(StepperContext);
  const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
   const { transaction, errorMessage, successMessage, currentTransactions } = useSelector(
        (state) => state.transaction
      );
   

    // const { transactionId, listingId, sellerId, name, rating, review } = req.body;

     const review_submit = (e)=>{
       e.preventDefault()
       const obj = {
         name: userInfo.name,
         review : rev,
         rating: rate,
         transactionId :currentTransaction._id,
         sellerId:currentTransaction.sellerId,
         listingId: currentTransaction.listingId
         
       }
       dispatch(trader_review(obj))
      //  window.location.reload();
      //  dispatch(trader_review)
      if(errorMessage){
      }else{
        setRev("")
        setRate(0)
       
      }
     }
  
   

     console.log("currentTransaction")
     console.log( currentTransaction)
     useEffect(()=>{
      
      },[successMessage, errorMessage])
  
  return (
    <div>
       <div className="flex justify-center items-center text-center">
        <h2 className='font-bold text-slate-700'>
          PLEASE DO SUBMIT A RATING TO THE SELLERS PRODUCT  
        </h2>
       
        </div>
      <div className="flex justify-center items-center w-full">
          {
            userInfo ?  <div className="flex flex-col gap-3 w-full justify-center items-center">
            <div className="flex justify-center flex-col text-2xl">
              
              <div className=""></div>
                <RatingReact 
                onChange={(e)=>setRate(e)} 
                initialRating={rate}
                emptySymbol={  <span className='text-slate-500'><BiShield/></span>} 
                fullSymbol={ <span className='text-primary'><BiSolidCheckShield/></span>}
                />
                
            </div>
            <form onSubmit={review_submit} className='w-full  flex justify-center flex-col items-center'>
              <textarea value={rev} required onChange={(e)=>setRev(e.target.value)} className='border-2 outline-0 p-3 md:w-full w-7/12 border-slate-300 rounded-md text-slate-500 focus:border-primaryDark'  cols="30" rows="5" name="" id=""></textarea>
              <div className="mt-2 md:w-full w-7/12">
                <button className='w-full py-3 px-5 bg-primary text-white font-semibold rounded-md'>Submit</button>
              </div>
            </form>
          </div>
          :
          <div className="">
            <Link className='py-2 px-5 bg-primary text-white font-semibold rounded-md' to='/login'>LOGIN</Link>
          </div>
          }
      </div>
    </div>
  )
}

export default Complete