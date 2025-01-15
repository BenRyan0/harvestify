import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Stripe from '../components/Stripe';
import { place_deal } from './../store/reducers/dealReducer';
import InitialPaymentCalc from '../components/PaymentConfirmation/InitialPaymentCalc';

import { useLocation } from 'react-router-dom';
import { IoMdImages } from "react-icons/io";
import { useDispatch } from 'react-redux';

const Payment = () => {
  const { state: { price, items,listing } } = useLocation();
  const dispatch = useDispatch()
  const loader = false;


  // navigate('/payment', {
  //   state: {
  //     price: price,
  //     listing,
  //     items,
  //     orderId: data.orderId
  //   }
  // });

  console.log('Price:', price);
  console.log('Items:', listing);

  const [state, setState] = useState({
    message: '',
    image: null, // Store the selected image here
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

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


useEffect(()=>{
  console.log(state)
},[state])

  return (
    <div>
      <Headers />
      <section className='bg-[#eeeeee]'>
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="flex justify-center gap-2">
                <form onSubmit={add}>
                  {/* Conditionally render the label or image based on the state */}
                  <label htmlFor="img" className={`flex justify-center items-center flex-col h-[250px] w-[400px] cursor-pointer border-2 border-dashed hover:border-accent/40 border-text_color relative ${state.image ? 'bg-transparent' : 'bg-slate-500'}`}>
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
                                      'asd':'Add Listing'
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

            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2 className='font-bold text-lg uppercase'>Initial Payment Summary</h2>
                  <div className="flex justify-between items-center font-semibold px-5">
                    <span>Total Amount:</span>
                    <p>
                      <span className='font-bold text-base h-full pl-1 pr-[1px]'>&#8369;</span>
                      <span>{formatNumber(price)}</span>
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-semibold px-5">
                    <InitialPaymentCalc price={price} percentage={30} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
