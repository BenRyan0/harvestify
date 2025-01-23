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
  const [rate, setRate] = useState('')
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
       window.location.reload();
      //  dispatch(trader_review)
     }
  
   

     console.log("currentTransaction")
     console.log( currentTransaction)
     useEffect(()=>{
      if(errorMessage){
      }else{
        setRev("")
        setRate(0)
       
      }
      },[successMessage, errorMessage])
  
  return (
    <div>
      <div className="">
          {
            userInfo ?  <div className="flex flex-col gap-3">
            <div className="flex text-2xl">
                <RatingReact 
                onChange={(e)=>setRate(e)} 
                initialRating={rate}
                emptySymbol={  <span className='text-slate-500'><BiShield/></span>} 
                fullSymbol={ <span className='text-primary'><BiSolidCheckShield/></span>}
                />
                
            </div>
            <form onSubmit={review_submit}>
              <textarea value={rev} required onChange={(e)=>setRev(e.target.value)} className='border-2 outline-0 p-3 w-full border-slate-300 rounded-md text-slate-500 focus:border-primaryDark'  cols="30" rows="5" name="" id=""></textarea>
              <div className="mt-2">
                <button className='py-1 px-5 bg-primary text-white font-semibold rounded-md'>Submit</button>
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