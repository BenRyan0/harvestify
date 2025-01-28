import React, { useEffect, useState } from 'react'
import Stepper from '../DealProgress/Stepper'
import StepperControl from '../DealProgress/StepperControl'
import Review from '../DealProgress/steps/Review';
import FirstPayment from '../DealProgress/steps/FirstPayment';
import FirstConfirmation from '../DealProgress/steps/FirstConfirmation';
import DeliveryReceipt from '../DealProgress/steps/DeliveryReceipt';
import SecondConfirmation from '../DealProgress/steps/SecondConfirmation';
import SecondPayment from '../DealProgress/steps/SecondPayment';
import Complete from '../DealProgress/steps/Complete';
import Complete_ from '../DealProgress/steps/Complete_';
import { StepperContext } from '../../contexts/StepperContext';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_deal } from '../../store/reducers/dealReducer';
import {get_transaction_by_deal,messageClear  } from '../../store/reducers/transactionReducer';
import toast from 'react-hot-toast';
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import dateFormat, { masks } from "dateformat";
import { TiCancel } from "react-icons/ti";




const DealProgress = () => {
    
    const { dealId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1)
    const [userData, setUserData] = useState([])
    const [finalData, setFinalData] = useState([])
    const [currentTransaction, setCurrentTransaction] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const { loader,transaction, errorMessage, successMessage, currentTransactions,currentProduct} = useSelector(
        (state) => state.transaction
      );


      const [showProductInfo, setShowProductInfo] = useState(false);
  const [showBuyerInfo, setShowBuyerInfo] = useState(false);


  const [showModal, setShowModal] = useState(false);
  
    const steps = [
        "Review", // Buyer selects the product and sees the price and deposit required.
        "Proof_Upload", // Buyer pays the deposit via an external method and uploads the proof of payment.
        "Confirmation", // Seller reviews and confirms the deposit proof.
        "Delivery/Receipt", // The product is delivered to the buyer.
        "Upload_Proof", // Buyer pays the remaining balance and uploads the proof of payment.
        "Confirmation", // Seller reviews and confirms the final payment proof.
        "Review",
        "Complete" // The transaction is marked as complete by the seller.
    ];

    const formatNumber = (num) => {
      return new Intl.NumberFormat('en-US').format(Math.floor(num));
    }; 

    const [copiedText, setCopiedText] = useState(null); // To track the copied text

    const handleCopy = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(text); // Set the copied text
        setTimeout(() => setCopiedText(null), 2000); // Clear the confirmation after 2 seconds
      });
    };


    useEffect(() => {
        if (currentTransactions && currentTransactions.length > 0) {
          let myStep = currentTransactions[0]?.buyerStep || 1;
          setCurrentStep(myStep);
        }
      }, [currentTransactions]);



    console.log("dealID" + dealId)
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            console.log("ywa")
            await dispatch(get_transaction_by_deal(dealId));
          } catch (error) {
            console.error('Error fetching transaction:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [dispatch, dealId]);


      useEffect(() => {
        console.log("transaction ------------------------ >")
        // console.log(currentTransactions[0])
        setCurrentTransaction(currentTransactions[0])
      }, [currentTransactions]);
    
      useEffect(()=>{
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
            // navigate('/')
        }else{
            toast.success(successMessage)
            dispatch(messageClear())
            // setState({
            //     name:'',
            //     image : ''
            // })
            // setImage('')
            // navigate('/')
        }
        },[successMessage, errorMessage])


        const handleConfirm = () => {
          setShowModal(false);
          navigate("/dashboard/cancellation/12312312312123");
        };
      
        const handleCancel = () => {
          setShowModal(false);
        };
      
    

    const displaySteps = (step)=>{
        switch(step){
            case 1:
                return <Review/>
            case 2:
                return <FirstPayment/>
            case 3:
                return <FirstConfirmation/>
            case 4:
                return <DeliveryReceipt/>
            case 5:
                return <SecondPayment/>
            case 6:
                return <SecondConfirmation/>
            case 7:
                return <Complete/>
            case 8:
                return <Complete_/>
            default:
        }
    }



    
    if (loader) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="text-slate-600 font-semibold text-lg">Loading deal details...</div>
        </div>
      );
    }
  
    
  return (
    <div className='w-full h-full bg-white rounded-md px-5 py-3 pb-6' >
        <div className="container horizontal mt-5">
          <Stepper steps = {steps} currentStep={currentStep}/>

          <div className="my-1 py-10  px-3 ">
          <StepperContext.Provider value={{
                    userData,
                    setUserData,
                    currentStep, 
                    setCurrentStep,
                    currentTransaction, 
                    setCurrentTransaction,
                    finalData,
                    setFinalData,
                    
                }}>
                {displaySteps(currentStep)}

                </StepperContext.Provider>
          </div>
        </div>
        {
          currentProduct === "none"? 
          (
            <div className="">
              
            </div>
          )
          :
          (
            <div className="">
               {
            currentStep === 1? 
            <div className=""></div> 
            : 
            <div className="w-full px-2 lg:px-7 pt-5">
              
            <div className="w-full flex justify-between">
              {/* <div className="">
              {
                currentStep === 4 || currentStep === 5|| currentStep === 6|| currentStep === 7|| currentStep === 8 ?
                (
                  <div className=""></div>
                )
                :
                (
                  <div>
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-red-400 font-semibold px-3 py-2 text-slate-100 rounded-sm flex justify-center items-center"
                    >
                      Cancellation Page
                      <TiCancel size={25} />
                    </button>
                            {showModal && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999999]">
                                <div className="bg-white p-6 rounded-lg shadow-lg text-slate-600">
                                  <h2 className="text-xl font-semibold">Confirm Navigation</h2>
                                  <div className="text-center">
                                    <p className="mt-2 text-[17px]">Are you sure you want to navigate to the cancellation page?</p>
                                    <p className="mt-2 text-[13px]">Each Account can only do 3 cancellations</p>
                                  </div>
                                
                                  <div className="mt-4 flex justify-end gap-3">
                                    <button
                                      onClick={handleCancel}
                                      className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={handleConfirm}
                                      className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600"
                                    >
                                      Confirm
                                    </button>
                                  </div>
                                </div>
                              </div>
                      )}
              </div>
                )
              }
             
               
              </div> */}
              <div className="flex gap-3">
                <button
                  className="flex gap-2 justify-center items-center"
                  onClick={() => setShowProductInfo(!showProductInfo)}
                >
                  Product Info
                  <span
                    className={`transition-transform duration-300 ease-in-out ${
                      showProductInfo ? "rotate-360" : "rotate-0"
                    }`}
                  >
                    {showProductInfo ? <FaChevronUp size={20} /> : <FaChevronDown size={20}/>}
                  </span>
                </button>
                <button
                  className="flex gap-2 justify-center items-center"
                  onClick={() => setShowBuyerInfo(!showBuyerInfo)}
                >
                  My logistics Info
                  <span
                    className={`transition-transform duration-300 ease-in-out ${
                      showBuyerInfo ? "rotate-360" : "rotate-0"
                    }`}
                  >
                    {showBuyerInfo ? <FaChevronUp size={20}/> : <FaChevronDown size={20}/>}
                  </span>
                </button>
              </div>
            </div>

            <div
              className={`bg-[#EEEEEE] mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md text-primaryDark shadow-md ${
                showProductInfo ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <h2 className='font-bold text-lg uppercase'>Product Info</h2>
              {
                currentProduct? 
                (
                  <div className="px-2 flex justify-between lg:flex-row flex-col gap-1 border-t-2 border-primaryDark pt-3">
                  <div className="w-full">
                     <h2><span className='font-bold uppercase pr-1'>Name: </span > {currentProduct.listing[0].name}</h2>
                     <h2><span className='font-bold uppercase pr-1'>price: </span> <span>&#8369;</span> {currentProduct.listing[0].price}/{currentProduct.listing[0].unit}</h2>
                     <h2><span className='font-bold uppercase pr-1'>expectedHarvestYield: </span> {currentProduct.listing[0].expectedHarvestYield} {currentProduct.listing[0].yieldUnit}</h2>
                     <h2><span className='font-bold uppercase pr-1'>totalPrice: </span> {formatNumber(currentProduct.listing[0].totalPrice)}</h2>
                     <h2><span className='font-bold uppercase pr-1'>description: </span> {currentProduct.listing[0].description}</h2>
                     <h2><span className='font-bold uppercase pr-1'>harvestStartDate: </span> {dateFormat((currentProduct.listing[0].harvestStartDate), "yyyy-mm-dd")}</h2>
                     <h2><span className='font-bold uppercase pr-1'>harvestEndDate: </span>{dateFormat((currentProduct.listing[0].harvestEndDate), "yyyy-mm-dd")}</h2>
                     <h2><span className='font-bold uppercase pr-1'>locationInfo: </span> {currentProduct.listing[0].locationInfo}</h2>
                     <h2 className='py-1'>
                      <span className="font-bold uppercase pr-1">mapsLink: </span>
                      <a 
                        href={currentProduct.listing[0].mapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                      >
                        Open in Google Maps
                      </a>
                    </h2>
                     
                     <h2><span className='font-bold uppercase pr-1'>pricePerUnit: </span> {currentProduct.listing[0].pricePerUnit} <span>&#8369;</span> /{currentProduct.listing[0].unit}/KM</h2>
                     <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1 '>sellerDelivery: </span> 
                      {currentProduct.listing[0].sellerDelivery === true? <span className="text-slate-100 font-semibold bg-primary py-[1px] px-3 my-[1px] ">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }
                     </h2>
                     <h2 className='flex justify-start items-center'><span className='font-bold uppercase pr-1'>traderPickup: </span> 
                      {currentProduct.listing[0].sellerDelivery === true? <span className="text-primary font-semibold bg-slate-100 py-[1px] px-3 my-[1px]">Available</span> : <span className="text-red-600 font-semibold bg-slate-100 py-1 px-3 ">Unavailable</span> }  
                      </h2>
                      {
                        currentProduct.listing[0].shippingFee === 0?
                        (
                          <div className=""></div>
                        )
                        :
                        (
                          <h2><span className='font-bold uppercase pr-1'>shippingFee: </span> {currentProduct.listing[0].shippingFee}</h2>

                        )
                      }
                     
                  </div>
                  <div className="w-full">
                     <h2><span className='font-bold uppercase pr-1'>discount: </span> {currentProduct.listing[0].discount} %</h2>
                     <h2><span className='font-bold uppercase pr-1'>category: </span> {currentProduct.listing[0].category}</h2>
                     <h2><span className='font-bold uppercase pr-1'>clusterName: </span> {currentProduct.listing[0].clusterName}</h2>
                  </div>
                 </div> 
                  
                )
                :
                ( <div className=""></div> )
              }
             
             
            </div>
      
           
          { 
            currentProduct.shippingMethod === "traderPickup" ? 
            (  <div
              className={`bg-[#EEEEEE] mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md shadow-lg text-primaryDark ${
                showBuyerInfo ? "max-h-[500px] opacity-100 text-base" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <div className="flex  flex-col">
                <h2 className='font-semibold text-lg uppercase'>My logistics Info</h2>
                <div className="flex flex-col gap-1 border-t border-primaryDark pt-3">
                    <h2><span className='font-bold uppercase'>Trader Name : </span> {currentProduct.shippingInfo.name}</h2>
                    <h2>
                      <span className="font-bold uppercase">Phone: </span>
                      {currentProduct.shippingInfo.phone}
                      <button 
                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded lg:hidden" 
                        onClick={() => window.location.href = `tel:${currentProduct.shippingInfo.phone}`}>
                        Call
                      </button>
                      <button
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => handleCopy(currentProduct.shippingInfo.phone)}
                      >
                        Copy
                      </button>
                      {copiedText === currentProduct.shippingInfo.phone && (
                        <span className="ml-2 text-green-500 font-semibold ">Copied!</span>
                      )}

                    </h2>
                    <h2>
                    <span className="font-bold uppercase">Email: </span>
                    {currentProduct.shippingInfo.email}
                    <button 
                      className="ml-2 bg-blue-500 text-white px-2 py-1 rounded lg:hidden" 
                      onClick={() => window.location.href = `mailto:${currentProduct.shippingInfo.email}`}>
                      Email
                    </button>
                    <button
                        className="ml-2 bg-green-500 text-white px-2 py-1 rounded "
                        onClick={() => handleCopy(currentProduct.shippingInfo.email)}
                      >
                        Copy
                      </button>
                      {copiedText === currentProduct.shippingInfo.email && (
                        <span className="ml-2 text-green-500 font-semibold ">Copied!</span>
                      )}

                  </h2>
                </div>
               
              </div>
           
              <div className="px-2">
                 {/* <h2><span className='font-bold'>sasd: </span> {currentProduct.shippingInfo.id}</h2> */}
              </div>
            </div>)
            :
            (  <div
              className={`bg-[#EEEEEE] mt-3 p-4 transition-all duration-300 ease-in-out overflow-hidden rounded-md shadow-lg text-primaryDark ${
                showBuyerInfo ? "max-h-[500px] opacity-100 text-base" : "max-h-0 opacity-0 hidden"
              }`}
            >
              <h2 className='font-semibold text-lg uppercase'>My logistics Info</h2>
              <div className="px-2 border-t-2 border-primaryDark pt-3">
                 <h2><span className='font-bold uppercase'>Trader Name : </span> {currentProduct.shippingInfo.name}</h2>
                 <h2>
                  <span className="font-bold uppercase">Phone: </span>
                  {currentProduct.shippingInfo.phone}
                  <button 
                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded" 
                    onClick={() => window.location.href = `tel:${currentProduct.shippingInfo.phone}`}>
                    Call
                  </button>
                </h2>
                <h2>
                <span className="font-bold uppercase">Email: </span>
                {currentProduct.shippingInfo.address}
                <button 
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded" 
                  onClick={() => window.location.href = `mailto:${currentProduct.shippingInfo.address}`}>
                  Email
                </button>
              </h2>
                 <h2><span className='font-bold uppercase'>locationInfo : </span> {currentProduct.shippingInfo.locationInfo}</h2>
                 <h2><span className='font-bold uppercase'>additionalLocationInfo : </span> {currentProduct.shippingInfo.additionalLocationInfo}</h2>
                 <h2 className='py-1'>
                      <span className="font-bold uppercase pr-1">mapsLink: </span>
                      <a 
                        href={currentProduct.shippingInfo.mapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 bg-slate-100 rounded-sm font-bold px-2 py-[2px] underline"
                      >
                        Open in Google Maps
                      </a>
                    </h2>
              </div>
            </div>)
          }
          </div>
          
          }

            </div>
          )
        }







       
        {/* <StepperControl steps = {steps} currentStep={currentStep}/> */}
    </div>
  )
}

export default DealProgress