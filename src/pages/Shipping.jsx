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
import {place_deal, messageClear,place_shipping_info,submit_voucher_code  } from "../store/reducers/dealReducer"
import toast,{Toaster} from 'react-hot-toast'
import { useRef } from 'react';
import {StandaloneSearchBox } from '@react-google-maps/api'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { FaMapMarkedAlt } from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { FaExclamation } from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";

const Shipping = () => {

    //   const {
    //         userInfo
    //     } = useSelector(state => state.auth);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
        libraries:['places']
      })
     
   
      const [isSecondDiscountApplied, setIsSecondDiscountApplied] = useState(false);
      const inputref = useRef(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handelonPlacesChanged = () => {
        const places = inputref.current.getPlaces();
      
        if (places && places.length > 0) {
            const place = places[0];
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
    
            // Generate the Google Maps link
            const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
    
            setState({
                ...state,
                locationInfo: place.formatted_address,
                mapsLink,
            });
        }
    };
    
    const checkboxHandler = (event) => {
        const { name } = event.target;
        
        // Update the checkbox state for sellerDelivery or traderPickup
        setCheckboxState({
            sellerDelivery: name === "sellerDelivery", // true if "Seller Delivery" is selected
            traderPickup: name === "traderPickup", // true if "Trader Pickup" is selected
        });
        
        // If Trader Pickup is selected, set isStateComplete to true (no need to fill out form)
        if (name === "traderPickup") {
            setIsStateComplete(true);
        } else {
            // For Seller Delivery, check if all fields are filled
            setIsStateComplete(Object.values(state).every((value) => value.trim() !== ''));
        }
        
        setShow(name === "sellerDelivery");
    };
    
    
    
    const [show, setShow] = useState(false)
    const {userInfo} = useSelector(state=>state.auth)
    const {loader, successMessage, errorMessage,shippingPrice, distance, valid,
        discountType,
        value} = useSelector(state => state.deal)


    const [code, setCode] = useState({
        vcode : ''
    })

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }
    })

    const [voucher, setVoucher] = useState({})

    useEffect(()=>{
        setVoucher({
            valid, discountType, value
        })
    },[valid, discountType, value])

    const [valid_, setValid_] = useState(false)
    useEffect(()=>{
        if(valid){
            setValid_(true)
            // navigate("/card")
        }
        if(!valid){
            setValid_(false)
    }
    },[valid])


    console.log("_____________________")
    const {state : {listings, }} = useLocation()
    console.log("NGII")
    console.log(listings)
    const [res, setRes] = useState(false)
    const [state, setState] = useState({
        address: '',
        phone: '',
        additionalLocationInfo : '',
        locationInfo : '',
        mapsLink : '',
        name: ''
    })
   
    
    // const isStateComplete = Object.values(state).every((value) => value.trim() !== '');
    const [isStateComplete, setIsStateComplete] = useState(false);

  


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
    const codeInputHandler =(e)=>{
      
        setCode({
            ...code,
            [e.target.name] : e.target.value
        })
    }

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(Math.floor(num));
      };
      
    const save =(e)=>{
        e.preventDefault()
        const {address,phone, additionalLocationInfo,locationInfo} = state;
        if(address && phone && additionalLocationInfo && locationInfo){
            setRes(true)
            setIsStateComplete(true)

            // const data = get_shipPrice(state.mapsLink, listings[0].listingInfo.mapsLink, 10)
            console.log("_____________________________________ 01")

            let myLocation =state.locationInfo;
            let listingLocation =listings[0].listingInfo.locationInfo;
            let pricePerUnit =listings[0].listingInfo.pricePerUnit;
            let perYield =listings[0].listingInfo.perYield;
            // let price =listings[0].listingInfo.shipPrice;

           

            dispatch(place_shipping_info({myLocation,listingLocation,pricePerUnit,perYield}))
           
            
            console.log()
            // console.log(state)
        }
    }
    const applyVoucher = (listings, voucher) => {
        console.log("Applying voucher...");
    
        let totalPrice = listings.totalPrice;
        let discount = listings.discount ? Math.floor((totalPrice * listings.discount) / 100) : 0;
    
        if (voucher.valid) {
            if (voucher.discountType === 'fixed') {
                totalPrice -= voucher.value;
            } else if (voucher.discountType === 'percentage') {
                totalPrice -= Math.floor((totalPrice * voucher.value) / 100);
            }
        }
    
        const totalPriceWDiscount = totalPrice - discount;
        console.log("Total price with discount:", totalPriceWDiscount);
        return totalPriceWDiscount;
    };
    
    const ConfirmDeal = () => {
        // Check if form is complete when Seller Delivery is selected
        if (isStateComplete) {
            // If traderPickup is selected, set shippingInfo to an empty object
            const shippingInfo = checkboxState.traderPickup ? {
                phone: userInfo.phone,
                name: userInfo.name,
                email: userInfo.email,
                shippingMethod: "traderPickup"
            } : state;
            const shippingChoice = checkboxState.traderPickup ? "traderPickup" : "sellerDelivery";
    
            let voucher = {
                valid,
                discountType,
                value
            };
    
            let finalPrice = applyVoucher(listings[0].listingInfo, voucher);
    
            console.log("Final price:", finalPrice);
    
            if (checkboxState.traderPickup) {
                dispatch(place_deal({
                    price: finalPrice,
                    listing: listings[0],
                    listing_: listings[0].listingInfo._id,
                    shipping_fee: 0,
                    shippingInfo: shippingInfo,  // Empty if traderPickup is selected
                    shippingMethod: shippingChoice,
                    userId: userInfo.id,
                    mapsLink: listings[0].listingInfo.mapsLink,
                    navigate,
                    distance: 0
                }));
            } else {
                dispatch(place_deal({
                    price: finalPrice,
                    listing: listings[0],
                    listing_: listings[0].listingInfo._id,
                    shipping_fee: shippingPrice,
                    shippingInfo: shippingInfo,  // Empty if traderPickup is selected
                    shippingMethod: shippingChoice,
                    userId: userInfo.id,
                    mapsLink: listings[0].listingInfo.mapsLink,
                    navigate,
                    distance: distance
                }));
            }
        } else {
            console.log("Please complete all fields before confirming.");
        }
    };
    
    
    
  


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



    const [checkboxState, setCheckboxState] = useState({
        sellerDelivery: false,
        traderPickup: false,
      });
 
    //   checkboxState.traderPickup


      const handleCancel = () => {
        navigate(-1);  // Goes back to the previous page
      };

    const submitCode = (e) =>{
        // console.log(code.vcode)
        // let code = code.vcode;
        let sellerId = listings[0].listingInfo.sellerId
        dispatch(submit_voucher_code({code : code.vcode , sellerId}))
        

    }


    console.log("_______________________________________________ CURRENT STATE")
    console.log(listings[0].listingInfo.sellerId)


    const applySecondVoucher = (totalPrice, valid, discountType, value) => {
        if (!valid || !isSecondDiscountApplied) return totalPrice;
    
        if (discountType === 'fixed') {
          return totalPrice - value;
        } else if (discountType === 'percentage') {
          return totalPrice - Math.floor((totalPrice * value) / 100);
        }
    
        return totalPrice;
      };
      const handleToggleDiscount = () => {
        setIsSecondDiscountApplied(!isSecondDiscountApplied);
      };
    
    
      
  // Render only when Google Maps API is fully loaded
  if (!isLoaded) {
    return <div>Loading ...</div>; // Placeholder while waiting for the API to load
  }
  




  return (
    <div>
    <Headers/>
         <section className=' w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left md-lg:hidden' style={{ backgroundImage: "url('/images/banner/card.jpg')" }}>
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
                    <div className="w-full">
                        <div className="flex flex-col gap-3">
                            <div className="bg-white p-6 shadow-sm rounded-md">
                                {
                                    show && <div className="">
                                         {
                                !res && 
                                <>
                                    <h2 className='text-slate-600 font-semibold pb-5'>Shipping Information</h2>
                                    <form onSubmit={save}>
                                      <div className="w-full pt-3">
                                      <label htmlFor="name">Listing location</label>
                                        {/* <StandaloneSearchBox
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
                                        </StandaloneSearchBox> */}

                                <StandaloneSearchBox
                                                onLoad={(ref) => {
                                                    inputref.current = ref;
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
                                                    className="w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-700"
                                                    type="text"
                                                    placeholder="Search locations in the Philippines"
                                                    name="locationInfo" // Name reflects the state
                                                    id="locationInfo"
                                                />
                                            </StandaloneSearchBox>

                                            {state.mapsLink && (
                                                <div className="mt-4">
                                                    <a
                                                        href={state.mapsLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline"
                                                    >
                                                        Open in Google Maps
                                                    </a>
                                                </div>
                                            )}
                                     </div>
                                     <div className="w-full  flex gap-2 md-lg:flex-col flex-row">
                                        <div className="flex flex-col gap-1 mb-2 w-6/12 md-lg:w-full pt-1">
                                            <label htmlFor="locationInfo.name">Street/Landmark</label>
                                            <input 
                                                onChange={inputHandler} 
                                                value={state.additionalLocationInfo} 
                                                className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-600' 
                                                type="text" 
                                                name="additionalLocationInfo" 
                                                placeholder="Street/Landmark" 
                                                id="additionalLocationInfo" 
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 mb-2 w-6/12 md-lg:w-full pt-1">
                                            <label htmlFor="locationInfo.name">Phone Number</label>
                                            <input 
                                                onChange={inputHandler} 
                                                value={state.phone} 
                                                className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-600' 
                                                type="text" 
                                                name="phone" 
                                                placeholder="phone" 
                                                id="phone" 
                                            />
                                        </div>

                                     </div>
                                     <div className="w-full  flex gap-2">
                                        <div className="flex flex-col gap-1 mb-2 w-full pt-1">
                                            <label htmlFor="locationInfo.name">Reciever Name</label>
                                            <input 
                                                onChange={inputHandler} 
                                                value={state.name} 
                                                className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-600' 
                                                type="text" 
                                                name="name" 
                                                placeholder="Reciever Name" 
                                                id="name" 
                                            />
                                        </div>
                                       

                                     </div>
                                     <div className="w-full  flex gap-2">
                                        <div className="flex flex-col gap-1 mb-2 w-full pt-1">
                                            <label htmlFor="locationInfo.name">Email Address</label>
                                            <input 
                                                onChange={inputHandler} 
                                                value={state.address} 
                                                className='w-full bg-transparent px-4 py-2 focus:border-accent outline-none bg-[#283046] border-2 border-slate-700 rounded-md text-slate-600' 
                                                type="text" 
                                                name="address" 
                                                placeholder="Email Address" 
                                                id="address" 
                                            />
                                        </div>
                                       

                                     </div>
                                     <div className="flex flex-col gap-1 mt-2 mb-2 w-full justify-end">
                                                <button type='submit' className='px-3 py-2 bg-primaryDark rounded-md text-slate-100 hover:shadow-lg'>Save</button>
                                            </div>
                                     </form>
                                </>
                              }
                              
                              {
                                res &&   
                                <div className="flex flex-col gap-1">
                                <h2 className='text-slate-600 font-semibold pb-2'>Deliver to {state.name}</h2>
                                <p className=''>
                                    <span className='font-semibold bg-primaryDark text-slate-100 px-2 py-1 rounded-md text-sm'>Shipping Location</span>
                                    <div className="pl-3 flex gap-1 flex-col py-2">
                                        <div className="flex gap-1">
                                            <h2 className='font-semibold'>Email: </h2>
                                            <span>{state.address}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <h2 className='font-semibold'>Phone: </h2>
                                            <span>{state.phone}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <h2 className='font-semibold'>Street/Landmark: </h2>
                                            <span>{state.additionalLocationInfo}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <h2 className='font-semibold'>Address: </h2>
                                            <span>{state.locationInfo}</span>
                                        </div>
                                        
                                       
                                       
                                       
                                    </div>
                                    {/* <span className='pl-2 text-slate-600 text-sm'>{state.street}, {state.barangay}, {state.munCity}, {state.province}</span> */}
                                    <span onClick={()=>setRes(false)} className=' pl-2 text-primary/70 font-semibold cursor-pointer'>Change</span>
                                   
                                </p>
                                <p className='text-slate-600 text-sm'>{state.address}</p>

                            </div>
                              }

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

                                                    {/* <h2 className="text-primaryDark text-lg">{formatNumber(12874.980800000001)}</h2> */}
                                                  
                                                            <div className="w-full flex flex-wrap justify-between p-2">
                                                                <div className="flex justify-between sm:w-full gap-2 w-full md:flex-col flex-row ">
                                                                    <div className="flex gap-2 justify-start items-start w-full md-lg:flex-col">
                                                                        <img className='w-[250px] md:w-full h-full rounded-md' src={listings[0].listingInfo.images[0]} alt="listing" />
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
                                                                                <h2 className='flex items-center justify-center gap-1'> <span className='border-2 border-slate-900 rounded-full flex items-center justify-center p-[2px]'><RiTruckFill size={13} /></span>Shipping Price: {listings[0].listingInfo.pricePerUnit} / {listings[0].listingInfo.unit}</h2>
                                                                                <p className='flex items-center justify-center gap-1'><span><IoIosCalendar size={19} /></span> Harvest Date: {dateFormat((listings[0].listingInfo.harvestStartDate), "yyyy-mm-dd")} - {dateFormat((listings[0].listingInfo.harvestStartDate), "yyyy-mm-dd")} </p>
                                                                                <div
                                                                                className={`flex items-center justify-center gap-1 ${
                                                                                    checkboxState.traderPickup ? 'border-b-2  pr-2 py-1 border-primaryDark' : ''
                                                                                }`}
                                                                                >
                                                                                <span><FaMapMarkedAlt size={19} /></span>
                                                                                listing Location: {listings[0].listingInfo.additionalLocationInfo}, {listings[0].listingInfo.locationInfo}
                                                                                <span>
                                                                                    {
                                                                                        checkboxState.traderPickup ? <FaExclamation  className='text-primaryDark' size={20}/> : ''
                                                                                    }
                                                                                </span>
                                                                                </div>
                                    

                                                                                {/* {listings[0].listingInfo.additionalLocationInfo} */}

                                                                                <div className="flex justify-start w-full gap-1 items-start">
                                                                                    <span className="text-sm">
                                                                                    {listings[0].listingInfo.mapsLink ? (
                                                                                    <a
                                                                                        href={listings[0].listingInfo.mapsLink}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="text-blue-500 underline"
                                                                                    >
                                                                                        OPEN IN GOOGLE MAP
                                                                                    </a>
                                                                                    ) : (
                                                                                    <p>No Google Map location Data Available</p>
                                                                                    )}
                                                                                </span>
                                                                                </div>
                                                                                {/* <p className='flex items-center justify-center gap-1'><span><IoIosCalendar size={19} /></span> Harvest Date: {dateFormat((listings[0].listingInfo.harvestStartDate), "yyyy-mm-dd")} - {dateFormat((listings[0].listingInfo.harvestStartDate), "yyyy-mm-dd")} </p> */}
                                                                            </div>
                                                                         
                                                                            <div className="pl-1 mt-5">
                                                                            <div className="w-full flex flex-col gap-2 ">
                                                                               

                                                                            {listings[0]?.listingInfo?.sellerDelivery && (
                                                                                <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                                                                    {
                                                                                        checkboxState.sellerDelivery? 
                                                                                        <span className='bg-green-500 flex justify-center items-center px-2 py-1 rounded-sm gap-2 font-semibold text-slate-800'>
                                                                                        <div className="flex">+ <RiTruckFill size={20} className='' /></div>
                                                                                           <span className='font-semibold text-slate-100'>{formatNumber(shippingPrice)}</span>
                                                                                        </span>
                                                                                    :''
                                                                                    }
                                                                                    
                                                                                    <label htmlFor="sellerDelivery">Seller Delivery</label>
                                                                                    <input
                                                                                    id="sellerDelivery"
                                                                                    name="sellerDelivery"
                                                                                    type="checkbox"
                                                                                    onChange={checkboxHandler}
                                                                                    checked={checkboxState.sellerDelivery}
                                                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                    />
                                                                                  
                                                                                </div>
                                                                                )}


                                                                                        {listings[0].listingInfo.traderPickup && (
                                                                                            <div className="flex gap-2 flex-row-reverse items-center justify-end">
                                                                                            <label htmlFor="traderPickup">Trader Pickup</label>
                                                                                            <input
                                                                                                id="traderPickup"
                                                                                                name="traderPickup"
                                                                                                type="checkbox"
                                                                                                onChange={checkboxHandler}
                                                                                                checked={checkboxState.traderPickup}
                                                                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                                            />
                                                                                            </div>
                                                                                        )}

                                                                                        {/* Example: Render content conditionally based on the `show` state */}
                                                                                        
    
                                                                                
                                                                               
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
                                                                    <div className="w-5/12 md:w-full">
                                                                        <div className="bg-slate-100 rounded-md px-3 py-2">
                                                                        <div className="w-full flex-row flex relative justify-between pt-3 ">
                                                                            <div className="w-full">
                                                                                <label htmlFor="name">Voucher Code</label>
                                                                                <div className="flex flex-row items-center border-2 border-slate-700 rounded-md px-2 gap-1">
                                                                                    <input  onChange={codeInputHandler} value={code.vcode} className='w-full bg-transparent px-1 py-2 focus:border-accent outline-none bg-[#283046]  text-slate-600' type="text" placeholder='Code' min='0' name='vcode' id='vcode'/>
                                                                                </div>
                                                                            </div>
                                                                            {/* <div className="absolute right-3 bottom-2">
                                                                                <div className="flex font-bold">
                                                                                    <h2>/{state.unit}</h2>
                                                                                </div>
                                                                            </div>                                                                         */}
                                                                            <button onClick={submitCode} className="absolute right-2 bottom-2 bg-primaryDark px-3 rounded-md text-slate-100 flex justify-center items-center gap-1">
                                                                               <span className='font-bold'>APPLY </span> <BiSolidDiscount size={30} />
                                                                            </button>
                                                                        </div>
                                                                        <div className="pt-2">
                                                                            {
                                                                                valid? 
                                                                                <div className="font-semibold bg-green-500 w-fit px-2 py-1 mb-2 rounded-md text-slate-100 flex flex-row items-center">
                                                                                    <span> -{value}</span>
                                                                                    <span>
                                                                                    {
                                                                                        discountType === "fixed" ? "₱" : "%"
                                                                                    }
                                                                                    </span>
                                                                                    <span><BiSolidDiscount size={30} /></span>
                                                                                    
                                                                 </div> : <div className=""></div>
                                                                           }
                                                                            
                                                                        <button
                                                                            className={`px-4 py-2 rounded-md font-semibold text-slate-100   ${
                                                                            isSecondDiscountApplied ? 'bg-red-500' : 'bg-green-500'
                                                                            }`}
                                                                            onClick={handleToggleDiscount}
                                                                        >
                                                                            {isSecondDiscountApplied ? 'Remove Second Discount' : 'Apply Second Discount'}
                                                                        </button>

                                                                        </div>
                                                                        </div>
                                                                                    
                                                                    </div>
                                                                </div>
                                                        
                                                            </div>
                                                            <div className="w-full flex justify-between gap-3">
                                                            {(checkboxState.sellerDelivery || checkboxState.traderPickup) && (
                                                                    <button
                                                                        onClick={ConfirmDeal}
                                                                        disabled={!isStateComplete && !shippingPrice}  // Only disable if form is incomplete
                                                                        className={`bg-primaryDark px-7 py-2 w-full rounded-md font-bold text-white  block md-lg:hidden ${
                                                                            !isStateComplete ? 'opacity-50 cursor-not-allowed' : ''
                                                                        }`}
                                                                    >
                                                                        CONFIRM
                                                                        
                                                                    </button>
                                                                )}
                                                                <div className="bg-green-600 px-4 text-center w-6/12 md-lg:w-full rounded-md text-slate-100 font-semibold flex justify-center items-center">
                                                                     {/* <span className=''>SHIPPING FREE: {formatNumber(shippingPrice)}</span> */}
                                                                     <span className=''>
                                                                    
                                                                     {checkboxState.sellerDelivery ? (
                                                                            listings[0].listingInfo.discount > 0 ? (
                                                                            <div className="flex justify-center items-center">
                                                                                <h2>Total Price: </h2>
                                                                                <span>
                                                                                <TbCurrencyPeso size={19} />
                                                                                </span>
                                                                                <h2 className="text-lg text-slate-100 pr-1">
                                                                                {formatNumber(
                                                                                    applySecondVoucher(
                                                                                    listings[0].listingInfo.totalPrice -
                                                                                        Math.floor(
                                                                                        (listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100
                                                                                        ) +
                                                                                        shippingPrice,
                                                                                    valid,
                                                                                    discountType,
                                                                                    value
                                                                                    )
                                                                                )}
                                                                                </h2>
                                                                                
                                                                            </div>
                                                                            ) : (
                                                                            <div className="flex items-center">
                                                                                <h2 className="text-primaryDark text-lg">
                                                                                {formatNumber(
                                                                                    applySecondVoucher(
                                                                                    listings[0].listingInfo.totalPrice,
                                                                                    valid,
                                                                                    discountType,
                                                                                    value
                                                                                    )
                                                                                )}
                                                                                </h2>
                                                                                
                                                                            </div>
                                                                            )
                                                                        ) : (
                                                                            listings[0].listingInfo.discount > 0 ? (
                                                                            <div className="flex justify-center items-center">
                                                                                <h2>Total Price: </h2>
                                                                                <span>
                                                                                <TbCurrencyPeso size={19} />
                                                                                </span>
                                                                                <h2 className="text-lg text-slate-100 pr-1">
                                                                                {formatNumber(
                                                                                    applySecondVoucher(
                                                                                    listings[0].listingInfo.totalPrice -
                                                                                        Math.floor(
                                                                                        (listings[0].listingInfo.totalPrice * listings[0].listingInfo.discount) / 100
                                                                                        ),
                                                                                    valid,
                                                                                    discountType,
                                                                                    value
                                                                                    )
                                                                                )}
                                                                                </h2>
                                                                                {/* <span> - {formatNumber(value)} {
                                                                                    discountType === "fixed"? '₱':'%'
                                                                                    }voucher</span> */}
                                                                            </div>
                                                                            ) : (
                                                                            <div className="flex items-center">
                                                                                <h2 className="text-primaryDark text-lg">
                                                                                {formatNumber(
                                                                                    applySecondVoucher(
                                                                                    listings[0].listingInfo.totalPrice,
                                                                                    valid,
                                                                                    discountType,
                                                                                    value
                                                                                    )
                                                                                )}
                                                                                </h2>
                                                                               
                                                                            </div>
                                                                            )
                                                                        )}

                                                                   
                                                                    </span>
                                                                </div>


        
                                                            <button onClick={handleCancel}  className='bg-red-500  py-2 rounded-md font-bold text-white w-2/12 md-lg:w-full'>CANCEL</button>    
                                                            </div>
                                                            <div className="w-full md-lg:flex justify-between gap-3 hidden md-lg:block">
                                                            {(checkboxState.sellerDelivery || checkboxState.traderPickup) && (
                                                                    <button
                                                                        onClick={ConfirmDeal}
                                                                        disabled={!isStateComplete && !shippingPrice}  // Only disable if form is incomplete
                                                                        className={`bg-primaryDark px-7 py-2 w-full rounded-md font-bold text-white ${
                                                                            !isStateComplete ? 'opacity-50 cursor-not-allowed' : ''
                                                                        }`}
                                                                    >
                                                                        CONFIRM
                                                                        
                                                                    </button>
                                                                )}
                                                            </div>
                                              
                                      
                            </div>
                          

                        </div>
                    </div>
                   

                </div>

            </div>

        </section>
    <Footer/>
</div>
  );
};

export default Shipping;
