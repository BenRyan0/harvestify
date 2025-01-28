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
import { MdFullscreen } from "react-icons/md";
import dateFormat, { masks } from "dateformat";

const DeliveryReceipt = () => {
    const dispatch = useDispatch()
    const [imageShow, setImage] = useState('')
    const { transactionData, setTransactionData } = useContext(StepperContext);
    const { currentStep, setCurrentStep } = useContext(StepperContext);
    const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
    const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state
    
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
        const toggleFullscreen = () => {
          setIsFullscreen((prevState) => !prevState);
      };
      
      console.log("-------------------------")
      console.log(DeliveryHandoffProof)
  return (
    <div>
      {DeliveryHandoffProof?
        <div className="w-full flex md-lg:flex-col flex-row gap-2 justify-center md-lg:items-center">
           <div className="relative">
                    <img
                        className={`cursor-pointer  ${
                            isFullscreen ? 'fixed top-0 left-0 w-full h-full object-contain bg-black z-[999999999999999999]' : 'w-[300px] border-primaryDark border-4'
                        }`}
                        src={DeliveryHandoffProof.imageUrl}
                        alt="Proof of Handoff"
                        onClick={toggleFullscreen}
                    />
                    <div className="absolute bottom-2 right-2 left-0 text-[#283046] flex justify-center items-center">
                        <label htmlFor="">Click Image For Fullscreen View</label>
                        <MdFullscreen color='#283046' size={25}/>
                    </div>
            </div>

            <div className="lg:w-full w-5/12 text-slate-700 bg-slate-200 relative p-2 ">
                        <div className=" flex items-center justify-between text-end mb-6 border-b-2 border-primaryDark pb-3">
                        <h2 className='font-bold  text-primaryDark'>UPLOAD DATE: </h2>
                         <h2 className='bg-primaryDark font-semibold px-3 py-1 text-slate-100'> {dateFormat((DeliveryHandoffProof.uploadDate), "mmmm dS, yyyy")} </h2>
                        
                        </div>
                        <div className="w-full text-wrap h-[200px]">
                            <label className="font-bold ">Note: </label>
                            <p className="px-3">Your confirmation of receipt signifies that you have inspected the product and found it to be in acceptable condition.</p>
                        </div>
                        <div className="w-full absolute bottom-2 left-0 right-0 flex justify-center items-center md-lg:mt-10">
                        <button
                                 onClick={traderConfirm}
                                className="bg-primaryDark px-5 py-2 text-slate-200 rounded-md font-bold flex justify-center items-center gap-2 w-full "
                            >
                               I now Have the Listing 
                            </button>
                        </div>

                    </div>

                {/* <div className="justify-center flex flex-col relative bg-red-600">
                  <div className="w-full h-full">
                    asdasdasda ds asda dasdasd asd
                  </div>
                  <div className="absolute bottom-0 ">
                   <button onClick={traderConfirm} className='w-[300px] bg-primaryDark py-2 rounded-md font-bold text-slate-100 uppercase'>I now Have the Listing</button>
                  </div>
              </div> */}
        </div>
        :
         <div className='w-full text-center text-primaryDark py-10 flex justify-center items-center gap-2'>
                <h2 className='font-bold text-xl uppercase'>Seller Has not Uploaded of a proof of Product Handoff Yet</h2>
                {/* <MdOutlinePendingActions size={20}/> */}
          </div>
      }
    </div>
  
  )
}

export default DeliveryReceipt