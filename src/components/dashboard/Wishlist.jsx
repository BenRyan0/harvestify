import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DaysCounter from '../DaysCounter';
import Ratings from '../Ratings';
import { IoTicketSharp } from "react-icons/io5";
import dateFormat, { masks } from "dateformat";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { PiStackPlusFill } from "react-icons/pi";
import { FaHandshake } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaTruckLoading } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from 'react-hot-toast'
import { get_categories, get_listings } from '../../store/reducers/homeReducer'
import { get_wishlist_listings,remove_wishlist,messageClear } from '../../store/reducers/cardReducer'
import { FaCaretUp } from "react-icons/fa";

const Wishlist = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state => state.auth) 
  const {wishlists, wishlist_count,successMessage,errorMessage} = useSelector(state=>state.card)
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  


  useEffect(()=>{
    dispatch(get_wishlist_listings(userInfo.id))
  },[] )


  useEffect(()=>{
    if(successMessage){
        toast.success(successMessage)
        dispatch(messageClear())
    }
    if(errorMessage){
        toast.error(errorMessage)
        dispatch(messageClear())
    }
},[successMessage, errorMessage])




  // Get the current date (now)
const now = new Date();
  return (
    <div className='w-full grid grid-cols-2 md-lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6'>
        {
          wishlists.map((p,i) =>
            <div key={i} className="border  group transition-all duration-500 hover:shadow-md hover:-translate-y-2 rounded-md bg-white p-1">
            <div className="relative overflow-hidden">
            {
                p.listingId.discount ?
                <div className="flex justify-center items-center absolute text-white px-2 py-1 bg-primary rounded-md font-semibold text-sm right-2 top-2">
                -{p.listingId.discount}%
                <span className='ml-1'><IoTicketSharp size={15}/></span>
              </div> :
              <div className=""></div>
              }
              <div className="flex flex-col gap-2 justify-start items-start absolute w-[80px] h-[200px]  font-semibold text-xs left-2 top-2 transition-all duration-700 z-50">
              <ul className='flex transition-all duration-700 left-1 top-6 justify-center items-center absolute w-[80px] opacity-0 group-hover:left-[66px] group-hover:w-[90px] group-hover:opacity-100'>
                <Link className='w-full py-2 px-0 z-0 cursor-pointer flex justify-end pr-1 items-center rounded-md text-primaryDark transition-all bg-white text-end'>
                  <h1>Till Harvest</h1>
                </Link>
              </ul>
                <DaysCounter 
                className="" 
                startDate={dateFormat((p.listingId.harvestStartDate), "yyyy-mm-dd")}  
                endDate={dateFormat((p.listingId.harvestEndDate), "yyyy-mm-dd")}  
                createdAt={dateFormat((p.listingId.createdAt), "yyyy-mm-dd")}  
                currentDate={dateFormat((now), "yyyy-mm-dd")} 
                />
              </div>
              <img className='w-full h-[240px] sm:h-[100] rounded-md object-cover' src={p.listingId.images[0]} alt="listing_image" />
              
              <div className="absolute right-3 bottom-1 hidden md-lg:block">
         
              </div>
              <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                <li onClick={()=>dispatch(remove_wishlist(p._id))} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-red-500 hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaHeart size='13px' />
                </li>
                <Link to={`/listing/details/${p.listingId.slug}`} className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all'>
                  <FaEye />
                </Link>
                <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                 <PiStackPlusFill />
                </li>
                <li className='w-[35px] h-[35px] m-1 cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#1EE35D] hover:text-white hover:rotate-[720deg] transition-all' >
                  <FaHandshake />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2">
              <div className="flex justify-between">
                <h2 className='' id='listing_name'>{p.listingId.name}</h2>

                
                <div className="flex gap-3 text-xl">
                  {/* <h2>Shipping/Delivery: </h2> */}
                  {
                    p.listingId.sellerDelivery? <span><FaTruckLoading /></span> : "" 
                  }
                  {
                    p.listingId.traderPickup?  <span><FaTruck /></span> : ""
                  }
                  
                 
                </div>
              </div>

              <div className="flex justify-between flex-row items-center gap-[2pxz] text-sm">
                <div className="flex justify-end items-center flex-row">
                  <div className="">
                    <span className='font-bold text-base'>&#8369;</span>
                    <span className='text-base font-bold'>{formatNumber(p.listingId.price)}</span>
                    <span className='text-base font-bold'>/{p.listingId.unit}</span>
                  </div>

                  <div className="pl-1">
                    <span className='font-extrabold'>&#64;</span>
                    <span className='text-base font-bold'>{p.listingId.expectedHarvestYield}</span>
                    <span className='text-base font-bold'>{p.listingId.yieldUnit}</span>
                  </div>
                 
                  
                </div>
                <div className="text-base font-bold text-primaryDark ">
                   <span className='pr-1'>&#8369;</span> 
                   <span className=''>{formatNumber(p.listingId.totalPrice)}</span>
                </div>
               

              </div>
              <div className="flex gap-1">
                {
                  p.listingId.sellerId.profileImage? 
                  <img className='h-[50px] bg-primaryDark/50 rounded-full' src={p.listingId.sellerId.profileImage} alt="" />
                  : <img className='h-[50px]  rounded-full' src="/images/Assests/user_profile.png" alt="" />

                }
                <div className="w-full">
                  <div className="flex justify-between ">
                    <h1 className='text-sm font-semibold'>{p.listingId.clusterName}</h1>
                    <div className="flex items-center">
                      <Ratings ratings={p.listingId.sellerId.rating} />
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <span><FaPhone /></span>
                    <span className='text-sm'>{p.listingId.sellerId.phoneNumber}</span>
                  </div>

                </div>
              </div>

             

              <div className="flex justify-center gap-1 py-3 items-center text-center text-sm h-[50px]">
                <p>{p.listingId.description}</p>
              </div>
              <div className="flex justify-start gap-0 py-1 items-start flex-col border-y-2 ">
                <label htmlFor="" className='text-xs font-bold'>Harvest Schedule:</label>
                 <div className="flex justify-between w-full items-center">
                      <span className='text-[11px]'>{dateFormat((p.listingId.harvestStartDate), "mmmm dS, yyyy")} </span>
                      <span>-</span>
                      <span className='text-[11px]'>{dateFormat((p.listingId.harvestEndDate), "mmmm dS, yyyy")} </span>
                 </div>
              </div>
              <div className="flex justify-center gap-1 py-1 items-end">
                <span><IoLocationSharp size='20px' /></span>
                <span className='text-sm'>{p.listingId.sellerId.associationloc_barangay} {p.listingId.sellerId.associationloc_municipalitycity} {p.listingId.sellerId.associationloc_province}</span>
              </div>
            </div>
          </div>
          )
        }
    </div>
  )
}

export default Wishlist