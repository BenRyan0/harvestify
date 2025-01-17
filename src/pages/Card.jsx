import React, { useEffect, useState } from 'react';
import Headers from '../components/Headers';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import Footer from '../components/Footer';
import { FaBoxOpen } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { TbCurrencyPeso } from "react-icons/tb";
import { IoIosCalendar } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { AiFillShop } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import dateFormat, { masks } from "dateformat";
import Ratings from '../components/Ratings';
import { IoTicketSharp } from "react-icons/io5";
import { CgUnavailable } from "react-icons/cg";
import { IoRemoveCircleSharp } from "react-icons/io5";
import toast,{Toaster} from 'react-hot-toast'


import { useSelector, useDispatch } from 'react-redux';
import {get_card_listings, delete_card_listing, messageClear} from '../store/reducers/cardReducer'

const Card = () => {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector(state => state.auth)
    const {errorMessage,successMessage, card_listings_count, price,card_listings,shipping_fee, unAvailableListings, card_listing_count, buy_listing_item, totalShippingFee,} = useSelector(state => state.card)

    // state.card_listings = payload.payload.card_listings;
    //   state.price = payload.payload.price;
    //   state.card_listings_count = payload.payload.card_listings_count;
    //   state.shipping_fee = payload.payload.shipping_fee;
    //   state.unAvailableListings =  payload.payload.unAvailableListings;
    
    // const card_listings = [1, 2];
    // const unAvailableListings = [1, 2];

  
    // Using an object to keep track of each listing's group state independently
    const [checkedState, setCheckedState] = useState({});

 
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
      };
      
        
    
    const handleChange = (listingIndex, checkboxIndex, groupIndex) => {
        setCheckedState((prev) => ({
            ...prev,
            [listingIndex]: {
                ...prev[listingIndex],
                [groupIndex]: checkboxIndex // Store only the selected checkbox for each group in each listing
            }
        }));
    };
    const redirect = (listing) => {
        navigate("/shipping", {
            state: {
                listings: [listing], // Send only the specific listing as an array
                price: listing.listingInfo.totalPrice, // Adjust price if needed
                shipping_fee: totalShippingFee, // Keep the same shipping fee
                items: buy_listing_item // Or filter based on this specific listing
            }
        });
    };

    // const redirect = () => {
    //     navigate("/shipping", {
    //         state: {
    //             listings: card_listings,
    //             price: price,
    //             shipping_fee: totalShippingFee,
    //             items: buy_listing_item
    //         }
    //     })
    // }
    // const redirect = () => {
    //     navigate("/shipping", {
    //         state: {
    //             listings: [],
    //             price: 500,
    //             shipping_fee: 454,
    //             items: 4
    //         }
    //     })
    // }

    useEffect(()=>{
        dispatch(get_card_listings(userInfo.id))
    },[])

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageClear())
            // mak
            dispatch(get_card_listings(userInfo.id))
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    },[successMessage, errorMessage])



    const inc = (quantity, stock, listingId) =>{
        const temp = quantity + 1;
        if(temp <= stock){
            dispatch()
        }
    }
    return (
        <div>
            <Headers />
            <section className='w-[85%] mx-auto h-[350px] mt-6 bg-cover bg-no-repeat relative bg-left' style={{ backgroundImage: "url('/images/banner/card.jpg')" }}>
                <div className="absolute left-0 top-0 w-full h-full bg-[#03872D] bg-opacity-40">
                    <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
                        <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-center text-white">
                            <h2 className='text-4xl font-bold font-roboto italic'>Harvestify.com </h2>
                            <div className="flex justify-center items-center gap-1 text-xs w-full">
                                <Link to='/'>Home</Link>
                                <span><FaAngleRight size='10px' /></span>
                                <span>CARD</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-transparent'>
                <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 bg-[#f1efefe6] px-6">
                    {
                        card_listings.length > 0 || unAvailableListings.length > 0 ?
                            <div className="flex flex-wrap">
                                <div className="w-full md-lg:w-full">
                                    <div className="pr-3 md-lg:pr-0">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-row items-center gap-1 p-4 shadow-sm border-[1px] rounded bg-white">
                                                <span><FaBoxOpen /></span>
                                                <h2 className='text-md text-primary font-semibold'> Available Listings: {card_listings.length}</h2>
                                            </div>
                                            {
                                                card_listings.map((p, i) =>
                                                    <div key={i} className="flex bg-white p-4 flex-col gap-2 border-[1px] rounded">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex row justify-center items-center">
                                                                 <span className='text-slate-900'><AiFillShop size={40} /></span>
                                                                <div className="flex flex-col justify-start items-start text-start">
                                                                    <h2 className='text-md text-slate-600 flex items-center justify-center gap-1 font-semibold'>{p.clusterName}</h2>
                                                                    <p className='text-xs text-slate-600 flex items-center justify-center font-light'>{p.sellerName}</p>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                            <div className="flex">
                                                                 <Ratings ratings={p.rating} />
                                                            </div>
                                                            

                                                        </div>
                                                        {
                                                            p.listings.map((pt, j) =>
                                                                <div key={j} className="w-full flex flex-wrap justify-between p-2">
                                                                    <div className="flex sm:w-full gap-2 w-full">
                                                                        <div className="flex gap-2 justify-start items-start w-full">
                                                                            <img className='w-[250px] h-full rounded-md ' src={pt.listingInfo.images[0]} alt="listing" />
                                                                            <div className="pr-1 w-full">
                                                                                <h2 className='text-lg font-semibold border-b-2 w-full'>{pt.listingInfo.name}</h2>
                                                                                <div className="flex flex-col justify-start items-start gap-2 text-sm mt-1">
                                                                                    {pt.listingInfo.discount > 0 ? (
                                                                                        <div className="flex justify-center items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-lg text-primary pr-1">
                                                                                                {formatNumber(pt.listingInfo.totalPrice - Math.floor((pt.listingInfo.totalPrice * pt.listingInfo.discount) / 100))}
                                                                                            </h2>
                                                                                            <p className="line-through">{formatNumber(pt.listingInfo.totalPrice)}</p>
                                                                                            <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{pt.listingInfo.discount}% 
                                                                                            <IoTicketSharp  className='ml-[1px]'/></p>
                                                                                        </div>
                                                                                    ) : pt.listingInfo.discount === 0 ? (
                                                                                        <div className="flex items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-primaryDark text-lg">{formatNumber(pt.listingInfo.totalPrice)}</h2>
                                                                                        </div>
                                                                                       
                                                                                    ) : (
                                                                                        <div className="flex items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-primaryDark text-lg">{formatNumber(pt.listingInfo.totalPrice)}</h2>
                                                                                        </div>
                                                                                    )}
                                                                           
                                                                                    <h2 className='flex items-center justify-center gap-1'>{pt.listingInfo.description}</h2>
                                                                                </div>
                                                                                <div className="flex flex-col justify-start items-start gap-2 text-sm mt-1">
                                                                                    <h2 className='flex items-center justify-center gap-1'> <span><BiSolidCategory size={19} /></span>Category : {pt.listingInfo.category}</h2>
                                                                                    <h2 className='flex items-center justify-center gap-1 '><span><FiPackage size={19} /></span> Expected Yield: {pt.listingInfo.expectedHarvestYield} <span className='font-bold text-primaryDark'>{pt.listingInfo.yieldUnit}</span> </h2>
                                                                                    <h2 className='flex items-center justify-center gap-1'> <span className='border-2 border-slate-900 rounded-full flex items-center justify-center'><TbCurrencyPeso size={15} /></span>Price: {pt.listingInfo.price} / {pt.listingInfo.unit}</h2>
                                                                                    <p className='flex items-center justify-center gap-1'><span><IoIosCalendar size={19} /></span> Harvest Date: {dateFormat((pt.listingInfo.harvestStartDate), "yyyy-mm-dd")} - {dateFormat((pt.listingInfo.harvestStartDate), "yyyy-mm-dd")} </p>
                                                                                </div>
                                                                                <div className="mt-3 w-full flex gap-1 text-base font-semibold">
                                                                                     <button  onClick={() => redirect(pt)}  className="px-5 w-8/12 py-1 bg-primary rounded-md text-white flex justify-center items-center gap-1">Proceed <span><FaHandshake size={23} /></span></button>
                                                                                     {/* <button onClick={redirect} className="px-5 w-8/12 py-1 bg-primary rounded-md text-white flex justify-center items-center gap-1">Proceed <span><FaHandshake size={23} /></span></button> */}
                                                                                     <button onClick={()=> dispatch(delete_card_listing(pt._id))} className="px-5 w-4/12 py-2 bg-red-600 rounded-md text-white flex justify-center items-center gap-1 ">Remove <span><IoRemoveCircleSharp /></span></button>
                                                                                     {/* <h2>{pt.listingInfo._id}</h2> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            
                                                                </div>
                                                            )
                                                        }
                                          
                                                    </div>
                                                )
                                            }
                                    
                                            {
                                            unAvailableListings.length > 0 && <div className='flex flex-col gap-3'>
                                                <div className='bg-white p-4'>
                                                    <h2 className='text-md text-red-500 font-semibold'>Unavailable Listings:  { unAvailableListings.length}</h2>
                                                </div>
                                                <div className='bg-white p-4'>
                                                {
                                                             unAvailableListings.map((pt, j) =>
                                                                <div key={j} className="w-full flex flex-wrap justify-between p-2">
                                                                    <div className="flex row justify-center items-center mb-1">
                                                                        <span className='text-slate-900'><AiFillShop size={40} /></span>
                                                                            <div className="flex flex-col justify-start items-start text-start">
                                                                                <h2 className='text-md text-slate-600 flex items-center justify-center gap-1 font-semibold'>{pt.listings.clusterName}</h2>
                                                                                <p className='text-xs text-slate-600 flex items-center justify-center font-light'>{pt.listings.firstName} {pt.listings.lastName}</p>
                                                                            </div>
                                                                            
                                                                    </div>
                                                                    <div className="flex sm:w-full gap-2 w-full">
                                                                        <div className="flex gap-2 justify-start items-start w-full">
                                                                            <div className="w-[330px] h-full relative">
                                                                                <img className='w-full h-full rounded-md ' src={pt.listings.images[0]} alt="listing" />
                                                                                <div className="w-full h-full bg-red-300 absolute top-0 left-0 opacity-30 text-center flex justify-center items-center">
                                                                                    <span className='text-2xl'>unavailable</span>
                                                
                                                                                    <span> <CgUnavailable size={30} /></span>
                                                                                </div>
                                                                                
                                                                            </div>
                                                                            <div className="pr-1 w-full">
                                                                                <h2 className='text-lg font-semibold border-b-2 w-full'>{pt.listings.name}</h2>
                                                                                <div className="flex flex-col justify-start items-start gap-2 text-sm mt-1">
                                                                                    {pt.listings.discount > 0 ? (
                                                                                        <div className="flex justify-center items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-lg text-primary pr-1">
                                                                                                {formatNumber(pt.listings.totalPrice - Math.floor((pt.listings.totalPrice * pt.listings.discount) / 100))}
                                                                                            </h2>
                                                                                            <p className="line-through">{formatNumber(pt.listings.totalPrice)}</p>
                                                                                            <p className="flex items-center text-xs text-gray-500 bg-primary/50 mx-1 px-1"> -{pt.listings.discount}% 
                                                                                            <IoTicketSharp  className='ml-[1px]'/></p>
                                                                                        </div>
                                                                                    ) : pt.listings.discount === 0 ? (
                                                                                        <div className="flex items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-primaryDark text-lg">{formatNumber(pt.listings.totalPrice)}</h2>
                                                                                        </div>
                                                                                       
                                                                                    ) : (
                                                                                        <div className="flex items-center">
                                                                                            <span className=''><TbCurrencyPeso size={19} /></span>
                                                                                            <h2 className="text-primaryDark text-lg">{formatNumber(pt.listings.totalPrice)}</h2>
                                                                                        </div>
                                                                                    )}
                                                                           
                                                                                    <h2 className='flex items-center justify-center gap-1'>{pt.listings.description}</h2>
                                                                                </div>
                                                                                <div className="flex flex-col justify-start items-start gap-2 text-sm mt-1">
                                                                                    <h2 className='flex items-center justify-center gap-1'> <span><BiSolidCategory size={19} /></span>Category : {pt.listings.category}</h2>
                                                                                    <h2 className='flex items-center justify-center gap-1 '><span><FiPackage size={19} /></span> Expected Yield: {pt.listings.expectedHarvestYield} <span className='font-bold text-primaryDark'>{pt.listings.yieldUnit}</span> </h2>
                                                                                    <h2 className='flex items-center justify-center gap-1'> <span className='border-2 border-slate-900 rounded-full flex items-center justify-center'><TbCurrencyPeso size={15} /></span>Price: {pt.listings.price} / {pt.listings.unit}</h2>
                                                                                    <p className='flex items-center justify-center gap-1'><span><IoIosCalendar size={19} /></span> Harvest Date: {dateFormat((pt.listings.harvestStartDate), "yyyy-mm-dd")} - {dateFormat((pt.listings.harvestStartDate), "yyyy-mm-dd")} </p>
                                                                                </div>
                                                                                <div className="mt-2">
                                                                                    <button onClick={()=> dispatch(delete_card_listing(pt._id))} className="px-5 w-4/12 py-2 bg-red-600 rounded-md text-white flex justify-center items-center gap-1 ">Remove <span><IoRemoveCircleSharp /></span></button>
                                                                                </div>
                                                                               
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                  
                                                </div>
                                            </div>
                                        }

                                        </div>
                                    </div> 
                                </div>
                              
                            </div>
                            :
                            <div className="w-full flex justify-center items-center gap-2 flex-col">
                                <div className="flex justify-center items-center gap-2">
                                    <span><FaHandshake color='#04A738' size={45} /></span>
                                    <h2 className='text-2xl font-semibold text-slate-600'>You have no listings yet!</h2>
                                </div>
                                <Link to='/listings' >
                                        <button className="bg-primary px-8 text-white rounded-md py-2 font-bold">SHOP NOW</button>
                                </Link>
                            </div>
                    }
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Card;
