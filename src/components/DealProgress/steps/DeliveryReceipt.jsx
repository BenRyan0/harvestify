import React, { useContext, useEffect, useState } from 'react';
// import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { StepperContext } from '../../../contexts/StepperContext';
import { Link, useLocation } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdd ,messageClear,trader_handoff_confirm} from '../../../store/reducers/transactionReducer';
import { BsImage } from 'react-icons/bs';
import { FaChevronLeft } from "react-icons/fa";
import toast from 'react-hot-toast';

const DeliveryReceipt = () => {
    const dispatch = useDispatch()
    const [imageShow, setImage] = useState('')
    const { transactionData, setTransactionData } = useContext(StepperContext);
    const { currentStep, setCurrentStep } = useContext(StepperContext);
    const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
    
    const loader = false;
  
  
    const {myDeal} = useSelector((state) => state.deal);
      const {DeliveryHandoffProof ,transaction, errorMessage, successMessage, currentTransactions } = useSelector(
          (state) => state.transaction
        );


        console.log("currentTransactions")
        console.log(currentTransactions)

        const traderConfirm = () => {
          dispatch(trader_handoff_confirm(currentTransactions[0]._id))
          if (errorMessage) {
                toast.error(errorMessage);
                dispatch(messageClear());
                window.location.reload(); // Refresh the page
              } else {
                toast.success(successMessage);
                dispatch(messageClear());
                window.location.reload(); // Refresh the page
              }
        }
  return (
    <div>
      {DeliveryHandoffProof?
        <div className="w-full flex gap-2 flex-col">
          <img src={DeliveryHandoffProof.imageUrl} alt="" />
          <div className="w-full">
            <button onClick={traderConfirm} className='px-6 bg-primaryDark py-2 rounded-md font-bold text-slate-100'>I now Have the Listing</button>
          </div>
        </div>
        :
        <div className="">False</div>
      }
    </div>
  )
}

export default DeliveryReceipt