import React, { useContext, useEffect, useState } from 'react';
// import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { StepperContext } from '../../../contexts/StepperContext';
import { Link, useLocation } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdd ,messageClear,paymentAdd2} from '../../../store/reducers/transactionReducer';
import { BsImage } from 'react-icons/bs';
import { FaChevronLeft } from "react-icons/fa";
import toast from 'react-hot-toast';

const SecondPayment = () => {
  const dispatch = useDispatch()
  const [imageShow, setImage] = useState('')
  const { transactionData, setTransactionData } = useContext(StepperContext);
  const { currentStep, setCurrentStep } = useContext(StepperContext);
  const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
  
  // const loader = false;


  const {myDeal} = useSelector((state) => state.deal);
    const { transaction, errorMessage, successMessage, currentTransactions,loader } = useSelector(
        (state) => state.transaction
      );


  const [state, setState] = useState({
    paymentType: "FullPayment",
    transactionId: '',
    message: '',
    image: null, // Store the selected image here
  });
  
  useEffect(() => {
    if (currentTransaction && currentTransaction[0]._id) {
      setState((prevState) => ({
        ...prevState,
        transactionId: currentTransaction[0]._id,
      }));
    }
  }, [currentTransaction]);
  
 

  console.log("currentTransaction")
  console.log(currentTransaction)

  const imageHandler= (e)=>{
    let files = e.target.files
    console.log(files)
    if(files.length>0){
        setImage(URL.createObjectURL(files[0]))
        setState({
            ...state,
            image: files[0]
        })

    }
}
  const add_image = (e) => {    
    if (e.target.files.length > 0) {
      const formData = new FormData();
      console.log(e.target.files[0]);
      formData.append('image', e.target.files[0]);
      
      // Save the image for display in the component
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setState((prevState) => ({
        ...prevState,
        image: imageUrl, // Set the image URL for preview
      }));
      
      // Here you can dispatch the formData to your backend if needed
      // Example: dispatch(profile_image_upload(formData));
    }
  };

  const inputHandle =  (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value

    })
}
  const add_payment_2 = async(e)=>{
    e.preventDefault()
    try {
      // Dispatch the action and wait for it to complete
      await dispatch(paymentAdd2(state)).unwrap(); // .unwrap() ensures you handle the promise correctly (if using Redux Toolkit)
      
      // Check for success or error messages
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      } else {
        toast.success(successMessage);
        dispatch(messageClear());
      }
    } catch (err) {
      // Catch any unexpected errors
      toast.error("An unexpected error occurred!");
    } finally {
      // Refresh or reset the form
      // window.location.reload(); // Alternatively, reset state manually if preferred
    }
   }
  // const add_payment_2 = (e)=>{
  //   e.preventDefault()
  //   dispatch(paymentAdd2(state))
  //   if (errorMessage) {
  //         toast.error(errorMessage);
  //         dispatch(messageClear());
  //         window.location.reload(); // Refresh the page
  //       } else {
  //         toast.success(successMessage);
  //         dispatch(messageClear());
  //         window.location.reload(); // Refresh the page
  //       }
  //  }

   console.log("------------------> CURRENT")
   console.log(currentTransaction)


   const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };
  


   console.log("state")
   console.log(state)

   const rollBackStep = () =>{
    setCurrentStep(1)
    // dispatch(
    //   add_transaction({traderId: userInfo.id, sellerId: userInfo.id, listingId: userInfo.id, listingName: userInfo.id, listingPrice: userInfo.id, depositAmount: userInfo.id})
    // )
  }


  
  return (
    <section className='bg-transparent w-full p-4 rounded-md'>
            <div className="w-full">
              {
                currentTransaction ? 
                    <div className="w-full">
                      <div className="flex lg:flex-col-reverse gap-2 flex-row lg:justify-center ">
                        <div className="w-7/12 lg:w-full">
                          <div className="flex justify-center items-center gap-2">
                          <form onSubmit={add_payment_2} className='w-full'>
                          
                         
                          <div className="">
                              <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] text-slate-600 cursor-pointer border-2 border-dashed hover:border-accent w-full border-slate-700 rounded-md'>
                                  {
                                      imageShow ? <img className='w-ful h-full object-fill' src={imageShow} alt="" required/> : <>
                                          <span><BsImage size='40px'/></span>
                                         <span className='font-semibold'>Upload Payment Proof</span>
                                      </>
                                  }
                                  
                              </label>
                          </div>
                          <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' />
    
    
                          <div className="w-full mt-3 text-slate-600">
                                  <label className='font-bold' htmlFor="name">Message</label>
                                  <textarea onChange={inputHandle} value={state.message} className='w-full h-[129px] px-4 py-2 focus:border-accent border-2 outline-none bg-transparent border-slate-700 rounded-md text-slate-800' type="text" placeholder='Message'  name='message' id='message'></textarea>
                              </div>
                   
                          <button disabled={loader ? true : false} className='bg-primary w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                              {
                                    //  loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Add Category'
                                     loader ? 'loading...' :'UPLOAD PAYMENT PROOF'
                              }
                          </button>
                       </form>
                          </div>
                        </div>
    
                        <div className="w-5/12 lg:w-full ">
                          <div className="pl-2 md:pl-0 md:mb-0">
                            <div className="bg-white rounded-md shadow-md p-5 text-slate-600 flex flex-col gap-3">
                              <h2 className='font-extrabold text-lg uppercase'>Final Payment</h2>
                              <div className="flex items-center font-semibold px-1">
                                <span>Final Amount: <span className='font-bold text-base h-full pr-[1px]'>&#8369;</span>{formatNumber(currentTransaction[0].totalAmount
- currentTransaction[0].deposit.depositPaymentAmount
 )}</span>
                                {/* <span>Total Amount: { currentTransaction.depositAmount}</span> */}
                              </div>
                              <div className="flex justify-between items-center font-semibold px-5">
                                {/* <InitialPaymentCalc price={price} percentage={30} /> */}
                              </div>
    
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                :
                <div className="w-full">
                  <div className="w-full flex justify-center items-center text-center flex-col">
                    <h2 className='font-bold'>NO INITIAL DEPOSIT SET BY THE SELLER</h2> 
                   
                    {
                      myDeal? 
                      <Link to={`/dashboard/chat/${myDeal.listing[0].sellerId}`} className='hover:underline pt-2'>
                      <p className='text-sm'>please contact the seller</p>
                    </Link>
                      :
                      <Link className='hover:underline pt-2'>
                      <p className='text-sm'></p>
                    </Link>
                    }
    
                    <div className="w-full pt-10 relative">
                      <button onClick={rollBackStep} className='absolute left-2 bottom-0 bg-primaryDark px-3 py-1 rounded-md text-slate-100 font-bold flex justify-center items-center'> <FaChevronLeft /> BACK</button>
                    </div>
                    
                   
                  </div>
                  
                </div>
              }
              
            </div>
          </section>
  )
}

export default SecondPayment