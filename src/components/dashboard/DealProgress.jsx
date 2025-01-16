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
import { StepperContext } from '../../contexts/StepperContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_deal } from '../../store/reducers/dealReducer';
import {get_transaction_by_deal,messageClear  } from '../../store/reducers/transactionReducer';
import toast from 'react-hot-toast';




const DealProgress = () => {
    
    const { dealId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1)
    const [userData, setUserData] = useState([])
    const [finalData, setFinalData] = useState([])
    const [currentTransaction, setCurrentTransaction] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const { transaction, errorMessage, successMessage, currentTransactions } = useSelector(
        (state) => state.transaction
      );

    const steps = [
        "Review", // Buyer selects the product and sees the price and deposit required.
        "Proof_Upload", // Buyer pays the deposit via an external method and uploads the proof of payment.
        // "Confirmation", // Seller reviews and confirms the deposit proof.
        "Delivery/Receipt", // The product is delivered to the buyer.
        "Upload_Proof", // Buyer pays the remaining balance and uploads the proof of payment.
        // "Confirmation", // Seller reviews and confirms the final payment proof.
        "Complete" // The transaction is marked as complete by the seller.
    ];

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
        console.log(currentTransactions[0])
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
    

    const displaySteps = (step)=>{
        switch(step){
            case 1:
                return <Review/>
            case 2:
                return <FirstPayment/>
            // case 3:
                // return <FirstConfirmation/>
            case 3:
                return <DeliveryReceipt/>
            case 4:
                return <SecondPayment/>
            // case 5:
                // return <SecondConfirmation/>
            case 5:
                return <Complete/>
            default:
        }
    }
    
    
  return (
    <div className='w-full h-full bg-white rounded-md px-5 py-3'>
        <div className="container horizontal mt-5">
          <Stepper steps = {steps} currentStep={currentStep}/>

          <div className="my-1 py-10 md:px-10 px-3">
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
       
        {/* <StepperControl steps = {steps} currentStep={currentStep}/> */}
    </div>
  )
}

export default DealProgress