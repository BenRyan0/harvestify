import React, { useContext, useEffect, useState } from 'react';
// import { StepperContextTransaction } from '../../context/StepperContextTransaction';
import { StepperContext } from '../../../contexts/StepperContext';
import { Link, useLocation } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

const FirstPayment = () => {
  
  const { transactionData, setTransactionData } = useContext(StepperContext);
  const { currentStep, setCurrentStep } = useContext(StepperContext);
  const { currentTransaction, setCurrentTransaction } = useContext(StepperContext);
  
  const loader = false;


  const {myDeal} = useSelector((state) => state.deal);


  const [state, setState] = useState({
    message: '',
    image: null, // Store the selected image here
  });

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
  const add = (e)=>{
    e.preventDefault()
    const formData = new FormData()
        formData.append('name', state.message)
    //     formData.append('additionalLocationInfo', state.additionalLocationInfo)
    //     for (let i = 0; i < images.length; i++) {
    //     formData.append('images', images[i])
    // }
    console.log(formData)
    // dispatch(add_listing(formData))
   }

   console.log("------------------> CURRENT")
   console.log(currentTransaction)


   const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(Math.floor(num));
  };
  


   
  return (
    <section className='bg-[#eeeeee] w-full p-2'>
        <div className="w-full">
          {
            currentTransaction ? 
                <div className="w-full">
                  <div className="flex lg:flex-col-reverse gap-2 flex-row lg:justify-center ">
                    <div className="w-7/12 lg:w-full">
                      <div className="flex justify-center items-center gap-2">
                        <form className='w-full' onSubmit={add}>
                          {/* Conditionally render the label or image based on the state */}
                          <label htmlFor="img" className={`flex justify-center items-center flex-col h-[250px]  cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative ${state.image ? 'bg-transparent' : 'bg-slate-500'}`}>
                            {
                              state.image ? (
                                <img src={state.image} alt="Selected" className="w-full h-full object-cover" />
                              ) : (
                                <>
                                  <span><IoMdImages size='40px' /></span>
                                  <span>Select An Image</span>
                                </>
                              )
                            }
                            {
                              loader && <div className="bg-slate-500 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                                <span>
                                  {/* <FadeLoader /> */}
                                </span>
                              </div>
                            }
                          </label>

                          <input onChange={add_image} type="file" className='hidden w-full h-full object-cover' name="img" id="img" />



                          <div className="w-full mt-3">
                              <label htmlFor="name">Message</label>
                              <textarea onChange={inputHandle} value={state.message} className='w-full h-[129px] px-4 py-2 focus:border-accent border-2 outline-none bg-transparent border-slate-700 rounded-md text-slate-800' type="text" placeholder='Listing Description'  name='message' id='message'></textarea>
                          </div>

                          <button disabled={loader ? true : false} className='flex justify-center items-center bg-accent/50  w-[50%] hover:shadow-[#6ED601]/10 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 font-bold mt-5'>
                                        {
                                              loader ? 
                                              'loading...':'Submit Proof'
                                              //  <ClipLoader
                                              //    color="#ffffff"
                                              //    cssOverride={{
                                              //      display: 'flex',
                                              //      justifyContent: 'center',
                                              //      alignItems: "center",
                                              //    }}
                                              //    size={20}
                                              //  /> :'Add Listing'
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
                
               
              </div>
              
            </div>
          }
          
        </div>
      </section>
  )
}

export default FirstPayment