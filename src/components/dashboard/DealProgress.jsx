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

    const { loader,transaction, errorMessage, successMessage, currentTransactions,currentProduct,myCurrentTransactionSTEP } = useSelector(
        (state) => state.transaction
      );


      const [showProductInfo, setShowProductInfo] = useState(false);
  const [showBuyerInfo, setShowBuyerInfo] = useState(false);


  const [showModal, setShowModal] = useState(false);
  

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


    // useEffect(() => {
    //     if (currentTransactions && currentTransactions.length > 0) {
    //       let myStep = currentTransactions[0]?.buyerStep || 1;
    //       setCurrentStep(myStep);
    //     }
    //   }, [currentTransactions]);
    useEffect(() => {
      if (myCurrentTransactionSTEP !== undefined && myCurrentTransactionSTEP !== null) {
        setCurrentStep(myCurrentTransactionSTEP);
      }
    }, [myCurrentTransactionSTEP]);



    console.log("STEP " + currentStep)

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
      }, [currentTransactions,]);
    
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
      

        console.log("currentTransactions")
        console.log(currentTransactions)
    



      //   const steps = [
      //     "Review", // Buyer selects the product and sees the price and deposit required.
      //     "Proof_Upload", // Buyer pays the deposit via an external method and uploads the proof of payment.
      //     "Confirmation", // Seller reviews and confirms the deposit proof.
      //     "Delivery/Receipt", // The product is delivered to the buyer.
      //     "Upload_Proof", // Buyer pays the remaining balance and uploads the proof of payment.
      //     "Confirmation", // Seller reviews and confirms the final payment proof.
      //     "Review",
      //     "Complete" // The transaction is marked as complete by the seller.
      // ];
      let steps = [];
      
    useEffect(()=>{
      console.log(">>>>>>>>>>")
      console.log(currentTransactions)
      setCurrentTransaction(currentTransactions)

  },[currentTransactions])

  console.log("currentTransactions")
  console.log(currentTransactions )

  if (currentTransactions && currentTransactions[0]) {
      if (currentTransactions[0].paymentTerm === 2) {
          steps = [
            "Review-2",
            "Proof_Upload-2",
            "Confirmation-2",
            "Delivery/Receipt-2",
            "Upload_Proof-2",
            "Confirmation-2-F",
            "Review-2",
            "Complete"
          ];
      } else if (currentTransactions[0].paymentTerm === 3) {
          steps = [
            "Review",
            "Proof_Upload",
            "Confirmation",
            "Delivery/Receipt",
            "Upload_Midway_Proof",
            "Confirmation",
            "Review",
            "Complete"
          ];
      } else {
          steps = [
            "Review",
            "Proof_Upload",
            "Confirmation",
            "Upload_Partial_Proof",
            "Confirmation",
            "Delivery/Receipt",
            "Upload_Midway_Proof",
            "Confirmation",
            "Review",
            "Complete"
          ];
      }
  }
  
    // const displaySteps = (step)=>{
    //     switch(step){
    //         case 1:
    //             return <Review/>
    //         case 2:
    //             return <FirstPayment/>
    //         case 3:
    //             return <FirstConfirmation/>
    //         case 4:
    //             return <DeliveryReceipt/>
    //         case 5:
    //             return <SecondPayment/>
    //         case 6:
    //             return <SecondConfirmation/>
    //         case 7:
    //             return <Complete/>
    //         case 8:
    //             return <Complete_/>
    //         default:
    //     }
    // }

    const stepComponents = {
      // Review2: <Review />,
      // Review3: <Review />,
      // Review4: <Review />,
      // Initialization: <Review />,
      // "Complete": <Complete />,
      // "Delivery/Receipt": <DeliveryReceipt />,
      // "Handoff Confirmation-2": <SecondPayment />,
      "Review-2" : <Review/>,
      "Proof_Upload-2" : <FirstPayment/>,
      "Confirmation-2" :<FirstConfirmation/>,
      "Delivery/Receipt-2" : <DeliveryReceipt/>,
      "Upload_Proof-2" : <SecondPayment/>,
      "Confirmation-2-F" : <SecondConfirmation/>,
      "Review-2" : <Complete/>,
      "Complete" : <Complete_/>
    
    };
    const displaySteps = (stepIndex) => {
      if (steps[stepIndex]) {
        return stepComponents[steps[stepIndex]] || null;
      }
      return null;
    };
  


    
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

          <div className="my-1 py-10  px-3  ">
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
    
    </div>
  )
}

export default DealProgress