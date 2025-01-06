import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import { Link, redirect, useNavigate } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import { AiFillShop } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { TbCurrencyPeso } from "react-icons/tb";
import { IoIosCalendar } from "react-icons/io";
import { IoTicketSharp } from "react-icons/io5";
import { CgUnavailable } from "react-icons/cg";
import { IoRemoveCircleSharp } from "react-icons/io5";
import dateFormat, { masks } from "dateformat";
import { FaHandshake } from "react-icons/fa";
import {place_deal, messageClear} from "../store/reducers/dealReducer"
import toast,{Toaster} from 'react-hot-toast'
import { useRef } from 'react';
import {StandaloneSearchBox } from '@react-google-maps/api'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'


import { useDispatch, useSelector } from 'react-redux';

const Shipping = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries:['places']
      })

    const inputref = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {userInfo} = useSelector(state=>state.auth)
    const {loader, successMessage, errorMessage,} = useSelector(state => state.deal)

   

    const {state : {listings, }} = useLocation()
    console.log(listings)
    const [res, setRes] = useState(false)
    const [state, setState] = useState({
        name: '',
        address: '',
        phone: '',
        street: '',
        barangay: '',
        munCity: '',
        province: '',
    })
    const isStateComplete = Object.values(state).every((value) => value.trim() !== '');

  


     // Using an object to keep track of each checkbox group state
     const [checkedState, setCheckedState] = useState({});

     const handleChange = (index, checkboxIndex) => {
         setCheckedState((prev) => ({
             ...prev,
             [index]: checkboxIndex, // Store only the selected checkbox index for each listing
         }));
     };
    const inputHandler =(e)=>{
      
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
      };
      
    const save =(e)=>{
        e.preventDefault()
        const {name,address,phone,street,barangay,munCity,province} = state;
        if(name && address && phone && street && barangay && munCity && province){
            setRes(true)
        }
    }
    

    const ConfirmDeal = ()=>{
        if (isStateComplete) {
            console.log("Deal confirmed:", state);
            console.log("PLACE ORDER")
            dispatch(place_deal({
                price : listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100), 
                listing: listings[0], 
                listing_: listings[0].listingInfo._id, 
                shipping_fee : listings[0].listingInfo.shippingFee, 
                shippingInfo : state, 
                userId : userInfo.id,
                navigate,
                // items
            }))
        } else {
            console.log("Please complete all fields before confirming.");
        }
      
    }

  


    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
            // navigate("/card")
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())

    }
    },[successMessage, errorMessage])

    const handelonPlacesChanged = () => {
        let places = inputref.current.getPlaces();
        
        if (places && places.length > 0) {
            const place = places[0]; // Assume the first place is the selected one
            
            // Extract the formatted address (this is typically a full address)
            const formattedAddress = place.formatted_address || "";
            
            // Set the addressLocation state and directly set locationInfo as a string
            setState((prevState) => ({
                ...prevState,
                // addressLocation: formattedAddress,  // Save the formatted address as a plain string
                locationInfo: formattedAddress,     // Directly set locationInfo as a string
            }));
        }
    };
    const [checkboxState, setCheckboxState] = useState({
        sellerDelivery: false,
        traderPickup: false,
      });

    const checkboxHandler = (event) => {
        const { name, checked } = event.target;
        setCheckboxState((prevState) => ({
          ...prevState,
          [name]: checked, // update the corresponding checkbox state
        }));
      };

  return (
    <div>
        <Headers/>
             <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: "url('/images/banner/card.jpg')" }}>
                <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opamunCity-40">
                    <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                            <h2 className='text-4xl font-bold font-roboto italic'>Harvestify.com </h2>
                            <div className="flex justify-center items-center gap-1 text-xs w-full">
                                <Link to='/'>Home</Link>
                                <span><FaAngleRight size='10px' /></span>
                                <span>Deal Confirmation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-[#eeee]'>
                <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 bg-[#f1efefe6] px-6">
                    <div className="w-full flex flex-wrap">
                        <div className="w-[75%] md-lg:w-full">
                            <div className="flex flex-col gap-3">
                                <div className="bg-white p-6 shadow-sm rounded-md">
                                  {
                                    !res && 
                                    <>
                                        <h2 className='text-slate-600 font-semibold pb-5'>Shipping Information</h2>
                                        {/* <form onSubmit={save}>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="name">Name</label>
                                                    <input onChange={inputHandler} value={state.name} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="text" name='name' placeholder='name' id='name' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="address">Address</label>
                                                    <input onChange={inputHandler} value={state.address} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="email" name='address' 
                                                    placeholder='Address' id='address' />
                                                </div>
                                            
                                            </div>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input onChange={inputHandler} value={state.phone} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="text" name='phone' placeholder='phone' id='phone' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="street">Street No.</label>
                                                    <input onChange={inputHandler} value={state.street} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="text" name='street' 
                                                    placeholder='street' id='street' />
                                                </div>
                                            
                                            </div>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="barangay">Barangay</label>
                                                    <input onChange={inputHandler} value={state.barangay} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="text" name='barangay' placeholder='barangay' id='barangay' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="munCity">Municipality/City</label>
                                                    <input onChange={inputHandler} value={state.munCity} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="text" name='munCity' 
                                                    placeholder='Municipality/City' id='munCity' />
                                                </div>
                                            
                                            </div>
                                            <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
                                                <div className="flex flex-col gap-1 mb-2 w-full">
                                                    <label htmlFor="province">Province</label>
                                                    <input onChange={inputHandler} value={state.province} className='w-full px-3 py-2 border outline-none border-slate-200 focus:border-primary rounded-md ' type="text" name='province' placeholder='province' id='province' />
                                                </div>
                                                <div className="flex flex-col gap-1 mb-2 w-full justify-end">
                                                    <button type='submit' className='px-3 py-2 bg-primaryDark rounded-sm text-slate-100 hover:shadow-lg'>Save</button>
                                                </div>
                                            
                                            </div>
                                        </form> */}
                                          <div className="w-full pt-3">
                                          <label htmlFor="name">Listing location</label>
                                            <StandaloneSearchBox
                                                onLoad={(ref) => {
                                                    inputref.current = ref;
                                                    // Debug: Check if restrictions are applied
                                                    console.log("SearchBox loaded", ref);
                                                }}
                                                onPlacesChanged={handelonPlacesChanged}
                                                options={{
                                                    componentRestrictions: { country: "PH" }, // Limit to the Philippines
                                                }}
                                            >
                                                <input
                                                    onChange={inputHandler}
                                                    value={state.locationInfo} // Bind to addressLocation
                                                    className="w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-600"
                                                    type="text"
                                                    placeholder="Search locations in the Philippines"
                                                    name="locationInfo" // Name reflects the state
                                                    id="locationInfo"
                                                />
                                            </StandaloneSearchBox>
                            </div>
                                    </>
                                  }
                                  {
                                    res &&   
                                    <div className="flex flex-col gap-1">
                                    <h2 className='text-slate-600 font-semibold pb-2'>Deliver to {state.name}</h2>
                                    <p className=''>
                                        <span className='font-semibold bg-primaryDark text-slate-100 px-2 py-1 rounded-md text-sm'>Shipping Location</span>
                                        <span className='pl-2 text-slate-600 text-sm'>{state.street}, {state.barangay}, {state.munCity}, {state.province}</span>
                                        <span onClick={()=>setRes(false)} className=' pl-2 text-primary/70 font-semibold cursor-pointer'>Change</span>
                                       
                                    </p>
                                    <p className='text-slate-600 text-sm'>Email to bendover@gmail.com</p>

                                </div>
                                  }

                                </div>

                                
                                <div className="flex p-4 flex-col gap-2 border-[1px] rounded">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex row justify-center items-center">
                                                                 <span className='text-slate-900'><AiFillShop size={40} /></span>
                                                                <div className="flex flex-col justify-start items-start text-start">
                                                                    <h2 className='text-md text-slate-600 flex items-center justify-center gap-1 font-semibold'>{listings[0].listingInfo.clusterName}</h2>
                                                                    <p className='text-xs text-slate-600 flex items-center justify-center font-light'>{listings[0].listingInfo.sellerName}</p>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                            <div className="flex">
                                                                 {/* <Ratings ratings={p.rating} /> */}
                                                            </div>
                                                            

                                                        </div>
                                                      
                                                                <div className="w-full flex flex-wrap justify-between p-2">
                                                                    <div className="flex sm:w-full gap-2 w-full">
                                                                        <div className="flex gap-2 justify-start items-start w-full">
                                                                            <img className='w-[250px] h-full rounded-md ' src={listings[0].listingInfo.images[0]} alt="listing" />
                                                                            <div className="pr-1 w-full">
                                                                                <h2 className='text-lg font-semibold border-b-2 w-full'>{listings[0].listingInfo.name}</h2>
                                                                                <div className="flex flex-col justify-start items-start gap-2 text-sm mt-1">
                                                                                    {listings[0].listingInfo.discount > 0 ? (
                                                                                        <div className="flex justify-center items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-lg text-primary pr-1">
                                                                                                {formatNumber(listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100))}
                                                                                            </h2>
                                                                                            <p className="line-through">{formatNumber(listings[0].listingInfo.totalPrice)}</p>
                                                                                            <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{listings[0].listingInfo.discount}% 
                                                                                            <IoTicketSharp  className='ml-[1px]'/></p>
                                                                                        </div>
                                                                                    ) : listings[0].listingInfo.discount === 0 ? (
                                                                                        <div className="flex items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-primaryDark text-lg">{formatNumber(listings[0].listingInfo.totalPrice)}</h2>
                                                                                        </div>
                                                                                       
                                                                                    ) : (
                                                                                        <div className="flex items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-primaryDark text-lg">{formatNumber(listings[0].listingInfo.totalPrice)}</h2>
                                                                                        </div>
                                                                                    )}
                                                                           
                                                                                    <h2 className='flex items-center justify-center gap-1'>{listings[0].listingInfo.description}</h2>
                                                                                </div>
                                                                                <div className="flex flex-col justify-start items-start gap-2 text-sm mt-1">
                                                                                    <h2 className='flex items-center justify-center gap-1'> <span><BiSolidCategory size={19} /></span>Category : {listings[0].listingInfo.category}</h2>
                                                                                    <h2 className='flex items-center justify-center gap-1 '><span><FiPackage size={19} /></span> Expected Yield: {listings[0].listingInfo.expectedHarvestYield} <span className='font-bold text-primaryDark'>{listings[0].listingInfo.yieldUnit}</span> </h2>
                                                                                    <h2 className='flex items-center justify-center gap-1'> <span className='border-2 border-slate-900 rounded-full flex items-center justify-center'><TbCurrencyPeso size={15} /></span>Price: {listings[0].listingInfo.price} / {listings[0].listingInfo.unit}</h2>
                                                                                    <p className='flex items-center justify-center gap-1'><span><IoIosCalendar size={19} /></span> Harvest Date: {dateFormat((listings[0].listingInfo.harvestStartDate), "yyyy-mm-dd")} - {dateFormat((listings[0].listingInfo.harvestStartDate), "yyyy-mm-dd")} </p>
                                                                                </div>
                                                                                <div className="pl-1 mt-5">
                                                                                <div className="w-full flex flex-col gap-2 ">
                                                                                    { 
                                                                                    listings[0].listingInfo.sellerDelivery ? 
                                                                                    <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                                                                    <label htmlFor="sellerDelivery">Seller Delivery</label>
                                                                                    <input 
                                                                                        id="sellerDelivery" 
                                                                                        name="sellerDelivery" 
                                                                                        type="checkbox" 
                                                                                        onChange={checkboxHandler} 
                                                                                        // checked={checkboxState.sellerDelivery} // bind the checked state
                                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                    />
                                                                                    </div>
                                                                                    : ''
                                                                                    }      

                                                                                    {
                                                                                        listings[0].listingInfo.traderPickup ? 
                                                                                        <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                                                                        <label htmlFor="traderPickup">Trader Pickup</label>
                                                                                        <input 
                                                                                            id="traderPickup" 
                                                                                            name="traderPickup" 
                                                                                            type="checkbox" 
                                                                                            // onChange={checkboxHandler} 
                                                                                            // checked={checkboxState.traderPickup} // bind the checked state
                                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                        />
                                                                                        </div>
                                                                                        
                                                                                        : ''
                                                                                    }                                                                              
                                                                                    
                                                                                   
                                                                                </div>

                                                                                </div>
                                                                                <div className="mt-3 w-full flex gap-1 text-base font-semibold">
                                                                                    <button></button>
                                                                                     {/* <button  onClick={() => redirect(pt)}  className="px-5 w-8/12 py-1 bg-primary rounded-md text-white flex justify-center items-center gap-1">Proceed <span><FaHandshake size={23} /></span></button> */}
                                                                                     {/* <button onClick={redirect} className="px-5 w-8/12 py-1 bg-primary rounded-md text-white flex justify-center items-center gap-1">Proceed <span><FaHandshake size={23} /></span></button> */}
                                                                                     {/* <button onClick={()=> dispatch} className="px-5 w-4/12 py-2 bg-red-600 rounded-md text-white flex justify-center items-center gap-1 ">Remove <span><IoRemoveCircleSharp /></span></button> */}
                                                                                     {/* <h2>{pt.listingInfo._id}</h2> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            
                                                                </div>
                                                                <div className="w-full flex justify-between gap-3">
                                                                    {/* <button onClick={ConfirmDeal} className='bg-primaryDark px-7 py-2 w-full rounded-md font-bold text-white'>CONFIRM</button> */}
                                                                    <button
                                                                        onClick={ConfirmDeal}
                                                                        disabled={!isStateComplete}
                                                                        className={`bg-primaryDark px-7 py-2 w-full rounded-md font-bold text-white ${
                                                                            !isStateComplete ? 'opacity-50 cursor-not-allowed' : ''
                                                                        }`}
                                                                    >
                                                                        CONFIRM
                                                                    </button>
                                                                    <button className='bg-red-500 px-10 py-2 rounded-md font-bold text-white'>CANCEL</button>    
                                                                </div>
                                                  
                                          
                                </div>
                              

                            </div>
                        </div>
                        <div className="w-[25%] md-lg:w-full">
                                    <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                                            <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                                                <h2 className='text-xl font-bold'>Deals Summary</h2>
                                                {/* <div className="flex justify-between items-center">
                                                    <div className="flex gap-1">
                                                        <span className='font-bold'>&#8369;</span>
                                                        <h1>{formatNumber(listings[0].listingInfo.totalPrice)}</h1>
                                                    </div>
                                                </div> */}
                                               

                                                {listings[0].listingInfo.discount > 0 ? (
                                                     <div className="flex justify-start items-center text-start ">
                                                           <span className=''><TbCurrencyPeso size={19} /></span>
                                                           <h2 className="text-lg text-primary pr-1">
                                                               {formatNumber(listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100))}
                                                           </h2>
                                                           <p className="line-through">{formatNumber(listings[0].listingInfo.totalPrice)}</p>
                                                           <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{listings[0].listingInfo.discount}% 
                                                           <IoTicketSharp  className='ml-[1px]'/></p>
                                                     </div>
                                                 ) : listings[0].listingInfo.discount === 0 ? (
                                                     <div className="flex items-center">
                                                         <span className=''><TbCurrencyPeso size={19} /></span>
                                                         <h2 className="text-primaryDark text-lg">{formatNumber(listings[0].listingInfo.totalPrice)}</h2>
                                                     </div>
                                                    
                                                 ) : (
                                                     <div className="flex items-center">
                                                         <span className=''><TbCurrencyPeso size={19} /></span>
                                                         <h2 className="text-primaryDark text-lg">{formatNumber(listings[0].listingInfo.totalPrice)}</h2>
                                                     </div>
                                                 )}
                                                  <div className="flex justify-between items-center">
                                                    <span>Shipping Fee</span>
                                                    <div className="flex gap-1">
                                                        <span className='font-bold'>&#8369;</span>
                                                        <h1>{formatNumber(listings[0].listingInfo.shippingFee)}</h1>
                                                        {/* <h1>listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100)}</h1> */}
                                                    </div>
                                                </div>
                                               
                                                <div className="flex justify-between items-center">
                                                    <span>Total</span>
                                                    <div className="flex gap-1">
                                                        <span className='font-bold'>&#8369;</span>
                                                        {/* <h1>{price}</h1> */}
                                                        <h1>{formatNumber((listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100)) + listings[0].listingInfo.shippingFee)} </h1>
                                                        {/* <h1>{formatNumber(listings[0].listingInfo.totalPrice + listings[0].listingInfo.shippingFee)} </h1> */}
                                           </div>
                                                </div>

                                                {listings[0].listingInfo.totalPrice - Math.floor((listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100)}
                                             
                                                    {/* <button onClick={redirect} className="px-5 py-2 bg-primary rounded-md text-white font-semibold ">Proceed to Checkout {}</button> */}
                                             
                                            </div>
                                        
                                    </div>
                        </div>

                    </div>

                </div>

            </section>
        <Footer/>
    </div>
  )
}

export default Shipping