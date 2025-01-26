import React, { useContext, useEffect, useState } from 'react';
// import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { StepperContext } from '../../../contexts/StepperContext';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { paymentAdd ,messageClear,deleteTraderDeal} from '../../../store/reducers/transactionReducer';
import { BsImage } from 'react-icons/bs';
import { FaChevronLeft } from "react-icons/fa";
import toast from 'react-hot-toast';
import { TiCancel } from "react-icons/ti";


const FirstPayment = () => {
  const dispatch = useDispatch()
  const { dealId } = useParams();
  const navigate = useNavigate()
  const [imageShow, setImage] = useState('')
  const { transactionData, setTransactionData } = useContext(StepperContext);
  const { currentStep, setCurrentStep } = useContext(StepperContext);
  const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
  const [loading, setLoading] = useState();
  
  const loader = false;


  const {myDeal} = useSelector((state) => state.deal);
    const { transaction, errorMessage, successMessage, currentTransactions } = useSelector(
        (state) => state.transaction
      );

      

  const [state, setState] = useState({
    paymentType: "Deposit",
    transactionId: '',
    message: '',
    image: null, // Store the selected image here
  });
  
  useEffect(() => {
    if (currentTransaction && currentTransaction._id) {
      setState((prevState) => ({
        ...prevState,
        transactionId: currentTransaction._id,
      }));
      setLoading(false);
    }
  }, [currentTransaction]);
  const [showModal, setShowModal] = useState(false);


  // const handleConfirm = () => {
  //   setShowModal(false);
  //   dispatch(deleteTraderDeal(dealId))
  //   if(successMessage){

  //   }
  // };

  const handleConfirm = async () => {
    setShowModal(false); // Close the modal
    const resultAction = await dispatch(deleteTraderDeal(dealId)); // Dispatch the delete action
  
    if (deleteTraderDeal.fulfilled.match(resultAction)) {
      // If deletion is successful, navigate to the desired page
      navigate(`/dashboard`);
    } else {
      // Handle error if deletion fails
      toast.error("Failed to delete deal:", resultAction.payload);
    }
  };
  

  const handleCancel = () => {
    setShowModal(false);
  };

 
 

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

  const inputHandle = (e)=>{
    setState({
        ...state,
        [e.target.name] : e.target.value

    })
}
  // const add_payment = (e)=>{
  //   e.preventDefault()
  //   dispatch(paymentAdd(state))
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
  const add_payment = async (e) => {
    if(!state.image){
      toast.error("please Include a image proof")
      // END HERE IF NO IMAGE 

      return
    }



    e.preventDefault();
  
    try {
      // Dispatch the action and wait for it to complete
      await dispatch(paymentAdd(state)).unwrap(); // .unwrap() ensures you handle the promise correctly (if using Redux Toolkit)
      
      // Check for success or error messages
      if (errorMessage) {
        toast.error(errorMessage);
        dispatch(messageClear());
      } else {
        toast.success(successMessage);
        dispatch(messageClear());
        // setCurrentTransaction(currentTransactions)
      }
    } catch (err) {
      // Catch any unexpected errors
      toast.error("An unexpected error occurred!");
    } finally {
      // Refresh or reset the form
      window.location.reload(); // Alternatively, reset state manually if preferred
    }
  };
  

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


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <section className='bg-[#eeeeee] w-full p-2'>
        <div className="w-full">
          {
            currentTransaction ? 
                <div className="w-full">
                  <div className="flex lg:flex-col-reverse gap-2 flex-row lg:justify-center ">
                    <div className="w-7/12 lg:w-full">
                      <div className="flex justify-center items-center gap-2">
                      <form onSubmit={add_payment} className='w-full'>
                      
                     
                      <div className="">
                          <label htmlFor="image" className='flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-accent w-full border-text_color'>
                              {
                                  imageShow ? <img className='w-ful h-full bg-primaryDark object-fill' src={imageShow} alt="" required/> : <>
                                      <span><BsImage size='40px'/></span>
                                     <span className='font-semibold'>Select an Image</span>
                                  </>
                              }
                              
                          </label>
                      </div>
                      <input onChange={imageHandler} className='hidden' type="file" name='image' id='image' />


                      <div className="w-full mt-3">
                              <label htmlFor="name">Message</label>
                              <textarea onChange={inputHandle} value={state.message} className='w-full h-[129px] px-4 py-2 focus:border-accent border-2 outline-none bg-transparent border-slate-700 rounded-md text-slate-800' type="text" placeholder='Proof Message'  name='message' id='message'></textarea>
                          </div>
               
                      <button disabled={loader ? true : false} className='bg-primaryDark w-full hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                          {
                                //  loader ? <PropagateLoader color='#fff'cssOverride = {overRideStyle}/> :'Add Category'
                                 loader ? 'loading...' :'SUBMIT PROOF'
                          }
                      </button>
                   </form>
                      </div>
                    </div>

                    <div className="w-5/12 lg:w-full ">
                      <div className="pl-2 md:pl-0 md:mb-0">
                        <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                          <h2 className='font-bold text-lg uppercase'>Initial Payment Summary</h2>
                          <div className="flex items-center font-semibold px-5">
                            <span>Required Deposit Amount: <span className='font-bold text-base h-full pr-[1px]'>&#8369;</span>{formatNumber(currentTransaction.depositAmount)}</span>
                          </div>
                          <div className="flex justify-between items-center font-semibold px-5">
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            :
            <div className="w-full ">
              <div className="w-full flex justify-center items-center text-center flex-col ">
                <h2 className='font-bold text-xl text-slate-800'>NO INITIAL DEPOSIT SET BY THE SELLER</h2> 
               
                {
                  myDeal? 
                  <Link to={`/dashboard/chat/${myDeal.listing[0].sellerId}`} className='hover:underline pt-2'>
                  <p className='text-sm text-slate-800'>please contact the seller</p>
                </Link>
                  :
                  <Link className='hover:underline pt-2'>
                  <p className='text-sm'></p>
                </Link>
                }

                {/* <div className="w-full pt-10 relative">
                  <button onClick={rollBackStep} className='absolute left-2 bottom-0 bg-primaryDark px-3 py-1 rounded-md text-slate-100 font-bold flex justify-center items-center'> <FaChevronLeft /> BACK</button>
                  <button onClick={rollBackStep} className='absolute left-2 bottom-0 bg-primaryDark px-3 py-1 rounded-md text-slate-100 font-bold flex justify-center items-center'> <FaChevronLeft /> BACK</button>
                </div> */}
                <div className="w-full pt-10 relative">
                  <button onClick={rollBackStep} className='absolute left-2 bottom-0 bg-primaryDark px-3 py-1 rounded-md text-slate-100 font-bold flex justify-center items-center'> <FaChevronLeft /> BACK</button>
                <div className="absolute right-2 bottom-0">
                    <div>
                       <button
                         onClick={() => setShowModal(true)}
                         className="bg-red-400 font-semibold px-3 py-2 text-slate-100 rounded-sm flex justify-center items-center"
                       >
                         Cancel Deal
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
                </div>
                </div>
                
               
              </div>

              
            </div>
          }
          
        </div>
      </section>
  )
}

export default FirstPayment