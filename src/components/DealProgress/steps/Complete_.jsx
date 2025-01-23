import React, { useContext, useState } from 'react'
import Review from './Review'
import { useDispatch, useSelector } from 'react-redux'
import RatingReact from 'react-rating'
import { BiSolidCheckShield } from "react-icons/bi";
import { BiShield } from "react-icons/bi";
import { trader_review } from '../../../store/reducers/transactionReducer';
import { Link } from 'react-router-dom';
import { StepperContext } from '../../../contexts/StepperContext';


const Complete_ = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state=>state.auth)
  const [rate, setRate] = useState('')
  const [rev , setRev] = useState('')
  const { transactionData, setTransactionData } = useContext(StepperContext);
  const { currentStep, setCurrentStep } = useContext(StepperContext);
  const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
    const ngi = "01";

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
        //  listingId : listing.listing._id,
        //  sellerId : listing.listing.sellerId._id
         
       }
       dispatch(trader_review(obj))
      //  dispatch(trader_review)
     }
   

     console.log("currentTransaction")
     console.log( currentTransaction)
  
  return (
    <div>
      <div className="w-full text-center">
        <h2 className='font-bold text-xl text-primaryDark'>TRANSACTION COMPLETED</h2>
        <Link to={"/"} className='hover:underline text-xs text-slate-500'><span>BROWSE FOR MORE PRODUCTS</span></Link>
      </div>  
    </div>
  )
}

export default Complete_